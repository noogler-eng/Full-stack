// false, 0.1 + 0.2 is actually 0.30000000000000004 due to 
// floating-point precision issues in JavaScript.
console.log(0.1 + 0.2 === 0.3);

// Object are reference types in JavaScript, so two different 
// objects are not equal even if they have the same properties 
// and values.
console.log(typeof null);

// The type of NaN (Not a Number) is "number".
console.log(typeof (0/0));

// start -> A -> C -> E -> G -> end -> B -> F -> D
// why D at last ? 
// because setTimeout is a macro task, it will be 
// executed after all the micro tasks are completed.
console.log("start");
async function foo1(){
    console.log('A');
    await foo2();
    console.log('B');
}

async function foo2(){
    console.log('C');
}

setTimeout(() => {
    console.log('D');
}, 0);

foo1();

new Promise((resolve) => {
    console.log('E');
    resolve("G");
}).then(() => {
    console.log('F');
});

console.log('end');