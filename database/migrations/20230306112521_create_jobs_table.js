/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    knex.schema.createjobsTable('jobs', (jobsTable) => {
        jobsTable.integer('id');
        jobsTable.string('title');
        jobsTable.string('description');
        jobsTable.integer('recruiter_id');
        jobsTable.string('location');
        jobsTable.timestamp('created_at');
        jobsTable.timestamp('updated_at');

        jobsTable.primary('id');
        jobsTable.foreign('recruiter_id').references('users.id');
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  knex.schema.dropjobsTable('jobs');
};
