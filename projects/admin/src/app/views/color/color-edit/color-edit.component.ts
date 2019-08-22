import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Color } from 'src/app/models/Color.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ColorService } from 'src/app/services/color/color.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
    selector: 'app-color-edit',
    templateUrl: './color-edit.component.html',
    styleUrls: ['./color-edit.component.sass']
})
export class ColorEditComponent implements OnInit {
    form: FormGroup;

    constructor(
        private dialogRef: MatDialogRef<ColorEditComponent>,
        private colorService: ColorService,
        @Inject(MAT_DIALOG_DATA) public data: Color) { }

    onNoClick(): void {
        this.dialogRef.close();
    }

    ngOnInit() {
        this.form = new FormGroup({
            id: new FormControl(this.data.id, Validators.required),
            name: new FormControl(this.data.name, Validators.required)
        })
    }

    update(): void {
        this.colorService.update(this.form.value).subscribe(
            () => {
                this.dialogRef.close(this.form.value);
            }, (error: HttpErrorResponse) => {
                if (error.status == 422) {
                    this.form.get('name').setErrors({ 'unique': true });
                }
            }
        )
    }
}
