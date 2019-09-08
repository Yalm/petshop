import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'orderIcon'
})
export class OrderIconPipe implements PipeTransform {

    transform(value: number, ...args: any[]): string {
        let returnValue: string;
        switch (value) {
            case 1:
                returnValue = args[0] == 'text' ? 'Tarjeta de crédito' : 'credit_card';
                break;
            case 2:
                returnValue = args[0] == 'text' ? 'Depósito bancario' : 'account_balance';
                break;
            case 3:
                returnValue = args[0] == 'text' ? 'Pago Manual' :  'attach_money';
                break;
            default:
                returnValue = args[0] == 'text' ? 'Sin pago' :  'money_off';
                break;
        }
        return returnValue;
    }
}
