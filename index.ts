#! /usr/bin/env node 

import inquirer from "inquirer";
import chalk from "chalk";

// Bank Account Interface
interface BankAccount{
    accountNumber : number;
     balance : number;
     withdraw(amount: number):void
     deposit(amount: number):void
     checkBalance():void
}
// Bank Account Class
class BankAccount implements BankAccount{
    accountNumber: number;
    balance: number;

    constructor(accountNumber: number, balance: number){
        this.accountNumber = accountNumber
        this.balance = balance
    }
    // Debit Money
    withdraw(amount: number): void {
        if(this.balance >= amount){
            this.balance -= amount;
            console.log(`With drawal of $${amount} successful. Remaining balance: $${this.balance} `);
        }
        else {
            console.log(chalk.cyanBright.bold("Insufficient Balance"));
        }
    }
    // Credit Money
    deposit(amount: number): void {
        if(amount > 100){
            amount -= 1; // $1 fee charged if more than $100 is deposited
        }this.balance += amount;
        console.log(`Deposit of $${amount} successful. Remaining Balance: $${this.balance}`);
    }
    // Check Balance
    checkBalance(): void {
        console.log(`Current Balance: $${this.balance}`);
    }

}
 // Customer Class
 class Customer{
    firstName: string;
    LastName: string;
    gender: string;
    age: number;
    mobileNumber: number;
    account: BankAccount;

    constructor(firstName: string,LastName: string,gender: string,age: number,mobileNumber: number, account: BankAccount)
    {
        this.firstName = firstName;
        this.LastName = LastName;
        this.gender = gender;
        this.age = age;
        this.mobileNumber = mobileNumber;
        this.account = account
    }
    
 }
 
 // Create Bank Accounts

 const accounts: BankAccount[] = [
    new BankAccount (1001,5000),
    new BankAccount (1002,2500),
    new BankAccount (1003,4000)
];

// Create Customers
const customers: Customer[] = [
    new Customer ("Muhammad","Sami","Male",18,3221233569, accounts[0]),
    new Customer ("Abdul","Hadi","Male",23,3457896095, accounts[1]),
    new Customer ("Ayesha","Khan","Female",30,3313029986, accounts[2]),
]

console.log(chalk.greenBright.bold("\t <===========================================>"));
console.log(chalk.redBright.bold("\t\t <========================>"));
console.log(chalk.cyanBright.bold("\t <====> Welcome to Sami Bank Service <====>"));
console.log(chalk.redBright.bold("\t\t <========================>"));
console.log(chalk.greenBright.bold("\t <===========================================> \n"));


// Function to interact with Bank Account

async function service() {
    do {
        const accountNumberInput = await inquirer.prompt([
            {
                name:"accountNumber",
                type:"number",
                message:"Enter your Account Number:"
            }
        ])

        const customer = customers.find(customer => customer.account.accountNumber === accountNumberInput.accountNumber)
        if(customer){
            console.log(chalk.greenBright(` \t Welcome, ${customer.firstName} ${customer.LastName}  \n`));
            const ans = await inquirer.prompt([{
                name:"select",
                type:"list",
                message:"Select an Operation:",
                choices:["Deposit","Withdraw","Check Balance","Exit"]
            }]);

           switch(ans.select){
            case "Deposit":
                const depositAmount = await inquirer.prompt([{
                    name:"amount",
                    type:"number",
                    message:"Enter the amount to deposit:"
                }])
                customer.account.deposit(depositAmount.amount);
                break;
            case "Withdraw":
                const withdrawAmount = await inquirer.prompt([{
                    name:"amount",
                    type:"number",
                    message:"Enter the amount to withdraw:"
                }])
                customer.account.withdraw(withdrawAmount.amount);
                break;
            case "Check Balance":
                customer.account.checkBalance();
                break;
            case "Exit":
                console.log(chalk.red.bold("\n Exiting the Bank program..."));
                console.log(chalk.red.bold("\n \t Thank you for using our Bank services. Have a Nice Day !"));
                console.log(chalk.greenBright.bold("\t <=======================================================>"));
                return;            
           }
        }
        else{
            console.log(chalk.blue.bold("Invalid Account Number. Please try again."));
            
        }
        
    } while (true);
    
}



service()