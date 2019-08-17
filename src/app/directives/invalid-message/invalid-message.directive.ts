import { Directive, Input, OnInit, OnDestroy, ElementRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { ControlContainer, AbstractControl } from '@angular/forms';
import { filter } from 'rxjs/operators';

@Directive({
    selector: '[appInvalidMessage]'
})
export class InvalidMessageDirective implements OnInit, OnDestroy {
    @Input() appInvalidMessage: string;
    @Input() name: string;
    control: AbstractControl;
    controlSubscription: Subscription;

    constructor(
        private _fg: ControlContainer,
        private _el: ElementRef,
    ) { }

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
        const nameControl: string = this.name || this.appInvalidMessage;
        return this.control.hasError('required') ? `El campo ${nameControl} es obligatorio.` :
            this.control.hasError('exists') ? `El ${nameControl} seleccionado no es válido.` :
                this.control.hasError('not-found') ? 'Dirección de correo electrónico  y/o contraseña incorrecta.' :
                    this.control.hasError('pattern') ? `El formato de ${nameControl} es inválido.` :
                        this.control.hasError('equals') ? 'Las contraseñas deben coincidir y contener al menos 6 caracteres' :
                            this.control.hasError('minlength') ? `El campo ${nameControl} debe tener menos de ${this.control.getError('minlength').requiredLength} caracteres.` :
                                this.control.hasError('min') ? `El tamaño de ${nameControl} debe ser de al menos ${this.control.getError('min').min}.` :
                                    this.control.hasError('unique') ? `El campo ${nameControl} ya ha sido registrado.` :
                                        this.control.hasError('email') ? 'No es un correo electrónico válido.' : '';
    }

    get form() { return this._fg.control }

    ngOnDestroy() {
        this.controlSubscription.unsubscribe();
    }

}
