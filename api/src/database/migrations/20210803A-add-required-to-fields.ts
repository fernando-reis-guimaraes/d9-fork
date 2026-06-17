import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
	await knex.schema.alterTable('sigedin_fields', (table) => {
		table.boolean('required').defaultTo(false);
	});
}

export async function down(knex: Knex): Promise<void> {
	await knex.schema.alterTable('sigedin_fields', (table) => {
		table.dropColumn('required');
	});
}
