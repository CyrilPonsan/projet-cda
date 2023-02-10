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
  state('closed', style({ left: '-100%' })),
  state('open', style({ left: '50%' })),
  transition('closed <=> open', [animate(1000)]),
]);
