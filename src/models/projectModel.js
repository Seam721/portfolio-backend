const pool = require("../config/database");


/* =====================================================
   CREATE PROJECT
===================================================== */

const createProject = async (data) => {

    const result = await pool.query(
        `
        INSERT INTO projects
        (
            title,
            description,
            image,
            github_url,
            demo_url,
            technologies,
            featured,
            featured_order,
            is_active
        )

        VALUES
        (
            $1,
            $2,
            $3,
            $4,
            $5,
            $6,
            $7,
            $8,
            $9
        )

        RETURNING *
        `,
        [
            data.title,
            data.description,
            data.image,
            data.github_url,
            data.demo_url,
            data.technologies,
            data.featured ?? false,
            data.featured_order ?? 1,
            data.is_active ?? true
        ]
    );

    return result.rows[0];
};


/* =====================================================
   GET ALL PROJECTS
===================================================== */

const getProjects = async () => {

    const result = await pool.query(
        `
        SELECT *
        FROM projects

        ORDER BY
            featured DESC,
            featured_order ASC,
            created_at DESC
        `
    );

    return result.rows;
};


/* =====================================================
   GET ONE PROJECT
===================================================== */

const getProjectById = async (id) => {

    const result = await pool.query(
        `
        SELECT *
        FROM projects

        WHERE id = $1
        `,
        [id]
    );

    return result.rows[0];
};


/* =====================================================
   UPDATE PROJECT
===================================================== */

const updateProject = async (id, data) => {

    const result = await pool.query(
        `
        UPDATE projects

        SET

            title = $1,

            description = $2,

            image = $3,

            github_url = $4,

            demo_url = $5,

            technologies = $6,

            featured = $7,

            featured_order = $8,

            is_active = $9,

            updated_at = NOW()

        WHERE id = $10

        RETURNING *
        `,
        [
            data.title,
            data.description,
            data.image,
            data.github_url,
            data.demo_url,
            data.technologies,
            data.featured ?? false,
            data.featured_order ?? 1,
            data.is_active ?? true,
            id
        ]
    );

    return result.rows[0];
};


/* =====================================================
   DELETE PROJECT
===================================================== */

const deleteProject = async (id) => {

    await pool.query(
        `
        DELETE FROM projects

        WHERE id = $1
        `,
        [id]
    );

};


/* =====================================================
   EXPORT
===================================================== */

module.exports = {

    createProject,

    getProjects,

    getProjectById,

    updateProject,

    deleteProject

};