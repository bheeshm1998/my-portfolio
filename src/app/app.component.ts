import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import emailjs, { EmailJSResponseStatus } from 'emailjs-com';
import { EMAIL_JS_PUBLIC_KEY, EMAIL_JS_SERVICE_ID, EMAIL_JS_TEMPLATE_ID, MY_EMAIL_ADDRESS } from './constants';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  contactForm: FormGroup;

  MY_EMAIL_ADDRESS = MY_EMAIL_ADDRESS;

  constructor(private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      from_name: ['', [Validators.required]],
      email: ['', [Validators.email, Validators.required]],
      message: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.contactForm.valid) {
      console.log(this.contactForm.value);
    }
  }

  public sendEmail(e: Event) {
    debugger
    e.preventDefault();
    if (this.contactForm.valid) {
      emailjs.send(EMAIL_JS_SERVICE_ID, EMAIL_JS_TEMPLATE_ID, this.contactForm.value, EMAIL_JS_PUBLIC_KEY)
        .then((result: EmailJSResponseStatus) => {
          console.log(result.text);
          alert('Message sent successfully!');
          this.contactForm.reset();
        }, (error) => {
          console.log(error.text);
          alert('Failed to send message. Please try again later.');
        });
    }
  }

}
