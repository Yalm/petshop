import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MatSnackBar } from '@angular/material';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ColorService } from 'src/app/services/color/color.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
    selector: 'app-color-create',
    templateUrl: './color-create.component.html',
    styleUrls: ['./color-create.component.sass']
})
export class ColorCreateComponent implements OnInit {
    form: FormGroup;

    constructor(
        private colorService: ColorService,
        private snackBar: MatSnackBar,
        public dialogRef: MatDialogRef<ColorCreateComponent>) { }

    onNoClick(): void {
        this.dialogRef.close();
    }

    ngOnInit() {
        this.form = new FormGroup({
            name: new FormControl(null, Validators.required)
        });
    }

    store(): void {
        this.colorService.store(this.form.value).subscribe(
            () => {
                this.dialogRef.close(this.form.value);
            }, (error: HttpErrorResponse) => {
                if (error.status == 500) {
                    this.snackBar.open('Oops, ocurrio un error.', '', {
                        duration: 5000,
                        panelClass: ['bg-danger', 'text-white']
                    });
                } else if (error.status == 422) {
                    this.form.get('name').setErrors({ 'unique': true });
                }
            }
        )
    }
}
