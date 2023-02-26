export interface ClientTicket {
  id: number;
  resume: string;
  titre: string;
  date: string;
  statut: string;
  typeMateriel: string;
  ref: string;
}

export interface Inventaire {
  typeMateriel: string;
  marque: string;
  modele: string;
  quantity: number;
}
