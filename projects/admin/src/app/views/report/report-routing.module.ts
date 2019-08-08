import { Routes } from '@angular/router';
import { TopCustomerComponent } from './top-customer/top-customer.component';
import { TopProductComponent } from './top-product/top-product.component';
import { IndexReportComponent } from './index-report/index-report.component';
import { PurchasesComponent } from './purchases/purchases.component';

export const ReportRoutingModule: Routes = [
    {
        path: '', component: IndexReportComponent, children: [
            {
                path: 'customers', component: TopCustomerComponent, data: {
                    icon: 'table_chart',
                    name: 'Reportes',
                    text: 'Mejores clientes'
                }
            },
            {
                path: 'products', component: TopProductComponent, data: {
                    icon: 'table_chart',
                    name: 'Reportes',
                    text: 'Productos más vendidos'
                }
            },
            {
                path: 'purchases', component: PurchasesComponent, data: {
                    icon: 'table_chart',
                    name: 'Reportes',
                    text: 'Pedidos'
                }
            }
        ]
    }
];
