import { compose } from "redux";

function removeSpaces(string) {

    return string.split(" ").join('');
}

function repeatString(string) {

    return string + string;      // we can also use string.repeat(2)
}

function convertToUpper(string) {

    return string.toUpperCase();
}


//! Now we want to use these function on a string and do all operation step by step
//! Like -> removeSpaces > repeatString > convertToUpper  , and want final output

const input = 'abc def   ghi'; 

//* 1st method (without using redux compose method)
const output = convertToUpper( repeatString( removeSpaces(input)));
// console.log(output);


//* 2nd method (with redux compose  method)
    //! compose funtion takes functions as in arguement and compose all function in a single funtion, now we can use this signle func. instead of all function one by one 
const composedFunction = compose(removeSpaces, repeatString, convertToUpper );  

console.log(composedFunction(input));
