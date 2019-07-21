import { Component, Input } from '@angular/core';
import { ActivationEnd, Router, ActivationStart, NavigationStart } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { Breadcrumb } from './Breadcrumb.model';

@Component({
    selector: 'app-breadcrumb',
    templateUrl: './breadcrumb.component.html',
    styleUrls: ['./breadcrumb.component.sass']
})
export class BreadcrumbComponent {
    data: Breadcrumb;
    @Input() darkTheme: boolean;

    constructor(private router: Router) {
        this.router.events.pipe(
            filter(event => event instanceof ActivationEnd && event.snapshot.children.length == 0),
            map((event: ActivationStart) => {
                const data = this.router.getCurrentNavigation().extras.state;
                if (Object.entries(event.snapshot.data).length !== 0 && event.snapshot.data.constructor === Object) {
                    return Object.assign(event.snapshot.data, data);
                } else {
                    return null;
                }
            })
        ).subscribe((data: Breadcrumb) => {
            this.data = data;
        })

        // this.router.events.pipe(
        //     filter(e => e instanceof NavigationStart),
        //     map(() => this.router.getCurrentNavigation().extras.state)
        // ).subscribe((data: Breadcrumb) => {
        //     console.log(data);
        // })
    }
}
