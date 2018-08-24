import { HttpClientModule } from '@angular/common/http';
import { ModuleWithProviders, NgModule, Provider } from '@angular/core';

import { SimplyApiService } from './simply-api.service';
import * as ApiTokens from './simply-api.tokens';
import { ISimplyApiModuleOptions, ISerializer } from './simply-api.options';

export function nullSerializerFactory() {
    return <ISerializer>{
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
                }
            ]
        };
    }
}
