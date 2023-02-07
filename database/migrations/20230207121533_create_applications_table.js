

const { timestamps, onUpdateTrigger } = require('../utils');
exports.up = async function (knex) {
  const migration = await knex.schema.createTable("applications", function (table) {
    table.bigIncrements('id');
    table.string('ulid');
    table.bigInteger('userId');
    table.bigInteger('jobId');
    table.tinyint('status');
    timestamps(knex,table)
});
await knex.raw(onUpdateTrigger('applications'));
return migration;
};
exports.down = function (knex) {
  return knex.schema.dropTableIfExists('applications');
};











