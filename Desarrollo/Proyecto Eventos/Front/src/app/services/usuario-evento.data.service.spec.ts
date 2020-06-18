import { TestBed } from '@angular/core/testing';

import { UsuarioEvento.DataService } from './usuario-evento.data.service';

describe('UsuarioEvento.DataService', () => {
  let service: UsuarioEvento.DataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsuarioEvento.DataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
