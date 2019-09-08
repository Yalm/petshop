import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { OrderService } from '../../../services/order/order.service';
import { Order } from 'src/app/models/Order.model';

@Component({
    selector: 'app-payment-create',
    templateUrl: './payment-create.component.html',
    styleUrls: ['./payment-create.component.sass']
})
export class PaymentCreateComponent implements OnInit {

    form: FormGroup;
    lock = true;
    disabledButtons = false;

    constructor(
        private order: OrderService,
        public dialogRef: MatDialogRef<PaymentCreateComponent>,
        @Inject(MAT_DIALOG_DATA) private data: Order) { }

    ngOnInit() {
        this.form = new FormGroup({
            order_id: new FormControl(this.data.id, Validators.required),
            amount: new FormControl(this.data.amount, [
                Validators.max(99999999),
                Validators.pattern('^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$')
            ]),
            decrease_stock: new FormControl({ disabled: this.disabledButtons, value: true })
        });
    }

    store() {
        this.disabledButtons = this.lock = true;
        this.order.payment(this.form.value).subscribe(response => {
            this.disabledButtons = false;
            this.dialogRef.close(response);
        }, () => {
            this.disabledButtons = false;
        });
    }

    onNoClick(): void {
        this.dialogRef.close();
    }
}
