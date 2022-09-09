import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IFiles, getFilesIdentifier } from '../files.model';

export type EntityResponseType = HttpResponse<IFiles>;
export type EntityArrayResponseType = HttpResponse<IFiles[]>;

@Injectable({ providedIn: 'root' })
export class FilesService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/files');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(files: IFiles): Observable<EntityResponseType> {
    return this.http.post<IFiles>(this.resourceUrl, files, { observe: 'response' });
  }

  update(files: IFiles): Observable<EntityResponseType> {
    return this.http.put<IFiles>(`${this.resourceUrl}/${getFilesIdentifier(files) as number}`, files, { observe: 'response' });
  }

  partialUpdate(files: IFiles): Observable<EntityResponseType> {
    return this.http.patch<IFiles>(`${this.resourceUrl}/${getFilesIdentifier(files) as number}`, files, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IFiles>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IFiles[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addFilesToCollectionIfMissing(filesCollection: IFiles[], ...filesToCheck: (IFiles | null | undefined)[]): IFiles[] {
    const files: IFiles[] = filesToCheck.filter(isPresent);
    if (files.length > 0) {
      const filesCollectionIdentifiers = filesCollection.map(filesItem => getFilesIdentifier(filesItem)!);
      const filesToAdd = files.filter(filesItem => {
        const filesIdentifier = getFilesIdentifier(filesItem);
        if (filesIdentifier == null || filesCollectionIdentifiers.includes(filesIdentifier)) {
          return false;
        }
        filesCollectionIdentifiers.push(filesIdentifier);
        return true;
      });
      return [...filesToAdd, ...filesCollection];
    }
    return filesCollection;
  }
}
