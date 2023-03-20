/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
const { timestamps, onUpdateTrigger, ON_UPDATE_TIMESTAMP_FUNCTION } = require('../utils');

exports.up = async knex => {
    await knex.raw(ON_UPDATE_TIMESTAMP_FUNCTION);
    const migration = await knex.schema.createTable('users', (table) => {
        table.bigIncrements('id').index();
        table.string('ulid');
        table.string('name').notNullable();
        table.string('skills');
        table.string('email').unique().notNullable();
        table.string('password').notNullable();
        table.string('mobileNo').notNullable();
        table.integer('role').notNullable();
        table.integer('status').index();
        timestamps(knex, table);
    })
    await knex.raw(onUpdateTrigger('users'));
    return migration;
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async knex => {
    await knex.schema.dropTableIfExists('users');
};
