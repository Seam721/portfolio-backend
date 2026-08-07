const pool = require("../config/database");


// Create contact
const createContactMessage = async (
    name,
    email,
    message
) => {

    const result = await pool.query(
        `
        INSERT INTO contacts
        (name, email, message)
        VALUES ($1, $2, $3)
        RETURNING *
        `,
        [
            name,
            email,
            message
        ]
    );

    return result.rows[0];
};



// Get all contacts
const getAllContacts = async () => {

    const result = await pool.query(
        "SELECT * FROM contacts ORDER BY created_at DESC"
    );

    return result.rows;
};



// Get contact by id
const getContactById = async (id) => {

    const result = await pool.query(
        "SELECT * FROM contacts WHERE id = $1",
        [id]
    );

    return result.rows[0];
};



// Delete contact
const deleteContact = async (id) => {

    const result = await pool.query(
        "DELETE FROM contacts WHERE id = $1 RETURNING *",
        [id]
    );

    return result.rows[0];
};



module.exports = {
    createContactMessage,
    getAllContacts,
    getContactById,
    deleteContact
};