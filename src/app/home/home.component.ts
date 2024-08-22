import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  @ViewChild('typingContainer', { static: true }) typingContainer!: ElementRef;

  texts: string[] = [
    `<i class="fa-solid fa-check console-icon" style=color:green; width: 100%;"></i> Compiled successfully. <br><br>`,
    
    `Basic settings are loading... <br>`,
    `Honesty_level: 95% <br>`,
    `<span style="color:green;"><strong>Settings loaded and approved.</strong></span><br><br>`,
    
    `Okay, but you come for datas about me, right? <br>Follow this terminal commands below. --><br><br>`,
    `<i class="fa-solid fa-caret-right"></i> Search the navbar on left side,<br>`,
    `<i class="fa-solid fa-caret-right"></i> Click on the icons for discovering contents,<br>`,
    `<i class="fa-solid fa-caret-right"></i> Have a nice experience. ;)<br><br>`,
    `ALERT!<br>Don't forget to drop me a line, <br>if you enjoyed your time here, thanks.<br>`

  ];

  constructor(private renderer: Renderer2, private toastr: ToastrService) {}

  //fullText: string = 'Hello, this is a typing animation!';
  //displayedText: string = '';
  typingSpeed: number = 50; 


  ngOnInit(): void {
    this.typeText();
  }

  typeText(): void {
    let currentIndex = 0;

    const type = () => {
      if (currentIndex < this.texts.length) {
        this.addText(this.texts[currentIndex], () => {
          currentIndex++;
          setTimeout(type, this.typingSpeed);
        });
      }
    };
    type();
  }

  addText(text: string, callback: () => void): void {
    let container = this.typingContainer.nativeElement;
    let tempElement = this.renderer.createElement('div');
    tempElement.innerHTML = text;
    let elements: Node[] = Array.from(tempElement.childNodes) as Node[];

    const addChar = (index: number, element: Node, done: () => void) => {
      if (index < (element.textContent?.length || 0)) {
        this.renderer.appendChild(container, this.renderer.createText(element.textContent!.charAt(index)));
        setTimeout(() => addChar(index + 1, element, done), this.typingSpeed);
      } else {
        done();
      }
    };

    const addElement = (element: Node, done: () => void) => {
      if (element.nodeType === Node.TEXT_NODE) {
        addChar(0, element, done);
      } else {
        this.renderer.appendChild(container, element);
        done();
      }
    };

    const typeElements = (elems: Node[], done: () => void) => {
      if (elems.length > 0) {
        addElement(elems.shift()!, () => typeElements(elems, done));
      } else {
        done();
      }
    };

    typeElements(elements, callback);
  }

  killTerminal() {
    this.toastr.error("Sorry, You are not allowed to kill this fancy terminal. :)");
  }

  terminalOpen() {
    this.toastr.info("Nice try. Go to your start menu, type 'cmd'.");
  }

  closeTerminal() {
    this.toastr.error("How dare You!");
  }
}
