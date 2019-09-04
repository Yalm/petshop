import { Directive, Input, HostListener, ElementRef } from '@angular/core';
import { environment } from 'src/environments/environment';

@Directive({
    selector: '[appFallbackSrc]'
})
export class FallbackSrcDirective {

    private default: string = environment.img_default;
    private el: HTMLElement;

    constructor(el: ElementRef) {
        this.el = el.nativeElement;
    }

    @HostListener('error')
    updateUrl() {
        this.el.setAttribute('src', this.default);
    }
}
