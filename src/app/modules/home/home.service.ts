import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {URL} from '../../core/constants/url';


@Injectable()
export class HomeService {
  constructor(private http: HttpClient) { }

  /**
   * Function providing initial balance
   */
  getBalance() {
    return this.http.get(URL.BALANCE);
  }

  /**
   * Function providing current related details
   */
  getIBANSpecification(iban: string) {
    return this.http.get(`${URL.IBAN_SPECIFICATION}/${iban}`);
  }

  /**
   * Function providing bank details for provided IBAN
   */
  getBankDetails(ibanNo: string) {
    return this.http.get(`${URL.BANK}/${ibanNo}`);
  }

  /**
   * Function transferring the provided amount
   */
  transferAmount(ibanNo: string, amount: number, currency: string) {
    return this.http.post(`${URL.TRANSFER}/${ibanNo}`, {
      amount,
      currency
    });
  }

  handleErrorCallback(message: string, details: string) {
    console.log(`${message}: ${details}`);
  }
}
