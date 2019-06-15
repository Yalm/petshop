import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatTableDataSource, MatPaginator } from '@angular/material';

export interface User {
    name: string;
    nationality: string;
    type_doc: string;
    num_doc: number;
    num_legacy: number;
}

const ELEMENT_DATA: User[] = [
    { name: 'Hydrogen', nationality: 'Brasil', type_doc: 'D.N.I', num_doc: 74998182, num_legacy: 34568 },
    { name: 'Helium', nationality: 'Canada', type_doc: 'D.N.I', num_doc: 74998182, num_legacy: 34568 },
    { name: 'Lithium', nationality: 'Venezuela', type_doc: 'D.N.I', num_doc: 74998182, num_legacy: 34568 },
    { name: 'Beryllium', nationality: 'Paraguay', type_doc: 'D.N.I', num_doc: 74998182, num_legacy: 34568 },
    { name: 'Boron', nationality: 'Ecuador', type_doc: 'D.N.I', num_doc: 74998182, num_legacy: 34568 },
    { name: 'Carbon', nationality: 'Chile', type_doc: 'D.N.I', num_doc: 74998182, num_legacy: 34568 },
    { name: 'Nitrogen', nationality: 'Perú', type_doc: 'D.N.I', num_doc: 74998182, num_legacy: 34568 },
    { name: 'Oxygen', nationality: 'Argentina', type_doc: 'D.N.I', num_doc: 74998182, num_legacy: 34568 },
    { name: 'Fluorine', nationality: 'Bolivia', type_doc: 'D.N.I', num_doc: 74998182, num_legacy: 34568 },
    { name: 'Neon', nationality: 'Mexico', type_doc: 'D.N.I', num_doc: 74998182, num_legacy: 34568 }
];


@Component({
    selector: 'app-product-list',
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.sass']
})
export class ProductListComponent implements OnInit {

    displayedColumns: string[] = ['show', 'cover', 'name', 'price', 'stock', 'actions'];
    dataSource = new MatTableDataSource(ELEMENT_DATA);

    @ViewChild(MatSort, { static: true }) sort: MatSort;
    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
    constructor() { }

    ngOnInit() {
        this.dataSource.sort = this.sort;
    }

    applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }
}
