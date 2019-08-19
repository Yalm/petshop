import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Token } from './token.model';
import { LoaderService } from '../loader/loader.service';
declare const Culqi: any;

@Injectable({
    providedIn: 'root'
})
export class CulqiService {

    private subject = new Subject<Token>();
    public token = this.subject.asObservable();

    private tokenChange: any = {
        preventValue: { id: null },
        newValue: { id: null },
    }

    constructor(private load: LoaderService) {
        this.initCulqi();
        (<any>window).culqi = () => {
            if (Culqi.token) {
                this.tokenChange.newValue = Culqi.token;
                if (this.tokenChange.newValue.id != this.tokenChange.preventValue.id) {
                    this.tokenChange.preventValue = this.tokenChange.newValue;
                    this.subject.next(Culqi.token);
                }
            }
        }
    }

    open(settings: { amount: number, title: string, currency: string, description: string }) {
        settings.amount = (settings.amount * 100).toFixed(2) as any;
        Culqi.settings(settings);
        Culqi.open();
    }

    private initCulqi(options?: { publicKey: string }) {
        this.load.show();
        let c: number = 0;
        if (!document.getElementById('culqui-lib')) {
            const culqiScript = document.createElement('script');
            culqiScript.setAttribute('src', 'https://checkout.culqi.com/js/v3');
            culqiScript.setAttribute('id', 'culqui-lib');
            document.body.appendChild(culqiScript);
        } else {
            this.setOptions(options);
            this.load.hide();
        }
        const checkCulqi = setInterval(() => {
            c++;
            if (c > 10) {
                clearInterval(checkCulqi);
                this.load.hide();
            }
            if ((<any>window).Culqi) {
                clearInterval(checkCulqi);
                this.setOptions(options);
                this.load.hide();
            }
        }, 1000);
    }

    private setOptions(options?: { publicKey: string }): void {
        Culqi.publicKey = options ? options.publicKey : false || environment.cuqli.public_key;
        Culqi.options({
            style: {
                logo: `${window.location.origin}/${environment.cuqli.logo}`
            }
        });
    }
}
