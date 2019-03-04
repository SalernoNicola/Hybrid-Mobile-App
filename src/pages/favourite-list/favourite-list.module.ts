import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FavouriteListPage } from './favourite-list';

@NgModule({
  declarations: [
    FavouriteListPage,
  ],
  imports: [
    IonicPageModule.forChild(FavouriteListPage),
  ],
})
export class FavouriteListPageModule {}
