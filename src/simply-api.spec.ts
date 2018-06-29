/*import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { SimplyApiModule, SimplyApiService } from '.';

describe('ApiModule', () => {

      beforeEach(() => TestBed.configureTestingModule({
        imports: [HttpClientTestingModule, SimplyApiModule]
      }));

      it('should POST data', () => {
        const apiService: SimplyApiService = TestBed.get(SimplyApiService);
        const http: HttpTestingController = TestBed.get(HttpTestingController);
        // fake response
        const expectedUsers = [{ name: 'Cédric' }];

        let actualUsers = [];
        apiService.post('/api/users', expectedUsers).subscribe((users: Array<any>) => {
          actualUsers = users;
        });

        http.expectOne('/api/users').flush(expectedUsers);

        expect(actualUsers).not.toBeNull();
        expect(actualUsers.length).toEqual(expectedUsers.length);
        expect(actualUsers).toEqual(expectedUsers);
      });

      it('should GET data without query string', () => {
        const apiService: SimplyApiService = TestBed.get(SimplyApiService);
        const http: HttpTestingController = TestBed.get(HttpTestingController);
        // fake response
        const expectedUsers = [{ name: 'Cédric' }];

        let actualUsers = [];
        apiService.get('/api/users').subscribe((users: Array<any>) => {
          actualUsers = users;
        });

        http.expectOne('/api/users').flush(expectedUsers);

        expect(actualUsers).not.toBeNull();
        expect(actualUsers.length).toEqual(expectedUsers.length);
        expect(actualUsers).toEqual(expectedUsers);
      });

      it('should GET data by query string', () => {
        const apiService: SimplyApiService = TestBed.get(SimplyApiService);
        const http: HttpTestingController = TestBed.get(HttpTestingController);
        // fake response
        const expectedUsers = [{ name: 'Cédric' }];

        let actualUsers = [];
        apiService.get('/api/users', {
          skip: 1,
          take: 30
        }).subscribe((users: Array<any>) => {
          actualUsers = users;
        });

        http.expectOne('/api/users?skip=1&take=30').flush(expectedUsers);

        expect(actualUsers).not.toBeNull();
        expect(actualUsers.length).toEqual(expectedUsers.length);
        expect(actualUsers).toEqual(expectedUsers);
      });
    });
*/