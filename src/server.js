require("dotenv").config();


// Database connection
require("./config/database");


// Express application
const app = require("./app");


const PORT = process.env.PORT || 5000;


app.listen(PORT, () => {

    console.log(`🚀 Server running on port ${PORT}`);

});