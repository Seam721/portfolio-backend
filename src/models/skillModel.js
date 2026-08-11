const pool = require("../config/database");


// ========================================
// CREATE SKILL
// ========================================

const createSkill = async (data) => {

    const {
        name,
        category,
        level,
        proficiency,
        icon
    } = data;


    const result = await pool.query(
        `
        INSERT INTO skills
        (
            name,
            category,
            level,
            proficiency,
            icon
        )
        VALUES($1,$2,$3,$4,$5)
        RETURNING *
        `,
        [
            name,
            category,
            level,
            Number(proficiency || 0),
            icon || null
        ]
    );


    return result.rows[0];

};


// ========================================
// GET ALL SKILLS
// ========================================

const getSkills = async () => {

    const result = await pool.query(
        `
        SELECT *
        FROM skills
        ORDER BY id DESC
        `
    );


    return result.rows;

};


// ========================================
// GET SINGLE SKILL
// ========================================

const getSkillById = async (id) => {

    const result = await pool.query(
        `
        SELECT *
        FROM skills
        WHERE id=$1
        `,
        [id]
    );


    return result.rows[0];

};


// ========================================
// UPDATE SKILL
// ========================================

const updateSkill = async (id, data) => {

    const {
        name,
        category,
        level,
        proficiency,
        icon
    } = data;


    const result = await pool.query(
        `
        UPDATE skills
        SET
            name=$1,
            category=$2,
            level=$3,
            proficiency=$4,
            icon=$5,
            updated_at=NOW()
        WHERE id=$6
        RETURNING *
        `,
        [
            name,
            category,
            level,
            Number(proficiency || 0),
            icon || null,
            id
        ]
    );


    return result.rows[0];

};


// ========================================
// DELETE SKILL
// ========================================

const deleteSkill = async (id) => {

    await pool.query(
        `
        DELETE FROM skills
        WHERE id=$1
        `,
        [id]
    );

};


// ========================================
// EXPORT
// ========================================

module.exports = {
    createSkill,
    getSkills,
    getSkillById,
    updateSkill,
    deleteSkill
};