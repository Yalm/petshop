import { Component, OnInit } from '@angular/core';
import { MatSnackBar, MatTableDataSource } from '@angular/material';
import { OrderService } from '../../../services/order/order.service';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Order } from 'src/app/models/Order.model';
import { Observable } from 'rxjs';
import { State } from '../../../models/State.model';
import { StateService } from '../../../services/state/state.service';

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

    constructor(private route: ActivatedRoute,
        private snackBar: MatSnackBar,
        private stateService: StateService,
        private orderService: OrderService) { }

    ngOnInit(): void {
        this.order = this.route.snapshot.data.order;

        this.form = new FormGroup({
            id: new FormControl(this.order.id, [Validators.required]),
            state_id: new FormControl(this.order.state_id, [Validators.required])
        });

        this.dataSource.data = this.order.products;
        this.states = this.stateService.index();
    }

    update(): void {
        this.orderService.update(this.form.value).subscribe(() => {
            this.snackBar.open('Pedido editado.', 'OK', { duration: 5000 });
        });
    }
}
