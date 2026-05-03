import { Injectable, Injector } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders, HttpResponse, HttpErrorResponse } from "@angular/common/http";
import { Observable } from "rxjs";
import { AppDefaultValue } from "app/models/site-map.model";
import { environment } from "environments/environment";
import * as CryptoJS from 'crypto-js';
import { AuthenticationService } from "app/services/authentication.service";
import { SpinnerService } from "app/services/spinner.service";
import { tap } from "rxjs/internal/operators/tap";


@Injectable({
    providedIn: 'root'
})
export class JwtInterceptor implements HttpInterceptor {

    auth: any;

    constructor(
        private inj: Injector,
        private spinnerService: SpinnerService
    ) {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with jwt token if available

        if (request.url.toLocaleLowerCase().startsWith(environment.apiurl.toLocaleLowerCase())) {

            let token = localStorage.getItem(AppDefaultValue.tokenPath);
            if (token) {
                this.auth = this.inj.get(AuthenticationService);

                if (this.auth) {
                    let currentUser = this.auth.currentUserSubject.getValue();
                    if (currentUser && currentUser.GenerateOn) {
                        if (((new Date().getTime() - currentUser.GenerateOn.getTime()) / (1000 * 60)) > 150) {
                            currentUser.GenerateOn = new Date();
                            this.auth.refreshToken();
                        }
                    }
                }
                request = this.updateRequest(request, token);
            } else {
                request = this.updateRequest(request);
            }
        }
        let value = this.spinnerService.isLoading.getValue();
        this.spinnerService.isLoading.next(++value);
        return this.handler(next, request);
    }

    handler(next, request) {
        return next.handle(request).
            pipe(
                tap((event) => {
                  
                },
                    (error: HttpErrorResponse) => {
                       
                        let value = this.spinnerService.isLoading.getValue();
                        if(value>0)
                        {
                            this.spinnerService.isLoading.next(--value);
                        }
                        throw error;
                    },
                    ()=>{
                        let value = this.spinnerService.isLoading.getValue();
                        if(value>0)
                        {
                            this.spinnerService.isLoading.next(--value);
                        }
                    })
            )
    }

    updateRequest(request: HttpRequest<any>, token?) {

        let payloadEncrypted = "";
        let queryParam = "";
        let queryParamEncrypted = "";

        let indexOf = request.urlWithParams.indexOf('?');

        if (indexOf > 0) {
            queryParam = request.urlWithParams.substring(indexOf + 1, 2900);
            if (queryParam && queryParam.length > 0) {
                queryParamEncrypted = this.encrypt(queryParam);
            }
        }

        if (request.body) {
            let requestBody = JSON.stringify(request.body);
            if (requestBody.length > 100) {
                requestBody = requestBody.substring(0, 99)
            }
            payloadEncrypted = this.encrypt(requestBody);
        }

        request = request.clone({
            headers: this.addExtraHeaders(request.headers, token, queryParam, queryParamEncrypted, request.body, payloadEncrypted)
        });

        return request;
    }
    addExtraHeaders(headers: HttpHeaders, token, queryParam, queryParamEncrypted, payload, payloadEncrypted): HttpHeaders {


        headers.set('security-key', 'cvdasdas679869779%%&*&4$$$==');
        if (token) {
            headers = headers.append('Authorization', `${token}`);
        }
        if (queryParam) {
            headers = headers.append('apprqapikey', queryParamEncrypted);
        }
        if (payload) {
            headers = headers.append('apprbapikey', payloadEncrypted);
        }
        return headers;
    }

    encrypt(data) {
        let encrypted;
        const keySize = 256;
        const salt = CryptoJS.lib.WordArray.random(16);
        const iv = CryptoJS.lib.WordArray.random(128 / 8);
        const key = CryptoJS.PBKDF2(environment.appEPK, salt, {
            keySize: keySize / 32,
            iterations: 100
        });

        encrypted = CryptoJS.AES.encrypt(data, key, {
            iv: iv,
            padding: CryptoJS.pad.Pkcs7,
            mode: CryptoJS.mode.CBC
        });
        data = CryptoJS.enc.Base64.stringify(salt.concat(iv).concat(encrypted.ciphertext));
        return data;
    }
}