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

    public form: FormGroup;
    public documents: Observable<IdentificationDocument[]>;

    constructor(private document: DocumentService,
        private snackBar: MatSnackBar,
        private userService: UserService,
        private auth: AuthService) { }

    ngOnInit() {
        this.auth.me().subscribe(user => {
            this.form = new FormGroup({
                id: new FormControl(user.id, [Validators.required]),
                name: new FormControl(user.name, [Validators.required]),
                surnames: new FormControl(user.surnames, [Validators.required]),
                document_id: new FormControl(user.document_id, [Validators.required]),
                document_number: new FormControl(user.document_number, [Validators.required]),
                phone: new FormControl(user.phone, [Validators.required]),
            });
        });
        this.documents = this.document.index();
    }

    public edit() {
        this.userService.edit(this.form.value).subscribe(() => {
            this.snackBar.open('Su información ha sido actualizado', 'Ok');
        });
    }

}
