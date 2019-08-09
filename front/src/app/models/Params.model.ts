import { Params } from '@angular/router';

export class PetParams {

    params: Param[];
    constructor(private initData: { params: Params, filters?: string | string[] }) {
        this.params = Object.keys(this.initData.params)
            .reduce((data, param) => {
                data.push({ key: param, value: this.initData.params[param] });
                return data;
            }, []);
    }


    has(value: string): boolean {
        return this.params.find(element => element.value == value) ? true : false;
    }

    delete(key: string): Params {
        return this.params
            .filter(element => element.key !== key)
            .reduce((object, element) => {
                object[element.key] = element.value;
                return object;
            }, {});
    }
}

interface Param {
    key: string;
    value: string;
}
