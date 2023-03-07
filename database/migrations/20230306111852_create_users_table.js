/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
const { timestamps, onUpdateTrigger, ON_UPDATE_TIMESTAMP_FUNCTION } = require('../utils');

exports.up = async knex => {
    await knex.raw(ON_UPDATE_TIMESTAMP_FUNCTION);
    const migration = await knex.schema.createTable('users', (table) => {
        table.bigIncrements('id');
        table.string('ulid');
        table.string('name');
        table.string('skills');
        table.string('email');
        table.string('password');
        table.string('mobileNo');
        table.intger('role');
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
