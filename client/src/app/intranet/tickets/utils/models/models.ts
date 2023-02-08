export interface Ticket {
  id: number;
  ref: string;
  materiel: Materiel;
  titre: string;
  resume: string;
  code: number;
  date: string;
  interventions?: Array<Intervention>;
}

export interface Client {
  id: number;
  contrat: string;
  nom: string;
  email: string;
  adresse: string;
  codePostal: string;
  ville: string;
  createdAt: string;
  updatedAt: string;
  raisonSociale: RaisonSociale;
}

export interface RaisonSociale {
  id: number;
  raisonSociale: string;
}

export interface Materiel {
  id: number;
  ref: string;
  client: Client;
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

export interface Intervention {
  id: number;
  date: Date;
  description: string;
  reponse: string;
  statut: Statut;
  conseiller: Conseiller;
  titre: string;
  lieuIntervention: string;
}

export interface Conseiller {
  nom: string;
  prenom: string;
}
