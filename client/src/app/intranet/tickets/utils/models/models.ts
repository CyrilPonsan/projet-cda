export interface Ticket {
  id: number;
  ref: string;
  client: Client;
  materiel: Materiel;
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
  typeMateriel: TypeMateriel;
  marque: Marque;
  modele: Modele;
  miseEnService: string;
  createdAt: string;
  updatedAt: string;
}

export interface Statut {
  id: number;
  code: number;
  label: string;
}

export interface TypeMateriel {
  id: number;
  type: string;
}

export interface Marque {
  id: number;
  marque: string;
}

export interface Modele {
  id: number;
  modele: string;
  url: string;
}
