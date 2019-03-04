import { FirebaseProvider } from './../../providers/firebase/firebase';
import { Component ,ViewChild, ElementRef } from '@angular/core';
import {  AngularFireDatabase,AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import {CompaniesDetailPage} from '../companies-detail/companies-detail';
import leaflet from 'leaflet';
import { Geolocation } from '@ionic-native/geolocation';
import { ActionSheetController, IonicPage, NavController,ActionSheet, NavParams,ToastController,Platform  } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { Diagnostic } from '@ionic-native/diagnostic';
import { isActivatable } from 'ionic-angular/tap-click/tap-click';
import { AlertController } from 'ionic-angular';




@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public isLocationEnabled 	: boolean 	= false;
  properties: Array<any>;
  searchKey: string = "";
  viewMode: string = "list";
  map;
  markersGroup;
  aziende: Observable<any[]>;
  aziende1: Observable<any[]>;  
  newItem = '';
  myposition:any;
  my:any;
  abo:any;
  item:any;
  raggio:number;
  checkSearch:boolean;
  control:boolean= true;
  
  constructor(public alertCtrl: AlertController,private _PLATFORM: Platform,private diagnostic: Diagnostic,private http: HttpClient,public navCtrl: NavController,public toastCtrl: ToastController, public firebaseProvider: FirebaseProvider,private geolocation: Geolocation, public navParams: NavParams) {
    this.checkSearch=false;
    
    this._PLATFORM.ready()
    .then(() =>
    {
      this.diagnostic.isLocationEnabled().then(
        (isAvailable) => {
          if(!isAvailable){

            let prompt = this.alertCtrl.create({
              title: 'Errore',
              cssClass: 'buttoncss',
              message: "Devi consentire la localizzazione del dispositivo per un corretto funzionamenti",
              buttons: [
                {
                  text: 'Esci',
                  handler: data => {
                    this._PLATFORM.exitApp();
                  }      
                },
                {
                  text: 'Conferma',
                  handler: data => {
                    this.diagnostic.switchToLocationSettings();           
                  }
                }
              ]
            });
            prompt.present();
          }
        }).catch( (e) => {
        console.log(e);
        alert(JSON.stringify(e));
        });
        
      });

/*
      this.diagnostic.isGpsLocationEnabled()
      .then((isAvailable) =>
      {
        this.diagnostic.switchToLocationSettings();        
        alert(' GPS attivo');
        
      }).catch((error : any) =>
         {
          this.diagnostic.switchToLocationSettings();
        alert('Attiva GPS');
     });*/
    
    window.addEventListener('keyboardDidHide', () => {
      this.control=true;
      // Describe your logic which will be run each time keyboard is closed.
  });
  window.addEventListener('keyboardWillShow', (ev) => {
    // Describe your logic which will be run each time when keyboard is about to be shown.
    this.control=false;
  });
    if(this.navParams.data=="booking"){
      let toast = this.toastCtrl.create({
        message: 'Prenotazione effettuata con successo',
        cssClass: 'mytoast',
        duration: 1000
    });
    toast.present(toast);
    }
    this.item = this.navParams.data;
    
    if(this.firebaseProvider.getCheck()==false){
      this.getPosition();
    }else{
      var coo;
      this.aziende=this.item;
      this.aziende1=this.aziende;      
      coo=this.firebaseProvider.getCoordinateF();
      this.myposition={
        lat:coo.lat,
        lon:coo.lon
      }
      this.firebaseProvider.setFalse();
    }
  
  }
  setRadius(data){
    this.raggio=data;
    if(this.checkSearch==true){
      this.aziende=this.firebaseProvider.getAziende();
      this.aziende1=this.aziende;      
      this.aziende1
      .map(items => items.map(item => {
        var c=this.firebaseProvider.arePointsNear(item.address,this.myposition, this.raggio);
          if(c==true){
            return item;
          }   
      }))
      .subscribe(res=>{
        res = res.filter(function(n){ return n != undefined });
        this.aziende=Observable.of(res);
        console.log(this.aziende);
      });
    }
    else{
      console.log(this.aziende1);
    this.aziende1
    .map(items => items.map(item => {
      var c=this.firebaseProvider.arePointsNear(item.address,this.myposition, this.raggio);
        if(c==true){
          return item;
        }   
    }))
    .subscribe(res=>{
      res = res.filter(function(n){ return n != undefined });
      this.aziende=Observable.of(res);
      console.log(this.aziende);
    });
  }
      }
      
  addItem() {
    this.firebaseProvider.addItem(this.newItem);
  }
  cia(){
    console.log("ciao");
this.getPosition();
  }
  getPosition(){
    var p3 = Promise.resolve(
      this.geolocation.getCurrentPosition().then((resp) => {
        var myposition1={
          lat:resp.coords.latitude,
          lon:resp.coords.longitude
        }
        console.log(myposition1);
        return myposition1;
       }).then((data) => { 
         this.bo(data);
        }));  
  }
 
  removeItem(id) {
   // this.firebaseProvider.removeItem(id);
  }
  openCompaniesDetail(item) {
    this.navCtrl.push(CompaniesDetailPage, item);
}
findByName(searchKey: string){
  this.aziende=this.firebaseProvider.getAziende();
  let key: string = searchKey.toUpperCase();
  return this.aziende.map(aziende => aziende.filter((property: any) =>(property.city )
  .toUpperCase()
  .indexOf(key) > -1));
  
}
getPositionName(data){
  this.http.get('http://maps.google.com/maps/api/geocode/json?address='+data).subscribe(data => {
    
    
     var lat=data["results"][0].geometry.location.lat;
    var lon=data["results"][0].geometry.location.lng;
    console.log(lat+" "+lon);
   
    window.setTimeout(() => {
      this.map.off();
      this.map.remove();
      setTimeout(() => {
        this.map = leaflet.map("map").setView([data["results"][0].geometry.location.lat, data["results"][0].geometry.location.lng], 10);
        leaflet.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {
            attribution: 'Tiles &copy; Esri'
        }).addTo(this.map);
        this.showMarkers();
    })
  })
    
    var coordinate={
      lat:Number(lat),
      lon:Number(lon)
    }    
    this.myposition=coordinate;    
  });
}

