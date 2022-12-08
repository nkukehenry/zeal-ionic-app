import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController, NavController, Platform, ToastController } from '@ionic/angular';
import { AuthenticationService } from 'src/app/services/auth/authentication.service';

import { GoogleMap } from '@capacitor/google-maps';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.page.html',
  styleUrls: ['./contact.page.scss'],
})
export class ContactPage implements OnInit {

  exitcounter = 0;
  route:any;

  constructor() { }

  ngOnInit() {
    this.renderMap();
  }

async renderMap(){
    
const apiKey     =  environment.MY_MAPS_API_KEY;
const mapElement = document.getElementById('map');

const mapConfig = {
  center: {
    lat: 33.6,
    lng: -117.9,
  },
  zoom: 8,
  androidLiteMode: false,
}

const mapOptions:any = {
  id: 'map',
  apiKey: apiKey,
  config: mapConfig,
  element: mapElement,
}

// Create the Map Element
const map = await GoogleMap.create(mapOptions);

// Drop a Map Marker
await map.addMarkers([{
      coordinate: {
        lat: 33.6,
        lng: -117.9,
      },
      title: 'Namanda Plaza',
    }]);

  }
}
