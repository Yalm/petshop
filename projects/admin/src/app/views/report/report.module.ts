import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopCustomerComponent } from './top-customer/top-customer.component';
import { TopProductComponent } from './top-product/top-product.component';
import { RouterModule } from '@angular/router';
import { ReportRoutingModule } from './report-routing.module';
import { IndexReportComponent } from './index-report/index-report.component';
import { SharedModule } from '../../modules/shared.module';
import { MatDatepickerModule, MatNativeDateModule } from '@angular/material';
import { DateFilterComponent } from './date-filter/date-filter.component';
import { PurchasesComponent } from './purchases/purchases.component';

@NgModule({
    declarations: [TopCustomerComponent, TopProductComponent, IndexReportComponent, DateFilterComponent, PurchasesComponent],
    imports: [
        CommonModule,
        SharedModule,
        MatDatepickerModule,
        MatNativeDateModule,
        RouterModule.forChild(ReportRoutingModule)
    ]
})
export class ReportModule { }
