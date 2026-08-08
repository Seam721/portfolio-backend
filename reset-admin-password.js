require("dotenv").config();

const bcrypt = require("bcrypt");
const pool = require("./src/config/database");

async function resetPassword() {

    const email = "admin@gmail.com";

    const newPassword = "ChangeMe123!";

    try {

        const hashedPassword =
            await bcrypt.hash(newPassword, 10);

        const result = await pool.query(
            `
            UPDATE admins
            SET password = $1
            WHERE email = $2
            RETURNING id, name, email, role
            `,
            [hashedPassword, email]
        );

        if (result.rowCount === 0) {

            console.log("Admin email not found.");

        } else {

            console.log("Password reset successfully.");
            console.log(result.rows[0]);
            console.log("Email:", email);
            console.log("New password:", newPassword);

        }

    } catch (error) {

        console.error("RESET ERROR:", error.message);

    } finally {

        await pool.end();

    }
}

resetPassword();