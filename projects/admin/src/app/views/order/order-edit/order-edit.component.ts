import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { OrderService } from '../../../services/order/order.service';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { switchMap } from 'rxjs/operators';

@Component({
    selector: 'app-order-edit',
    templateUrl: './order-edit.component.html',
    styleUrls: ['./order-edit.component.sass']
})
export class OrderEditComponent implements OnInit {
    form: FormGroup;
    loading: boolean;
    constructor(private route: ActivatedRoute,
        private snackBar: MatSnackBar,
        private orderService: OrderService) { }

    ngOnInit() {
        this.route.params.pipe(
            switchMap(params => this.orderService.show(params.id))
        ).subscribe(order => {
            this.form = new FormGroup({
                id: new FormControl(order.id, [Validators.required]),
            });
        });
    }

    update() {}
}
