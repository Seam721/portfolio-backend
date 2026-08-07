const pool = require("../config/database");

// ==========================
// CREATE ADMIN
// ==========================
const createAdmin = async (name, email, password) => {

    const result = await pool.query(
        `
        INSERT INTO admins
        (name, email, password)
        VALUES ($1, $2, $3)
        RETURNING
            id,
            name,
            email,
            role,
            created_at
        `,
        [
            name,
            email,
            password
        ]
    );

    return result.rows[0];
};

// ==========================
// FIND ADMIN BY EMAIL
// ==========================
const findAdminByEmail = async (email) => {

    const result = await pool.query(
        `
        SELECT *
        FROM admins
        WHERE email = $1
        `,
        [email]
    );

    return result.rows[0];
};

// ==========================
// FIND ADMIN BY ID
// ==========================
const findAdminById = async (id) => {

    const result = await pool.query(
        `
        SELECT
            id,
            name,
            email,
            role,
            created_at
        FROM admins
        WHERE id = $1
        `,
        [id]
    );

    return result.rows[0];
};

module.exports = {
    createAdmin,
    findAdminByEmail,
    findAdminById
};