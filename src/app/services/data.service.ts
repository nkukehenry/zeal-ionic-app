import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  public transactions = [];
  public mainPairs: any  = [];
  public crossPairs: any = [];
  public accounts: any = [];
  public banks: any    = [];
  public accountTypes: any = [];
  public currencies: any    = [];
  public fundPurposes: any = [];
  public fundSources: any = [];
  public pikupPoints: any = [];
  public limits:any ={};
  public defaultCurrencyId:any;
  public isOpen:Boolean=false;
  public appData: any = {};
  public exchangePair = {};
  

  public preFix = "ZEAL-";

  constructor(private storage: Storage,) { }

  updateResources(data:any) {
    
      this.appData      = data;
      this.mainPairs    = data.main_pairs;
      this.crossPairs   = data.cross_pairs;
      this.accounts     = data.accounts;
      this.banks        = data.banks;
      this.accountTypes = data.account_types;
      this.currencies   = data.currencies;
      this.fundPurposes = data.fund_purposes;
      this.fundSources  = data.fund_sources;
      this.pikupPoints  = data.pikup_points;
      this.limits       = data.limits;
      this.defaultCurrencyId= data.default_currency_id;
      this.isOpen        = data.is_open;
  }

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
