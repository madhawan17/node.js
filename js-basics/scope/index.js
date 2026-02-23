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