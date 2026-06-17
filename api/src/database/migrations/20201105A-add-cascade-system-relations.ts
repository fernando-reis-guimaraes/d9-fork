import type { Knex } from 'knex';

const updates = [
	{
		table: 'sigedin_fields',
		constraints: [
			{
				column: 'group',
				references: 'sigedin_fields.id',
			},
		],
	},
	{
		table: 'sigedin_files',
		constraints: [
			{
				column: 'folder',
				references: 'sigedin_folders.id',
			},
			{
				column: 'uploaded_by',
				references: 'sigedin_users.id',
			},
			{
				column: 'modified_by',
				references: 'sigedin_users.id',
			},
		],
	},
	{
		table: 'sigedin_folders',
		constraints: [
			{
				column: 'parent',
				references: 'sigedin_folders.id',
			},
		],
	},
	{
		table: 'sigedin_permissions',
		constraints: [
			{
				column: 'role',
				references: 'sigedin_roles.id',
			},
		],
	},
	{
		table: 'sigedin_presets',
		constraints: [
			{
				column: 'user',
				references: 'sigedin_users.id',
			},
			{
				column: 'role',
				references: 'sigedin_roles.id',
			},
		],
	},
	{
		table: 'sigedin_revisions',
		constraints: [
			{
				column: 'activity',
				references: 'sigedin_activity.id',
			},
			{
				column: 'parent',
				references: 'sigedin_revisions.id',
			},
		],
	},
	{
		table: 'sigedin_sessions',
		constraints: [
			{
				column: 'user',
				references: 'sigedin_users.id',
			},
		],
	},
	{
		table: 'sigedin_settings',
		constraints: [
			{
				column: 'project_logo',
				references: 'sigedin_files.id',
			},
			{
				column: 'public_foreground',
				references: 'sigedin_files.id',
			},
			{
				column: 'public_background',
				references: 'sigedin_files.id',
			},
		],
	},
	{
		table: 'sigedin_users',
		constraints: [
			{
				column: 'role',
				references: 'sigedin_roles.id',
			},
		],
	},
];

/**
 * NOTE:
 * Not all databases allow (or support) recursive onUpdate/onDelete triggers. MS SQL / Oracle flat out deny creating them,
 * Postgres behaves erratic on those triggers, not sure if MySQL / Maria plays nice either.
 */

export async function up(knex: Knex): Promise<void> {
	for (const update of updates) {
		await knex.schema.alterTable(update.table, (table) => {
			for (const constraint of update.constraints) {
				table.dropForeign([constraint.column]);
				table.foreign(constraint.column).references(constraint.references);
			}
		});
	}
}

export async function down(knex: Knex): Promise<void> {
	for (const update of updates) {
		await knex.schema.alterTable(update.table, (table) => {
			for (const constraint of update.constraints) {
				table.dropForeign([constraint.column]);
			}
		});
	}
}
