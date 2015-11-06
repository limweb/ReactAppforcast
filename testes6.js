'use strict';

// Example 1: Creating a new class (declaration-form)
// ===============================================================

// A base class is defined using the new reserved 'class' keyword
class Polygon {
  // ..and an (optional) custom class constructor. If one is
  // not supplied, a default constructor is used instead:
  // constructor() { }
  constructor(height, width) {
    this.name = 'Polygon';
    this.height = height;
    this.width = width;
  }

  // Simple class instance methods using short-hand method
  // declaration
  setName() {
    this.name = 'new Name';
  }
  sayName() {
    console.log('Hi, I am a ', this.name + '.');
  }

  sayHistory() {
    console.log('"Polygon" is derived from the Greek polus (many) and gonia (angle).');
  }

  // We will look at static and subclassed methods shortly
}

// Classes are used just like ES5 constructor functions:
let p = new Polygon(300,400);
p.sayName();
p.setName();
p.sayName();
console.log('The width of this polygon is ' + p.width);

const MyPoly = class Poly {
  getPolyName() {
    console.log('Hi. I was created with a Class expression. My name is ' + Poly.name);
  }
};

let inst = new MyPoly();
inst.getPolyName();