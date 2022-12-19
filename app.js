const express = require("express");
const chalk = require("chalk");
const mongoose = require("mongoose");
const config = require("config");
const cors = require("cors");
const path = require("path");

const initDatabase = require("./startUp/initDatabase");
const routes = require("./routes");

const PORT = config.get("port") ?? 8080;
const app = express();

if (process.env.NODE_ENV === "production") {
    app.use("/", express.static(path.join(__dirname, "client")));
    const indexPath = path.join(__dirname, "client", "index.html");
    app.get("*", (req, res) => res.sendFile(indexPath));
}

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use("/api", routes);

async function start(params) {
    try {
        mongoose.connection.once("open", () => {
            initDatabase();
        });
        await mongoose.connect(config.get("mongoDbUri"));
        console.log(chalk.green("MDB connected"));
        app.listen(PORT, () => {
            console.log(chalk.green(`Server has been started on ${PORT} port`));
        });
    } catch (error) {
        console.log(chalk.red(error.message));
        process.exit(1);
    }
}

start();
