const {Worker} = require("worker_threads");
const worker1 = new Worker("./worker1.js")
const worker2 = new Worker("./worker2.js")



var d = new Date();
worker1.once("message", result => {
    var d1 = new Date();
    console.log("worker1 : "+ ((d1-d)/1000)+"s");
    console.log(result)
});

  worker2.once("message", result => {
    var d1 = new Date();
    console.log("worker2 "+((d1-d)/1000)+"s");
    console.log(result)
});