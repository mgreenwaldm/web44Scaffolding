const db = require("../../data/db-config");

module.exports = {
    insert,
    getByUsername
};

async function insert(user) {
    const [newUserObject] = await db('users').insert(user, ['user_id', 'username', 'password', 'is_instructor'])
    return newUserObject
}

async function getByUsername(username) {
    let query = db("users as u");
    return query.where("u.username", username).first();
}