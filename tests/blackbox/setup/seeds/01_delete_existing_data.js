export async function seed(knex) {
	if (process.env.TEST_LOCAL) {
		await knex('sigedin_collections').del();
		await knex('sigedin_relations').del();
		await knex('sigedin_roles').del();
		await knex('sigedin_users').del();
	}
}
