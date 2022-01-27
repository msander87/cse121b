import * as maths from "./moduleExamples.js";

let area = maths.square(4);
document.querySelector("#output").innerHTML = area;


document.querySelector("#output2").innerHTML = maths.PI;

let numbers = [1,2,3,4];
let sum = maths.stats.sum(numbers);
document.querySelector("#output3").innerHTML = sum;



