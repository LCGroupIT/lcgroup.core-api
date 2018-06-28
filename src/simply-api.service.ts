import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Inject, Injectable, Optional } from '@angular/core';
import { Observable } from 'rxjs';

import { API_ENDPOINT } from './simply-api.tokens';
import { QueryHelper } from './utils';


export enum ResponseTypeEnum {
  json = 'json',
  text = 'text',
  arraybuffer = 'arraybuffer',
  blob = 'blob'
}

export type ApiOptions = {
  headers?: HttpHeaders
  params?: { [key: string]: any };
  responseType?: ResponseTypeEnum;
};

@Injectable()
export class SimplyApiService {

    constructor(
        private http: HttpClient,
        @Optional() @Inject(API_ENDPOINT) private apiEndpoint: string = null
    ) {}

    public get<T>(url: string, options?: ApiOptions)
      : Observable<T> {
        options = options || { responseType: ResponseTypeEnum.json };
        const par = this.getQueryParams(options.params);
        return this.http.get<T>(this.buildUrl(url), { params: par, responseType: options.responseType as ResponseTypeEnum.json, headers: options.headers });
    }

    public post<T>(url: string, body: any, options?: ApiOptions)
      : Observable<T> {
        options = options || { responseType: ResponseTypeEnum.json };
        const par = this.getQueryParams(options.params);
        return this.http.post<T>(this.buildUrl(url), body, { params: par, responseType: options.responseType as ResponseTypeEnum.json, headers: options.headers });
    }

    public put<T>(url: string, body: any, options?: ApiOptions)
      : Observable<T> {
        options = options || { responseType: ResponseTypeEnum.json };
        const par = this.getQueryParams(options.params);
        return this.http.put<T>(this.buildUrl(url), body, { params: par, responseType: options.responseType as ResponseTypeEnum.json, headers: options.headers });
    }

    public delete<T>(url: string, options?: ApiOptions)
      : Observable<T> {
        options = options || { responseType: ResponseTypeEnum.json };
        const par = this.getQueryParams(options.params);
        return this.http.delete<T>(this.buildUrl(url), { params: par, responseType: options.responseType as ResponseTypeEnum.json, headers: options.headers });
    }

    public buildUrl(url: string) {
        if (url && url.startsWith('http') || !this.apiEndpoint) {
            return url;
        }
        return this.apiEndpoint.concat(url);
    }

    private getQueryParams(params: { [key: string]: any }): HttpParams {
        if (!params) {
            return null;
        }
        const query = QueryHelper.objectToParams(params);
        const httpParams = new HttpParams({fromString: query});
        return httpParams;
    }
}
