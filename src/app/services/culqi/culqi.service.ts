import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { PlatformLocation } from '@angular/common';
import { environment } from 'src/environments/environment';
declare const Culqi: any;

@Injectable({
    providedIn: 'root'
})
export class CulqiService {

    private subject = new Subject<any>();
    public Culqi = this.subject.asObservable();

    private token: any = {
        preventValue: { id: null },
        newValue: { id: null },
    }

    constructor() {
        this.appendCulqiScript();
    }

    public open(amount: number, title: string = 'Pet Shop', currency: string = 'PEN', description: string = 'Petshop Veterinaria Huancayo') {
        Culqi.settings({
            title: title,
            currency: currency,
            description: description,
            amount: amount *= 100
        });
        Culqi.open();
    }

    private appendCulqiScript(): void {
        let c: number = 0;
        if (!document.getElementById('culqui-lib')) {
            const culqiScript = document.createElement('script');
            culqiScript.setAttribute('src', 'https://checkout.culqi.com/js/v3');
            culqiScript.setAttribute('id', 'culqui-lib');
            document.body.appendChild(culqiScript);
        } else {
            this.setOptions();
        }
        const checkCulqi = setInterval(() => {
            c++;
            if (c > 10) clearInterval(checkCulqi);
            if ((<any>window).Culqi) {
                clearInterval(checkCulqi)
                this.setOptions();
            }
        }, 1000);
    }

    private setOptions(): void {
        (<any>window).culqi = () => {
            if (Culqi.token) {
                this.token.newValue = Culqi.token;
                if (this.token.newValue.id != this.token.preventValue.id) {
                    this.token.preventValue = this.token.newValue;
                    this.subject.next(Culqi);
                }
            }
        }
        Culqi.publicKey = environment.cuqli.public_key;
        Culqi.options({
            style: {
                logo: `${window.location.origin}/${environment.cuqli.logo}`,
            }
        });
        this.subject.next((<any>window).Culqi);
    }

}
