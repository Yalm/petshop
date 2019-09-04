import { Component } from '@angular/core';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.sass']
})
export class HomeComponent {

    sliders: any[];

    constructor() {
        this.sliders = [
            {
                image: 'assets/img/vet-bg-2-min.jpg',
                title: 'Bienestar de la mascota',
                text: 'Medicina preventiva,consulta,cirugía,imagenología,laboratorio,estética y mas...'
            },
            {
                image: 'assets/img/vet-bg-1-min.jpg',
                title: 'Servicios',
                text: 'Cuidado,alimentación,emfermedades,nutricón,reproducción y conducta,entre otros temas'
            }
        ];
    }
}
