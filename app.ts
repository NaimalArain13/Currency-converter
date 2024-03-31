#! /usr/bin/env node

//01
import chalk from "chalk";
import inquirer from "inquirer";

//*************STEPS TO BUILD THE CURRENCY CONVERTER***********************

//Step 01 Import required packages
//Step 02 Generate API key from exchangerate-api.com
//Step 03 Fetch data from the API
//Step 04 Convert object.keys into array
//Step 05 Creating Questions using Inquirer
//Step 06 Conversion Rate
//Step 07 Fetching data for conversion rate
//Step 08 Converting rate into amount


//02
let apiLink = "https://v6.exchangerate-api.com/v6/9b2f0b58760d97970ab45a1e/latest/PKR"


//03
let fetchData = async (data:any) => { 
    let fetchData = await fetch(data);
    let response = await fetchData.json();
    return response.conversion_rates;
};

let data = await fetchData(apiLink);

//04
let countries  = Object.keys(data)


//05
let firstCountry = await inquirer.prompt([
    {
        type : "list",
        name : "name",
        message : "Converting From:",
        choices : countries,
    },
]);


let userMoney = await inquirer.prompt([
    {
        type: "number",
        name : "money",
        message : `Enter your amount in ${chalk.greenBright.bold(firstCountry.name)}`
    }
]);

let secondCountry = await inquirer.prompt([
    {
        type : "list",
        name : "name",
        message : "Converting To:",
        choices : countries,
    },
]);


//06
let conversionRate = 
`https://v6.exchangerate-api.com/v6/9b2f0b58760d97970ab45a1e/pair/${firstCountry.name}/${secondCountry.name}`


//07
let conversionData = async (data:any) => { 
    let cnvData = await fetch(data);
    let response = await cnvData.json();
    return response.conversion_rate;
};

let cnvRate = await conversionData(conversionRate)

//08
let convertedRate = await userMoney.money * cnvRate
let result =
`Your ${chalk.cyanBright.bold(firstCountry.name)} ${chalk.cyanBright.bold(userMoney.money)} in ${chalk.cyanBright.bold(secondCountry.name)} is ${chalk.cyanBright.bold(convertedRate)}`

console.log(result);

