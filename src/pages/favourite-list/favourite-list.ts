import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FirebaseProvider } from './../../providers/firebase/firebase';
import { CompaniesDetailPage } from '../companies-detail/companies-detail';
import { Observable } from 'rxjs/Observable';


/**
 * Generated class for the FavouriteListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-favourite-list',
  templateUrl: 'favourite-list.html',
})
export class FavouriteListPage {
    favorites: Array<any>;
    aziende: Observable<any[]>;
    

      constructor(public navCtrl: NavController, public provider: FirebaseProvider) {
        this.getFavorites();
      }
  
      itemTapped(favorite) {
          this.navCtrl.push(CompaniesDetailPage, favorite.property);
      }
  
      deleteItem(favorite) {
          this.provider.unfavorite(favorite)
              .then(() => {
                  this.getFavorites();
              })
              .catch(error => alert(JSON.stringify(error)));
      }
  
  
        getFavorites() {  
            Promise.resolve(this.provider.getFavorites())
            .then(x => { 
                const flattenedArray = [].concat(x);
                this.favorites=flattenedArray;
               // this.favorites = Array.of(x[0].property); 
               // this.favorites=Array.from(x[0].property);
                console.log(this.favorites);
            });
                  
                          
        }
      
      
      
}
