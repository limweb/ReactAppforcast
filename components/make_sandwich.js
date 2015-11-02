'use strict';
var Fridge = require('./fridge')
  , inherits = require('inherits')

function extenes5 () {
 return {
        bread: function bread() {
  			return 'bread: 3';
        },
   	    test: function(){
		  	return 'new inherits test';
		}
    };
}
inherits(extenes5, Fridge)
var y = new extenes5();
console.log(y.test());
console.log(y.bread());


class X {
		test() {
			return 'new X';
		}
		check(){
			return 'check';
		}
	}

class Y extends X {
	//ต้องการ overrid function test
	test1() {
		return 'new test';
	}
	newtest(){
		return 'new new';
	}
}


let b = new Y();
console.log(X);
console.log(b);
console.log( b.newtest());
console.log( b.test());
console.log( b.check());
