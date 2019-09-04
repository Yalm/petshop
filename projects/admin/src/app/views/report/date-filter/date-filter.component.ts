import { Component, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
    selector: 'app-date-filter',
    templateUrl: './date-filter.component.html',
    styleUrls: ['./date-filter.component.sass']
})
export class DateFilterComponent {

    form: FormGroup;
    maxDate = new Date();
    @Output() filter = new EventEmitter<{ date_init: string, date_end: string }>();

    constructor() {
        const DATE_INIT = new Date();
        this.form = new FormGroup({
            date_init: new FormControl(new Date(DATE_INIT.setMonth(DATE_INIT.getMonth() - 1)), Validators.required),
            date_end: new FormControl(new Date(), Validators.required)
        });
    }

    filterData(): void {
        const data = this.form.value;
        data.date_end = data.date_end instanceof Date ? data.date_end.toJSON() : data.date_end;
        data.date_init = data.date_init instanceof Date ? data.date_init.toJSON() : data.date_init;
        this.filter.next(data);
    }
}
