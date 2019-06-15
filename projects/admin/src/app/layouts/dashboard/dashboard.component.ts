import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.sass']
})
export class DashboardComponent implements OnInit {

    darkTheme = localStorage.getItem('dark') ? true : false;;

    constructor(@Inject(DOCUMENT) private document: Document) { }

    ngOnInit() {
    }
    activeDarkTheme(active: boolean): void {
        if (active) {
            this.document.body.classList.add('dark-theme');
            localStorage.setItem('dark', 'true');
            this.darkTheme = true;
        } else {
            this.document.body.classList.remove('dark-theme');
            localStorage.removeItem('dark');
            this.darkTheme = false;
        }
    }

}
