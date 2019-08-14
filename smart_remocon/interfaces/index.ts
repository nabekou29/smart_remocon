interface Entiry {
  id: string | undefined;
}

export interface Remocon extends Entiry {
  name: string;
}

export interface Signal extends Entiry {
  id: string | undefined;
  name: string;
  remocon_id: string;
}
