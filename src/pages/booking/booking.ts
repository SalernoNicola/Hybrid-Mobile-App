import { AngularFireObject } from 'angularfire2/database';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { FirebaseProvider,Booking } from './../../providers/firebase/firebase';
import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators,FormControl} from '@angular/forms';
import { HomePage } from '../home/home';
import { HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http/';



@IonicPage()
@Component({
  selector: 'page-booking',
  templateUrl: 'booking.html',
})


export class BookingPage {
  item: any;
  month: string = '';
  gender: string = '';
  gaming: string = '';
  notification: string = '';
  os: string = '';
  year: string = '';
  postidispo:number;
  c:any;
  masks: any;
  cardNumber: any = "";
  meseScadenza: any = "";
  annoScadenza: any = "";
  CVV: any = "";
  ncarta:FormControl;
  meses:FormControl;
  annos:FormControl;
  cvv:FormControl;
  validate:FormGroup;
  control:boolean= true;
  


  constructor(private http: HttpClient,public navCtrl: NavController, public navParams: NavParams,public alertCtrl: AlertController,public firebaseProvider: FirebaseProvider) {
    window.addEventListener('keyboardDidHide', () => {
      this.control=true;
      // Describe your logic which will be run each time keyboard is closed.
  });
  window.addEventListener('keyboardWillShow', (ev) => {
    // Describe your logic which will be run each time when keyboard is about to be shown.
    this.control=false;
  });
    this.item = this.navParams.data;
    console.log(this.item);
    this.ncarta = new FormControl('', Validators.compose([Validators.minLength(16), Validators.required]));
    this.meses = new FormControl('', Validators.compose([Validators.minLength(2), Validators.required]));
    this.annos = new FormControl('', Validators.compose([Validators.minLength(2), Validators.required]));
    this.cvv = new FormControl('', Validators.compose([Validators.minLength(3), Validators.required]));
    
    this.validate = new FormGroup({
      ncarta: new FormControl(null, Validators.compose([Validators.minLength(16), Validators.required])),
      meses: new FormControl(null, Validators.compose([Validators.minLength(2), Validators.required])),
      annos: new FormControl(null, Validators.compose([Validators.minLength(2), Validators.required])),
      cvv: new FormControl(null, Validators.compose([Validators.minLength(3), Validators.required]))
   });
    
    
  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad BookingPage');
  }
  
  doPrompt() {  
    this.cardNumber=this.cardNumber.replace(/\s/g,'');
    let prompt = this.alertCtrl.create({
      title: 'Conferma',
      cssClass: 'buttoncss',
      message: "Sei sicuro di effettuare la prenotazione",
      buttons: [
        {
          text: 'Cancella',
          handler: data => {
            console.log('Cancel clicked');
          }      
        },
        {
          text: 'Conferma',

          handler: data => {
            console.log(this.item.item.name+" "+this.item.item.surname+" "+this.item.item.city+" "+this.item.dataf+" "+this.item.nperson+" "+this.item.pfinal+" "+this.item.TempoInizio+" "+this.item.tempoFine);
            console.log(this.cardNumber+" "+this.meseScadenza+" "+this.annoScadenza+" "+this.CVV);
            
            const booking: Booking= 
            {
              name: this.item.item.name,
              img: this.item.item.surname,
              city:this.item.item.city,
              giorno:this.item.dataf,
              npersone:this.item.nperson,
              prezzofinale:this.item.pfinal,
              tempoinizio:this.item.TempoInizio,
              tempofine:this.item.tempoFine,
              qrcode:"https://www.qrstuff.com/images/default_qrcode.png",
              card: {
                number:this.cardNumber.slice(0,16),
                meseS:this.meseScadenza.slice(0,2),
                annoS:this.annoScadenza.slice(0,2), 
                CVV:this.CVV.slice(0,3),
              }           
             }
             //this.firebaseProvider.addItemBooking(booking); 
             this.navCtrl.setRoot(HomePage,"booking");             
          ;        
         // this.firebaseProvider.addItemBooking(booking);
          }
        }
      ]
    });
    prompt.present();
  }

 
}
