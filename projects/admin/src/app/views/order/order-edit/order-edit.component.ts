import { Component, OnInit } from '@angular/core';
import { MatSnackBar, MatTableDataSource } from '@angular/material';
import { OrderService } from '../../../services/order/order.service';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { switchMap } from 'rxjs/operators';
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
    displayedColumns: string[] = ['show','name', 'price', 'quantity', 'total'];
    dataSource = new MatTableDataSource();
    order: Order;
    states: Observable<State[]>;

    constructor(private route: ActivatedRoute,
        private snackBar: MatSnackBar,
        private stateService: StateService,
        private orderService: OrderService) { }

    ngOnInit() {
        this.route.params.pipe(
            switchMap(params => this.orderService.show(params.id))
        ).subscribe(order => {
            this.form = new FormGroup({
                id: new FormControl(order.id, [Validators.required]),
                state_id: new FormControl(order.state_id, [Validators.required])
            });
            this.order = order;
            this.dataSource.data = order.products;
        });
        this.states = this.stateService.index();
    }

    update() {
        this.orderService.update(this.form.value).subscribe(() => {
            this.snackBar.open('Pedido editado.', 'OK');
        });
    }
}
