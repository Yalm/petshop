import { DocumentReference } from '@angular/fire/firestore';

export  interface Customer {
    uid: string,
    email:string,
    photoURL?: string,
    displayName?: string,
    surnames?: string,
    document_id?: DocumentReference,
    document_number?: number,
    phone?: number,
}
