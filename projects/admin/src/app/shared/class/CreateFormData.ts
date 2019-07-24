export function CreateFormData(options: { data: Object, update?: boolean }): FormData {
    const form_data = new FormData();
    for (const key in options.data) {
        if (options.data[key]) {
            form_data.append(key, options.data[key]);
        }
    }
    if(options.update) {
        form_data.delete('id');
        form_data.append('_method', 'PUT');
    }
    return form_data;
}
