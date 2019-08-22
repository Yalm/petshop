import { Component, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
    selector: 'app-breadcrumb',
    templateUrl: './breadcrumb.component.html',
    styleUrls: ['./breadcrumb.component.sass']
})
export class BreadcrumbComponent {

    @Input() image: string = '/assets/img/breadcrumb-01.jpg';
    @Input() title: string;
    @Input() subTitle: string;
    @Input() class: string;
    @Input() padding: string = '8.5em 0';

    constructor(private sanitizer: DomSanitizer) { }

    getBackground() {
        if(this.image) {
            return this.sanitizer.bypassSecurityTrustStyle(`url(${this.image})`);
        }
    }
}
