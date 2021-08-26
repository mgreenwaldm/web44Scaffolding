const db = require("../../data/db-config");

module.exports = {
    insert,
    update,
    getAllClassesWithInstructor,
    getClassesWithInstructorById,
    remove
};

async function insert(classes) {
    const [newClassesObject] = await db('classes').insert(classes, '*')
    return newClassesObject
}

async function update(classId, classes) {
    const [updatedClassesObject] = await db('classes').where('class_id', '=', classId).update(classes, '*')
    return updatedClassesObject
}

async function remove(classId) {
    await db('classes').where('class_id', '=', classId).del()
}

async function getAllClassesWithInstructor() {
    return db("classes as c")
        .join('users', 'c.instructor_id', '=', 'users.user_id')
        .select('users.username as instructor', 'c.*');
}

async function getClassesWithInstructorById(classId) {
    const details = await db("classes as c")
        .join('users', 'c.instructor_id', '=', 'users.user_id')
        .select('users.username as instructor', 'c.*')
        .where('c.class_id', classId)
        .first();

    const attendees = await db("schedules as s")
        .count('user_id')
        .where('class_id', '=', classId)
        .first();

    details.attendees = attendees.count;
    return details;
}