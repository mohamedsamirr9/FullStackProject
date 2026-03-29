import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appHoverCard]',
})
export class HoverCard {
  @Input() hoverScale: number = 1.03;
  @Input() hoverShadow: string = '5px 10px 20px gray';
  hoverTransition: string = 'transform 150ms ease , box-shadow 150ms ease';
  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
  ) {
    this.renderer.setStyle(this.el.nativeElement, 'transition', this.hoverTransition);
  }

  @HostListener('mouseenter') onEnter() {
    this.renderer.setStyle(this.el.nativeElement, 'transform', `scale(${this.hoverScale})`);
    this.renderer.setStyle(this.el.nativeElement, 'boxShadow', this.hoverShadow);
  }
  @HostListener('mouseleave') onLeave() {
    this.renderer.setStyle(this.el.nativeElement, 'transform', 'scale(1)');
    this.renderer.setStyle(this.el.nativeElement, 'boxShadow', 'none');
  }
}
