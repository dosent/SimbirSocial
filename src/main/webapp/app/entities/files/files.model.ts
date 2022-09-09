import { IEvents } from 'app/entities/events/events.model';

export interface IFiles {
  id?: number;
  name?: string;
  description?: string | null;
  path?: string | null;
  idEvent?: IEvents | null;
}

export class Files implements IFiles {
  constructor(
    public id?: number,
    public name?: string,
    public description?: string | null,
    public path?: string | null,
    public idEvent?: IEvents | null
  ) {}
}

export function getFilesIdentifier(files: IFiles): number | undefined {
  return files.id;
}
