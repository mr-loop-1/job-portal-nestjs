/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async (knex) => {
  const migration = await knex.schema.table('users', (table) => {
    table.timestamp('password_updated_at');
  });
  return migration;
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async (knex) => {
  await knex.schema.table('applications', (table) => {
    table.dropColumn('password_updated_at');
  });
};
