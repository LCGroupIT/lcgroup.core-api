import { WebApiHttpParams } from '../src/web-api-http-params';
import { IApiSettings } from './../src/simply-api.service';


describe('Query string encoder', () => {

    it('should serialize simple object to query string', () => {

        const obj: any = {
            numeric: 1,
            float: 1.40,
            string: 'text'
        };
        const params = new WebApiHttpParams({ fromObject: obj });
        expect(params.toString()).toEqual('numeric=1&float=1.4&string=text');
    });

    it('should serialize array to query string', () => {
        const params = new WebApiHttpParams({ fromObject:  <any>[1, 2, 3] });
        expect(params.toString()).toEqual('0=1&1=2&2=3');
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

        const params = new WebApiHttpParams({ fromObject: complexObj });
        expect(params.toString()).toEqual('numeric=1&float=1.4&string=text&subObject[prop1]=a&subObject[prop2]=b&arrayPrimitive[0]=1&arrayObjects[0][value]=1&arrayObjects[1][value]=2');
    });

    it('should serialize object to query string without index', () => {
        const array = [
            {documentTypes: 'PaymentConfirmation'},
            {documentTypes: 'PaymentConfirmation'}
        ];
        const settings = new Object as IApiSettings;
        settings.withoutIndex = true;

        const params = new WebApiHttpParams({ fromObject: array }, settings);
        expect(params.toString()).toEqual('documentTypes=PaymentConfirmation&documentTypes=PaymentConfirmation');
    });

});
