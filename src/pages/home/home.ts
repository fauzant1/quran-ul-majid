import { Component,ViewChild } from '@angular/core';
import { NavController, NavParams,Platform } from 'ionic-angular';
import{Http,Response} from '@angular/http'
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import {ListPage} from '../list/list';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
surahs:any=[];
api_url="http://staging.quran.com:3000/api/v3/chapters?language=9";

getData() {
    
  return this.http.get(this.api_url)
  .map((res:Response)=>res.json())
}
getSurahList()
{
  this.getData().subscribe(data => { 
    this.surahs=data.chapters;
    //console.log(this.surahs)
   
  })
}

openSurah(surah,index){
  this.navCtrl.setRoot(ListPage,{
surahData:surah,
surahIndex:index
  });
}


  constructor(public navCtrl: NavController,private http: Http) {
    this.getSurahList();
    this.getData();
  }

}
