import { Component, HostListener, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { TabService } from './tab.service';
import { last } from 'rxjs';

interface Tab {
  title: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'rmnvndg';

  menuVisible = false;
  isMobile = false;

  isTabsVisible: boolean = false;


  tabs: string[] = [];
  activeTab: string = '';
  
  tabAbout: string = "about";
  tabEducation: string ="education";
  tabExperiences: string = "experiences";
  tabReferences: string = "references";
  tabContact: string = "contact";


  constructor(private router: Router, public tabService: TabService) {}

  
  ngOnInit(): void {
    this.getTabs();
    this.checkScreenSize();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.checkScreenSize();
  }


  toggleMenu() {
    console.log('ToggleMenu method triggered');

    this.menuVisible = !this.menuVisible;
    console.log('Menu visibility toggled:', this.menuVisible);

  }

  checkScreenSize() {
    this.isMobile = window.innerWidth <= 768;
  }

  addTab(tab: string): void {
    this.setActiveTab(tab);
    if (this.tabs == null || this.tabs.length == 0) {
      this.tabs.push(tab);
      this.setActiveTab(tab);
    } else {
      let tabExists = false;
      for (let tabitem of this.tabs) {
        if (tabitem === tab) {
          tabExists = true;
          break;
        }
      }
      if (!tabExists) {
        this.tabs.push(tab);
        this.setActiveTab(tab);
      }
    }
  }
  
  closeTab(tabParam: string): void {
    const index = this.tabs.indexOf(tabParam, 0);
    if (index > -1) {
      this.tabs.splice(index, 1);

      if (this.tabs.length == 0) {
        this.router.navigateByUrl('');
      }
      else {
        let lastTab = this.tabs[this.tabs.length - 1];
        this.router.navigateByUrl(lastTab)
        this.setActiveTab(lastTab);
      }
    }
    
  }

  clearTab(): void {
    this.tabs = [];
  }

  getTabs(): String[] {
    return this.tabs;
  }

  routeTo(tab: string) {
    let slash = "/";
    let lowerCaseTab = tab.toLowerCase();
    this.router.navigateByUrl(slash+lowerCaseTab);
    this.setActiveTab(lowerCaseTab); 
  }

  setActiveTab(tab: string): void {
    this.activeTab = tab;
  }


}
