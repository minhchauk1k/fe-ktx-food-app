import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
// import * as crypto from 'crypto';

@Injectable({
    providedIn: 'root'
})
export class MomoService {
    partnerCode = "MOMO";
    accessKey = "F8BBA842ECF85";
    secretkey = "K951B6PE1waDMi640xX08PD3vg6EkVlz";
    redirectUrl = "http://localhost:4200/checkout";
    ipnUrl = "http://localhost:4200/checkout";
    requestType = "captureWallet";
    extraData = "";

    constructor(
        private http: HttpClient
    ) { }

    public test(param: any): Observable<any> {
        const requestId = this.partnerCode + new Date().getTime();
        const orderId = requestId;
        const orderInfo = "Thanh toán với Momo";
        const amount = 1000;
        const rawSignature = "accessKey=" + this.accessKey + "&amount=" + amount + "&extraData=" + this.extraData + "&ipnUrl=" + this.ipnUrl + "&orderId=" + orderId + "&orderInfo=" + orderInfo + "&partnerCode=" + this.partnerCode + "&redirectUrl=" + this.redirectUrl + "&requestId=" + requestId + "&requestType=" + this.requestType;
        // const crypto = require('crypto');
        // const signature = crypto.createHmac('sha256', this.secretkey)
        //     .update(rawSignature)
        //     .digest('hex');
        const signature = '996ed81d68a1b05c99516835e404b2d0146d9b12fbcecbf80c7e51df51cac85e';

        const requestBody = JSON.stringify({
            partnerCode: this.partnerCode,
            accessKey: this.accessKey,
            requestId: requestId,
            amount: amount,
            orderId: orderId,
            orderInfo: orderInfo,
            redirectUrl: this.redirectUrl,
            ipnUrl: this.ipnUrl,
            extraData: this.extraData,
            requestType: this.requestType,
            signature: signature,
            lang: 'vi'
        });

        // const options = {
        //     // hostname: 'payment.momo.vn',
        //     hostname: 'test-payment.momo.vn',
        //     port: 443,
        //     path: '/v2/gateway/api/create',
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     }
        // }

        const options = {
            // hostname: 'payment.momo.vn',
            headers: new HttpHeaders().set('Content-Type', 'application/json')
        }

        return this.http.post<any>('https://test-payment.momo.vn/v2/gateway/api/create', requestBody, options);
    }

}