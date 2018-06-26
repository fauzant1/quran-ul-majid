import { Component,ViewChild } from '@angular/core';
import {Nav, IonicPage, NavController, NavParams,ToastController  } from 'ionic-angular';
import { Network } from '@ionic-native/network';
/**
 * Generated class for the NetworkErrorPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


declare var navigator: any;
declare var Connection: any;
@IonicPage()
@Component({
  selector: 'page-network-error',
  templateUrl: 'network-error.html',
})
export class NetworkErrorPage {
  @ViewChild(Nav) nav: Nav;
  doRefresh(refresher)
  {
    if(navigator.onLine)
      {
        
        let toast = this.toastCtrl.create({
          message: 'Internet connected !',
          duration: 3000,
          position: 'bottom'
        });
        toast.present();
        this.nav.pop();
        refresher.complete();
        console.log(navigator.onLine);

      }
      else
      {
        let toast = this.toastCtrl.create({
          message: 'Connect your internet !',
          duration: 3000,
          position: 'bottom'
        });
        toast.present();
        refresher.complete();
        console.log(navigator.onLine);
      }
    console.log(refresher);
  }

  constructor(public navCtrl: NavController, public navParams: NavParams,public network:Network,public toastCtrl:ToastController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NetworkErrorPage');
  }

}
