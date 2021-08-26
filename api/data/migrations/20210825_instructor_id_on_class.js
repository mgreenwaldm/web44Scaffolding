exports.up = async (knex) => {
    await knex.schema
        .table('classes', function (table) {
            table.integer('instructor_id').references('user_id').inTable('users');
        });
}

exports.down = async (knex) => {
    await knex.schema.alterTable('classes', table=>{
        table.dropColumn('instructor_id');
    });
}