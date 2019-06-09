import { Directive, Input } from '@angular/core';
import { environment } from 'src/environments/environment';

@Directive({
    selector: '[fallback-src]',
    host: {
        '(error)': 'updateUrl()',
        '[src]': 'src'
    }
})
export class FallbackSrcDirective {

    @Input() src: string;
    private default: string = environment.img_default;

    updateUrl() {
        this.src = this.default;
    }

}
