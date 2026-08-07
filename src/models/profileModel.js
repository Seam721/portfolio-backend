const pool = require("../config/database");


// GET PROFILE

const getProfile = async()=>{

    const result = await pool.query(
        `
        SELECT *
        FROM profile
        LIMIT 1
        `
    );

    return result.rows[0];

};



// UPDATE PROFILE

const updateProfile = async(id,data)=>{

    const {
        full_name,
        title,
        bio,
        profile_image,
        cv_file,
        github_url,
        linkedin_url,
        email
    } = data;


    const result = await pool.query(
        `
        UPDATE profile
        SET
            full_name=$1,
            title=$2,
            bio=$3,
            profile_image=$4,
            cv_file=$5,
            github_url=$6,
            linkedin_url=$7,
            email=$8,
            updated_at=NOW()

        WHERE id=$9

        RETURNING *
        `,
        [
            full_name,
            title,
            bio,
            profile_image,
            cv_file,
            github_url,
            linkedin_url,
            email,
            id
        ]
    );


    return result.rows[0];

};



module.exports={

    getProfile,

    updateProfile

};