onInput(event) {
  this.checkSearch=true;
  if(this.searchKey.length==0){
    this.checkSearch=false;
    this.getPosition();

  }else{
  this.raggio=10;  
    this.aziende=this.findByName(this.searchKey);
    this.aziende.subscribe(res => {
      this.aziende=Observable.of(res);
      console.log(this.aziende);  
  if(res[0]!=undefined){
    this.getPositionName(res[0].city);
    this.aziende=Observable.of(res);    
  }      
    } );
  if (this.viewMode === "map") {
    this.showMarkers();
}
  }
}
bo(data){
  this.myposition=data;
  this.aziende = this.firebaseProvider.getAziende();  
  this.aziende
  .map(items => items.map(item => {
    var c=this.firebaseProvider.arePointsNear(item.address,data, 100);
      if(c==true){
        return item;
      }   
  }))
  .subscribe(res=>{
    res = res.filter(function(n){ return n != undefined });
    this.aziende=Observable.of(res);
    this.aziende1=this.aziende;    
    console.log(this.aziende1);
  });
}

sortCres(){
const compareFn = (a, b) => {
  if (a.price < b.price)
    return -1;
  if (a.price > b.price)
    return 1;
  return 0;
};
this.aziende=this.aziende.map(things => things.sort(compareFn))
}
sortDecres(){
  const compareFn = (a, b) => {
    if (a.price > b.price)
      return -1;
    if (a.price < b.price)
      return 1;
    return 0;
  };
  this.aziende=this.aziende.map(things => things.sort(compareFn))
}

onCancel(event) {
  
  //this.findAll();
}

showMap() {
  console.log("NNNN");
  setTimeout(() => {
      this.map = leaflet.map("map").setView([this.myposition.lat, this.myposition.lon], 10);
      leaflet.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {
          attribution: 'Tiles &copy; Esri'
      }).addTo(this.map);
      this.showMarkers();
  })
}

showMarkers() {
  if (this.markersGroup) {
      this.map.removeLayer(this.markersGroup);
  }
  this.markersGroup = leaflet.layerGroup([]);
  this.aziende.subscribe(
    companies => {
        companies.map(companie =>{
          if (companie.address.lat, companie.address.lon) {
            let marker: any = leaflet.marker([companie.address.lat, companie.address.lon]).on('click', event => this.openCompaniesDetail(event.target.data));
            marker.data = companie;
            this.markersGroup.addLayer(marker);
         } })
    });
    this.map.addLayer(this.markersGroup);
}

}