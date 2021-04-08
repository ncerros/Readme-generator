const util = require('util');
const inquirer = require('inquirer');
const fs = require('fs');

// The function will write the file using promises
const writeFileAsync = util.promisify(fs.writeFile);

// The Array contains all the question the user to be promted 
const promptUser = () => {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'username',
            message: 'What is your GitHub username?',
        },
        {
            type: 'input',
            name: 'Email address',
            message: 'What is your GitHub email account?',
        },
        {
            type: 'input',
            name: 'project-title',
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
            message: 'Please choose the license of your project?',
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
            message: 'Is there any installation process?',
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


// create writeFile function using promises instead of a callback function


const generateReadMe = (answers) => {


    // Bonus using writeFileAsync as a promise
    const init = () => {
        promptUser()
            .then((answers) => writeFileAsync('ReadMe', generateReadMe(answers)))
            .then(() => console.log('Successfully wrote to ReadMe'))
            .catch((err) => console.error(err));
    };

    init();
};