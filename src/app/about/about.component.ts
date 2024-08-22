import { Component, OnInit } from '@angular/core';
import { TabService } from '../tab.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  isActive: boolean = false;
  tabs: string[] = ['about'];
  activeTab: string = '';
  tabContact: string = "contact";

  constructor(public tabService: TabService) {}


  ngOnInit(): void {
      this.isActive = true;
  }


  switchOff(): void {
    this.isActive = false;
  }

  
}
