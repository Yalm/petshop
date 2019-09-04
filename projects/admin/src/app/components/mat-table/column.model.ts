export interface MatColumn<T = any> {
    name: string;
    colum_name?: string;
    pipe?: string;
    class?: string;
    prefix?: string;
    link?: Link<T>;
}

interface Link<T> {
    icon?: string;
    label?: string;
    action?: string | string[];
    actionAndElement?: (element: T) => string | string[];
}
