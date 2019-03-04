import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BookingPage } from '../booking/booking';
import {BookingTwoStep } from './../../providers/firebase/firebase';




@IonicPage()
@Component({
  selector: 'page-booking-two-step',
  templateUrl: 'booking-two-step.html',
})
export class BookingTwoStepPage {
  startClicked:boolean;
  endClicked:boolean;
  item: any;
  postidispo:number;
  c:any;  
  nperson:number;
  pfinal:number;
  timeStart:any;
  timeEnds:any;
  timeComun:any;
  myDate: String ;
  minimoD:String;
  massimoD:String;
  datainizio:String;
  datafine:String;
  TempoInizio:String;
  TempoFine:String;
  anno:String;
  mese:String;
  giorno:String;
  dataf:String;
  
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.item = this.navParams.data;
    var data=new Date();  
    data.setDate(data.getDate() + 1);
    this.myDate=data.toISOString();
    this.postidispo=5;    
    this.createArray(this.postidispo);
    this.nperson=1;    
    this.pfinal=this.nperson*this.item.price;
    this.minimoD=this.min(data);
    this.massimoD=this.max(data);
    this.startClicked=false;
    this.endClicked=false;    
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
    console.log(this.c);
  }
  pFinal(){
    var hour=0;
    hour=(this.timeComun.findIndex(obj => obj.time === this.TempoFine)+1)-(this.timeComun.findIndex(obj => obj.time === this.TempoInizio)+1)
    console.log("ore"+hour);
    this.pfinal=this.nperson*this.item.price*hour;
  }
  setData(data){
    this.anno=this.pad(data.year);
    this.mese=this.pad(data.month);
    this.giorno=this.pad(data.day);
    this.dataf=this.anno+" "+this.mese+" "+this.giorno;
    console.log(this.dataf);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BookingTwoStepPage');
  }
  lastStep(property){

     
  
    if((this.startClicked==true)&&(this.endClicked==false)){
      this.TempoFine = this.timeEnds[0].time;          
    }
    if((this.startClicked==false)&&(this.endClicked=true)){
      this.TempoInizio = this.timeStart[0].time;          
    }
    
    const book: BookingTwoStep= 
    {
      pfinal:this.pfinal,
      nperson: this.nperson,
      tempoFine:this.TempoFine,
      TempoInizio:this.TempoInizio,
      dataf:this.dataf,
      item:property
    }
    this.navCtrl.push(BookingPage, book);
  
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
    this.pFinal();
    console.log("joo"+this.timeEnds[0].time);
    }
   
  checkStart(v){
    this.endClicked=true;
    this.datafine=v;
    var index = this.functiontofindIndexByKeyValue(this.timeComun, "time", v);  
    console.log("indice"+index+" "+v);
    this.timeStart=this.timeComun.slice(0,index);
    this.pFinal();
    
    }
    functiontofindIndexByKeyValue(arraytosearch, key, valuetosearch) {
      
     for (var i = 0; i < arraytosearch.length; i++) {
      
     if (arraytosearch[i][key] == valuetosearch) {
     return i;
     }
     }
     return null;
     }

}
