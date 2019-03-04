import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CompaniesDetailPage } from './companies-detail';

@NgModule({
  declarations: [
    CompaniesDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(CompaniesDetailPage),
  ],
})
export class CompaniesDetailPageModule {}
