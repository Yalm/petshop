import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Token } from './token.model';
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

    constructor() {
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

    public open(settings: { amount: number, title: string, currency: string, description: string }) {
        settings.amount = (settings.amount * 100).toFixed(2) as any;
        Culqi.settings(settings);
        Culqi.open();
    }

    initCulqi(data?: { publicKey: string }): Promise<boolean> {
        return new Promise((resolve, reject) => {
            let c: number = 0;
            if (!document.getElementById('culqui-lib')) {
                const culqiScript = document.createElement('script');
                culqiScript.setAttribute('src', 'https://checkout.culqi.com/js/v3');
                culqiScript.setAttribute('id', 'culqui-lib');
                document.body.appendChild(culqiScript);
            } else {
                this.setOptions(data ? data.publicKey : null);
                resolve(true);
            }
            const checkCulqi = setInterval(() => {
                c++;
                if (c > 10) {
                    clearInterval(checkCulqi);
                    reject('No init');
                }
                if ((<any>window).Culqi) {
                    clearInterval(checkCulqi);
                    this.setOptions(data ? data.publicKey : null);
                    resolve(true);
                }
            }, 1000);
        });
    }

    private setOptions(publicKey?: string): void {
        Culqi.publicKey = publicKey || environment.cuqli.public_key;
        Culqi.options({
            style: {
                logo: `${window.location.origin}/${environment.cuqli.logo}`,
            }
        });
    }

}
