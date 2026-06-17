import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
	await knex.schema.alterTable('sigedin_collections', (table) => {
		table.json('check_filter').nullable();
	});
}

export async function down(knex: Knex): Promise<void> {
	await knex.schema.alterTable('sigedin_collections', (table) => {
		table.dropColumn('check_filter');
	});
}
