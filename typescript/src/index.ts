function one(){
    console.log('one');
    two();
    console.log('three');
}

function two(){
    console.log('two');
}


// c, b, a, global in the stack from left to right, a is 
// the last function called and c is the first function 
// called, stack is based on LIFO
function a(){
    console.log('a');
    b();
}

function b(){
    console.log('b');
    c();
}

function c(){
    console.log('c');
}


// stack overflow, memory leak
function count() {
    console.log("count");
    count();
}

// javascript is single threaded, so the stack is based on LIFO,
// stack - event loop - queue, when stack is empty, queue process
// events into stack, so the stack is always empty when the queue 
// is processed

// Promise - Reject, Resolve, Pending
// Resolve - when the promise is resolved, the then() function is called
// Reject - when the promise is rejected, the catch() function is called
// Pending - when the promise is pending, the finally() function is called
const sleep_ = (time: number) => {
    return new Promise((resolve, reject) => setTimeout(resolve, time));
}

function main(){
    console.log('start');
    one();
    console.log('end');

    a();
    count();

    sleep_(1000).then(() => {
        console.log('sleep done');
    }).catch((err) => {
        console.log('sleep error', err);
    })
}

main();