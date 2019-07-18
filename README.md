
# angular-simply-api

Angular 4+ http request simplifier

## Features

- endpoint setup
- serializing libraries support
- asp.net web api query string format

### Endpoint setup

Setted up endpoint will prepend any request with relative url: '/exaple'.
Absolute urls in request would not be prepended or modified: 'https://www.yandex.ru/api'.
**Endpoint is optional**: if you don't specify it, requests will be relative to the current domain.

### Serializer

Serialization/deserialization mechanism for your requests to automaticaly convert classes to request json and then convert response json to your domain classes.
Use **any serializer** that **fits ISerializer** interface. For example json2typescript or your custom serializer.

```typescript
export interface ISerializer {
    serialize(data: any): any;
    deserialize(data: any, T?: { new (): any; }): any;
}
```

### Query string builder

Native angular HttpClient query string params builder was changed to custom (WebApiHttpParams) due incorrect query string binding with asp.net web api. **WebApiHttpParams** requrcively analyses any complex object and builds correct query string.

```typescript
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
```

## Installation

Installation via npm `npm install angular-simply-api`.

## Example

Example [`json2typescript`](https://www.npmjs.com/package/json2typescript) library:

```typescript
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SimplyApiModule, SERIALIZER_OPTIONS } from 'angular-simply-api';
import { AppComponent } from './app.component';
import { JsonConvert, ValueCheckingMode } from 'json2typescript';

export function serializerFactory() {
    const jsonConverter = new JsonConvert();
    jsonConverter.ignorePrimitiveChecks = true;
    jsonConverter.valueCheckingMode = ValueCheckingMode.ALLOW_NULL;
    return jsonConverter;
}

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    SimplyApiModule.forRoot(
        '/api',
        {
            serializeProvider: {
              provide: SERIALIZER_OPTIONS,
              useFactory: serializerFactory
            }
        }
    )
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

```

Deserialize json to ClientsFilterResult:
```typescript

@Injectable()
export class ClientsService {
  constructor(private api: SimplyApiService) { }

  public getClientsList(filter: ClientInfoFilterDto): Observable<ClientsFilterResult> {
    return this.api.post(`/clients/search`, filter, { deserializeTo: ClientsFilterResult });
  }
}
```


### Simple Query string builder without index

Native angular HttpClient query string params builder was changed to custom (WebApiHttpParams) due incorrect query string binding with asp.net web api. **WebApiHttpParams** requrcively analyses any complex object and builds correct query string without index.

```typescript
it('should serialize complex object to query string without index', () => {
      const array = [
            {documentTypes: 'PaymentConfirmation'},
            {documentTypes: 'StatementFromBank'}
        ];
        const settings = new Object as IApiSettings;
        settings.withoutIndex = true;

        const params = new WebApiHttpParams({ fromObject: array }, settings);
        expect(params.toString()).toEqual('documentTypes=PaymentConfirmation&documentTypes=StatementFromBank');
});
```