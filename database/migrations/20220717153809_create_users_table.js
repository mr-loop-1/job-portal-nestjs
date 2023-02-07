const { timestamps, onUpdateTrigger, ON_UPDATE_TIMESTAMP_FUNCTION } = require('../utils');
exports.up = async function (knex) {
  await knex.raw(ON_UPDATE_TIMESTAMP_FUNCTION);
  const migration = await knex.schema.createTable("users", function (table) {
    table.bigIncrements('id');
    table.string('ulid');
    table.string('firstName');
    table.string('lastName');
    table.string('email');
    table.string('password');
    table.string('mobileNumber');
    table.tinyint('role');
    table.tinyint('status');
    table.string('skills');
    timestamps(knex,table)
});
await knex.raw(onUpdateTrigger('users'));
return migration;
};
exports.down = function (knex) {
  return knex.schema.dropTableIfExists('users');
};











