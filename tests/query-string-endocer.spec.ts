import { HttpParams } from '@angular/common/http';

import { QueryHelper, WebApiHttpParams } from '../src/utils';


describe('Query string encoder', () => {

    it('should serialize simple object to query string', () => {

        const obj: any = {
            numeric: 1,
            float: 1.40,
            string: 'text'
        };
        const queryString = QueryHelper.objectToParams(obj);
        expect(queryString).toEqual('numeric=1&float=1.4&string=text');

        const params = new WebApiHttpParams({ fromObject: obj });
        expect(params.toString()).toEqual(queryString);

    });

    it('should serialize array to query string', () => {
        const queryString = QueryHelper.objectToParams([1, 2, 3]);
        expect(queryString).toEqual('0=1&1=2&2=3');
    });

    it('should serialize complex object to query string', () => {
        const complexObj: any = {
            numeric: 1,
            float: 1.40,
            string: 'text',
            subObject: {
                prop1: 'a',
                prop2: 'b'
            },
            arrayPrimitive: [1],
            arrayObjects: [
                {
                    value: 1
                },
                {
                    value: 2
                }
            ]
        };
        const queryString = QueryHelper.objectToParams(complexObj);
        // tslint:disable-next-line:max-line-length
        expect(queryString).toEqual('numeric=1&float=1.4&string=text&subObject[prop1]=a&subObject[prop2]=b&arrayPrimitive[0]=1&arrayObjects[0][value]=1&arrayObjects[1][value]=2');


        const params = new WebApiHttpParams({ fromObject: complexObj });
        expect(params.toString()).toEqual(queryString);
    });

});
