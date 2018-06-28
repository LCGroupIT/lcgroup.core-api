import { HttpClientModule } from '@angular/common/http';
import { ModuleWithProviders, NgModule } from '@angular/core';

import { SimplyApiService } from './simply-api.service';
import * as ApiTokens from './simply-api.tokens';

@NgModule({
    imports: [
        HttpClientModule
    ],
    providers: [
        SimplyApiService
    ]
})
export class SimplyApiModule {
    static forRoot(endpoint: string = null): ModuleWithProviders {
        return {
            ngModule: SimplyApiModule,
            providers: [
                SimplyApiService,
                {
                    provide: ApiTokens.API_ENDPOINT,
                    useValue: endpoint || ''
                }
            ]
        };
    }
}
