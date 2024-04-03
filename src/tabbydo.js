const fs = require("fs");
const filePath = "../resource/list.json";

function load() {
    try {
        const dataBuffer = fs.readFileSync(filePath);
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON);
    } catch (err) {
        return [];
        err.console.log("Unable to load data from " + filePath);
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
    console.log("Added " + item);
}

function remove(item) {
    const list = load();
    const newList = list.filter((i) => i !== item);
    if (list.length !== newList.length) {
        save(newList);
        console.log("Removed " + item);
    } else {
        err.console.log("Unable to remove " + item);
    }
}

function list() {
    const list = load();
    list.forEach((item, index) => console.log(`${index + 1}. ${item}`));
}

const command = process.argv[2];
const value = process.argv[3];

switch (command) {
    case "add":
        if (value) {
            add(value);
        } else {
            err.console.log("No value to add");
        }
        break;
    case "remove":
        if (value) {
            remove(value);
        } else {
            err.console.log("No value to remove");
        }
        break;
    case "list":
        list();
        break;
}
