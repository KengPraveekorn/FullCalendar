const request = require('request')


// ส่ง line
exports.notifyEvent = (msg) =>{
    request({
        uri:'',
        method: 'POST',
        auth:{
            bearer:''
        },
        form:{
            message: msg
        }
    })

}