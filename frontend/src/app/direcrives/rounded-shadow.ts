import { Directive, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appRoundedShadow]',
})
export class RoundedShadow {
  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
  ) {
    this.renderer.setStyle(this.el.nativeElement, 'borderRadius', '10%');
    this.renderer.setStyle(this.el.nativeElement, 'boxShadow', '0 4px 10px rgba(0,0,0,0.2)');
  }
}
