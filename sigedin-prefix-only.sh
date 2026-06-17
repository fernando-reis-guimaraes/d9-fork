#!/usr/bin/env bash
set -euo pipefail

echo "Prerequisite: run this from the d9 fork repository root"
echo

if ! git rev-parse --is-inside-work-tree >/dev/null 2>&1; then
  echo "ERROR: not inside a git repository"
  exit 1
fi

if ! command -v python3 >/dev/null 2>&1; then
  echo "ERROR: python3 not found"
  exit 1
fi

if ! command -v rg >/dev/null 2>&1; then
  echo "ERROR: rg not found. Install ripgrep first."
  exit 1
fi

echo "Checking git status"
if [ -n "$(git status --porcelain)" ]; then
  echo "ERROR: git working tree is not clean. Commit/stash/reset first."
  git status --short
  exit 1
fi

BRANCH_NAME="sigedin-prefix-only-$(date +%Y%m%d-%H%M%S)"

echo
echo "Creating branch: ${BRANCH_NAME}"
git switch -c "${BRANCH_NAME}"

echo
echo "Counting directus_ references before replace"
rg -n "directus_" . \
  --glob '!node_modules' \
  --glob '!dist' \
  --glob '!coverage' \
  --glob '!build' \
  --glob '!*.lock' \
  --glob '!package-lock.json' \
  --glob '!pnpm-lock.yaml' \
  --glob '!yarn.lock' \
  --glob '!bun.lockb' \
  | tee /tmp/sigedin-before.txt || true

echo
echo "Before file count:"
cut -d: -f1 /tmp/sigedin-before.txt 2>/dev/null | sort -u | wc -l || true

echo
echo "Before reference count:"
wc -l /tmp/sigedin-before.txt 2>/dev/null || true

echo
echo "Writing replace script"
cat > /tmp/replace-directus-prefix-with-sigedin.py <<'PY'
#!/usr/bin/env python3

from pathlib import Path

ROOT = Path(".").resolve()

EXCLUDED_DIRS = {
    ".git",
    "node_modules",
    "dist",
    "coverage",
    "build",
    ".next",
    ".nuxt",
    ".turbo",
    ".cache",
    ".pnpm-store",
}

EXCLUDED_FILES = {
    "package-lock.json",
    "pnpm-lock.yaml",
    "yarn.lock",
    "bun.lockb",
}

EXCLUDED_SUFFIXES = {
    ".png",
    ".jpg",
    ".jpeg",
    ".gif",
    ".webp",
    ".ico",
    ".svgz",
    ".pdf",
    ".zip",
    ".gz",
    ".tgz",
    ".br",
    ".woff",
    ".woff2",
    ".ttf",
    ".otf",
    ".mp4",
    ".mov",
    ".sqlite",
    ".db",
}

changed_files = []

def is_excluded(relative_path: Path) -> bool:
    if set(relative_path.parts).intersection(EXCLUDED_DIRS):
        return True

    if relative_path.name in EXCLUDED_FILES:
        return True

    if relative_path.suffix.lower() in EXCLUDED_SUFFIXES:
        return True

    return False

for path in ROOT.rglob("*"):
    if not path.is_file():
        continue

    relative_path = path.relative_to(ROOT)

    if is_excluded(relative_path):
        continue

    data = path.read_bytes()

    if b"\x00" in data:
        continue

    try:
        original = data.decode("utf-8")
    except UnicodeDecodeError:
        continue

    updated = original.replace("directus_", "sigedin_")

    if updated != original:
        path.write_text(updated, encoding="utf-8")
        changed_files.append(str(relative_path))

print("Changed files:")
for changed_file in changed_files:
    print(changed_file)

print()
print(f"Total changed files: {len(changed_files)}")
PY

chmod +x /tmp/replace-directus-prefix-with-sigedin.py

echo
echo "Running replace: directus_ -> sigedin_"
python3 /tmp/replace-directus-prefix-with-sigedin.py | tee /tmp/sigedin-changed-files.txt

echo
echo "Counting directus_ references after replace"
rg -n "directus_" . \
  --glob '!node_modules' \
  --glob '!dist' \
  --glob '!coverage' \
  --glob '!build' \
  --glob '!*.lock' \
  --glob '!package-lock.json' \
  --glob '!pnpm-lock.yaml' \
  --glob '!yarn.lock' \
  --glob '!bun.lockb' \
  | tee /tmp/sigedin-after.txt || true

echo
echo "Checking for package/import damage"
rg -n "@sigedin|sigedin-extension|from ['\"]sigedin|from ['\"]@sigedin" . \
  --glob '!node_modules' \
  --glob '!dist' \
  --glob '!coverage' \
  --glob '!build' \
  --glob '!*.lock' || true

echo
echo "Git diff summary"
git diff --stat

echo
echo "Changed files"
git diff --name-only | sort

echo
echo "Inspect package.json changes, if any"
git diff -- package.json '**/package.json' | sed -n '1,240p' || true

echo
echo "Done."
echo "Next verification:"
echo "  pnpm install --frozen-lockfile"
echo "  pnpm build"
