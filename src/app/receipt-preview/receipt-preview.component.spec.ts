import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceiptPreviewComponent } from './receipt-preview.component';

describe('ReceiptPreviewComponent', () => {
  let component: ReceiptPreviewComponent;
  let fixture: ComponentFixture<ReceiptPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReceiptPreviewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReceiptPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
