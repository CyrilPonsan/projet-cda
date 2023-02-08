import { Injectable } from '@angular/core';

@Injectable()
export class PaginationService {
  page = 1;
  max = 10;
  totalPages!: number;
  total!: number;
  next!: string;
  previous!: string;
  constructor() {}

  /**
   * initialise les propriétés servant a appliquer le style inline
   * @param value boolean : résultats des méthodes setPrevious() et
   * setNext()
   * @returns string : style à appliquer aux boutons du système de pagination
   */
  private testButtons(value: boolean): string {
    return value ? 'visible' : 'hidden';
  }

  /**
   *
   * @returns string : visible ou hidden, définit le style à appliquer aux
   * boutons du système de pagination
   */
  setPrevious(): string {
    return this.testButtons(this.page > 1);
  }

  /**
   *
   * @returns string : visible ou hidden, définit le style à appliquer aux
   * boutons du système de pagination
   */
  setNext() {
    return this.testButtons(this.page !== this.totalPages);
  }

  /**
   * calcul le nombre max de pages enfonction du nbre total de courriers
   * trouvés et du nbre d'enregistrements affichés à l'écran
   * @param value valeur retournée par le backend correspondant au nombre
   * toral de courriers trouvés après filtrage
   */
  setPagesMax(value: number): void {
    this.totalPages =
      value % this.max !== 0
        ? Math.trunc(value / this.max) + 1
        : value / this.max;
  }

  /**
   * appele les méthodes qui vont définir le style des boutons du
   * système de pagination
   */
  setButtonsStyle(size: number): void {
    this.previous = this.setPrevious();
    this.next = this.setNext();
  }
}
