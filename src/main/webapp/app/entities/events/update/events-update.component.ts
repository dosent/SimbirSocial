import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { IEvents, Events } from '../events.model';
import { EventsService } from '../service/events.service';
import { Publish } from 'app/entities/enumerations/publish.model';
import { Category } from 'app/entities/enumerations/category.model';

@Component({
  selector: 'jhi-events-update',
  templateUrl: './events-update.component.html',
})
export class EventsUpdateComponent implements OnInit {
  isSaving = false;
  publishValues = Object.keys(Publish);
  categoryValues = Object.keys(Category);

  editForm = this.fb.group({
    id: [],
    name: [null, [Validators.required]],
    description: [],
    date: [],
    latitude: [],
    longitude: [],
    user: [],
    pubish: [],
    category: [],
  });

  constructor(protected eventsService: EventsService, protected activatedRoute: ActivatedRoute, protected fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ events }) => {
      this.updateForm(events);
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const events = this.createFromForm();
    if (events.id !== undefined) {
      this.subscribeToSaveResponse(this.eventsService.update(events));
    } else {
      this.subscribeToSaveResponse(this.eventsService.create(events));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IEvents>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe({
      next: () => this.onSaveSuccess(),
      error: () => this.onSaveError(),
    });
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(events: IEvents): void {
    this.editForm.patchValue({
      id: events.id,
      name: events.name,
      description: events.description,
      date: events.date,
      latitude: events.latitude,
      longitude: events.longitude,
      user: events.user,
      pubish: events.pubish,
      category: events.category,
    });
  }

  protected createFromForm(): IEvents {
    return {
      ...new Events(),
      id: this.editForm.get(['id'])!.value,
      name: this.editForm.get(['name'])!.value,
      description: this.editForm.get(['description'])!.value,
      date: this.editForm.get(['date'])!.value,
      latitude: this.editForm.get(['latitude'])!.value,
      longitude: this.editForm.get(['longitude'])!.value,
      user: this.editForm.get(['user'])!.value,
      pubish: this.editForm.get(['pubish'])!.value,
      category: this.editForm.get(['category'])!.value,
    };
  }
}
