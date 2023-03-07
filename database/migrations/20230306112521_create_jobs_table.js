/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
const { timestamps,onUpdateTrigger } = require('../utils');

exports.up = async knex => {
    const migration = await knex.schema.createjobsTable('jobs', (table) => {
        table.biIncrements('id');
        table.string('ulid');
        table.string('title');
        table.string('description');
        table.integer('recruiter_id');
        table.string('location');
        timestamps(knex, table);

        table.primary('id');
    })
    await knex.raw(onUpdateTrigger('users'));
    return migration;
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async knex => {
    await knex.schema.dropTableIfExists('jobs');
};
