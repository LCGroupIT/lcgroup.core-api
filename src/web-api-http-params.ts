import { HttpParams } from '@angular/common/http';
import { HttpParamsOptions } from '@angular/common/http/src/params';

export class WebApiHttpParams extends HttpParams {

    private parent;

    constructor(options?: HttpParamsOptions) {
        const parent = super(options);
        this.parent = parent;
        if (!!options.fromObject) {
            this.parent.map = new Map();
            if (typeof options.fromObject === 'string' || typeof options.fromObject === 'number') {
                this.parent.map.set(options.fromObject);
            } else {
                Object.keys(options.fromObject).forEach((key) => {
                    this.parent.map.set(key, options.fromObject[key]);
                });
            }
        }
    }

    append(param, value): HttpParams {
        throw new Error('Method not impemented');
    }
    delete(param, value): HttpParams {
        throw new Error('Method not impemented');
    }
    set(param, value): HttpParams {
        throw new Error('Method not impemented');
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
        if (value === undefined) {
            return key;
        }
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
