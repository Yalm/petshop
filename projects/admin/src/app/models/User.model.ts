export interface Roles {
    subscriber?: boolean;
    editor?: boolean;
    admin?: boolean;
}

export interface User {
    uid: string;
    email: string;
    photoURL?: string;
    displayName: string;
    phone?: number;
    roles?: Roles;
}
