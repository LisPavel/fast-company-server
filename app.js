const express = require("express");
const chalk = require("chalk");
const mongoose = require("mongoose");
const config = require("config");

const PORT = config.get("port") ?? 8080;

const app = express();

app.listen(PORT, () => {
    console.log(chalk.green(`Server has been started on ${PORT} port`));
});
