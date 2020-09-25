GET 1 required : url

GET is async but react runs sync, it does not paus/wait for data back therefore cannot store in const

GET returns a promise, chain off of the promise

set global configs in ```index.js``` like base url

use axios instances if different from base url in ```axios.js```