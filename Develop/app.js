const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```

const employees = [];

// Create Manager
function startCreatingTeam() {
    inquirer.prompt([
        {
            type: "input",
            message: "What is your Manager's name?",
            name: "name"
        },
        {
            type: "input",
            message: "What is your Manager's ID?",
            name: "id"
        },
        {
            type: "input",
            message: "What is your Manager's email?",
            name: "email"
        },
        {
            type: "input",
            message: "What is your Manager's office number?",
            name: "office"
        }
    ]).then(function (managerAnswers) {
        const manager = new Manager(managerAnswers.name, managerAnswers.id, managerAnswers.email, managerAnswers.office)
        employees.push(manager);

        selectTeamMember();
    });
}

// Select Next Team Member or Exit
function selectTeamMember() {
    inquirer.prompt([
        {
            type: "list",
            message: "Which type of team member would you like to add?",
            name: "typeOfEmployee",
            choices: ["Engineer", "Intern", "I'm finished adding members to the team.",]
        }
    ]).then(function (teamMember) {
        if(teamMember.typeOfEmployee === "Engineer"){
            createEngineer();
        }
        else if(teamMember.typeOfEmployee === "Intern"){
            createIntern();
        }
        else if(teamMember.typeOfEmployee === "I'm finished adding members to the team."){

            const html = render(employees);

            fs.writeFile(outputPath, html, function(err) {

                if (err) {
                  return console.log(err);
                }
              
                console.log("Success!");
              
              });
        }
    });
}

// Select Engineer
function createEngineer() {
    inquirer.prompt([
        {
            type: "input",
            message: "What is your Engineer's name?",
            name: "name"
        },
        {
            type: "input",
            message: "What is your Engineer's ID?",
            name: "id"
        },
        {
            type: "input",
            message: "What is your Engineer's email?",
            name: "email"
        },
        {
            type: "input",
            message: "What is your Engineer's github username?",
            name: "github"
        }
    ]).then(function (engineerAnswers) {
        const engineer = new Engineer(engineerAnswers.name, engineerAnswers.id, engineerAnswers.email, engineerAnswers.github)
        employees.push(engineer);

        selectTeamMember();
    });
}

// Select Intern
function createIntern() {
    inquirer.prompt([
        {
            type: "input",
            message: "What is your Intern's name?",
            name: "name"
        },
        {
            type: "input",
            message: "What is your Intern's ID?",
            name: "id"
        },
        {
            type: "input",
            message: "What is your Intern's email?",
            name: "email"
        },
        {
            type: "input",
            message: "What is your Intern's school?",
            name: "school"
        }
    ]).then(function (internAnswers) {
        const intern = new Intern(internAnswers.name, internAnswers.id, internAnswers.email, internAnswers.school)
        employees.push(intern);

        selectTeamMember();
    });
}

startCreatingTeam();