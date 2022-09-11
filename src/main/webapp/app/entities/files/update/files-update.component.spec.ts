import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { FilesService } from '../service/files.service';
import { IFiles, Files } from '../files.model';
import { IEvents } from 'app/entities/events/events.model';
import { EventsService } from 'app/entities/events/service/events.service';

import { FilesUpdateComponent } from './files-update.component';

describe('Files Management Update Component', () => {
  let comp: FilesUpdateComponent;
  let fixture: ComponentFixture<FilesUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let filesService: FilesService;
  let eventsService: EventsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [FilesUpdateComponent],
      providers: [
        FormBuilder,
        {
          provide: ActivatedRoute,
          useValue: {
            params: from([{}]),
          },
        },
      ],
    })
      .overrideTemplate(FilesUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(FilesUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    filesService = TestBed.inject(FilesService);
    eventsService = TestBed.inject(EventsService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Events query and add missing value', () => {
      const files: IFiles = { id: 456 };
      const idEvent: IEvents = { id: 82897 };
      files.idEvent = idEvent;

      const eventsCollection: IEvents[] = [{ id: 31339 }];
      jest.spyOn(eventsService, 'query').mockReturnValue(of(new HttpResponse({ body: eventsCollection })));
      const additionalEvents = [idEvent];
      const expectedCollection: IEvents[] = [...additionalEvents, ...eventsCollection];
      jest.spyOn(eventsService, 'addEventsToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ files });
      comp.ngOnInit();

      expect(eventsService.query).toHaveBeenCalled();
      expect(eventsService.addEventsToCollectionIfMissing).toHaveBeenCalledWith(eventsCollection, ...additionalEvents);
      expect(comp.eventsSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const files: IFiles = { id: 456 };
      const idEvent: IEvents = { id: 58471 };
      files.idEvent = idEvent;

      activatedRoute.data = of({ files });
      comp.ngOnInit();

      expect(comp.editForm.value).toEqual(expect.objectContaining(files));
      expect(comp.eventsSharedCollection).toContain(idEvent);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Files>>();
      const files = { id: 123 };
      jest.spyOn(filesService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ files });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: files }));
      saveSubject.complete();

      // THEN
      expect(comp.previousState).toHaveBeenCalled();
      expect(filesService.update).toHaveBeenCalledWith(files);
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Files>>();
      const files = new Files();
      jest.spyOn(filesService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ files });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: files }));
      saveSubject.complete();

      // THEN
      expect(filesService.create).toHaveBeenCalledWith(files);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Files>>();
      const files = { id: 123 };
      jest.spyOn(filesService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ files });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(filesService.update).toHaveBeenCalledWith(files);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Tracking relationships identifiers', () => {
    describe('trackEventsById', () => {
      it('Should return tracked Events primary key', () => {
        const entity = { id: 123 };
        const trackResult = comp.trackEventsById(0, entity);
        expect(trackResult).toEqual(entity.id);
      });
    });
  });
});
