import { Injectable } from '@angular/core';
import {  AngularFireDatabase,AngularFireList,AngularFireObject } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import {App} from "ionic-angular";
import { HomePage } from '../../pages/home/home';
import {NavController } from "ionic-angular/index";



 
export interface BookingTwoStep {
  pfinal: number;
  nperson: number;
  tempoFine:String;
  TempoInizio:String;
  dataf:String;
  item:any;
}
export interface Booking {
  name: String,
  img: String,
  city:String,
  giorno:String,
  npersone:number,
  prezzofinale:number,
  tempoinizio:String,
  tempofine:String,
  qrcode:"https://www.qrstuff.com/images/default_qrcode.png",
  card: {
    number:number,
    meseS:number,
    annoS:number, 
    CVV:String,
  }  
}
export interface Search {
  location:String;
  raggio:number;
  coffee: boolean;
  Wifi: boolean;
  stamp: boolean;
  cucina: boolean;
  datainizio:String;
  datafine:String;
  data: {
    anno:String;
    mese:String;
    giorno:String;  
  }
  tipo:String;
  npers:String;
}

@Injectable()
export class FirebaseProvider {
  private nav:NavController;
  
  
  aziendeR: Observable<any[]>;  
  aziende: Observable<any[]>;
  favoriteCounter: number = 0;
  favorites: Array<any> = [];
  booking: AngularFireObject<any>;
  lat:any;
  lon:any;
  coordinate:any;
  check:boolean;
  coordinateF:any;

  constructor(public afd: AngularFireDatabase,private http: HttpClient,public app: App) {
    this.check=false;
   }
  
  getAziende() {
    this.aziende=this.afd.list('/companies/').valueChanges();
    return this.aziende;
    }

  getA(){
    console.log(this.aziende);
    return this.aziende;
  }
 
  addItem(name) {
   // this.afd.list('/songs/').push(name);
    this.afd.list('/companies/').push({
      name:name,
      img:[
        "http://www.lucenews.it/files/2016/01/figura-3-2.jpg",
        "http://www.gadolla.it/img/edifici-brignole.jpg",
        "http://img.edilportale.com/News/55506_01.jpg"
      ],
      surname:"http://www.lucenews.it/files/2016/01/figura-3-2.jpg",
      city:"Salerno",
      address:{
        name:"Via II Mezzana",   
        lat:"40.644049",
        lon:" 14.852015",
      },
      price:3,
      phone:"3292370795",
      feature:{
          airconditioning: "NO",
          printer:"YES",
          projector:"YES",
          coffeearea:"NO",
          smokearea:"YES"
      }});
  }
  getBooking() {
    return this.afd.list('/booking/').valueChanges();
  }
 
  arePointsNear(checkPoint, centerPoint, km) {
    
    var ky = 40000 / 360;
    var kx = Math.cos(Math.PI * centerPoint.lat / 180.0) * ky;
    var dx = Math.abs(centerPoint.lon - checkPoint.lon) * kx;
    var dy = Math.abs(centerPoint.lat - checkPoint.lat) * ky;
    return Math.sqrt(dx * dx + dy * dy) <= km;
}


  addItemBooking(data) {
    this.afd.list('/booking/').push(data);
  }
  removeItem(id) {
    this.afd.list('/companies/').remove(id);
  }

  advancedSearch(datar){
    //AIzaSyBioDmySKNFDbLJ9DV1R9U0kdnKnAHyqjc
this.check=true;
this.http.get('http://maps.google.com/maps/api/geocode/json?address='+datar.location).subscribe(data => {
  this.lat=data["results"][0].geometry.location.lat;
  this.lon=data["results"][0].geometry.location.lng;
  this.coordinate={
    lat:Number(this.lat),
    lon:Number(this.lon)
  }
  
  this.advancedSearchPointNear(this.coordinate,datar);
});  
  
}
getCoordinateF(){
  return this.coordinateF;
}

setFalse(){
  this.check=false;  
}
setCheck(coordinate){
  this.coordinateF=coordinate;
  this.check=true;
}
getCheck(){
  return this.check;
}
advancedSearchPointNear(coordinate,data){
  this.aziende = this.getAziende();  
  this.aziende
  .map(items => items.map(item => {
    var c=this.arePointsNear(item.address,coordinate, data.raggio);
      if(c==true){
        return item;
      }   
  }))
  .subscribe(res=>{
    res = res.filter(function(n){ return n != undefined });
    this.aziende=Observable.of(res);   
    console.log("1");
return this.aziende;    
  });
}


  findByName(searchKey: string){
    this.aziende = this.getAziende();
    let key: string = searchKey.toUpperCase();
    return this.aziende.map(aziende => aziende.filter((property: any) =>(property.city )
    .toUpperCase()
    .indexOf(key) > -1));
  }
  favorite(property) {
    this.favoriteCounter = this.favoriteCounter + 1;
    this.favorites.push({id: this.favoriteCounter, property: property});
    this.getFavorites();    
    return Promise.resolve();
  }
  getFavorites() { 
    return Promise.resolve(this.favorites);
  }
  unfavorite(favorite) {
    let index = this.favorites.indexOf(favorite);
    if (index > -1) {
      this.favorites.splice(index, 1);
    }
    return Promise.resolve();
  }

}