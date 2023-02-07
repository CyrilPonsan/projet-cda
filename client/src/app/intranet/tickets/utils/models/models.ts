export interface Ticket {
  id: number;
  ref: string;
  // todo client:Client;
  // todo materiel:Materiel;
  titre: string;
  resume: string;
  code: number;
  date: string;
}

export interface Client {
  id: number;
  contrat: string;
  nom: string;
  email: string;
  adresse: string;
  codepostal: string;
  ville: string;
  createdAt: string;
  updatedAt: string;
  raisonSociale: string;
}

export interface Materiel {
  id: number;
  typeMateriel: string;
  marque: string;
  modele: string;
  url: string;
  miseEnService: string;
  createdAt: string;
  updatedAt: string;
}

export interface Statut {
  id: number;
  code: number;
  label: string;
}
