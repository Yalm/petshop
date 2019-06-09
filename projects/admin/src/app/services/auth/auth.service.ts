import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { User } from '../../models/User.model';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    public user$: Observable<User>;

    constructor(
        private afAuth: AngularFireAuth,
        private afs: AngularFirestore,
        private router: Router,
    ) {
        this.user$ = this.afAuth.authState
            .pipe(
                switchMap(user => {
                    if (user) {
                        return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
                    } else {
                        return of(null);
                    }
                })
            );
    }

    public async googleSignIn() {
        const provider = new auth.GoogleAuthProvider();
        const credential = await this.afAuth.auth.signInWithPopup(provider);
        console.log('xd');
        const user = await this.user$.toPromise();
        if (user) {
            return this.updateCustomerData(credential.user);
        } else {
            await this.afAuth.auth.signOut();
            throw { code: 'auth/user-not-found' };
        }
    }

    public async defaultSignIn(data) {
        const credential = await this.afAuth.auth.signInWithEmailAndPassword(data.email, data.password);
        const user = await this.user$.toPromise();
        if (user) {
            return credential;
        } else {
            await this.afAuth.auth.signOut();
            throw { code: 'auth/user-not-found' };
        }
    }

    public async signOut() {
        await this.afAuth.auth.signOut();
        return this.router.navigateByUrl('/login');
    }

    public async sendPasswordResetEmail(email: string): Promise<void> {
        return this.afAuth.auth.sendPasswordResetEmail(email);
    }

    private updateCustomerData({ uid, displayName, photoURL }: User) {
        const data = {
            displayName,
            photoURL: photoURL || ''
        }
        return this.afs.doc(`users/${uid}`).update(data);
    }

    ///// Role-based Authorization //////
    canRead(user: User): boolean {
        const allowed = ['admin', 'editor', 'subscriber']
        return this.checkAuthorization(user, allowed)
    }

    canEdit(user: User): boolean {
        const allowed = ['admin', 'editor']
        return this.checkAuthorization(user, allowed)
    }

    canDelete(user: User): boolean {
        const allowed = ['admin']
        return this.checkAuthorization(user, allowed)
    }

    // determines if user has matching role
    private checkAuthorization(user: User, allowedRoles: string[]): boolean {
        if (!user) return false
        for (const role of allowedRoles) {
            if (user.roles[role]) {
                return true
            }
        }
        return false
    }
}
