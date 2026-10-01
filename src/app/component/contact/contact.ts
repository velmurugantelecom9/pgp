import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-contact',
  standalone: true,

  imports: [
    CommonModule,
    ReactiveFormsModule
  ],

  templateUrl: './contact.html',
  styleUrl: './contact.scss'
})
export class Contact {

  contactForm: FormGroup;

  isSending = false;

  successMessage = '';

  errorMessage = '';


  constructor(
    private fb: FormBuilder,
    private http: HttpClient
  ) {

    this.contactForm = this.fb.group({

      name: [
        '',
        [
          Validators.required,
          Validators.minLength(3)
        ]
      ],

      phone: [
        '',
        [
          Validators.required,

          // Indian mobile number
          // Exactly 10 digits
          // First digit 6,7,8 or 9
          Validators.pattern(/^[6-9][0-9]{9}$/)
        ]
      ],

      email: [
        '',
        [
          Validators.required,
          Validators.email
        ]
      ],

      projectType: [
        '',
        Validators.required
      ],

      message: [
        '',
        [
          Validators.required,
          Validators.minLength(10)
        ]
      ]

    });

  }


  // Used in HTML validation
  get f() {
    return this.contactForm.controls;
  }


  onSubmit(): void {

    // Stop if form invalid
    if (this.contactForm.invalid) {

      this.contactForm.markAllAsTouched();

      return;
    }


    this.isSending = true;

    this.successMessage = '';

    this.errorMessage = '';


    const formData = {

      // ====================================
      // PUT YOUR WEB3FORMS ACCESS KEY HERE
      // ====================================

    //  access_key: 'e771cd35-4780-404e-a98a-2bb87e197c32',  vel
      access_key: '373a414a-c18d-4347-8a87-ef11390014f9',

      // Email Subject
      subject: 'New Customer Enquiry - PGP Construction',


      // Sender Name
      from_name: 'PGP Construction Website',


      // Customer Details

      name: this.contactForm.value.name,

      phone: this.contactForm.value.phone,

      email: this.contactForm.value.email,

      project_type:
        this.contactForm.value.projectType,

      message:
        this.contactForm.value.message

    };


    this.http.post(
      'https://api.web3forms.com/submit',
      formData
    )
    .subscribe({

      next: (response: any) => {

        this.isSending = false;


        if (response.success) {

          this.successMessage =
            'Thank you! Your enquiry has been sent successfully.';


          // Clear all fields
          this.contactForm.reset();

        } else {

          this.errorMessage =
            'Unable to send message. Please try again.';

        }

      },


      error: (error) => {

        console.error(
          'Web3Forms Error:',
          error
        );


        this.isSending = false;


        this.errorMessage =
          'Something went wrong. Please try again.';

      }

    });

  }

}