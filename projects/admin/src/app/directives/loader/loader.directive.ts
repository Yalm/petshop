import { Directive, OnDestroy, Renderer2, ElementRef } from '@angular/core';
import { Subscription, timer } from 'rxjs';
import { LoaderService } from '../../services/loader/loader.service';
import { debounce, takeWhile } from 'rxjs/operators';

@Directive({
    selector: '[appLoader]'
})
export class LoaderDirective implements OnDestroy {
    private subscription: Subscription;
    private buttons: HTMLCollectionOf<HTMLButtonElement>;
    private count = 0;

    constructor(private renderer: Renderer2, private el: ElementRef, private loader: LoaderService) {
        this.loader.appendLoaderComponentToParent(el.nativeElement);
        this.subscription = loader.loaderState
            .pipe(
                debounce(() => timer(1000)),
                takeWhile((res) => res <= true)
            ).subscribe(state => {
                if (state) {
                    this.show();
                } else {
                    this.hide();
                }
            });
        this.buttons = this.el.nativeElement.parentElement ? this.el.nativeElement.parentElement.getElementsByTagName('button') : [];
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
        for (let index = 0; index < this.buttons.length; index++) {
            this.buttons[index].disabled = this.count === 0 ? this.buttons[index].disabled : enable;
        }
        this.count++;
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
        this.loader.removeLoaderComponentFromParent();
    }
}
