import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams  } from 'ionic-angular';
import { Pipe, PipeTransform } from '@angular/core';
import {Search } from './../../providers/firebase/firebase';
import { AlertController } from 'ionic-angular';
import {FormBuilder, FormGroup, Validators,FormControl} from '@angular/forms';
import { HomePage } from '../home/home';
import { FirebaseProvider } from './../../providers/firebase/firebase';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Keyboard } from '@ionic-native/keyboard';



@IonicPage()
@Component({
  selector: 'page-advanced-search',
  templateUrl: 'advanced-search.html',
})
export class AdvancedSearchPage {
  public event = {
    month: '1990-02-19',
    timeStarts: '07:00',
    timeEnds: '08:00'
  }
  aziende: Observable<any[]>;  
  lat:any;
  lon:any;
  coordinate:any;
  check:boolean;
  startClicked:boolean;
  endClicked:boolean;
  name:FormControl;
  timeStart:any;
  timeEnds:any;
  timeEndsApp:any;
  timeStartApp:any;
  timeComun:any;
  myDate: String ;
  myDate1: String ;
  current_date1: String ;
  month:number;
  year:number;
  minimoD:String;
  massimoD:String;
  coffee: boolean;
  Wifi: boolean;
  stamp: boolean;
  cucina: boolean;
  datainizio:String;
  datafine:String;
  anno:String;
  mese:String;
  giorno:String;
  tipo:String;
  npers:String;
  location:String;
  raggio:number;
  validate:FormGroup;
  buttonClicked: boolean;
  c:any;
  TempoInizio:String;
  TempoFine:String;
  dataf:String;
  control:boolean= true;
  
  

  
  constructor(public keyboard:Keyboard,private http: HttpClient,public navCtrl: NavController, public navParams: NavParams,public alertCtrl: AlertController, public formBuilder: FormBuilder, public firebaseProvider: FirebaseProvider) {  
    window.addEventListener('keyboardDidHide', () => {
      this.control=true;
      // Describe your logic which will be run each time keyboard is closed.
  });
  window.addEventListener('keyboardWillShow', (ev) => {
    // Describe your logic which will be run each time when keyboard is about to be shown.
    this.control=false;
  });
    var data=new Date(); 
    this.buttonClicked= false;
    data.setDate(data.getDate() + 1);
    this.myDate=data.toISOString();
    this.coffee= false;
    this.raggio=0;
    this.Wifi= false;
    this.stamp=false;
    this.cucina= false;
    this.tipo="NO";    
    this.npers="1";
    this.location="";
    this.minimoD=this.min(data);
    this.massimoD=this.max(data);
    this.createArray(15);
    this.startClicked=false;
    this.endClicked=false;
  //  var d = new Date(99, 5, 24, 11, 33, 30, 0);
    this.timeStart = [
      { time:'09:00'},
      { time:'10:00'},
      { time:'11:00'},
      { time:'12:00'},
      { time:'13:00'},
      { time:'14:00'},
      { time:'15:00'},
      { time:'16:00'},
      { time:'17:00'},
    ]
    this.timeEnds = [
      { time:'10:00'},
      { time:'11:00'},
      { time:'12:00'},
      { time:'13:00'},
      { time:'14:00'},
      { time:'15:00'},
      { time:'16:00'},
      { time:'17:00'},
      { time:'18:00'}
    ]
    this.timeComun = [
      { time:'09:00'},
      { time:'10:00'},
      { time:'11:00'},
      { time:'12:00'},
      { time:'13:00'},
      { time:'14:00'},
      { time:'15:00'},
      { time:'16:00'},
      { time:'17:00'},
      { time:'18:00'}
    ]
    this.initDate(data);    
    this.name = new FormControl('', Validators.required);
    this.validate = new FormGroup({
      name: new FormControl(null, Validators.required),
   });
    this.datainizio=this.timeComun[0].time;
    this.datafine=this.timeComun[1].time;    
  }
  dateIso(data){
    return data.getUTCFullYear() +
    '-' + this.pad(data.getUTCMonth() + 1) +
    '-' + this.pad(data.getUTCDate()) +
    'T' + this.pad(data.getUTCHours()) +
    ':' + this.pad(data.getUTCMinutes()) +
    ':' + this.pad(data.getUTCSeconds()) +
    '.' + (data.getUTCMilliseconds() / 1000).toFixed(3).slice(2, 5) +
    'Z';
  }


