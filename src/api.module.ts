import { NgModule, ModuleWithProviders } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { ApiService } from './api.service';
import * as ApiTokens from './api.tokens';
import { I18NextLocalizeErrorInterceptor } from 'lib/api/i18next-error.interceptor';

@NgModule({
    imports: [
        HttpClientModule
    ],
    providers: [
        ApiService
    ]
})
export class ApiModule {
    static forRoot(endpoint: string = null, path: string = null): ModuleWithProviders {
        return {
            ngModule: ApiModule,
            providers: [
                ApiService,
                {
                    provide: ApiTokens.API_ENDPOINT,
                    useValue: endpoint || ''
                },
                {
                    provide: ApiTokens.API_PATH,
                    useValue: path || ''
                }
            ]
        };
    }
}
