import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { User } from '../../models/User.model';
import { Router } from '@angular/router';
import { MatTabChangeEvent } from '@angular/material';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit {

    @Input() darkTheme: boolean;
    @Output() activeDark = new EventEmitter();
    user: User;
    links: any[];

    constructor(public auth: AuthService,
        private router: Router) { }

    ngOnInit() {
        this.user = this.auth.getPayload();
        this.links = [
            { path: '/', icon: 'home', label: 'Inicio', options: { exact: true } },
            { path: '/catalog', icon: 'store', label: 'Catalogo' },
            { path: '/customers', icon: 'group', label: 'Clientes' },
            { path: '/users', icon: 'contacts', label: 'Usuarios' },
            { path: '/orders', icon: 'shopping_basket', label: 'Pedidos' },
            { path: '/reports/customers', icon: 'table_chart', label: 'Reportes' }
        ];
    }

    logout(): void {
        this.auth.logout().subscribe(() => {
            this.router.navigateByUrl('/login');
        });
    }
}