  initDate(data){
    this.anno=this.pad(data.getFullYear());
    this.mese=this.pad(data.getMonth()+1);
    this.giorno=this.pad(data.getDate());
    this.dataf=this.anno+" "+this.mese+" "+this.giorno;  
    this.TempoInizio = this.timeStart[0].time;    
    this.TempoFine = this.timeEnds[0].time;    
    
    }
  createArray(n){
    this.c=Array.apply(null, {length: n+1}).map(Function.call, Number);
    var firstElement = this.c.shift();
  }
      //Whatever you want to initialise it as

    onButtonClick() {

        this.buttonClicked = !this.buttonClicked;
    }
  
    

  setSearch(data){
    this.location=data;
  }
  setRadius(data){
this.raggio=data;
  }
  setData(data){
    this.anno=this.pad(data.year);
    this.mese=this.pad(data.month);
    this.giorno=this.pad(data.day);
  }
  setType(data){
    this.tipo=data;
  }
  setPerson(data){
    this.npers=data;
  }
   pad(number) {
    if (number < 10) {
      return '0' + number;
    }
    return number;
  }
  min(data){ 
    var anno=data.getUTCFullYear() ;
    var mese=this.pad(data.getUTCMonth()+1);
    var giorno=this.pad(data.getUTCDate());
    return anno+"-"+mese+"-"+giorno
  }
  max(data){
    data.setMonth(data.getMonth() + 7);
    var anno=data.getUTCFullYear() ;
    var mese=this.pad(data.getUTCMonth());
    var giorno=this.pad(data.getUTCDate() );
    return anno+"-"+mese+"-"+giorno
  }
  checkEnd(v){
    this.startClicked=true;
    this.datainizio=v; 
    var index = this.functiontofindIndexByKeyValue(this.timeComun, "time", v);  
    this.timeEnds=this.timeComun.slice(index+1);
    }
    submitForm(value: any):void{
    }
    
    
  checkStart(v){
    this.endClicked=true;    
    this.datafine=v;
    var index = this.functiontofindIndexByKeyValue(this.timeComun, "time", v);  
    this.timeStart=this.timeComun.slice(0,index);
    }
   Search(){
     
    if((this.startClicked==true)&&(this.endClicked==false)){
      this.TempoFine = this.timeEnds[0].time;          
    }
    if((this.startClicked==false)&&(this.endClicked=true)){
      this.TempoInizio = this.timeStart[0].time;          
    }
    const search: Search= 
    {
      location:this.location,
      raggio:this.raggio,
      coffee: this.coffee,
      Wifi: this.Wifi,
      stamp: this.stamp,
      cucina: this.cucina,
      datainizio:this.TempoInizio,
      datafine:this.TempoFine,
      data:{
        anno:this.anno,
        mese:this.mese,
        giorno:this.giorno
      },
      tipo:this.tipo,
      npers:this.npers
    }
  this.advancedSearch(search);
   }
   
