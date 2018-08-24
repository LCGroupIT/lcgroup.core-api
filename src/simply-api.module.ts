import { HttpClientModule } from '@angular/common/http';
import { ModuleWithProviders, NgModule, Provider } from '@angular/core';

import { SimplyApiService } from './simply-api.service';
import * as ApiTokens from './simply-api.tokens';
import { ISimplyApiModuleOptions } from './simply-api.options';

@NgModule({
    imports: [
        HttpClientModule
    ],
    providers: [
        SimplyApiService
    ]
})
export class SimplyApiModule {
    static forRoot(endpoint: string = null, options?: ISimplyApiModuleOptions): ModuleWithProviders {
        const providers: Provider[] = [
            SimplyApiService,
            {
                provide: ApiTokens.API_ENDPOINT,
                useValue: endpoint || ''
            }
        ];

        if (options && options.serializeProvider) {
            providers.push(options.serializeProvider);
        }

        return {
            ngModule: SimplyApiModule,
            providers: providers
        };
    }
}
