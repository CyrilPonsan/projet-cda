import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

export let fade = trigger('fade', [
  state('void', style({ opacity: 0 })),
  transition(':enter', [animate(1000)]),
]);

export let slide = trigger('slide', [
  state('closed', style({ right: '-25%' })),
  state('open', style({ right: '0%' })),
  transition('closed <=> open', [animate(500)]),
]);
