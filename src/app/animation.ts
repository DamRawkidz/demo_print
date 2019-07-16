import { trigger, state, style, transition, animate } from '@angular/animations';
export function rotateIcon(){
    return trigger('slide', [
        state('left', style({
          transform:'translateX(-100%)',
          opacity: 0,       
        })),
        state('right', style({
          transform:'translateX(0)',
          opacity: 1,
        })),
        transition('left => right', animate('500ms ease-out')),
        transition('right => left', animate('500ms ease-in'))
      ])  
}