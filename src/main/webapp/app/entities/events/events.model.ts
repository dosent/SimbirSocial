import dayjs from 'dayjs/esm';
import { Publish } from 'app/entities/enumerations/publish.model';
import { Category } from 'app/entities/enumerations/category.model';

export interface IEvents {
  id?: number;
  name?: string;
  description?: string | null;
  date?: dayjs.Dayjs | null;
  latitude?: number | null;
  longitude?: number | null;
  user?: string | null;
  pubish?: Publish | null;
  category?: Category | null;
}

export class Events implements IEvents {
  constructor(
    public id?: number,
    public name?: string,
    public description?: string | null,
    public date?: dayjs.Dayjs | null,
    public latitude?: number | null,
    public longitude?: number | null,
    public user?: string | null,
    public pubish?: Publish | null,
    public category?: Category | null
  ) {}
}

export function getEventsIdentifier(events: IEvents): number | undefined {
  return events.id;
}
