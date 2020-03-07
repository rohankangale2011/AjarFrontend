import { Component, OnInit } from '@angular/core';
import { HomeService } from './home.service';
import { SocketService } from '../../core/services/socket.service';
import { SOCKET_EVENT } from '../../core/constants/data';
import { APIResponse } from 'src/app/core/models';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  currentBalance = 0;
  currencyType = '-';
  isBankDetailsFound = false;
  isBankLoaderVisible = false;
  bankDetails = {};
  ibanNo;
  isAmountLoaderVisible = false;
  setDefaultAmount = false;
  constructor(
    private homeService: HomeService,
    private socket: SocketService
  ) { }

  ngOnInit(): void {
    this.getBalance();
    this.socket.listen(SOCKET_EVENT).subscribe(resp => {
      if (resp) {
        this.updateCurrentBalance(resp);
      }
    }, err => this.homeService.handleErrorCallback('Socker error', err));
  }

  /**
   * Function setting initial balance value
   */
  updateCurrentBalance(balance) {
    this.currentBalance = parseFloat(balance);
  }

  /**
   * Function initiating balance call
   */
  getBalance() {
    this.homeService.getBalance().subscribe((resp: APIResponse) => {
      this.currentBalance = parseFloat(resp.data.balance);
    }, err => this.homeService.handleErrorCallback('Balance API error', err));
  }

  /**
   * Function getting currency related data for the provided IBAN's initial value
   */
  getIBANSpecification(iban: string) {
    this.homeService.getIBANSpecification(iban.toUpperCase()).subscribe((resp: APIResponse) => {
      if (resp && resp.data) {
        this.currencyType = resp.data[0];
      } else {
        this.currencyType = '-';
      }
    }, err => this.homeService.handleErrorCallback('IBAN API error', err));
  }

  /**
   * Function getting bank details for the provided IBAN
   */
  getBankSpecification(ibanNo: string) {
    this.isBankLoaderVisible = true;
    this.ibanNo = ibanNo;
    this.homeService.getBankDetails(ibanNo).subscribe((resp: APIResponse) => {
      this.isBankLoaderVisible = false;
      if (resp.code === 200) {
        this.isBankDetailsFound = true;
        this.bankDetails = resp.data;
      } else {
        this.isBankDetailsFound = false;
        this.bankDetails = {
          bank: 'Invalid IBAN'
        };
      }
    }, err => {
      this.homeService.handleErrorCallback('BANK Details API error', err);
      this.isBankLoaderVisible = false;
    });
  }

  /**
   * Function transferring selected amount
   */
  transferAmountInit(amount: number) {
    this.isAmountLoaderVisible = true;
    this.setDefaultAmount = false;
    this.homeService.transferAmount(this.ibanNo, amount, this.currencyType).subscribe((resp: APIResponse) => {
      this.isAmountLoaderVisible = false;
      if (resp.code === 202) {
        this.setDefaultAmount = true;
        this.socket.emit(SOCKET_EVENT, true);
      }
    }, err => {
      this.isAmountLoaderVisible = false;
      this.homeService.handleErrorCallback('Transfer amount API error', err);
    });
  }
}
