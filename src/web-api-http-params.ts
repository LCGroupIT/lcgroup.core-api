import { HttpParams } from '@angular/common/http';
import { IApiSettings } from './simply-api.service';

export class WebApiHttpParams extends HttpParams {

    private parent;
    private settings: IApiSettings;

    constructor(options?, settings?: IApiSettings) {
        const parent = super(options);
        this.settings = settings ? settings : null;
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

    private buildString(key, value) {
        return value instanceof Object ?
            this.buildStringFromObject(key, value)
            :
            this.buildStringFromPrimitive(key, value)
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
        return this.settings && this.settings.withoutIndex ?
            result.join('')
            :
            result.join('&')
    }

    private buildKey(key, childKey) {
        return this.settings && this.settings.withoutIndex ?
            childKey
            :
            `${key}[${this.parent.encoder.encodeKey(childKey)}]`
    }

    

    private buildStringFromPrimitive(key, value) {
        return value === undefined ?
            key 
            :
            `${key}=${this.parent.encoder.encodeValue(value)}`
    }
}
