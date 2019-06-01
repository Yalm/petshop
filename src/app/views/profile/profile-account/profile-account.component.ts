import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { DocumentService } from 'src/app/services/identification-document/identification-document.service';
import { Observable } from 'rxjs';
import { IdentificationDocument } from 'src/app/models/IdentificationDocument.model';
import { AuthService } from '../../auth/services/auth/auth.service';
import { UserService } from 'src/app/services/user/user.service';
import { Customer } from '../../auth/models/customer';
import { AngularFirestore } from '@angular/fire/firestore';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-profile-account',
    templateUrl: './profile-account.component.html',
    styleUrls: ['./profile-account.component.sass']
})
export class ProfileAccountComponent implements OnInit {

    public form: FormGroup;
    public documents: Observable<IdentificationDocument[]>;

    constructor(private document: DocumentService,
        private userService: UserService,
        private firestore: AngularFirestore,
        private auth: AuthService) { }

    ngOnInit() {
        this.auth.customer$.subscribe(user => {
            this.form = new FormGroup({
                uid: new FormControl(user.uid, [Validators.required]),
                displayName: new FormControl(user.displayName, [Validators.required]),
                surnames: new FormControl(user.surnames, [Validators.required]),
                document_id: new FormControl(user.document_id ? user.document_id.id : null, [Validators.required]),
                document_number: new FormControl(user.document_number, [Validators.required]),
                phone: new FormControl(user.phone, [Validators.required]),
            });
        });
        this.documents = this.document.index();
    }

    public edit() {
        let data: Customer = this.form.value;
        data.document_id = this.firestore.doc(`documents/${data.document_id}`).ref;
        this.userService.edit(data).then(() => {
            Swal.fire(
                'Actualizado',
                'Su información ha sido actualizado.',
                'success'
            );
        });
    }

}
