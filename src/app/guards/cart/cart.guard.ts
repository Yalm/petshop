import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ShoppingCartService } from 'src/app/services/shopping-cart/shopping-cart.service';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class CartGuard implements CanActivate {
    constructor(private shoppingCartService: ShoppingCartService, private router: Router) { }

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> {
        return this.shoppingCartService.cart$.pipe(
            map(cart => {
                if (cart.items.length > 0) {
                    return true;
                } else {
                    return this.router.parseUrl('/cart');
                }
            })
        );
    }

}
