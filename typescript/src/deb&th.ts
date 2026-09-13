// Debounce And Throttle Functions
function search(query: string){
    console.log("search for " + query);
}

// Inbuilt sleep function to wait for T time
function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Debouce - wait until user stops typing for T
// on every event happens timer gets reset here
function debounce(func: Function, wait: number) {
    let timeout: any = null;
    
    return function(...args: any[]) {
        if(timeout) clearTimeout(timeout);
        timeout = setTimeout(() => {
            func(...args);
        }, wait * 1000);
    }
}


// Throttle - wait for T time and then execute it
function throttle(func: Function, wait: number) {
    let interval: any = null;
    return function(...args: any[]) {
        if(!interval) {
            func(...args);
            interval = setTimeout(() => {
                interval = null;
            }, wait * 1000);
        }
    }
}

const deb = debounce((args: string) => search(args), 1);
const thr = throttle((args: string) => search(args), 1);

async function debth(){
    deb('s');
    deb('sh');
    deb('sha');

    await sleep(2000)

    deb('shar');
    deb('shara');
    deb('sharad');

    thr('s');
    await sleep(500);
    thr('sh');
    await sleep(500);
    thr('sha');
    await sleep(500);
    thr('shar');
    await sleep(500);
    thr('shara');
    await sleep(500);
    thr('sharad');

    await sleep(500);
}

debth();