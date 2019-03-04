import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {HomePage} from "../home/home";
//import {AngularFireAuth} from "angularfire2/auth";
import firebase from 'firebase';
//import {RegisterPage} from  "../register/register"

@Component({
    selector: 'page-login',
    templateUrl: 'login.html',
})
export class LoginPage {
    username: string = "";
    password: string = "";
    

    constructor(public navCtrl: NavController, public navParams: NavParams) {
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad LoginPage');
    }

    //per aprire home page
    async login(){
       return (this.username=="Nicola")&&(this.password=="Salerno") ? this.navCtrl.setRoot(HomePage)
       : undefined

     //   this.navCtrl.setRoot(HomePage);

    }
    /*
      loginGoogle(){
        let provider = new firebase.auth.FacebookAuthProvider();

        firebase.auth().signInWithRedirect(provider).then(() =>{
            firebase.auth().getRedirectResult().then((result)=>{
                alert(JSON.stringify(result));
            }).catch(function (error) {
                alert(JSON.stringify(error));
            });
        })

      }*/

}
