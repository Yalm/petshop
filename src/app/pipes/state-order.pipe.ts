import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'stateOrder'
})
export class StateOrderPipe implements PipeTransform {

    transform(value: string, color?: boolean): any {
        let state: string;
        let bg: string;

        switch (value) {
            case '1':
                state = 'Cancelado';
                bg = 'danger';
                break;
            case '2':
                state = 'Completado';
                bg = 'success';
                break;
            case '3':
                state = 'Pendiente de pago';
                bg = 'info';
                break;
            case '4':
                state = 'Pendiente de revisión';
                bg = 'warning';
                break;
            case '5':
                state = 'Fallido';
                bg = 'danger';
                break;
            case '6':
                state = 'Enviado';
                bg = 'info';
                break;
            default:
                state = 'Cancelado';
                bg = 'danger';
                break;
        }

        return color ? bg : state;
    }
}
