import { HttpParams } from "@angular/common/http";
import { HttpParamsOptions } from "@angular/common/http/src/params";

// import { HttpParameterCodec, HttpParameterCodec } from '@angular/common/http';
export class QueryHelper {
    static objectToParams(object): string {
        const keys = Object.keys(object);
        let result = [];
        for (let k in keys) {
            const key = keys[k];
            if (object[key]) {
                result.push(object[key] instanceof Object ?
                    this.subObjectToParams(encodeURIComponent(key), object[key]) :
                    `${encodeURIComponent(key)}=${encodeURIComponent(object[key])}`);
            }
        }
        return result.join('&');
    }
    static subObjectToParams(key, object): string {
        const keys = Object.keys(object);
        let result = [];
        for (let childK in keys) {
            const childKey = keys[childK];
            if (object[childKey]) {
                result.push(object[childKey] instanceof Object ?
                this.subObjectToParams(`${key}[${encodeURIComponent(childKey)}]`, object[childKey]) :
                `${key}[${encodeURIComponent(childKey)}]=${encodeURIComponent(object[childKey])}`);
            }
        }
        return result.join('&');
    }
}


export class WebApiHttpParams extends HttpParams {

    private parent;

    constructor(options?: HttpParamsOptions) {
        // options.encoder = options.encoder || new WebApiHttpUrlEncodingCodec();
        const parent = super(options);
        this.parent = parent;
        if (!!options.fromObject) {
            this.parent.map = new Map();
            Object.keys(options.fromObject).forEach((key) => {
                this.parent.map.set(key, options.fromObject[key]);
            });
        }
    }



    toString() {
        this.parent.init();
        return this.keys()
            .map((key) => {
                const eKey = this.parent.encoder.encodeKey(key);
                const mapValue = this.parent.map.get(key);
                return this.buildString(eKey, mapValue);
            }).join('&');
    }

    private buildKey(key, childKey) {
        return `${key}[${this.parent.encoder.encodeKey(childKey)}]`;
    }

    private buildStringFromPrimitive(key, value) {
        return `${key}=${this.parent.encoder.encodeValue(value)}`;
    }

    private buildStringFromObject(key, object) {
        const keys = Object.keys(object);
        let result = [];

        for (let childK in keys) {
            if (childK) {
                const childKey = keys[childK];
                if (object[childKey]) {
                    result.push(this.buildString(this.buildKey(key, childKey), object[childKey]));
                }
            }
        }
        return result.join('&');
    }

    private buildString(key, value) {
        if (value instanceof Object) {
            return  this.buildStringFromObject(key, value);
        }
        return this.buildStringFromPrimitive(key, value);
    }
}
