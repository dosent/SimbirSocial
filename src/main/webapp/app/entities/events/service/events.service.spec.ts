import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import dayjs from 'dayjs/esm';

import { DATE_FORMAT } from 'app/config/input.constants';
import { Publish } from 'app/entities/enumerations/publish.model';
import { Category } from 'app/entities/enumerations/category.model';
import { IEvents, Events } from '../events.model';

import { EventsService } from './events.service';

describe('Events Service', () => {
  let service: EventsService;
  let httpMock: HttpTestingController;
  let elemDefault: IEvents;
  let expectedResult: IEvents | IEvents[] | boolean | null;
  let currentDate: dayjs.Dayjs;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(EventsService);
    httpMock = TestBed.inject(HttpTestingController);
    currentDate = dayjs();

    elemDefault = {
      id: 0,
      name: 'AAAAAAA',
      description: 'AAAAAAA',
      date: currentDate,
      latitude: 0,
      longitude: 0,
      user: 'AAAAAAA',
      pubish: Publish.PUBLIC,
      category: Category.SPORT,
    };
  });

  describe('Service methods', () => {
    it('should find an element', () => {
      const returnedFromService = Object.assign(
        {
          date: currentDate.format(DATE_FORMAT),
        },
        elemDefault
      );

      service.find(123).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(elemDefault);
    });

    it('should create a Events', () => {
      const returnedFromService = Object.assign(
        {
          id: 0,
          date: currentDate.format(DATE_FORMAT),
        },
        elemDefault
      );

      const expected = Object.assign(
        {
          date: currentDate,
        },
        returnedFromService
      );

      service.create(new Events()).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a Events', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          name: 'BBBBBB',
          description: 'BBBBBB',
          date: currentDate.format(DATE_FORMAT),
          latitude: 1,
          longitude: 1,
          user: 'BBBBBB',
          pubish: 'BBBBBB',
          category: 'BBBBBB',
        },
        elemDefault
      );

      const expected = Object.assign(
        {
          date: currentDate,
        },
        returnedFromService
      );

      service.update(expected).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a Events', () => {
      const patchObject = Object.assign(
        {
          date: currentDate.format(DATE_FORMAT),
          longitude: 1,
          category: 'BBBBBB',
        },
        new Events()
      );

      const returnedFromService = Object.assign(patchObject, elemDefault);

      const expected = Object.assign(
        {
          date: currentDate,
        },
        returnedFromService
      );

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of Events', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          name: 'BBBBBB',
          description: 'BBBBBB',
          date: currentDate.format(DATE_FORMAT),
          latitude: 1,
          longitude: 1,
          user: 'BBBBBB',
          pubish: 'BBBBBB',
          category: 'BBBBBB',
        },
        elemDefault
      );

      const expected = Object.assign(
        {
          date: currentDate,
        },
        returnedFromService
      );

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toContainEqual(expected);
    });

    it('should delete a Events', () => {
      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult);
    });

    describe('addEventsToCollectionIfMissing', () => {
      it('should add a Events to an empty array', () => {
        const events: IEvents = { id: 123 };
        expectedResult = service.addEventsToCollectionIfMissing([], events);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(events);
      });

      it('should not add a Events to an array that contains it', () => {
        const events: IEvents = { id: 123 };
        const eventsCollection: IEvents[] = [
          {
            ...events,
          },
          { id: 456 },
        ];
        expectedResult = service.addEventsToCollectionIfMissing(eventsCollection, events);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a Events to an array that doesn't contain it", () => {
        const events: IEvents = { id: 123 };
        const eventsCollection: IEvents[] = [{ id: 456 }];
        expectedResult = service.addEventsToCollectionIfMissing(eventsCollection, events);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(events);
      });

      it('should add only unique Events to an array', () => {
        const eventsArray: IEvents[] = [{ id: 123 }, { id: 456 }, { id: 33671 }];
        const eventsCollection: IEvents[] = [{ id: 123 }];
        expectedResult = service.addEventsToCollectionIfMissing(eventsCollection, ...eventsArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const events: IEvents = { id: 123 };
        const events2: IEvents = { id: 456 };
        expectedResult = service.addEventsToCollectionIfMissing([], events, events2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(events);
        expect(expectedResult).toContain(events2);
      });

      it('should accept null and undefined values', () => {
        const events: IEvents = { id: 123 };
        expectedResult = service.addEventsToCollectionIfMissing([], null, events, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(events);
      });

      it('should return initial array if no Events is added', () => {
        const eventsCollection: IEvents[] = [{ id: 123 }];
        expectedResult = service.addEventsToCollectionIfMissing(eventsCollection, undefined, null);
        expect(expectedResult).toEqual(eventsCollection);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
