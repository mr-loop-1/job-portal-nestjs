/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  knex.schema.createTable('applications', (applicationsTable) => {
    applicationsTable.integer('candidate_id');
    applicationsTable.integer('job_id');
    applicationsTable.enu('status', [
        applicationStatus.applied,
        applicationStatus.evaluating,
        applicationStatus.interview,
        applicationStatus.selected,
        applicationStatus.rejected
    ]);
    applicationsTable.timestamp('created_at');
    applicationsTable.timestamp('updated_at');

    applicationsTable.primary('id');
    applicationsTable.foreign('candidate_id').references('users.id');
    applicationsTable.foreign('job_id').references('jobs.id');
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  
};
