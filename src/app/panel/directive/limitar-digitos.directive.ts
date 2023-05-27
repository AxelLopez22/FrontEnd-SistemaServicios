import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appLimitarDigitos]'
})
export class LimitarDigitosDirective {

  constructor(private el: ElementRef) { }

  @HostListener('input', ['$event']) onInputChange(event: any) {
    const valorActual: string = this.el.nativeElement.value;
    const longitudMaxima = 8;
    if (valorActual.length > longitudMaxima) {
      this.el.nativeElement.value = valorActual.slice(0, longitudMaxima);
    }
  }
}
