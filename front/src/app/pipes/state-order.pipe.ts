import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'stateOrder'
})
export class StateOrderPipe implements PipeTransform {

    transform(value: number): string {
        let bg: string;

        switch (value) {
            case 1:
                bg = 'danger';
                break;
            case 2:
                bg = 'success';
                break;
            case 3:
                bg = 'info';
                break;
            case 4:
                bg = 'warning';
                break;
            case 5:
                bg = 'danger';
                break;
            case 6:
                bg = 'info';
                break;
            default:
                bg = 'danger';
                break;
        }

        return bg;
    }
}
