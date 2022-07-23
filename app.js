const express = require("express");
const chalk = require("chalk");
const mongoose = require("mongoose");
const config = require("config");

const PORT = config.get("port") ?? 8080;

// if (process.env.NODE_ENV === "production") {
//     console.log("production");
// } else {
//     console.log("development");
// }

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.listen(PORT, () => {
    console.log(chalk.green(`Server has been started on ${PORT} port`));
});
