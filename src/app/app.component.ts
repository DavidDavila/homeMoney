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
  @HostListener('change', ['input'])
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
  totalCooperativa?: number;
  dineroNecesario?: string;
  constructor() {}

  ngAfterViewInit() {
    this.viviendaConIva = Math.round(
      Number(this.CosteCasa?.nativeElement.value) +
        (Number(this.CosteCasa?.nativeElement.value) * 10) / 100
    );
    this.hipoteca80 = Math.round((this.viviendaConIva * 80) / 100);
    this.hipoteca20 = Math.round((this.viviendaConIva * 20) / 100);

    this.ivaHipoteca = Math.round(this.hipoteca80 * 10) / 100;
    this.totalCooperativa = Math.round(this.getTotalCooperativa());
    this.aportado = Math.round(this.getAportado());
    const money = this.hipoteca20 + this.ivaHipoteca - this.aportado;
    this.dineroNecesario =
      money < 0 ? `Sobran ${Math.abs(money)} €` : `Faltan ${Math.abs(money)} €`;
  }

  getTotalCooperativa() {
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
  getAportado() {
    const entrada = Number(this.Entrada?.nativeElement.value),
      reserva = Number(this.Reserva?.nativeElement.value),
      mensualidad = Number(this.AhorroM?.nativeElement.value),
      cantidadMensualidad = Number(
        this.CantidadMensualidad?.nativeElement.value
      ),
      pagasExtras = Number(this.AhorroPE?.nativeElement.value),
      cantidadPagasExtras = Number(this.CantidadPE?.nativeElement.value),
      ahorroPrevio = Number(this.AhorroPrevio?.nativeElement.value);
    return (
      entrada +
      ahorroPrevio +
      reserva +
      mensualidad * cantidadMensualidad +
      pagasExtras * cantidadPagasExtras
    );
  }
}
