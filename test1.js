'use strict';
let countries = [];

let c = (ar)=>(ar.map((c)=>c.name));

console.log(c(countries));

countries = [{name:'Thai'},{name:'China' }];

console.log(c(countries));
