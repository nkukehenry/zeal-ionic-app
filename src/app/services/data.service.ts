import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  public selectedCourse: any;
  public selectedLesson: any;
  public selectedCategory: any;
  public selectedExercise: any;
  public selectedLecture: any;


  public preFix = "ZEAL-";

  constructor(private storage: Storage,) { }

  async cacheData(key='', data='') {
    return await this.storage.set(this.preFix + key, data);
  }
  async getCache(key='') {
    return await this.storage.get(this.preFix + key);
  }
  async clearCache(key='') {
    return await this.storage.remove(this.preFix + key);
  }

  public log(message='') {
    console.log(message);
  }

}
