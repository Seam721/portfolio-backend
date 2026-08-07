const pool = require("../config/database");


// CREATE PROJECT
const createProject = async(data)=>{

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
            featured
        )

        VALUES($1,$2,$3,$4,$5,$6,$7)

        RETURNING *
        `,
        [
            data.title,
            data.description,
            data.image,
            data.github_url,
            data.demo_url,
            data.technologies,
            data.featured
        ]
    );

    return result.rows[0];
};


// GET ALL
const getProjects = async()=>{

    const result = await pool.query(
        `
        SELECT *
        FROM projects
        ORDER BY created_at DESC
        `
    );

    return result.rows;
};


// GET ONE
const getProjectById = async(id)=>{

    const result = await pool.query(
        `
        SELECT *
        FROM projects
        WHERE id=$1
        `,
        [id]
    );

    return result.rows[0];
};


// UPDATE
const updateProject = async(id,data)=>{

    const result = await pool.query(
        `
        UPDATE projects

        SET
        title=$1,
        description=$2,
        image=$3,
        github_url=$4,
        demo_url=$5,
        technologies=$6,
        featured=$7,
        updated_at=NOW()

        WHERE id=$8

        RETURNING *
        `,
        [
            data.title,
            data.description,
            data.image,
            data.github_url,
            data.demo_url,
            data.technologies,
            data.featured,
            id
        ]
    );

    return result.rows[0];
};


// DELETE
const deleteProject = async(id)=>{

    await pool.query(
        `
        DELETE FROM projects
        WHERE id=$1
        `,
        [id]
    );

};


module.exports = {

    createProject,
    getProjects,
    getProjectById,
    updateProject,
    deleteProject

};