import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage implements OnInit {

  constructor(private dataService: DataService, private router:Router) {}

  ngOnInit(): void {

      if(!this.dataService.user){
        this.router.navigate(['/']);
      }
  }

}
