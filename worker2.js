const {parentPort, workerData} = require("worker_threads");

parentPort.postMessage(fib(1000000))
function fib(n)
{
    var array = [];
    for(let i = 0;i<n;++i) array.push(i)
    return array;
}
