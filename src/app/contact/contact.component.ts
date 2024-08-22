import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { HttpClient } from '@angular/common/http';
import { catchError, finalize, map, of, tap, throwError } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { ToastrService } from 'ngx-toastr';

interface EmailResponse {
  success: boolean;
  message: string;
}

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {

  user = {
    name: '',
    email: '',
    subject: '',
    message: '',
    isChecked: false
  };

  focused: boolean = false;
  hasContentName: boolean = false;
  hasContentEmail: boolean = false;
  hasContentSubject: boolean = false;
  hasContentMessage: boolean = false;

  nameFocused: boolean = false;
  emailFocused: boolean = false;
  subjectFocused: boolean = false;
  messageFocused: boolean = false;

  constructor(
    private http: HttpClient, 
    private formBuilder: FormBuilder, 
    private toastr: ToastrService
  ) { }

  contactForm = this.formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    subject: ['', [Validators.required]],
    message: ['', [Validators.required]],
    isChecked: ['', [Validators.required]]
  });


  checkContentName() {
    this.hasContentName = this.user.name.length > 0;
    this.nameFocused = this.hasContentName;
  }

  checkContentEmail() {
    this.hasContentEmail = this.user.email.length > 0;
    this.emailFocused = this.hasContentEmail;
  }

  checkContentSubject() {
    this.hasContentSubject = this.user.subject.length > 0;
    this.subjectFocused = this.hasContentSubject;
  }

  checkContentMessage() {
    this.hasContentMessage = this.user.message.length > 0;
    this.messageFocused = this.hasContentMessage;
  }
  
  onCheckboxChange(): void {
    console.log('Checkbox State:', this.user.isChecked);
    this.user.isChecked = true;
  }

  submit() {

    const contactData = this.contactForm.value;

    if (contactData.name != "" && contactData.email != "" && contactData.message && contactData.isChecked) {

      const formData = new FormData();
      Object.keys(this.contactForm.controls).forEach(key => {
          formData.append(key, this.contactForm.get(key)?.value);
      });
  
  
      this.sendEmail(formData).subscribe({
          next: (response) => {
              console.log('Email successfully sent:', response);
              this.toastr.success("Thanks! I will read your email soon!");
              this.contactForm.reset();
          },
          error: (error) => {
              console.error('Submission failed:', error);
              this.toastr.success("Thanks! I will read your email soon!");
              this.contactForm.reset();
          }
      });

    }
    else {
      this.toastr.error("All the fields required to fill and checkbox needs to be checked!");
    }

}


sendEmail(formData: any): Observable<any> {
  return this.http.post<EmailResponse>('https://wattson.dev/sendEmailRmn.php', formData).pipe(
      map((response: { success: boolean; message: string }) => {
          if (!response.success) {
              throw new Error('Server handled error: ' + response.message);
          }
          return response;
      }),
      catchError(error => {
        console.error('Error caught in sendEmail:', error);
        return throwError(() => new Error('Network or server error: ' + error.message));
    })
  );
}
}
