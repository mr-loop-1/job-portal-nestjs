/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
const { timestamps, onUpdateTrigger } = require('../utils');

exports.up = async knex => {
    const migration = await knex.schema.createTable('jobs', (table) => {
        table.bigIncrements('id');
        table.string('ulid');
        table.string('title');
        table.string('description');
        table.integer('recruiterId');
        table.string('location');
        timestamps(knex, table);
    })
    await knex.raw(onUpdateTrigger('jobs'));
    return migration;
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async knex => {
    await knex.schema.dropTableIfExists('jobs');
};
