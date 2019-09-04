export function CreateFormData(options: { data: any, update?: boolean }): FormData {
    const FORM_DATA = new FormData();
    for (const key in options.data) {
        if (options.data[key]) {
            FORM_DATA.append(key, options.data[key]);
        }
    }
    if (options.update) {
        FORM_DATA.delete('id');
        FORM_DATA.append('_method', 'PUT');
    }
    return FORM_DATA;
}
