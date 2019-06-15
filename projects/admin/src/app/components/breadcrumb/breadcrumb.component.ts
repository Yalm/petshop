import { Component, OnInit, Input } from '@angular/core';
import { ActivationEnd, Router, ActivationStart } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { Breadcrumb } from './Breadcrumb.model';

@Component({
    selector: 'app-breadcrumb',
    templateUrl: './breadcrumb.component.html',
    styleUrls: ['./breadcrumb.component.sass']
})
export class BreadcrumbComponent implements OnInit {
    data: Breadcrumb;
    @Input() darkTheme: boolean;

    constructor(private router: Router) {
        this.router.events.pipe(
            filter(event => event instanceof ActivationEnd && event.snapshot.children.length == 0),
            map((event: ActivationStart) => {
                if (Object.entries(event.snapshot.data).length !== 0 && event.snapshot.data.constructor === Object) {
                    return event.snapshot.data;
                } else {
                    return null;
                }
            })
        ).subscribe((data: Breadcrumb) => {
            this.data = data;
        })
    }

    ngOnInit() {



    }

}
