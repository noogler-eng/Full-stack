"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// Debounce And Throttle Functions
function search(query) {
    console.log("search for " + query);
}
// Inbuilt sleep function to wait for T time
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
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
const deb = debounce((args) => search(args), 1);
const thr = throttle((args) => search(args), 1);
function debth() {
    return __awaiter(this, void 0, void 0, function* () {
        deb('s');
        deb('sh');
        deb('sha');
        yield sleep(2000);
        deb('shar');
        deb('shara');
        deb('sharad');
        thr('s');
        yield sleep(500);
        thr('sh');
        yield sleep(500);
        thr('sha');
        yield sleep(500);
        thr('shar');
        yield sleep(500);
        thr('shara');
        yield sleep(500);
        thr('sharad');
        yield sleep(500);
    });
}
debth();
