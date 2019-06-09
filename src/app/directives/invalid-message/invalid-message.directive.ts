import { Directive, Input, OnInit, OnDestroy, ElementRef, Renderer2 } from '@angular/core';
import { Subscription, Observable, of } from 'rxjs';
import { ControlContainer, AbstractControl, FormGroupDirective } from '@angular/forms';
import { filter } from 'rxjs/operators';

@Directive({
    selector: '[appInvalidMessage]'
})
export class InvalidMessageDirective implements OnInit, OnDestroy {
    @Input() appInvalidMessage: string;
    control: AbstractControl;
    controlSubscription: Subscription;

    constructor(
        private _fg: ControlContainer,
        private _el: ElementRef,
    ) {
    }

    ngOnInit() {
        this.control = this.form.get(this.appInvalidMessage);
        this._el.nativeElement.innerText = this.getErrorMessage();

        this.controlSubscription = this.control.statusChanges
        .pipe(
            filter(x => x == 'INVALID')
        ).subscribe(() => {
            this._el.nativeElement.innerText = this.getErrorMessage();
        })

    }

    private getErrorMessage(): string {
        return this.control.hasError('required') ? 'Debes introducir un valor.' :
            this.control.hasError('not-found') ? 'Dirección de correo electrónico  y/o contraseña incorrecta.' :
            this.control.hasError('email') ? 'No es un correo electrónico válido' : '';
    }

    get form() { return this._fg.control }

    ngOnDestroy() {
        this.controlSubscription.unsubscribe();
    }

}
