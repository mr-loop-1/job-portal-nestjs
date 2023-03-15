const { timestamps, onUpdateTrigger } = require("../utils");

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async knex => {
    const migration = await knex.schema.createTable('applications', (table) => {
        table.bigIncrements('id').index();
        table.string('ulid');
        table.bigInteger('candidateId').index().notNullable();
        table.bigInteger('jobId').index().notNullable();
        table.integer('status');
        timestamps(knex, table);
    })
    await knex.raw(onUpdateTrigger('applications'));
    return migration;
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async knex => {
    await knex.schema.dropTableIfExists('applications');
};
