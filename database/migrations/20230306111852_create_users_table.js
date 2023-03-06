/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  knex.schema.createTable('users', (usersTable) => {
    usersTable.integer('id');
    usersTable.string('name');
    usersTable.string('skills');
    usersTable.string('email');
    usersTable.string('password');
    usersTable.integer('phone_no',10);
    usersTable.enu('role', [
        userRole.candidate, 
        userRole.recruiter, 
        userRole.admin
    ]);
    usersTable.timestamp('created_at');
    usersTable.timestamp('updated_at');
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  knex.schema.dropTableIfExists('users');
};
