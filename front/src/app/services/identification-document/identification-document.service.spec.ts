import { TestBed } from '@angular/core/testing';

import { DocumentService } from './identification-document.service';

describe('DocumentService', () => {
    beforeEach(() => TestBed.configureTestingModule({}));

    it('should be created', () => {
        const service: DocumentService = TestBed.get(DocumentService);
        expect(service).toBeTruthy();
    });
});
