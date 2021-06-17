const {Worker} = require("worker_threads");
const worker1 = new Worker("./worker1.js")
const worker2 = new Worker("./worker2.js")



var d = new Date();
var n = d.getMilliseconds();
worker1.once("message", result => {
    var d = new Date();
    var n2 = d.getMilliseconds();
    console.log("worker1 "+ (n2-n));
    console.log(result)
});
  worker2.once("message", result => {
    var d = new Date();
    var n2 = d.getMilliseconds();
    console.log("worker2 "+(n2-n));
    console.log(result)
});