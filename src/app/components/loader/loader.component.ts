import { Component } from '@angular/core';
import { LoaderService } from 'src/app/services/loader/loader.service';
import { timer, Observable } from 'rxjs';
import { debounce, takeWhile } from 'rxjs/operators';

@Component({
    selector: 'app-loader',
    templateUrl: './loader.component.html',
    styleUrls: ['./loader.component.sass']
})
export class LoaderComponent {
    loader$: Observable<boolean>;

    constructor(loaderService: LoaderService) {
        this.loader$ = loaderService.loaderState
            .pipe(
                debounce(() => timer(1000)),
                takeWhile((res) => res <= true)
            );
    }
}
