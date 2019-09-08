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
    private control: AbstractControl;
    private controlSubscription: Subscription;

    constructor(
        private fg: ControlContainer,
        private el: ElementRef
    ) { }

    ngOnInit() {
        this.control = this.form.get(this.appInvalidMessage);
        this.el.nativeElement.innerText = this.getErrorMessage();

        this.controlSubscription = this.control.statusChanges
            .pipe(
                filter(x => x === 'INVALID')
            ).subscribe(() => {
                this.el.nativeElement.innerText = this.getErrorMessage();
            });
    }

    private getErrorMessage(): string {
        const nameControl: string = this.name || this.appInvalidMessage;
        if (!this.control.errors) {
            return '';
        }
        const error: string = Object.keys(this.control.errors)[0];
        let message: string;
        switch (error) {
            case 'required':
                message = `El campo ${nameControl} es obligatorio.`;
                break;
            case 'exists':
                message = `El ${nameControl} seleccionado no es válido.`;
                break;
            case 'not-found':
                message = 'Dirección de correo electrónico  y/o contraseña incorrecta.';
                break;
            case 'pattern':
                message = `El formato de ${nameControl} es inválido.`;
                break;
            case 'equals':
                message = 'Las contraseñas deben coincidir y contener al menos 6 caracteres';
                break;
            case 'minlength':
                message = `El campo ${nameControl} debe tener menos de ${this.control.getError('minlength').requiredLength} caracteres.`;
                break;
            case 'min':
                message = `El tamaño de ${nameControl} debe ser de al menos ${this.control.getError('min').min}.`;
                break;
            case 'max':
                message = `El tamaño de ${nameControl} debe ser de maximo ${this.control.getError('max').max}.`;
                break;
            case 'unique':
                message = `El campo ${nameControl} ya ha sido registrado.`;
                break;
            case 'email':
                message = 'No es un correo electrónico válido.';
                break;
            default:
                message = '';
                break;
        }
        return message;
    }

    get form() { return this.fg.control; }

    ngOnDestroy() {
        this.controlSubscription.unsubscribe();
    }
}
