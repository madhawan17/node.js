var x = 1;
a();
b();
console.log(x);

function a() {
  var x = 10;
  console.log(x);
}

function b() {
  var x = 100;
  console.log(x);
}

// 
var a;
console.log(a);

a = 10;
console.log(a);

a = "satyam";
console.log(a);

// closures

function x() {
  var a = 7;
  
  function y() {
    console.log(a);
  }
  
  return y;
}

var z = x();
console.log(z);
z();

// block scope
// First: What is a Block?

// A block is:

{
   // group of statements
}

Example:

{
   var a = 10;
   let b = 20;
   const c = 30;
}

// This {} is called a Block or Compound Statement.

// 🔥 Why Do We Need Blocks?

// Blocks allow us to:

// Group multiple statements

// Use if, for, while, etc.

// Create block-level scope (with let & const)