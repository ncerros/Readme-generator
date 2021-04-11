const inquirer = require('inquirer');
const fs = require('fs');
const util = require('util');
const { title } = require('process');

// The function will write the file using promises
const writeFileAsync = util.promisify(fs.writeFile);

// The Array contains all the question the user to be promted 
function promptUser() {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'username',
            message: 'What is your GitHub username?',
        },
        {
            type: 'input',
            name: 'email',
            message: 'What is your GitHub email address?',
        },
        {
            type: 'input',
            name: 'title',
            message: 'What is the title of your project?',
        },
        {
            type: 'input',
            name: 'description',
            message: 'Please write a description of your project?',
        },
        {
            type: 'input',
            name: 'usage',
            message: 'what are the instructions for the user about using the repo?',
        },
        {
            type: 'list',
            name: 'license',
            message: 'Please choose the license for your project?',
            choices: [
                "Apache",
                "MIT",
                "Open",
                "GNU",
                "Academic",
                "ISC",
                "Mozilla"

            ]
        },

        {
            type: 'input',
            name: 'installation',
            message: 'what command is necessary to install dependencies?',
        },
        {
            type: 'input',
            name: 'test',
            message: 'what command is necesary to run the tests?',
        },
        {
            type: 'input',
            name: 'contributions',
            message: 'How can the user contribute to the repo?',
        },
    ]);
};

function generateMarkdown(response) {
    return `# ${response.title}
  
  # Table of Content
  
  1. [Description](#description)
  2. [Installation](#installation)
  3. [Usage](#usage)
  4. [Test](#test)
  5. [Contribution](#contribution)
  6. [license](#license)
  7. [Questions](#questions)
  
  ##Description:
  
     ${response.description}

  ## Installation:
    ${response.installation}

  ## Usage:
    ${response.usage}
  
  ## Test:
    ${response.test}
  
  ## Contribution:
    ${response.contribution}

  ## License:
  ![License](https://img.shields.io/badge/License-MIT-green.svg "license Badge")
    ${response.license}
    
  ## Questions:
     If you have any question, please you can contact me at ${response.email}
     or through my [GitHub profile](http://github.com/${response.username})`;

}

// This function will start the process
async function init() {
    try {
        const response = await promptUser();
        const readMeText = generateMarkdown(response);
        await writeFileAsync("README.md", readMeText);
        console.log('Generating README');
    }
    catch (err) {
        console.log(err);
    }
}

init();

