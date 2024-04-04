#!/usr/bin/env node

import chalk from "chalk";
import fs from "fs";
import path from "path";

const rootDir = path.resolve(new URL(".", import.meta.url).pathname, "..");
const filePath = path.join(rootDir, "resource", "list.json");

function load() {
    try {
        const dataBuffer = fs.readFileSync(filePath);
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON);
    } catch (err) {
        return [];
        console.log(chalk.redBright("Unable to load data from " + filePath));
    }
}
function save(list) {
    const dataJSON = JSON.stringify(list);
    fs.writeFileSync(filePath, dataJSON);
}

function add(item) {
    const list = load();
    list.push(item);
    save(list);
    console.log("Added " + chalk.green(item));
}

function remove(item) {
    const list = load();
    const newList = list.filter((i) => i !== item);
    if (list.length !== newList.length) {
        save(newList);
        console.log("Removed " + chalk.red(item));
    } else {
        console.log(chalk.redBright("Unable to remove " + item));
    }
}

function list() {
    const list = load();
    console.log(chalk.cyan("List:"));
    list.forEach((item, index) =>
        console.log(`${chalk.cyan(index + 1 + ".")} ${item}`)
    );
}

const command = process.argv[2];
const value = process.argv[3];

switch (command) {
    case "add":
        if (value) {
            add(value);
        } else {
            console.log(chalk.redBright("No value to add"));
        }
        break;
    case "remove":
        if (value) {
            remove(value);
        } else {
            console.log(chalk.redBright("No value to remove"));
        }
        break;
    case "list":
        list();
        break;
}
