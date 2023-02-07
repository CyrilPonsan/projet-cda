export default interface Conseiller {
  id: number;
  isValid: boolean;
  nom: string;
  prenom: string;
  roles: Array<string>;
}
