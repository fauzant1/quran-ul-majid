import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Network } from '@ionic-native/network';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { NetworkErrorPage } from '../pages/network-error/network-error';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

  pages: Array<{title: string, component: any}>;

  constructor(public network:Network,public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();

   

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'List', component: ListPage },
     { title: 'Errir', component: NetworkErrorPage }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      //debugger;
      let disconnectSubscription = this.network.onDisconnect().subscribe(() => {
      this.nav.push(NetworkErrorPage);
        console.log('network was disconnected :-(');
      });
  //     disconnectSubscription.unsubscribe();
  
  
  
  let connectSubscription = this.network.onConnect().subscribe(() => {
    console.log('network connected!');
    this.nav.pop();
    setTimeout(() => {
      if (this.network.type === 'wifi') {
        console.log('we got a wifi connection, woohoo!');
      }
    }, 3000);
  });
  
  
  // connectSubscription.unsubscribe();
      
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
