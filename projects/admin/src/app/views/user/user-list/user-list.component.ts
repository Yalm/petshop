import { Component, OnInit, ViewChild } from '@angular/core';
import { PetDataSource } from '../../../shared/class/pet-datasource';
import { MatPaginator, MatSort, MatDialog } from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { User } from '../../../models/User.model';
import { DialogDeleteComponent } from '../../../components/dialog-delete/dialog-delete.component';

@Component({
    selector: 'app-user-list',
    templateUrl: './user-list.component.html',
    styleUrls: ['./user-list.component.sass']
})
export class UserListComponent implements OnInit {

    displayedColumns: string[] = ['name', 'email', 'actived', 'actions'];
    dataSource: PetDataSource<User[]>;

    @ViewChild(MatSort, { static: true }) sort: MatSort;
    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

    constructor(private http: HttpClient,
        private dialog: MatDialog) { }

    ngOnInit() {
        this.dataSource = new PetDataSource(this.paginator, 'users', this.http, this.sort);
    }

    applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    destroy(id: number) {
        this.dialog.open(DialogDeleteComponent, {
            width: '250px'
        }).afterClosed().subscribe((result: boolean) => {
            if (result) {
                this.dataSource.destroy(id);
            }
        });
    }

}
