import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ModuleWithProviders, NgModule } from '@angular/core';

import { BlobErrorHttpInterceptor } from './blob-error-http.interceptor';
import { ISerializer, ISimplyApiModuleOptions } from './simply-api.options';
import { SimplyApiService } from './simply-api.service';
import * as ApiTokens from './simply-api.tokens';


export function nullSerializerFactory(): ISerializer {
    return {
        serialize: data => data,
        deserialize: data => data
    };
}
@NgModule({
    imports: [
        HttpClientModule
    ],
    providers: [
        SimplyApiService
    ]
})
export class SimplyApiModule {
    static forRoot(options: ISimplyApiModuleOptions = {}): ModuleWithProviders {
        return {
            ngModule: SimplyApiModule,
            providers: [
                SimplyApiService,
                {
                    provide: ApiTokens.API_ENDPOINT,
                    useValue: options.endpoint || ''
                },
                options.serializeProvider || {
                    provide: ApiTokens.API_SERIALIZER,
                    useFactory: nullSerializerFactory
                },
                {
                    provide: HTTP_INTERCEPTORS,
                    useClass: BlobErrorHttpInterceptor,
                    multi: true
                }
            ]
        };
    }
}
