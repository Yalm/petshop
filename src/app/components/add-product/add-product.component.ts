import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CartItem } from 'src/app/models/CartItem.model';

@Component({
    selector: 'app-add-product',
    templateUrl: './add-product.component.html',
    styleUrls: ['./add-product.component.sass']
})
export class AddProductComponent {

    constructor(
        public dialogRef: MatDialogRef<AddProductComponent>,
        @Inject(MAT_DIALOG_DATA) public data: CartItem
    ) { }

    onNoClick(): void {
        this.dialogRef.close();
    }
}
