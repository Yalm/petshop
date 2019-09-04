import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatPaginator, MatSort, MatDialog } from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { PetDataSource } from '../../shared/class/pet-datasource';
import { DialogDeleteComponent } from '../dialog-delete/dialog-delete.component';
import { MatColumn } from './column.model';
import { Params } from '@angular/router';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

@Component({
    selector: 'app-mat-table',
    templateUrl: './mat-table.component.html',
    styleUrls: ['./mat-table.component.sass']
})
export class MatTableComponent<T = any> implements OnInit {
    private paramsSet: Params;
    displayedColumns: string[];
    dataSource: PetDataSource<T[]>;
    action: MatColumn;

    @Input() url: string;
    @Input() columns: MatColumn[];
    @Input() hiddenDelete: boolean;
    @Input() export: boolean;
    @Input() marginTop = true;
    @Input() sortActive = true;
    @Input() set params(value: Params) {
        if (this.dataSource) {
            this.dataSource.params = value;
        } else {
            this.paramsSet = value;
        }
    }

    @ViewChild(MatSort, { static: true }) sort: MatSort;
    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

    constructor(private http: HttpClient,
                private dialog: MatDialog) { }

    ngOnInit(): void {
        this.displayedColumns = this.columns.map(x => x.name);
        this.action = this.columns.find(x => x.name === 'actions');
        this.columns = this.columns.filter(x => x.name !== 'actions');
        this.dataSource = new PetDataSource(this.paginator, this.url, this.http, this.sort, this._params);
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

    exportAsExcelFile(): void {
        const data = this.dataSource.data.reduce((array, element) => {
            array.push(this.columns.reduce((object, column) => {
                object[column.colum_name] = element[column.name];
                return object;
            }, {} as T));
            return array;
        }, []);
        const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);
        const workbook: XLSX.WorkBook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
        const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        this.saveAsExcelFile(excelBuffer, 'reporte-excel');
    }

    private saveAsExcelFile(buffer: any, fileName: string): void {
        const data: Blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' });
        FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + '.xlsx');
    }
}
