import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Token, OptionsCulqi } from './token.model';
import { LoaderService } from '../loader/loader.service';
declare const Culqi: any;

@Injectable({
    providedIn: 'root'
})
export class CulqiService {

    private subject = new Subject<Token>();
    token = this.subject.asObservable();

    private tokenChange: any = {
        preventValue: { id: null },
        newValue: { id: null }
    };

    constructor(private load: LoaderService) {
        this.initCulqi();
        (window as any).culqi = () => {
            if (Culqi.token) {
                this.tokenChange.newValue = Culqi.token;
                if (this.tokenChange.newValue.id !== this.tokenChange.preventValue.id) {
                    this.tokenChange.preventValue = this.tokenChange.newValue;
                    this.subject.next(Culqi.token);
                }
            } else {
                this.subject.next(Culqi.error);
            }
        };
    }

    open(settings: { amount: number, title: string, currency: string, description: string }) {
        settings.amount = (settings.amount * 100).toFixed(2) as any;
        Culqi.settings(settings);
        Culqi.open();
    }

    private initCulqi(key?: string, options?: OptionsCulqi) {
        this.load.show();
        if (!document.getElementById('culqui-lib')) {
            const culqiScript = document.createElement('script');
            culqiScript.setAttribute('src', 'https://checkout.culqi.com/js/v3');
            culqiScript.setAttribute('id', 'culqui-lib');
            document.body.appendChild(culqiScript);
        } else {
            this.setOptions(key, options);
            this.load.hide();
        }
        const checkCulqi = setInterval(() => {
            if ((window as any).Culqi) {
                clearInterval(checkCulqi);
                this.setOptions(key, options);
                this.load.hide();
            }
        }, 1000);
    }

    private setOptions(key: string, options?: OptionsCulqi): void {
        Culqi.publicKey = key || environment.cuqli.public_key;
        Culqi.options(options || {
            style: {
                logo: `${window.location.origin}/${environment.cuqli.logo}`,
                style: {
                    maincolor: '#da573e'
                }
            }
        });
    }
}
