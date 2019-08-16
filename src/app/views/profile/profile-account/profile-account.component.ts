import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { DocumentService } from 'src/app/services/identification-document/identification-document.service';
import { Observable } from 'rxjs';
import { IdentificationDocument } from 'src/app/models/IdentificationDocument.model';
import { AuthService } from '../../auth/services/auth/auth.service';
import { UserService } from 'src/app/services/user/user.service';
import { MatSnackBar } from '@angular/material';

@Component({
    selector: 'app-profile-account',
    templateUrl: './profile-account.component.html',
    styleUrls: ['./profile-account.component.sass']
})
export class ProfileAccountComponent implements OnInit {

    form: FormGroup;
    documents: Observable<IdentificationDocument[]>;

    constructor(private document: DocumentService,
        private snackBar: MatSnackBar,
        private userService: UserService,
        private auth: AuthService) { }

    ngOnInit(): void {
        this.auth.me().subscribe(customer => {
            this.form = new FormGroup({
                id: new FormControl(customer.id, Validators.required),
                name: new FormControl(customer.name, Validators.required),
                surnames: new FormControl(customer.surnames, Validators.required),
                document_id: new FormControl(customer.document_id, Validators.required),
                document_number: new FormControl(customer.document_number, [Validators.required,Validators.pattern('^[0-9]*$')]),
                phone: new FormControl(customer.phone, [Validators.required,Validators.pattern('^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$')])
            });
        });
        this.documents = this.document.index();
    }

    edit(): void {
        this.userService.edit(this.form.value).subscribe(() => {
            this.snackBar.open('Su información ha sido actualizado', 'Ok', { duration: 5000 });
        });
    }
}
