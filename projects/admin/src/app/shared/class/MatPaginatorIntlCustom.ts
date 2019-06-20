import { MatPaginatorIntl } from '@angular/material';
import { Injectable } from '@angular/core';

@Injectable()

export class MatPaginatorIntlCustom extends MatPaginatorIntl {
    itemsPerPageLabel = 'Artículos por página:';
    nextPageLabel = 'Siguiente página';
    previousPageLabel = 'Pagina anterior';
    firstPageLabel = 'Primera pagina';
    lastPageLabel = 'Ultima pagina';
}
