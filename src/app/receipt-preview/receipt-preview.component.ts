import { Component, Input, OnInit, ElementRef, ViewChild, Output, EventEmitter } from '@angular/core';

import * as htmlToImage from 'html-to-image';
import { toPng, toJpeg, toBlob, toPixelData, toSvg } from 'html-to-image';
declare const window:any;
@Component({
  selector: 'app-receipt-preview',
  templateUrl: './receipt-preview.component.html',
  styleUrls: ['./receipt-preview.component.scss']
})
export class ReceiptPreviewComponent implements OnInit {
  @Input() formData:any;
  @Output() onModalClose = new EventEmitter();
  @ViewChild('pdfTable') pdfTable!: ElementRef;
  totalAmount: number = 0;

  constructor() {}

  ngOnInit(): void {
    console.log(this.formData);
    this.countMonthsAmount();
  }

  countMonthsAmount(){
    for(let formData of this.formData.monthList ){
      this.totalAmount += parseInt(formData.amount);
    }
  }

  exportPdf(formData: any){
    const pdfTable = this.pdfTable.nativeElement;
    htmlToImage.toJpeg(pdfTable, { quality: 0.95 })
    .then(function (dataUrl) {
      var link = document.createElement('a');
      link.download = formData.name + '.jpeg';
      link.href = dataUrl;
      console.log(link.href)
      // window.open(`https://web.whatsapp.com/send?phone=7575044866&text=Hi, this is a test&image=${link.href}`,'_blank' );
      link.click();
    });
  }

  closeModal() {
    this.onModalClose.emit();
  }
}
