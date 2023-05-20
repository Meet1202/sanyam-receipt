import { Component, OnInit } from '@angular/core';
import packageJson  from 'package.json';
import {
  FormGroup,
  FormBuilder,
  FormArray,
  Validators
} from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-receipt-form',
  templateUrl: './receipt-form.component.html',
  styleUrls: ['./receipt-form.component.scss']
})
export class ReceiptFormComponent implements OnInit {

  myForm: FormGroup;
  modalRef:NgbModalRef;
  MONTH_LIST = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ];
  version:any

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private modalService: NgbModal
    ) {
    this.myForm = this.fb.group({
      name: ['', Validators.required],
      receiptNo: ['', Validators.required],
      date: ['', Validators.required],
      monthList: this.fb.array([], Validators.required)
    });
  }

  ngOnInit(): void {
    this.addMonth();
    this.version = packageJson.version;
  }
  monthList(): FormArray {
    return this.myForm.get('monthList') as FormArray;
  }

  newMonth(): FormGroup {
    return this.fb.group({
      month: 'January',
      amount: ''
    });
  }

  addMonth() {
    this.monthList().push(this.newMonth());
  }

  removeMonth(monthIndex: number) {
    this.monthList().removeAt(monthIndex);
  }

  open(content: any) {
    this.modalRef = this.modalService.open(content,{ ariaLabelledBy: 'modal-basic-title' });
		this.modalRef.result.then(
			(result) => {
				console.log('');
			},
			(reason) => {
				console.log('');
			},
		);
	}

  closeModal(){
    this.modalRef.close();
  }

  share() {
    if (window.navigator.canShare && window.navigator.canShare({ files: [] })) {
      window.navigator.share({
        files: [],
        title: 'Vacation Pictures',
        text: 'Photos from September 27 to October 14.',
      })
      .then(() => console.log('Share was successful.'))
      .catch((error: any) => console.log('Sharing failed', error));
    } else {
      console.log(`Your system doesn't support sharing files.`);
    }
  }
}
