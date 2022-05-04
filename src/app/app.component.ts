import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterViewInit {
  @HostListener('keyup', ['input'])
  onChange() {
    this.ngAfterViewInit();
  }
  @ViewChild('CosteCasa') CosteCasa?: ElementRef;
  @ViewChild('AhorroPrevio') AhorroPrevio?: ElementRef;
  @ViewChild('Entrada') Entrada?: ElementRef;
  @ViewChild('Reserva') Reserva?: ElementRef;
  @ViewChild('AhorroM') AhorroM?: ElementRef;
  @ViewChild('AhorroPE') AhorroPE?: ElementRef;
  @ViewChild('Mensualidad') Mensualidad?: ElementRef;
  @ViewChild('CantidadMensualidad') CantidadMensualidad?: ElementRef;
  @ViewChild('PE') PE?: ElementRef;
  @ViewChild('CantidadPE') CantidadPE?: ElementRef;

  viviendaConIva?: number;
  hipoteca80?: number;
  hipoteca20?: number;
  aportado?: number;
  ivaHipoteca?: number;
  dineroNecesario?: number;
  constructor() {}

  ngAfterViewInit() {
    this.viviendaConIva =
      Number(this.CosteCasa?.nativeElement.value) +
      (Number(this.CosteCasa?.nativeElement.value) * 10) / 100;
    this.hipoteca80 = (this.viviendaConIva * 80) / 100;
    this.hipoteca20 = (this.viviendaConIva * 20) / 100;
    this.aportado = this.getAportado();
    this.ivaHipoteca = (this.hipoteca80 * 10) / 100;
    this.dineroNecesario =
      this.hipoteca20 +
      this.ivaHipoteca -
      this.aportado -
      this.AhorroPrevio?.nativeElement.value;
  }
  getAportado() {
    const entrada = Number(this.Entrada?.nativeElement.value),
      reserva = Number(this.Reserva?.nativeElement.value),
      mensualidad = Number(this.Mensualidad?.nativeElement.value),
      cantidadMensualidad = Number(
        this.CantidadMensualidad?.nativeElement.value
      ),
      pagasExtras = Number(this.PE?.nativeElement.value),
      cantidadPagasExtras = Number(this.CantidadPE?.nativeElement.value);
    return (
      entrada +
      reserva +
      mensualidad * cantidadMensualidad +
      pagasExtras * cantidadPagasExtras
    );
  }
}
