"use strict";
// Debounce And Throttle Functions
function search(query) {
    console.log("search for " + query);
}
// Debouce - wait until user stops typing for T
// on every event happens timer gets reset here
function debounce(func, wait) {
    let timeout = null;
    return function (...args) {
        if (timeout)
            clearTimeout(timeout);
        timeout = setTimeout(() => {
            func(...args);
        }, wait * 1000);
    };
}
// Throttle - wait for T time and then execute it
function throttle(func, wait) {
    let interval = null;
    return function (...args) {
        if (!interval) {
            func(...args);
            interval = setTimeout(() => {
                interval = null;
            }, wait * 1000);
        }
    };
}
let input = '';
for (let i = 0; i < 10; i++) {
    input += `${i}`;
    debounce(() => search(input), 2);
}
