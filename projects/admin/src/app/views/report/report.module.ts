import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopCustomerComponent } from './top-customer/top-customer.component';
import { TopProductComponent } from './top-product/top-product.component';
import { RouterModule } from '@angular/router';
import { ReportRoutingModule } from './report-routing.module';
import { IndexReportComponent } from './index-report/index-report.component';
import { SharedModule } from '../../modules/shared.module';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { DateFilterComponent } from './date-filter/date-filter.component';
import { PurchasesComponent } from './purchases/purchases.component';
import { MatTableModule } from '../../components/mat-table/mat-table.module';

@NgModule({
    declarations: [
        TopCustomerComponent,
        TopProductComponent,
        IndexReportComponent,
        DateFilterComponent,
        PurchasesComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        MatDatepickerModule,
        MatNativeDateModule,
        RouterModule.forChild(ReportRoutingModule),
        MatTableModule
    ]
})
export class ReportModule { }
