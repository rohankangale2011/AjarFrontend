import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, Output, EventEmitter, Input } from '@angular/core';
import { filter, debounceTime } from 'rxjs/operators';
import { fromEvent } from 'rxjs';

@Component({
  selector: 'app-iban',
  templateUrl: './iban.component.html',
  styleUrls: ['./iban.component.scss']
})
export class IbanComponent implements AfterViewInit {
  @Input() bankDetails;
  @Output() getIBANSpecification = new EventEmitter();
  @Output() getBankSpecification = new EventEmitter();
  iban = '';
  @ViewChild('ibanInput') ibanInput: ElementRef;
  constructor() { }

  ngAfterViewInit(): void {
    fromEvent(this.ibanInput.nativeElement, 'keyup').pipe(
      filter(() => this.iban.length === 2),
      debounceTime(1000)
    ).subscribe((text: string) => {
      this.getIBANSpecification.emit(this.iban);
    });
  }

  /**
   * Function handling the IBAN input value changes
   */
  trackChange(evt) {
    const ibanValue = this.iban.replace(/\s/g, '');
    const addSpace = (ibanValue.length) % 4 === 0;

    if (evt.keyCode === 13) { // when pressed 'ENTER'
      return false;
    } else if (evt.keyCode === 8) { // when pressed 'BACKSPACE'
      this.iban = addSpace ? this.iban.slice(0, this.iban.length - 2) : this.iban;
    } else {
      if (addSpace) {
        this.iban += ' ';
      }
    }

    // code handling when user copy paste the value using keyboard
    if ((evt.ctrlKey || evt.metaKey) && evt.keyCode === 86) {
      this.updateCopyPasteData();
      if (ibanValue.length >= 15) {
        this.getBankDetails();
      }
    }
  }

  /**
   * Function handling fetching details for IBAN specification when required
   * Called when user copy paste the IBAN value using keyboard
   */
  updateCopyPasteData() {
    if (this.iban.length >= 2) {
      this.getIBANSpecification.emit(this.iban.substr(0, 2));
    }
    this.iban = this.iban.match(/.{1,4}/g).join(' ');
  }

  /**
   * Function getting bank details for provided IBAN number
   */
  getBankDetails() {
    this.getBankSpecification.emit(this.iban.replace(/\s/g, ''));
  }

}
