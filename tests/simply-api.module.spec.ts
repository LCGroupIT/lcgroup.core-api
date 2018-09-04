import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { async, inject, TestBed } from '@angular/core/testing';

import { SimplyApiModule, SimplyApiService } from '../src';


describe('Service: SimplyApiService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientModule,
                HttpClientTestingModule,
                SimplyApiModule.forRoot()
            ],
            providers: []
        });
    });

    it('should be provided', () => {
        const service: SimplyApiService = TestBed.get(SimplyApiService);
        expect(service).toBeTruthy();
    });

    it('should prepend correct url', () => {
        const service: SimplyApiService = TestBed.get(SimplyApiService);
        expect(service.buildUrl('http://ya.ru')).toEqual('http://ya.ru');
        expect(service.buildUrl('https://ya.ru')).toEqual('https://ya.ru');
        expect(service.buildUrl('/api/test')).toEqual('/api/test');
    });

    it('should build correct query string',
        async(
            inject([SimplyApiService, HttpTestingController], (apiService: SimplyApiService, backend: HttpTestingController) => {
                const path = '/api/test';

                apiService.get(path, { params: { array: [1, 2], object: { a: 1, b: 2} } }).subscribe();
                backend.expectOne({
                    url: path + '?array[0]=1&array[1]=2&object[a]=1&object[b]=2',
                    method: 'GET'
                });

                apiService.post(path, null, { params: { array: [1, 2], object: { a: 1, b: 2} } }).subscribe();
                backend.expectOne({
                    url: path + '?array[0]=1&array[1]=2&object[a]=1&object[b]=2',
                    method: 'POST'
                });

                apiService.put(path, null, { params: { array: [1, 2], object: { a: 1, b: 2} } }).subscribe();
                backend.expectOne({
                    url: path + '?array[0]=1&array[1]=2&object[a]=1&object[b]=2',
                    method: 'PUT'
                });

                apiService.delete(path, { params: { array: [1, 2], object: { a: 1, b: 2} } }).subscribe();
                backend.expectOne({
                    url: path + '?array[0]=1&array[1]=2&object[a]=1&object[b]=2',
                    method: 'DELETE'
                });
            })
        )
    );
/*
    it('should encode query string from object', () => {

       
    });

    it('should encode query string from string', () => {

       
    });

    
    it('should use nullo mapper (serializer/deserializer)', () => {

       
    });

    it('should use custom mapper (serializer/deserializer)', () => {

       
    });

    it('should do get request', () => {

       
    });
*/

});
