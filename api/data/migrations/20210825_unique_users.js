exports.up = async (knex) => {
    await knex.schema
        .table('users', function (table) {
            table.unique('username');
        });
}

exports.down = async () => {

}
