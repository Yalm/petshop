import {
    Injectable,
    ComponentFactoryResolver,
    ApplicationRef,
    Injector,
    EmbeddedViewRef,
    ComponentRef
} from '@angular/core';
import { Subject } from 'rxjs';
import { LoaderComponent } from '../../components/loader/loader.component';

@Injectable({
    providedIn: 'root'
})
export class LoaderService {
    private loaderSubject = new Subject<boolean>();
    loaderState = this.loaderSubject.asObservable();
    private dialogComponentRef: ComponentRef<LoaderComponent>;

    constructor(
        private componentFactoryResolver: ComponentFactoryResolver,
        private appRef: ApplicationRef,
        private injector: Injector
    ) { }

    show() {
        this.loaderSubject.next(true);
    }

    hide() {
        this.loaderSubject.next(false);
    }

    appendLoaderComponentToParent(el: HTMLElement) {
        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(LoaderComponent);
        const componentRef = componentFactory.create(this.injector);
        this.appRef.attachView(componentRef.hostView);

        const domElem = (componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
        el.appendChild(domElem);

        this.dialogComponentRef = componentRef;
    }

    removeLoaderComponentFromParent() {
        this.appRef.detachView(this.dialogComponentRef.hostView);
        this.dialogComponentRef.destroy();
    }
}
