import { Injectable, Inject, LOCALE_ID } from '@angular/core';
import { PrintService, UsbDriver } from 'ng-thermal-print';

import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class PrinterService {
  isConnected = false;
  usbPrintDriver: UsbDriver = new UsbDriver();

  constructor(private printService: PrintService, private datePipe: DatePipe, @Inject(LOCALE_ID) private locale: string) {
    this.printService.isConnected.subscribe((result) => {
      this.isConnected = result;
    });
  }

  private connectPrinterWithDriver(): void {
    this.printService.setDriver(this.usbPrintDriver, 'ESC/POS');
  }

  getLocalStoragePrinterPersistence(): void {
    const deviceData = this.getPrinterDataFromLocalStorage();
    if (!deviceData) return;

    const device = JSON.parse(deviceData);
    this.usbPrintDriver = new UsbDriver(device.vendorId, device.productId);
    this.connectPrinterWithDriver();
  }

  async requestUsb(): Promise<void> {
    this.usbPrintDriver.requestUsb().subscribe(
      (usbDevice) => {
        this.savePrinterDataOnLocalStorage(usbDevice);
        this.usbPrintDriver = new UsbDriver(
          usbDevice.vendorId,
          usbDevice.productId
        );
        this.connectPrinterWithDriver();
      }
    );
  }

  private getPrinterDataFromLocalStorage(): string | null {
    return localStorage.getItem('printer-device');
  }

  private savePrinterDataOnLocalStorage(usbDevice: USBDevice): void {
    localStorage.setItem(
      'printer-device',
      JSON.stringify({
        vendorId: usbDevice.vendorId,
        productId: usbDevice.productId,
      })
    );
  }

  printHeader(): void {
    console.log(this.printService);
    this.printService
      .init()
      .setBold(true)
      .writeLine('Chads Choperia')
      .setBold(false)
      .writeLine(`Data: ${this.datePipe.transform(Date.now(), 'short', this.locale)}`)
      .feed(4)
      .cut('full')
      .flush();
  }
}