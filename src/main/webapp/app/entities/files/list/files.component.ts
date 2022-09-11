import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IFiles } from '../files.model';
import { FilesService } from '../service/files.service';
import { FilesDeleteDialogComponent } from '../delete/files-delete-dialog.component';

@Component({
  selector: 'jhi-files',
  templateUrl: './files.component.html',
})
export class FilesComponent implements OnInit {
  files?: IFiles[];
  isLoading = false;

  constructor(protected filesService: FilesService, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

    this.filesService.query().subscribe({
      next: (res: HttpResponse<IFiles[]>) => {
        this.isLoading = false;
        this.files = res.body ?? [];
      },
      error: () => {
        this.isLoading = false;
      },
    });
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(_index: number, item: IFiles): number {
    return item.id!;
  }

  delete(files: IFiles): void {
    const modalRef = this.modalService.open(FilesDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.files = files;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}
