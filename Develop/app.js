const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const util = require("util");

const writeFileAsync = util.promisify(fs.writeFile);

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const teamList = [];

function initApp() {
    return inquirer.prompt([
        {
            type: "input",
            message: "What is the manager's name?",
            name: "name"
        },
        {
            type: "input",
            message: "What is the manager's id?",
            name: "id"
        },
        {
            type: "input",
            message: "What is the manager's email?",
            name: "email"
        },
        {
            type: "input",
            message: "What is the manager's office number?",
            name: "officeNo"
        },
    ]).then(response => {
        const manager = new Manager(response.name, response.id, response.email, response.officeNo);
        teamList.push(manager);
        addEmployee();
    });
}

function addEmployee() {
    inquirer.prompt([
        {
            type: "list",
            message: "What role would you like to add?",
            choices: ["Engineer", "Intern", "I don't have anymore team members."],
            name: "role"
        },
    ]).then(answer => {
        if (answer.role === "Engineer") {
            addEngineer();
        } else if (answer.role === "Intern") {
            addIntern();
        } else {
            writeFileAsync(outputPath, render(teamList), "utf-8");
            console.log("Team page generated!");
        }
    })
}

function addEngineer() {
    inquirer.prompt([
        {
            type: "input",
            message: "What is the engineer's name?",
            name: "name"
        },
        {
            type: "input",
            message: "What is the engineer's id?",
            name: "id"
        },
        {
            type: "input",
            message: "What is the engineer's email?",
            name: "email"
        },
        {
            type: "input",
            message: "What is the engineer's github?",
            name: "github"
        },
    ]).then(data => {
        const engineer = new Engineer(data.name, data.id, data.email, data.github);
        teamList.push(engineer);
        addEmployee();
    });
}

function addIntern() {
    inquirer.prompt([
        {
            type: "input",
            message: "What is the intern's name?",
            name: "name"
        },
        {
            type: "input",
            message: "What is the intern's id?",
            name: "id"
        },
        {
            type: "input",
            message: "What is the intern's email?",
            name: "email"
        },
        {
            type: "input",
            message: "Where does the intern attend school?",
            name: "school"
        },
    ]).then(data => {
        const intern = new Intern(data.name, data.id, data.email, data.school);
        teamList.push(intern);
        addEmployee();
    });
}

initApp();

