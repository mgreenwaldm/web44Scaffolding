exports.up = async (knex) => {
    await knex.schema
        .table('classes', function (table) {
            table.integer('duration_minutes').defaultTo(60);
            table.string('type').defaultTo('Fitness');
        });
}

exports.down = async (knex) => {
    await knex.schema.alterTable('classes', table=>{
        table.dropColumn('duration_minutes');
        table.dropColumn('type');
    });
}