const { timestamps } = require("../utils");

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async knex => {
    const migration = await knex.schema.createTable('applications', (table) => {
        table.bigIncrements('id');
        table.string('ulid');
        table.integer('candidateId');
        table.integer('job_id');
        table.integer('status');
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
    await sknex.schema.dropTableIfExists('applications');
};
