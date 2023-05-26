const bodyParser = require("body-parser");
const express = require("express");
const cors = require("cors");
const app = express();
app.use(bodyParser.json());
app.use(cors());

require("./models/index");
const UserRoutes = require("./routes/user.routes")
app.use("/",UserRoutes);

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Serve is listening on port :  ${port}`)
}) 
