const {
    parentPort,
    workerData
} = require("worker_threads");
const puppeteer = require('puppeteer')
fib();
function fib() {

    let bhk_count = [0, 0, 0, 0, 1, 0];
    let place = "tamil nadu";
    var array = []
    var d = new Date();
    var n1 = d.getSeconds();


    for (let x = 0; x < bhk_count.length; x++) {
        if (bhk_count[x] == 1) {

            // magicbricks---------------------------------------------------
            (async () => {
                const browser = await puppeteer.launch({
                    headless: false,
                    args: ['--start-maximized']
                });
                const page = await browser.newPage();
                page.setViewport({
                    width: 0,
                    height: 0
                });

                const search_string = " " + place + " rent " + (x + 1) + "bhk magicbricks"

                console.log("-x-x-x-x- start -x-x-x-x-x-x-")
                await page.goto("https://www.google.com/search?q=" + search_string);
                console.log("x-x-x-x-x- next -x-x-x-x-x")
                await page.evaluate(() => {
                    document.querySelector('.DKV0Md').click()

                })
                // full page load wait
                await page.waitForNavigation();

                var page_prop = await page.evaluate(() => {

                    var numberofblocks = document.querySelectorAll(".m-srp-card").length;
                    var property_details = [];

                    for (let i = 0; i < numberofblocks; i++) {

                        //redirect_url....................................

                        if (document.querySelectorAll(".SRCard")[i] && document.querySelectorAll(".SRCard")[i].dataset.code) {
                            var redirect_url = document.querySelectorAll(".SRCard")[i].dataset.code;
                            var arr_urlx = redirect_url.split(',')
                            var arr_urly = arr_urlx[1].split("'")
                            redirect_url = arr_urly[1];
                        } else {
                            var redirect_url = "does not exist"
                        }

                        // bhk..................................
                        var bhk = document.querySelectorAll(".m-srp-card__title__bhk")[i].innerText;
                        var arr_bhk = bhk.split("");
                        var arr1_bhk = arr_bhk[0];
                        bhk = arr1_bhk;
                        bhk = Number(bhk);
                        //location........................   
                        var location_prop = document.querySelectorAll(".m-srp-card__title")[i].innerText;
                        //price..............................
                        var c = document.querySelectorAll(".m-srp-card__info")[i].children[1].firstChild.data;
                        var price = [];
                        if (c.length > 10) {
                            var res = c.split("           ");
                            var str1 = res[5].split("");
                            var arr = [];
                            for (var j = 0; j < str1.length; j++) {
                                if (str1[j] !== "\t" && str1[j] !== " " && str1[j] !== "\n") {
                                    arr.push(str1[j]);
                                }
                            }
                            var lack_check = arr[(arr.length) - 3] + arr[(arr.length) - 2] + arr[(arr.length) - 1]

                            if (lack_check === "Lac") {
                                for (var j = 0; j < ((arr.length) - 3); j++) {
                                    price.push(arr[j]);
                                }
                                price = (Number(price.join('')) * 100000);
                            } else {
                                for (var j = 0; j < arr.length; j++) {
                                    if (arr[j] !== ",") {
                                        price.push(arr[j]);
                                    }
                                }
                                price = Number(price.join(''));
                            }
                        } else {
                            price = "Call for price";
                        }
                        //size................................
                        var size = document.querySelectorAll(".m-srp-card__title")[i].innerText;

                        if (Number(size.split(" ")[(size.split(" ").length) - 2]) % 1 == 0) {
                            size = (size.split(" ")[(size.split(" ").length) - 2] + size.split(" ")[(size.split(" ").length) - 1]);

                        } else {
                            size = "unknown"
                        }

                        var object_property = {

                            "redirect_url": redirect_url,
                            "bhk": bhk,
                            "location": location_prop,
                            "price": price,
                            "size": size
                        };

                        //picture.....................................
                        if (document.querySelectorAll(".m-photo__fig")[i].firstElementChild && document.querySelectorAll(".m-photo__fig")[i].firstElementChild.dataset.src) {
                            object_property.picture = document.querySelectorAll(".m-photo__fig")[i].firstElementChild.dataset.src;
                        }

                        property_details.push(object_property);
                    }

                    return property_details;

                })
               //  console.log(page_prop)
                
              if(page_prop.length!=0)  array = page_prop
              //console.log(array)  
              var d = new Date();
                var n2 = d.getSeconds();
                if ((n2 - n1) < 0) {
                    console.log(page_prop.length + " properties -- " + (60 + (n2 - n1)) + " seconds taken to load " + (x + 1) + "bhk data from magicbricks in " + place);
                } else {
                    console.log(page_prop.length + " properties -- " + ((n2 - n1)) + " seconds taken to load " + (x + 1) + "bhk data from magicbricks in " + place);
                }
                if(array.length!=0) {
                    
                    parentPort.postMessage(array)
                }

                await browser.close();

            })();


        }

    }
   
  



}