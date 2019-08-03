import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatPaginator, MatSort, MatDialog } from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { PetDataSource } from '../../shared/class/pet-datasource';
import { DialogDeleteComponent } from '../dialog-delete/dialog-delete.component';
import { MatColumn } from './column.model';

@Component({
    selector: 'app-mat-table',
    templateUrl: './mat-table.component.html',
    styleUrls: ['./mat-table.component.sass']
})
export class MatTableComponent<T = any> implements OnInit {

    displayedColumns: string[];
    dataSource: PetDataSource<T[]>;
    @Input() url: string;
    @Input() columns: MatColumn[];
    @Input() hiddenDelete: boolean;

    @ViewChild(MatSort, { static: true }) sort: MatSort;
    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

    constructor(private http: HttpClient,
        private dialog: MatDialog) { }

    ngOnInit(): void {
        this.displayedColumns = this.columns.map(x => x.name);
        this.columns = this.columns.filter(x => x.name != 'actions');
        this.dataSource = new PetDataSource(this.paginator, this.url, this.http, this.sort);
    }

    applyFilter(filterValue: string): void {
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    destroy(id: number): void {
        this.dialog.open(DialogDeleteComponent, {
            width: '250px'
        }).afterClosed().subscribe((result: boolean) => {
            if (result) {
                this.dataSource.destroy(id);
            }
        });
    }
}
