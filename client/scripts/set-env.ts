const { writeFile } = require('fs');
const { argv } = require('yargs');
const requiredVariables = require('../.env-requirements');
require('dotenv').config();

requiredVariables.forEach(variable => {
    if (!(variable in process.env) || !process.env[variable]) {
        console.error(`variable ${variable} must be defined in process.env!`);
        process.exit(-1);
    }
});

const environment = argv.environment;
const isProduction = environment === 'production' || environment === 'prod';
const targetPath = isProduction
    ? './src/environments/environment.prod.ts'
    : './src/environments/environment.ts';

const output = `
export const environment = {
    production: ${isProduction},
    ${requiredVariables
        .map(variable => variable + ': "' + process.env[variable] + '"')
        .join(',\r\n\t')}
};
`;

writeFile(
    targetPath,
    output,
    { flag: 'w' },
    (err: Error) => {
        if (err) {
            console.error(err);
            process.exit(-1);
        }
        console.log(`Wrote variables to ${targetPath}`);
    }
);
