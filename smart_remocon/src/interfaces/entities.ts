import { Dayjs } from 'dayjs';

interface Entity {
  id: string;
}

export interface Remocon extends Entity {
  name: string;
}

export interface Signal extends Entity {
  name: string;
  remocon_id: string;
}
