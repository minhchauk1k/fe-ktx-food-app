
//parameters
var partnerCode = "MOMOAALK20220518";
var accessKey = "TGWTJShO0mPx6usU";
var secretkey = "INN28GZCXV6RpTgqz3TyDnea6fDAQF7A";
var requestId = partnerCode + new Date().getTime();
var orderId = requestId;
var orderInfo = "Thanh toán với MoMo";
var redirectUrl = "http://localhost:4200/checkout";
var ipnUrl = "http://localhost:4200/checkout";
var amount = 1000;
var requestType = "captureWallet"
var extraData = "";

//before sign HMAC SHA256 with format
var rawSignature = "accessKey=" + accessKey + "&amount=" + amount + "&extraData=" + extraData + "&ipnUrl=" + ipnUrl + "&orderId=" + orderId + "&orderInfo=" + orderInfo + "&partnerCode=" + partnerCode + "&redirectUrl=" + redirectUrl + "&requestId=" + requestId + "&requestType=" + requestType;
console.log("--------------------RAW SIGNATURE----------------")
console.log(rawSignature)
//signature
const crypto = require('crypto');
var signature = crypto.createHmac('sha256', secretkey)
    .update(rawSignature)
    .digest('hex');
console.log("--------------------SIGNATURE----------------")
console.log(signature)

//json object send to MoMo endpoint
const requestBody = JSON.stringify({
    partnerCode: partnerCode,
    accessKey: accessKey,
    requestId: requestId,
    amount: amount,
    orderId: orderId,
    orderInfo: orderInfo,
    redirectUrl: redirectUrl,
    ipnUrl: ipnUrl,
    extraData: extraData,
    requestType: requestType,
    signature: signature,
    lang: 'vi'
});
//Create the HTTPS objects
const https = require('https');
const options = {
    hostname: 'payment.momo.vn',
    port: 443,
    path: '/v2/gateway/api/create',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(requestBody)
    }
}
//Send the request and get the response
const req = https.request(options, res => {
    console.log(`Status: ${res.statusCode}`);
    res.setEncoding('utf8');
    res.on('data', (body) => {
        // console.log('Body: ', JSON.parse(body).message);
        console.log('payUrl: ', JSON.parse(body).payUrl);
    });
    res.on('end', () => {
        console.log('No more data in response.');
    });
})

req.on('error', (e) => {
    console.log(`problem with request: ${e.message}`);
});
// write data to request body
console.log("Sending....")
req.write(requestBody);
req.end();