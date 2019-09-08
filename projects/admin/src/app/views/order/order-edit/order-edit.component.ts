import { Component, OnInit } from '@angular/core';
import { MatSnackBar, MatTableDataSource, MatDialog } from '@angular/material';
import { OrderService } from '../../../services/order/order.service';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Order, Payment } from 'src/app/models/Order.model';
import { Observable } from 'rxjs';
import { State } from '../../../models/state.model';
import { StateService } from '../../../services/state/state.service';
import { PaymentCreateComponent } from '../payment-create/payment-create.component';

@Component({
    selector: 'app-order-edit',
    templateUrl: './order-edit.component.html',
    styleUrls: ['./order-edit.component.sass']
})
export class OrderEditComponent implements OnInit {
    form: FormGroup;
    displayedColumns: string[] = ['show', 'name', 'price', 'quantity', 'total'];
    dataSource = new MatTableDataSource();
    order: Order;
    states: Observable<State[]>;

    constructor(
        private route: ActivatedRoute,
        private snackBar: MatSnackBar,
        private stateService: StateService,
        private orderService: OrderService,
        private dialog: MatDialog) { }

    ngOnInit(): void {
        this.order = this.route.snapshot.data.order;

        this.form = new FormGroup({
            id: new FormControl(this.order.id, [Validators.required]),
            state_id: new FormControl(this.order.state_id, [Validators.required])
        });

        this.dataSource.data = this.order.products;
        this.states = this.stateService.index();
    }

    addPayment() {
        this.dialog.open(PaymentCreateComponent, {
            width: '550px',
            data: this.order,
            disableClose: true
        }).afterClosed().subscribe((result: Payment) => {
            if (result) {
                this.order.payment = result;
                this.snackBar.open('Pago agregado.', 'OK', { duration: 5000 });
            }
        });
    }

    update(): void {
        this.orderService.update(this.form.value).subscribe(() => {
            this.snackBar.open('Pedido editado.', 'OK', { duration: 5000 });
        });
    }
}
