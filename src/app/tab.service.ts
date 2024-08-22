import { Injectable } from '@angular/core';

interface Tab {
  title: string;
  route: string;
}

@Injectable({
  providedIn: 'root'
})
export class TabService {

  private tabs: Tab[] = [];

  getTabs(): Tab[] {
    return this.tabs;
  }

  addTab(tab: Tab): void {
    if (!this.tabs.find(t => t.route === tab.route)) {
      this.tabs.push(tab);
    }
  }

  removeTab(route: string): void {
    this.tabs = this.tabs.filter(t => t.route !== route);
  }

  clearTabs(): void {
    this.tabs = [];
  }
}
