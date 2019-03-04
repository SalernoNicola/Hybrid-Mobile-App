import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CompaniesFeaturesPage } from './companies-features';

@NgModule({
  declarations: [
    CompaniesFeaturesPage,
  ],
  imports: [
    IonicPageModule.forChild(CompaniesFeaturesPage),
  ],
})
export class CompaniesFeaturesPageModule {}