  functiontofindIndexByKeyValue(arraytosearch, key, valuetosearch) {
    
   for (var i = 0; i < arraytosearch.length; i++) {
    
   if (arraytosearch[i][key] == valuetosearch) {
   return i;
   }
   }
   return null;
   }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad AdvancedSearchPage');
  }
  advancedSearch(datar){
   this.http.get('https://maps.googleapis.com/maps/api/geocode/json?address='+datar.location+'&key=AIzaSyBioDmySKNFDbLJ9DV1R9U0kdnKnAHyqjc').subscribe(data => {
     console.log(data);
     if(data["status"]=="ZERO_RESULTS"){
      let alert = this.alertCtrl.create({
        title: 'Errore',
        subTitle: 'Inserisci una location corretta',
        buttons: ['OK']
      });
      alert.present();
     }else{
           //AIzaSyBioDmySKNFDbLJ9DV1R9U0kdnKnAHyqjc
   // this.http.get('http://maps.google.com/maps/api/geocode/json?address='+datar.location).subscribe(data => {
    this.lat=data["results"][0].geometry.location.lat;
    this.lon=data["results"][0].geometry.location.lng;
    this.coordinate={
    lat:Number(this.lat),
    lon:Number(this.lon)
    }
    this.firebaseProvider.setCheck(this.coordinate);    
  this.advancedSearchPointNear(this.coordinate,datar);
     }

});  
  
}

