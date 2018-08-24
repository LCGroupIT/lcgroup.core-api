import { InjectionToken } from '@angular/core';

export const API_ENDPOINT: InjectionToken<string> = new InjectionToken<string>('API_ENDPOINT');
export const SERIALIZER_OPTIONS: InjectionToken<{}> = new InjectionToken<{}>('SERIALIZER_OPTIONS');

