import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { IFiles, Files } from '../files.model';
import { FilesService } from '../service/files.service';
import { IEvents } from 'app/entities/events/events.model';
import { EventsService } from 'app/entities/events/service/events.service';

@Component({
  selector: 'jhi-files-update',
  templateUrl: './files-update.component.html',
})
export class FilesUpdateComponent implements OnInit {
  isSaving = false;

  eventsSharedCollection: IEvents[] = [];

  editForm = this.fb.group({
    id: [],
    name: [null, [Validators.required]],
    description: [],
    path: [],
    idEvent: [],
  });

  constructor(
    protected filesService: FilesService,
    protected eventsService: EventsService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ files }) => {
      this.updateForm(files);

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const files = this.createFromForm();
    if (files.id !== undefined) {
      this.subscribeToSaveResponse(this.filesService.update(files));
    } else {
      this.subscribeToSaveResponse(this.filesService.create(files));
    }
  }

  trackEventsById(_index: number, item: IEvents): number {
    return item.id!;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IFiles>>): void {
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

  protected updateForm(files: IFiles): void {
    this.editForm.patchValue({
      id: files.id,
      name: files.name,
      description: files.description,
      path: files.path,
      idEvent: files.idEvent,
    });

    this.eventsSharedCollection = this.eventsService.addEventsToCollectionIfMissing(this.eventsSharedCollection, files.idEvent);
  }

  protected loadRelationshipsOptions(): void {
    this.eventsService
      .query()
      .pipe(map((res: HttpResponse<IEvents[]>) => res.body ?? []))
      .pipe(map((events: IEvents[]) => this.eventsService.addEventsToCollectionIfMissing(events, this.editForm.get('idEvent')!.value)))
      .subscribe((events: IEvents[]) => (this.eventsSharedCollection = events));
  }

  protected createFromForm(): IFiles {
    return {
      ...new Files(),
      id: this.editForm.get(['id'])!.value,
      name: this.editForm.get(['name'])!.value,
      description: this.editForm.get(['description'])!.value,
      path: this.editForm.get(['path'])!.value,
      idEvent: this.editForm.get(['idEvent'])!.value,
    };
  }
}
