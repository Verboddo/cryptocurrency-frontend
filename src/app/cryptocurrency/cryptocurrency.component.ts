
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-cryptocurrency',
  templateUrl: './cryptocurrency.component.html',
  styleUrls: ['./cryptocurrency.component.scss']
})

export class CryptocurrencyComponent implements OnInit {
  apiUrl = 'http://localhost:8080/api/currencies';
  cryptocurrencies: any[] | undefined;
  newCryptocurrency: any = {};
  updatedCryptocurrency: any = {};
  showUpdateForm: boolean = false;
  selectedCurrency: any;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getCryptocurrencies();
  }

  getCryptocurrencies() {
    this.http.get(this.apiUrl)
      .subscribe((data: any) => {
        this.cryptocurrencies = data.content;
      });
  }

  createCryptocurrency() {
    this.http.post(this.apiUrl, this.newCryptocurrency)
      .subscribe(() => {
        this.getCryptocurrencies();
        this.newCryptocurrency = {};
      });
  }

  updateCryptocurrency(id: number) {
    this.updatedCryptocurrency.id = this.updatedCryptocurrency.id;
    this.updatedCryptocurrency.name = this.updatedCryptocurrency.name;
    this.updatedCryptocurrency.ticker = this.updatedCryptocurrency.ticker;
    this.updatedCryptocurrency.coins = this.updatedCryptocurrency.coins;
    this.updatedCryptocurrency.market = this.updatedCryptocurrency.market;

    this.http.put(`${this.apiUrl}/${id}`, this.updatedCryptocurrency)
      .subscribe(() => {
        this.getCryptocurrencies();
        this.showUpdateForm = false; // Verberg het updateformulier
        this.updatedCryptocurrency = {}; // Reset de updatedCryptocurrency-variabele
      });
  }

  deleteCryptocurrency(id: number) {
    this.http.delete(`${this.apiUrl}/${id}`)
      .subscribe(() => {
        this.getCryptocurrencies();
      });
  }

  toggleUpdateForm(currency: any) {
    this.showUpdateForm = true;
    this.updatedCryptocurrency = currency ;
  }

  cancelUpdate() {
    this.showUpdateForm = false;
    this.updatedCryptocurrency = {}; // Reset de gegevens
  }
}
