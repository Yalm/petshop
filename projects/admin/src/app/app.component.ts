import { Component, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
})
export class AppComponent {
    activeDark = localStorage.getItem('dark') ? true : false;

    constructor(@Inject(DOCUMENT) private document: Document) {
        this.activeDarkTheme(this.activeDark);
    }

    private activeDarkTheme(active: boolean): void {
        if (active) {
            this.document.body.classList.add('dark-theme');
            localStorage.setItem('dark', 'true');
            this.activeDark = true;
        } else {
            this.document.body.classList.remove('dark-theme');
            localStorage.removeItem('dark');
            this.activeDark = false;
        }
    }
}
