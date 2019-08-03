import { Directive, OnDestroy, Renderer2, ElementRef } from '@angular/core';
import { Subscription, timer } from 'rxjs';
import { LoaderService } from '../../services/loader/loader.service';
import { debounce, takeWhile } from 'rxjs/operators';

@Directive({
    selector: '[appLoader]'
})
export class LoaderDirective implements OnDestroy {
    private subscription: Subscription;

    constructor(private renderer: Renderer2, private el: ElementRef, private loader: LoaderService) {
        this.loader.appendDialogComponentToBody(el.nativeElement);
        this.subscription = loader.loaderState
            .pipe(
                debounce(() => timer(1000)),
                takeWhile((res) => res <= true)
            ).subscribe(state => {
                if (state) { this.show(); }
                else { this.hide(); }
            });
    }

    private hide(): void {
        this.renderer.removeClass(this.el.nativeElement, 'load');
        this.setDisableOrEnable(false);
    }

    private show(): void {
        this.renderer.addClass(this.el.nativeElement, 'load');
        this.setDisableOrEnable();
    }

    private setDisableOrEnable(enable: boolean = true): void {
        const button = <HTMLInputElement>document.getElementsByClassName('link-new')[0];
        if (enable) {
            button.disabled = true;
            return;
        }
        button.disabled = false;
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.loader.removeDialogComponentFromBody();
    }
}
