const db = require("../../data/db-config");

module.exports = {
    insert,
    getMySchedule,
    getMyScheduleById,
    remove
};

async function insert(schedule) {
    const [newSchedule] = await db('schedules').insert(schedule, '*')
    return newSchedule
}

async function remove(scheduleId) {
    await db('schedules').where('schedule_id', '=', scheduleId).del()
}

async function getMySchedule(userId) {
    return db("schedules as s")
        .join('classes as c', 'c.class_id', '=', 's.class_id')
        .join('users as u', 'u.user_id', '=',  'c.instructor_id')
        .select('s.*', 'c.*', 'u.username as instructor')
        .where('s.user_id', userId);
}

async function getMyScheduleById(scheduleId) {
    return db("schedules as s")
        .join('classes as c', 'c.class_id', '=', 's.class_id')
        .join('users as u', 'u.user_id', '=',  'c.instructor_id')
        .select('s.*', 'c.*', 'u.username as instructor')
        .where('s.schedule_id', scheduleId)
        .first();
}