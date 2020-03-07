import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home.component';
import { TitleComponent } from '../../shared/components/title/title.component';
import { RouterModule, Routes } from '@angular/router';
import { IbanComponent } from './components/iban/iban.component';
import { AmountComponent } from './components/amount/amount.component';
import { HomeService } from './home.service';
import { CircleGraphComponent } from '../../shared/components/circle-graph/circle-graph.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  }
];

@NgModule({
  declarations: [
    HomeComponent,
    TitleComponent,
    IbanComponent,
    AmountComponent,
    CircleGraphComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forChild(routes)
  ],
  providers: [HomeService]
})
export class HomeModule { }
