exports.up = async (knex) => {
    await knex.schema
        .createTable('classes', (classes) => {
            classes.increments('class_id')
            classes.string('name', 200).notNullable()
            classes.timestamp('start_time').defaultTo(knex.fn.now())
            classes.string('intensity_level').defaultTo('light')
            classes.string('location')
            classes.integer('max_attendees').defaultTo(10)
            classes.timestamps(false, true)
        }).createTable('schedules', (schedule) => {
            schedule.increments('schedule_id')
            schedule.integer('user_id').references('user_id').inTable('users')
            schedule.integer('class_id').references('class_id').inTable('classes')
        }).table('users', function (table) {
            table.boolean('is_instructor');
        });
}

exports.down = async (knex) => {
    await knex.schema.dropTableIfExists('classes')
    await knex.schema.dropTableIfExists('schedules')
    await knex.schema.alterTable('users', table=>{
        table.dropColumn('is_instructor');
    });
}
