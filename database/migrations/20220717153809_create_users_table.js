/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */const { timestamps, onUpdateTrigger, ON_UPDATE_TIMESTAMP_FUNCTION } = require('../utils');
exports.up = async function(knex) {
    // const migration = await knex.schema.createTable("users", function (table) {
    //     table.increments("id");
    //     table.string ('name');
    //     table.string('email').index();
    //     table.string('password').index();
    //     table.string('mobile_no');
    //     table.string('type');
    //     table.tinyint('status').unsigned().defaultTo(1);
    // });
    // await knex.raw(onUpdateTrigger('users'));
    // return migration;

};


/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTableIfExists('users');
};

