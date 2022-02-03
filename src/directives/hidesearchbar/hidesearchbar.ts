import { Directive, Input, ElementRef, Renderer, Renderer2 } from '@angular/core';

/**
 * Generated class for the HidesearchbarDirective directive.
 *
 * See https://angular.io/api/core/Directive for more info on Angular
 * Directives.
 */
@Directive({
  selector: '[hidesearchbar]', // Attribute selector
  host: {
    '(ionScroll)':'onContentScroll($event)'
  }
})
export class HidesearchbarDirective {

  lastX:any

  @Input("header") header: HTMLElement;
  headerHeight;

  constructor(public element: ElementRef, public renderer: Renderer2) {
    console.log('Hello HidesearchbarDirective Directive');
  }

  ngOnInit() {
    this.headerHeight = this.header.clientHeight;
    this.renderer.setStyle(this.header,'webkitTransition','top 700ms');
  }

  onContentScroll(event) {
    this.lastX = event.scrollTop;
    console.log("scroll event=",event);
    if(event.scrollTop > Math.max(0, this.lastX)) {  
      this.renderer.setStyle(this.header,"top", "-100px");
    } else {
      this.renderer.setStyle(this.header,"top", "0");
    } 
  }

}
