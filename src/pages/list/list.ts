import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import{Http,Response} from '@angular/http';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
sura_no:any;

  selectedSurah: any;
  selectedSurah_name:any;
  selectedIndex: any;
  selectedSurahNo:any;
  selectedSurah_verses:any;
  selectedSurah_verses_infinite=[];
  surah_apiurl:any;
  pagination_surah:any;
  page_number:any;
  total_surah_pages:any;
  hr_bismillah='assets/imgs/hr_bismillah.png'; 
  hr_surah='assets/imgs/hr_surah.png';
  verse_no='assets/imgs/verse_no.png';
  chapterNumber='assets/imgs/chapterNumber.png';
  chapterName='assets/imgs/chapterName.png';


  getSurah(selectedSurahNo) {
    this.page_number=1;
    this.surah_apiurl="http://staging.quran.com:3000/api/v3/chapters/"+(selectedSurahNo)+"/verses?recitation=1&translations=21&language=en&page="+this.page_number+"&text_type=words";
this.selectedSurahNo=selectedSurahNo;
    return this.http.get(this.surah_apiurl)
    .map((res:Response)=>res.json()).subscribe(data=>{
    
      this.selectedSurah_verses=data.verses;
      this.selectedSurah_verses_infinite.push(this.selectedSurah_verses);
      //console.log(this.selectedSurah_verses);
    });
  }

  doInfinite(surah_no,infiniteScroll){
    debugger;
    this.page_number=this.page_number+1;
    
    this.pagination_surah="http://staging.quran.com:3000/api/v3/chapters/"+surah_no+"/verses?recitation=1&translations=21&language=en&page="+this.page_number+"&text_type=words";
    
   
      setTimeout(() => {
        this.http.get(this.pagination_surah)
        .map((res:Response)=>res.json()).subscribe(data=>{
        
          this.selectedSurah_verses=data.verses;
          this.selectedSurah_verses_infinite.push(this.selectedSurah_verses);
          console.log(this.selectedSurah_verses);
          console.log(this.selectedSurah_verses_infinite);
        });
        infiniteScroll.complete();
      }, 500);
    
    console.log(this.selectedSurah_verses_infinite)
  }

  constructor(public navCtrl: NavController, public navParams: NavParams,public http:Http) {
    
    this.selectedSurah = navParams.get('surahData');
    this.selectedIndex = navParams.get('surahIndex');
    this.selectedSurahNo=this.selectedSurah.chapter_number;
    this.selectedSurah_name=this.selectedSurah.name_simple;
    this.total_surah_pages= Math.floor(this.selectedSurah.verses_count / 10)+1;
    this.getSurah(this.selectedSurahNo);
    
    // console.log(this.selectedIndex);
    console.log(this.selectedSurah);
    // console.log( Math.floor(this.selectedSurah.verses_count / 10)+1);

  }

 
}
