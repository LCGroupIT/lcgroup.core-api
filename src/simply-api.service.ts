import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Inject, Injectable, Optional, inject, Type } from '@angular/core';
import { Observable } from 'rxjs';

import { API_ENDPOINT, SERIALIZER_OPTIONS } from './simply-api.tokens';
import { QueryHelper } from './utils';
import { ISerializer } from './simply-api.options';
import { map } from 'rxjs/operators';

export enum ResponseTypeEnum {
    json = 'json',
    text = 'text',
    arraybuffer = 'arraybuffer',
    blob = 'blob'
}

export interface IApiOptions  {
    headers?: HttpHeaders;
    params?: { [key: string]: any };
    responseType?: ResponseTypeEnum;
}

export interface IClassReference {
    classRef?: { new(): any };
}

@Injectable()
export class SimplyApiService {
    constructor(
        private http: HttpClient,
        @Optional()
        @Inject(API_ENDPOINT)
        private apiEndpoint: string = null,
        @Optional()
        @Inject(SERIALIZER_OPTIONS)
        private serializer: ISerializer
    ) {}

    public get<T>(url: string, options?: IApiOptions & IClassReference): Observable<T> {
        options = options || { responseType: ResponseTypeEnum.json };
        const par = this.getQueryParams(options.params);
        return this.http
            .get<T>(this.buildUrl(url), {
                params: par,
                responseType: options.responseType as ResponseTypeEnum.json,
                headers: options.headers
            })
            .pipe(map(result => this.tryDeserialize<T>(result, options && options.classRef)));
    }

    public post<T>(url: string, body: any, options?: IApiOptions & IClassReference): Observable<T> {
        options = options || { responseType: ResponseTypeEnum.json };
        const par = this.getQueryParams(options.params);
        return this.http
            .post<T>(this.buildUrl(url), this.trySerialize(body), {
                params: par,
                responseType: options.responseType as ResponseTypeEnum.json,
                headers: options.headers
            })
            .pipe(map(result => this.tryDeserialize<T>(result, options && options.classRef)));
    }

    public put<T>(url: string, body: any, options?: IApiOptions & IClassReference): Observable<T> {
        options = options || { responseType: ResponseTypeEnum.json };
        const par = this.getQueryParams(options.params);
        return this.http
            .put<T>(this.buildUrl(url), this.trySerialize(body), {
                params: par,
                responseType: options.responseType as ResponseTypeEnum.json,
                headers: options.headers
            })
            .pipe(map(result => this.tryDeserialize<T>(result, options && options.classRef)));
    }

    public delete<T>(url: string, options?: IApiOptions & IClassReference): Observable<T> {
        options = options || { responseType: ResponseTypeEnum.json };
        const par = this.getQueryParams(options.params);
        return this.http
            .delete<T>(this.buildUrl(url), {
                params: par,
                responseType: options.responseType as ResponseTypeEnum.json,
                headers: options.headers
            })
            .pipe(map(result => this.tryDeserialize<T>(result, options && options.classRef)));
    }

    public buildUrl(url: string) {
        if ((url && url.startsWith('http')) || !this.apiEndpoint) {
            return url;
        }
        return this.apiEndpoint.concat(url);
    }

    private getQueryParams(params: { [key: string]: any }): HttpParams {
        if (!params) {
            return null;
        }
        const query = QueryHelper.objectToParams(this.trySerialize(params));
        const httpParams = new HttpParams({ fromString: query });
        return httpParams;
    }

    private trySerialize(data: any): any {
        if (this.serializer) {
            return this.serializer.serialize(data);
        }
        return data;
    }

    private tryDeserialize<T>(data: any, classRef: { new(): T }): T {
        if (this.serializer && typeof classRef !== 'undefined') {
            return this.serializer.deserialize(data, classRef);
        }
        return data;
    }
}
