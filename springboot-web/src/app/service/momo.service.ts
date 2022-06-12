import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import jsSHA from "jssha";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})
export class MomoService {
    private localServerURL = 'http://localhost:4200';
    private partnerCode = "MOMO";
    private accessKey = "F8BBA842ECF85";
    private secretkey = "K951B6PE1waDMi640xX08PD3vg6EkVlz";
    private redirectUrl = `${this.localServerURL}/checkout`;
    private ipnUrl = this.redirectUrl;
    private requestType = "captureWallet";
    private extraData = "";

    constructor(
        private http: HttpClient
    ) { }

    private createFixCors() {
        let _headers = new HttpHeaders();
        _headers = new HttpHeaders().set('Content-Type', 'application/json');
        _headers = _headers.set('Access-Control-Allow-Origin', '*');
        _headers = _headers.set('Access-Control-Allow-Credentials', 'true');
        _headers = _headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
        _headers = _headers.set('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept, X-Custom-Header, Upgrade-Insecure-Requests');

        const options = {
            headers: _headers
        }

        return options;
    }

    private createSignature(secretkey: string, rawSignature: string) {
        const shaObj = new jsSHA("SHA-256", "TEXT", {
            hmacKey: { value: secretkey, format: "TEXT" },
        });
        shaObj.update(rawSignature);
        return shaObj.getHash("HEX");
    }

    public verifyIPNSignatureTest(data: any) {
        const rawSignature = "accessKey=" + this.accessKey + "&amount=" + data.amount + "&extraData=" + data.extraData + "&message=" + data.message + "&orderId=" + data.orderId + "&orderInfo=" + data.orderInfo + "&orderType=" + data.orderType + "&partnerCode=" + data.partnerCode + "&payType=" + data.payType + "&requestId=" + data.requestId + "&responseTime=" + data.responseTime + "&resultCode=" + data.resultCode + "&transId=" + data.transId;
        const signature = this.createSignature(this.secretkey, rawSignature);
        return signature == data.signature ? true : false;
    }

    public verifyIPNSignature(data: any) {
        const accessKey = "TGWTJShO0mPx6usU";
        const secretkey = "INN28GZCXV6RpTgqz3TyDnea6fDAQF7A";
        const rawSignature = "accessKey=" + accessKey + "&amount=" + data.amount + "&extraData=" + data.extraData + "&message=" + data.message + "&orderId=" + data.orderId + "&orderInfo=" + data.orderInfo + "&orderType=" + data.orderType + "&partnerCode=" + data.partnerCode + "&payType=" + data.payType + "&requestId=" + data.requestId + "&responseTime=" + data.responseTime + "&resultCode=" + data.resultCode + "&transId=" + data.transId;
        const signature = this.createSignature(secretkey, rawSignature);
        return signature == data.signature ? true : false;
    }

    public momoPaymentTest(totalAmount: any): Observable<any> {
        const requestId = this.partnerCode + new Date().getTime();
        const orderId = requestId;
        const orderInfo = "Thanh toán với Momo";
        const amount = totalAmount;
        const rawSignature = "accessKey=" + this.accessKey + "&amount=" + amount + "&extraData=" + this.extraData + "&ipnUrl=" + this.ipnUrl + "&orderId=" + orderId + "&orderInfo=" + orderInfo + "&partnerCode=" + this.partnerCode + "&redirectUrl=" + this.redirectUrl + "&requestId=" + requestId + "&requestType=" + this.requestType;

        const signature = this.createSignature(this.secretkey, rawSignature);

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

        return this.http.post<any>(`/api/test/momo`, requestBody, this.createFixCors());
    }

    public momoPayment(param: any): Observable<any> {
        // mã doanh nghiệp thật sự
        const partnerCode = "MOMOAALK20220518";
        const accessKey = "TGWTJShO0mPx6usU";
        const secretkey = "INN28GZCXV6RpTgqz3TyDnea6fDAQF7A";

        // phần sinh ra theo order
        const requestId = new Date().getTime();
        const orderId: any = requestId;
        const orderInfo = "Thanh toán với Momo";
        // set 1 ngàn cho đỡ tốn tiền :v
        const amount = 1000;
        const rawSignature = "accessKey=" + accessKey + "&amount=" + amount + "&extraData=" + this.extraData + "&ipnUrl=" + this.ipnUrl + "&orderId=" + orderId + "&orderInfo=" + orderInfo + "&partnerCode=" + partnerCode + "&redirectUrl=" + this.redirectUrl + "&requestId=" + requestId + "&requestType=" + this.requestType;

        const signature = this.createSignature(secretkey, rawSignature);

        const requestBody = JSON.stringify({
            partnerCode: partnerCode,
            accessKey: accessKey,
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

        return this.http.post<any>(`/api/momo`, requestBody, this.createFixCors());
    }

}