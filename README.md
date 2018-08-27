
# angular-simply-api

Angular 4+ http request simplifier

## Features

- endpoint setup
- serializing libraries support

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
        'https://localhost:3000/api/',
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