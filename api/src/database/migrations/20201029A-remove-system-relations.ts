import type { Knex } from 'knex';
import { merge } from 'lodash-es';

export async function up(knex: Knex): Promise<void> {
	await knex('sigedin_relations')
		.delete()
		.where('many_collection', 'like', 'sigedin_%')
		.andWhere('one_collection', 'like', 'sigedin_%');
}

export async function down(knex: Knex): Promise<void> {
	const defaults = {
		many_collection: 'sigedin_users',
		many_field: null,
		many_primary: null,
		one_collection: null,
		one_field: null,
		one_primary: null,
		junction_field: null,
	};

	const systemRelations = [
		{
			many_collection: 'sigedin_users',
			many_field: 'role',
			many_primary: 'id',
			one_collection: 'sigedin_roles',
			one_field: 'users',
			one_primary: 'id',
		},
		{
			many_collection: 'sigedin_users',
			many_field: 'avatar',
			many_primary: 'id',
			one_collection: 'sigedin_files',
			one_primary: 'id',
		},
		{
			many_collection: 'sigedin_revisions',
			many_field: 'activity',
			many_primary: 'id',
			one_collection: 'sigedin_activity',
			one_field: 'revisions',
			one_primary: 'id',
		},
		{
			many_collection: 'sigedin_presets',
			many_field: 'user',
			many_primary: 'id',
			one_collection: 'sigedin_users',
			one_primary: 'id',
		},
		{
			many_collection: 'sigedin_presets',
			many_field: 'role',
			many_primary: 'id',
			one_collection: 'sigedin_roles',
			one_primary: 'id',
		},
		{
			many_collection: 'sigedin_folders',
			many_field: 'parent',
			many_primary: 'id',
			one_collection: 'sigedin_folders',
			one_primary: 'id',
		},
		{
			many_collection: 'sigedin_files',
			many_field: 'folder',
			many_primary: 'id',
			one_collection: 'sigedin_folders',
			one_primary: 'id',
		},
		{
			many_collection: 'sigedin_files',
			many_field: 'uploaded_by',
			many_primary: 'id',
			one_collection: 'sigedin_users',
			one_primary: 'id',
		},
		{
			many_collection: 'sigedin_fields',
			many_field: 'collection',
			many_primary: 'id',
			one_collection: 'sigedin_collections',
			one_field: 'fields',
			one_primary: 'collection',
		},
		{
			many_collection: 'sigedin_activity',
			many_field: 'user',
			many_primary: 'id',
			one_collection: 'sigedin_users',
			one_primary: 'id',
		},
		{
			many_collection: 'sigedin_settings',
			many_field: 'project_logo',
			many_primary: 'id',
			one_collection: 'sigedin_files',
			one_primary: 'id',
		},
		{
			many_collection: 'sigedin_settings',
			many_field: 'public_foreground',
			many_primary: 'id',
			one_collection: 'sigedin_files',
			one_primary: 'id',
		},
		{
			many_collection: 'sigedin_settings',
			many_field: 'public_background',
			many_primary: 'id',
			one_collection: 'sigedin_files',
			one_primary: 'id',
		},
	].map((row) => {
		for (const [key, value] of Object.entries(row)) {
			if (value !== null && (typeof value === 'object' || Array.isArray(value))) {
				(row as any)[key] = JSON.stringify(value);
			}
		}

		return merge({}, defaults, row);
	});

	await knex.insert(systemRelations).into('sigedin_relations');
}
