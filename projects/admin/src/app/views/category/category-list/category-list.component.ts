import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatPaginator, MatTableDataSource, MatDialog } from '@angular/material';
import { Category } from 'src/app/models/Category.model';
import { CategoryService } from 'src/app/services/category/category.service';
import { DialogDeleteComponent } from '../../../components/dialog-delete/dialog-delete.component';

@Component({
    selector: 'app-category-list',
    templateUrl: './category-list.component.html',
    styleUrls: ['./category-list.component.sass']
})
export class CategoryListComponent implements OnInit {

    displayedColumns: string[] = ['name', 'actions'];
    dataSource = new MatTableDataSource<Category>();

    @ViewChild(MatSort, { static: true }) sort: MatSort;
    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

    constructor(
        private categoryService: CategoryService,
        private dialog: MatDialog) { }

    ngOnInit() {
        this.categoryService.index({ all: true }).subscribe(response => {
            this.dataSource.data = response;
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
        });
    }

    applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    destroy(id: number) {
        this.dialog.open(DialogDeleteComponent, {
            width: '250px'
        }).afterClosed().subscribe((result: boolean) => {
            if (result) {
                this.categoryService.destroy(id).subscribe(() => {
                    const index = this.dataSource.data.findIndex(x => x.id === id);
                    this.dataSource.data.splice(index, 1);
                    this.dataSource._updateChangeSubscription();
                });
            }
        });
    }
}