getCheck(){
  return this.check;
}
advancedSearchPointNear(coordinate,data){
  this.aziende = this.firebaseProvider.getAziende();  
  this.aziende
  .map(items => items.map(item => {
    if(data.raggio==0){
      data.raggio=50;
    }
    var c=this.firebaseProvider.arePointsNear(item.address,coordinate, data.raggio);
      if(c==true){

        console.log(item);
        return (data.tipo=="NO" )&&(data.coffee==true && item.feature.coffeearea=="YES")&&(data.Wifi==true && item.feature.airconditioning=="YES") ? item
        : (data.tipo=="NO" )&&(data.coffee==true && item.feature.coffeearea=="YES")&&(data.Wifi==true && item.feature.airconditioning=="NO") ? undefined
        : (data.tipo=="NO" )&&(data.coffee==true && item.feature.coffeearea=="YES")&&(data.Wifi==false && item.feature.airconditioning=="YES") ? item
        : (data.tipo=="NO" )&&(data.coffee==true && item.feature.coffeearea=="YES")&&(data.Wifi==false && item.feature.airconditioning=="NO") ? item
        : (data.tipo=="NO" )&&(data.coffee==true && item.feature.coffeearea=="NO")&&(data.Wifi==true && item.feature.airconditioning=="YES") ? undefined
        : (data.tipo=="NO" )&&(data.coffee==true && item.feature.coffeearea=="NO")&&(data.Wifi==true && item.feature.airconditioning=="NO") ? undefined
        : (data.tipo=="NO" )&&(data.coffee==true && item.feature.coffeearea=="NO")&&(data.Wifi==false && item.feature.airconditioning=="YES") ? undefined
        : (data.tipo=="NO" )&&(data.coffee==true && item.feature.coffeearea=="NO")&&(data.Wifi==false && item.feature.airconditioning=="NO") ? undefined
        : (data.tipo=="NO" )&&(data.coffee==false && item.feature.coffeearea=="YES")&&(data.Wifi==true && item.feature.airconditioning=="YES")? item
        : (data.tipo=="NO" )&&(data.coffee==false && item.feature.coffeearea=="YES")&&(data.Wifi==true && item.feature.airconditioning=="NO") ? undefined
        : (data.tipo=="NO" )&&(data.coffee==false && item.feature.coffeearea=="YES")&&(data.Wifi==false && item.feature.airconditioning=="YES") ? item
        : (data.tipo=="NO" )&&(data.coffee==false && item.feature.coffeearea=="YES")&&(data.Wifi==false && item.feature.airconditioning=="NO") ? item
        : (data.tipo=="NO" )&&(data.coffee==false && item.feature.coffeearea=="NO")&&(data.Wifi==true && item.feature.airconditioning=="YES") ? item
        : (data.tipo=="NO" )&&(data.coffee==false && item.feature.coffeearea=="NO")&&(data.Wifi==true && item.feature.airconditioning=="NO") ? undefined
        : (data.tipo=="NO" )&&(data.coffee==false && item.feature.coffeearea=="NO")&&(data.Wifi==false && item.feature.airconditioning=="YES") ? item
        : (data.tipo=="NO" )&&(data.coffee==false && item.feature.coffeearea=="NO")&&(data.Wifi==false && item.feature.airconditioning=="NO") ? item

        : (data.tipo!="NO" && data.tipo===item.Type)&&(data.coffee==true && item.feature.coffeearea=="YES")&&(data.Wifi==true && item.feature.airconditioning=="YES") ? item
        : (data.tipo!="NO" && data.tipo===item.Type)&&(data.coffee==true && item.feature.coffeearea=="YES")&&(data.Wifi==true && item.feature.airconditioning=="NO") ? undefined
        : (data.tipo!="NO" && data.tipo===item.Type)&&(data.coffee==true && item.feature.coffeearea=="YES")&&(data.Wifi==false && item.feature.airconditioning=="YES") ? item
        : (data.tipo!="NO" && data.tipo===item.Type)&&(data.coffee==true && item.feature.coffeearea=="YES")&&(data.Wifi==false && item.feature.airconditioning=="NO") ? item
        : (data.tipo!="NO" && data.tipo===item.Type)&&(data.coffee==true && item.feature.coffeearea=="NO")&&(data.Wifi==true && item.feature.airconditioning=="YES") ? undefined
        : (data.tipo!="NO" && data.tipo===item.Type)&&(data.coffee==true && item.feature.coffeearea=="NO")&&(data.Wifi==true && item.feature.airconditioning=="NO") ? undefined
        : (data.tipo!="NO" && data.tipo===item.Type)&&(data.coffee==true && item.feature.coffeearea=="NO")&&(data.Wifi==false && item.feature.airconditioning=="YES") ? undefined
        : (data.tipo!="NO" && data.tipo===item.Type)&&(data.coffee==true && item.feature.coffeearea=="NO")&&(data.Wifi==false && item.feature.airconditioning=="NO") ? undefined
        : (data.tipo!="NO" && data.tipo===item.Type)&&(data.coffee==false && item.feature.coffeearea=="YES")&&(data.Wifi==true && item.feature.airconditioning=="YES")? item
        : (data.tipo!="NO" && data.tipo===item.Type)&&(data.coffee==false && item.feature.coffeearea=="YES")&&(data.Wifi==true && item.feature.airconditioning=="NO") ? undefined
        : (data.tipo!="NO" && data.tipo===item.Type)&&(data.coffee==false && item.feature.coffeearea=="YES")&&(data.Wifi==false && item.feature.airconditioning=="YES") ? item
        : (data.tipo!="NO" && data.tipo===item.Type)&&(data.coffee==false && item.feature.coffeearea=="YES")&&(data.Wifi==false && item.feature.airconditioning=="NO") ? item
        : (data.tipo!="NO" && data.tipo===item.Type)&&(data.coffee==false && item.feature.coffeearea=="NO")&&(data.Wifi==true && item.feature.airconditioning=="YES") ? item
        : (data.tipo!="NO" && data.tipo===item.Type)&&(data.coffee==false && item.feature.coffeearea=="NO")&&(data.Wifi==true && item.feature.airconditioning=="NO") ? undefined
        : (data.tipo!="NO" && data.tipo===item.Type)&&(data.coffee==false && item.feature.coffeearea=="NO")&&(data.Wifi==false && item.feature.airconditioning=="YES") ? item
        : (data.tipo!="NO" && data.tipo===item.Type)&&(data.coffee==false && item.feature.coffeearea=="NO")&&(data.Wifi==false && item.feature.airconditioning=="NO") ? item
        : undefined
      }   
  }))
  .subscribe(res=>{
    res = res.filter(function(n){ return n != undefined });
    this.aziende=Observable.of(res);
    console.log(this.aziende);
    this.navCtrl.setRoot(HomePage, this.aziende)
  });
}

}
