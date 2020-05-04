import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
    selector: 'app-dialog-delete',
    templateUrl: './dialog-delete.component.html',
    styleUrls: ['./dialog-delete.component.sass']
})
export class DialogDeleteComponent {

    constructor(
        private dialogRef: MatDialogRef<DialogDeleteComponent>) { }

    onNoClick(): void {
        this.dialogRef.close();
    }

}
