import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';

@Component({
  selector: 'app-amount',
  templateUrl: './amount.component.html',
  styleUrls: ['./amount.component.scss']
})
export class AmountComponent implements OnInit, OnChanges {
  @Input() currencyType;
  @Input() balance;
  @Input() isAmountLoaderVisible = false;
  @Input() setDefaultAmount = false;
  @Input() toastMessage;
  @Output() transferAmountInit = new EventEmitter();
  amount = 0;
  amountPercent = 0;
  isTransferAllowed = true;
  constructor() { }

  ngOnInit(): void {}

  ngOnChanges(changes: any): void {
    if (changes && changes.setDefaultAmount && changes.setDefaultAmount.currentValue) {
      this.amount = 0;
    }
  }

  /**
   * Function initiating amount transfer process
   */
  transferAmount(): void {
    if (this.amount > 0) {
      this.transferAmountInit.emit(this.amount);
    }
  }

  /**
   * Function handling/updating provided amount value
   */
  trackAmount(evt: Event): void {
    this.isTransferAllowed = this.amount <= this.balance ? false : true;
    // this.calculateRemainingPercentage();
  }

  /**
   * Function updating the amount chart based on updated amount percentage value
   */
  calculateRemainingPercentage(): void {
    const remaining = this.balance - this.amount;
    const remainingPer = (remaining / this.balance) * 100;
    this.amountPercent = Math.round(remainingPer);
  }
}
