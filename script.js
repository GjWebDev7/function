'use strict';

// Default Parameters
// If a function is called with missing arguments, the missing values are set to undefined. Sometimes this is acceptable, but sometimes it is better to assign a default value to the parameter:
const bookings = [];
const createBooking = function (
  flightNum,
  numPassangers = 2,
  price = 100 * numPassangers
) {
  const booking = {
    flightNum,
    numPassangers,
    price,
  };
  console.log(booking);
  bookings.push(booking);
};
createBooking('LH123');
createBooking('A320', undefined, 500);
console.log(bookings);

// Pass By Value And Pass By Reference
const flight = 'LH234';

const gaurav = {
  name: 'Gaurav jaiswal',
  passport: 123456789,
};

const checkIn = function (flightNum, passenger) {
  flightNum = 'LH999';
  passenger.name = 'Mr. ' + passenger.name;
  if (passenger.passport === 123456789) {
    console.log('checked in');
  } else {
    console.log('wrong passport');
  }
};
checkIn(flight, gaurav);
console.log(flight);
// Pass by Value
// When a variable holding a primitive value is passed to a function, the value is passed by value. This means a copy of the value is made, and changes to the parameter within the function do not affect the original variable.
console.log(gaurav);
// Pass by Reference
// When a variable holding a non-primitive value (an object, array, or function) is passed to a function, it is passed by reference. This means the reference to the actual object in memory is passed, and changes to the object within the function do affect the original object.

// First-Class Functions
// In JavaScript, functions are first-class citizens. This means that functions are treated like any other value. You can assign them to variables:
const sayHello = function () {
  console.log('Hello!');
};
sayHello(); // Output: Hello!

// Higher-Order Functions
// A higher-order function is a function that does at least one of the following:
// 1. Takes one or more functions as arguments.
// 2. Returns a function as its result.

// Function accepting callback function
const greet = () => console.log('Hello Gaurav');
document.addEventListener('click', greet);
// In this case, document.addEventListener is the higher-order function because it takes greet (a function) as an argument and greet is the callback function because it is passed as an argument to document.addEventListener and will be executed when the 'click' event occurs.

// Function returning function
const greeting = function (greet) {
  return function (name) {
    console.log(`${greet} ${name}`);
  };
};
greeting('Hello')('Gaurav');

// Challange
const greetArr = greet => name => `${greet} ${name}`;
console.log(greetArr('Hey')('Shiva'));

// The call,apply and bind Methods
const lufthansa = {
  airline: 'Lufthansa',
  iataCode: 'LH',
  bookings: [],
  book(flightNum, name) {
    console.log(
      `${name} booked a seat on ${this.airline} flight ${this.iataCode}${flightNum}`
    );
    this.bookings.push({ flight: `${this.iataCode}${flightNum}`, name });
  },
};

lufthansa.book(239, 'Gaurav');

const eurowings = {
  airline: 'Eurowings',
  iataCode: 'EW',
  bookings: [],
};

const book = lufthansa.book;

// call is a method that you use to change the value of this inside a function and execute it with the arguments provided.
book.call(eurowings, 23, 'Aman');

const swiss = {
  airline: 'Swiss Air Lines',
  iataCode: 'LX',
  bookings: [],
};

book.call(swiss, 583, 'Shiva');

// apply method - It is similar to the call method. The only difference is, it takes argument as an array.
const flightData = [583, 'Piyush'];
book.apply(swiss, flightData);
// book.call(swiss, ...flightData);

// bind method - with bind method, an object can borrow a method from another object.
const bookLH = book.bind(lufthansa);
const bookEW = book.bind(eurowings);
const bookLX = book.bind(swiss);

bookLH(999, 'Andrew');
bookEW(777, 'Amisha');
bookLX(111, 'Tristan');

// IIFE - It only executed once.
// It disappear right after it's called once.
(function () {
  console.log('Hello Gj');
})();

// Lexical Scope - people often confuse closures with lexical scope. Lexical scope is an important part of closures, but it is not a closure by itself. Lexical scope describes how nested (also known as "child") functions have access to variables defined in parent scopes.
// // Nested Function
function greetN(name) {
  function displayName() {
    console.log(`Hello ${name}`);
  }
  displayName();
}
greetN('Gaurav');

// Closures - A closure is a function having access to the parent scope, even after the parent function has closed.
// *In JavaScript, a closure is created when a function is defined within another function, not when a function is executed.*
// a function having access to the parent scope, that's describing lexical scope! but we need the second part of the definition to give an example of a closure i.e. even after the parent function has closed.

function outerFunction() {
  let outerVariable = 'I am from the outer function';

  function innerFunction() {
    console.log(outerVariable);
  }
  return innerFunction; // outerFunction returns innerFunction but doesn't execute it.
}

const myClosure = outerFunction(); // outerFunction is called and the returned innerFunction is assigned to myClosure.
myClosure(); // myClosure is then called, executing innerFunction, which prints the value of outerVariable, even though outerVariable is not directly accessible from outside outerFunction.

// Data Privacy: Closures can be used to create private variables that are not accessible from outside the function scope.
function counter() {
  let count = 0;
  return {
    increment() {
      count++;
      return count;
    },
    decrement() {
      count--;
      return count;
    },
  };
}

// In this example, count is private to the counter function. It can only be modified by the increment and decrement methods.

const myCounter = counter();
console.log(myCounter.increment()); // 1
console.log(myCounter.increment()); // 2
console.log(myCounter.decrement()); // 1
console.log(myCounter.decrement()); // 0
