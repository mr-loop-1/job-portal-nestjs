const { timestamps, onUpdateTrigger } = require('../utils');
exports.up = async function (knex) {
  const migration = await knex.schema.createTable("jobs", function (table) {
    table.bigIncrements('id');
    table.string('ulid');
    table.bigInteger('userId'); 
    table.string('title');
    table.string('description');
    table.tinyint('status');
    table.integer('noOfVacancy');
    table.string('organization');
    timestamps(knex,table)
});
await knex.raw(onUpdateTrigger('jobs'));
return migration;
};
exports.down = function (knex) {
  return knex.schema.dropTableIfExists('jobs');
};











