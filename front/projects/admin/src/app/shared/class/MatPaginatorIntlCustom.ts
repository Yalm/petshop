import { MatPaginatorIntl } from '@angular/material';
import { Injectable } from '@angular/core';

@Injectable()

export class MatPaginatorIntlCustom extends MatPaginatorIntl {
    itemsPerPageLabel = 'Artículos por página:';
    nextPageLabel = 'Siguiente página';
    previousPageLabel = 'Pagina anterior';
    firstPageLabel = 'Primera pagina';
    lastPageLabel = 'Ultima pagina';

    getRangeLabel = (page: number, pageSize: number, length: number) => {
        if (length == 0 || pageSize == 0) {
            return `0 de ${length}`;
        }
        length = Math.max(length, 0);
        const startIndex = page * pageSize;
        const endIndex = startIndex < length ? Math.min(startIndex + pageSize, length) : startIndex + pageSize;
        return `${startIndex + 1} - ${endIndex} de ${length}`;
    }
}
