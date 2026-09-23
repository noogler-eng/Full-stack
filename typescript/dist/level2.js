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
// false, 0.1 + 0.2 is actually 0.30000000000000004 due to 
// floating-point precision issues in JavaScript.
console.log(0.1 + 0.2 === 0.3);
// Object are reference types in JavaScript, so two different 
// objects are not equal even if they have the same properties 
// and values.
console.log(typeof null);
// The type of NaN (Not a Number) is "number".
console.log(typeof (0 / 0));
// start -> A -> C -> B -> D -> E -> end -> F
console.log("start");
function foo1() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('A');
        yield foo2();
        console.log('B');
    });
}
function foo2() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('C');
    });
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
