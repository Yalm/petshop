import { Component, OnInit, Input, Output,EventEmitter } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit {

    @Input() darkTheme: boolean;
    @Output() activeDark = new EventEmitter();

    constructor(public auth: AuthService) { }

    ngOnInit() { }


}
