interface Entiry {
  id: string;
}

export interface Remocon extends Entiry {
  name: string;
}

export interface Signal extends Entiry {
  name: string;
  remocon_id: string;
}
