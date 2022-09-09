import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { FilesService } from '../service/files.service';

import { FilesComponent } from './files.component';

describe('Files Management Component', () => {
  let comp: FilesComponent;
  let fixture: ComponentFixture<FilesComponent>;
  let service: FilesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [FilesComponent],
    })
      .overrideTemplate(FilesComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(FilesComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(FilesService);

    const headers = new HttpHeaders();
    jest.spyOn(service, 'query').mockReturnValue(
      of(
        new HttpResponse({
          body: [{ id: 123 }],
          headers,
        })
      )
    );
  });

  it('Should call load all on init', () => {
    // WHEN
    comp.ngOnInit();

    // THEN
    expect(service.query).toHaveBeenCalled();
    expect(comp.files?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });
});
