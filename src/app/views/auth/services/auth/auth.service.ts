import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Customer } from '../../models/customer';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    public customer$: Observable<Customer>;

    constructor(
        private afAuth: AngularFireAuth,
        private afs: AngularFirestore,
        private router: Router,
    ) {
        this.customer$ = this.afAuth.authState.pipe(
            switchMap(customer => {
                if (customer) {
                    if (!customer.emailVerified) { return of(null); }
                    else { return this.afs.doc<Customer>(`customers/${customer.uid}`).valueChanges(); }
                } else {
                    return of(null);
                }
            })
        );
    }
    public async googleSignIn() {
        const provider = new auth.GoogleAuthProvider();
        const credential = await this.afAuth.auth.signInWithPopup(provider);
        return this.updateCustomerData(credential.user);
    }

    public async defaultSignIn(email: string, password: string) {
        const credential = await this.afAuth.auth.signInWithEmailAndPassword(email, password);
        if (!credential.user.emailVerified) {
            await this.afAuth.auth.signOut();
            throw "email no verifed";
        } else {
            return credential;
        }
    }

    public async doRegister(email: string, password: string, name: string): Promise<void> {
        const credential = await this.afAuth.auth.createUserWithEmailAndPassword(email, password);
        const data: Customer = {
            email,
            displayName: name,
            uid: credential.user.uid
        };
        await this.sendSignInLinkToEmail();
        await this.afAuth.auth.signOut();
        return this.updateCustomerData(data);
    }

    public isSignInWithEmailLink(emailLink: string): boolean {
        return this.afAuth.auth.isSignInWithEmailLink(emailLink);
    }

    public async signInWithEmailLink(name: string, email: string, emailLink: string): Promise<void> {
        const credential = await this.afAuth.auth.signInWithEmailLink(email, emailLink);
        const data: Customer = {
            email,
            displayName: name,
            uid: credential.user.uid
        };
        return this.updateCustomerData(data);
    }

    public async signOut() {
        await this.afAuth.auth.signOut();
        return this.router.navigate(['/']);
    }

    public async sendPasswordResetEmail(email: string): Promise<void> {
        return this.afAuth.auth.sendPasswordResetEmail(email);
    }

    private sendSignInLinkToEmail(): Promise<void> {
        const actionCodeSettings = {
            url: `http://${window.location.hostname}:4200/login`,
            handleCodeInApp: true
        };
        return this.afAuth.auth.currentUser.sendEmailVerification(actionCodeSettings);
    }

    private updateCustomerData({ uid, email, displayName, photoURL }: Customer) {
        const customerRef: AngularFirestoreDocument<Customer> = this.afs.doc(`customers/${uid}`);
        const data = {
            uid,
            email,
            displayName,
            photoURL: photoURL || ''
        }
        return customerRef.set(data, { merge: true });
    }
}
