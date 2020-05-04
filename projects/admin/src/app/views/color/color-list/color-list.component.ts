import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSort, } from '@angular/material/sort';
import { MatTableDataSource, } from '@angular/material/table';
import { MatPaginator, } from '@angular/material/paginator';
import { ColorService } from 'src/app/services/color/color.service';
import { Color } from 'src/app/models/Color.model';
import { ColorCreateComponent } from '../color-create/color-create.component';
import { ColorEditComponent } from '../color-edit/color-edit.component';
import { DialogDeleteComponent } from '../../../components/dialog-delete/dialog-delete.component';

@Component({
    selector: 'app-color-list',
    templateUrl: './color-list.component.html',
    styleUrls: ['./color-list.component.sass']
})
export class ColorListComponent implements OnInit {
    displayedColumns: string[] = ['name', 'actions'];
    dataSource = new MatTableDataSource<Color>();

    @ViewChild(MatSort, { static: true }) sort: MatSort;
    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

    constructor(private colorService: ColorService,
        private dialog: MatDialog) { }

    ngOnInit(): void {
        this.colorService.index().subscribe(response => {
            this.dataSource.data = response;
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
        });
    }

    applyFilter(filterValue: string): void {
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    create(): void {
        this.dialog.open(ColorCreateComponent, {
            width: '550px'
        }).afterClosed().subscribe((result: Color) => {
            if (result) {
                this.dataSource.data.unshift(result);
                this.dataSource._updateChangeSubscription();
            }
        });
    }

    edit(data: Color): void {
        this.dialog.open(ColorEditComponent, {
            width: '550px',
            data
        }).afterClosed().subscribe((result: Color) => {
            if (result) {
                const index = this.dataSource.data.findIndex(x => x.id === result.id);
                this.dataSource.data[index] = result;
                this.dataSource._updateChangeSubscription();
            }
        });
    }

    destroy(id: number) {
        this.dialog.open(DialogDeleteComponent, {
            width: '250px'
        }).afterClosed().subscribe((result: boolean) => {
            if (result) {
                this.colorService.destroy(id).subscribe(() => {
                    const index = this.dataSource.data.findIndex(x => x.id === id);
                    this.dataSource.data.splice(index, 1);
                    this.dataSource._updateChangeSubscription();
                });
            }
        });

    }
}
