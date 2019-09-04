import { Component, ViewChild, ElementRef, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
    selector: 'app-upload',
    templateUrl: './upload.component.html',
    styleUrls: ['./upload.component.sass'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => UploadComponent),
            multi: true
        }
    ]
})
export class UploadComponent implements ControlValueAccessor {

    @ViewChild('fileInput', { static: true }) private fileInput: ElementRef;
    @Input() multi: boolean;
    files: Array<any>;
    isDisabled: boolean;
    onChange = (_: any) => { };
    onTouch = () => { };

    async startUpload(files: FileList) {
        if (files && files[0]) {
            this.files = this.multi ? this.files : new Array();
            for (let i = 0; i < files.length; i++) {
                const type = files[i].type.split('/')[0];
                const data = await this.readUploadedFile(files[i]);
                if (type === 'image') {
                    this.files.push({ name: files[i].name, data: files[i], url: data });
                    this.onTouch();
                    this.onChange(files[i]);
                } else {
                    this.onTouch();
                    this.onChange(null);
                }
            }
            this.fileInput.nativeElement.value = '';
        }
    }

    deleteFile(index: number, event: Event) {
        this.files.splice(index, 1);
        this.onTouch();
        this.onChange(null);
        event.stopPropagation();
    }

    private readUploadedFile(file: File): Promise<string | ArrayBuffer> {
        const reader = new FileReader();

        return new Promise(resolve => {
            reader.onload = () => {
                resolve(reader.result);
            };
            reader.readAsDataURL(file);
        });
    }

    registerOnChange(fn) {
        this.onChange = fn;
    }

    registerOnTouched(fn) {
        this.onTouch = fn;
    }

    writeValue(value: string): void {
        this.files = value ? [{ name: 'portada', url: value }] : [];
    }

    setDisabledState(isDisabled: boolean): void {
        this.isDisabled = isDisabled;
    }

}
