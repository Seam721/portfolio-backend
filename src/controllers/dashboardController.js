const pool = require("../config/database");


const getDashboard = async (req, res) => {

    try {

        // Count contacts
        const contacts = await pool.query(
            `
            SELECT COUNT(*) 
            FROM contacts
            `
        );


        // Latest messages
        const latestMessages = await pool.query(
            `
            SELECT *
            FROM contacts
            ORDER BY created_at DESC
            LIMIT 5
            `
        );


        res.json({

            success: true,

            data: {

                totalMessages:
                Number(contacts.rows[0].count),


                latestMessages:
                latestMessages.rows

            }

        });


    } catch(error) {

        res.status(500).json({

            success:false,

            message:error.message

        });

    }

};


module.exports = {
    getDashboard
};