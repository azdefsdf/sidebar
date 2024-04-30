import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UploadService } from '../../upload.service';
import { Router, RouterModule } from '@angular/router';
import { NgIf, NgFor } from '@angular/common';
import { HttpClientModule, provideHttpClient } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { FormsModule, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDividerModule } from '@angular/material/divider';
import { DatabaseService } from '../../database.service';
import { Data } from '../../data';
import { Invoice } from '../../Invoice';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Document } from '../../Document';

@Component({
  selector: 'app-upload',
  standalone: true,
  imports: [

    NgIf,
    PdfViewerModule,
    NgFor,
    RouterModule,
    HttpClientModule,
    MatRadioModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    PdfViewerModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatSlideToggleModule,
    MatTabsModule,
    MatTooltipModule,
    MatDividerModule,


  ],
  templateUrl: './upload.component.html',
  styleUrl: './upload.component.css'
})
export class UploadComponent implements OnInit {


  invoiceForm!: FormGroup; // Declare the FormGroup


  jsonData: any;
  loading = false;
  responseData: any;
  responseDataPdf: any;
  responseDocumentId: any;
  selectedFiles: File[] = [];
  currentStep: string = 'Uploading images';
  processingCompleted = false;
  pdfData: SafeResourceUrl | null = null;


  responseDatas: any = {}; // Assuming you have responseData available
  newData: Data = {} as Data; // Initialize empty object
  invoice: Invoice = new Invoice();


  constructor(
    private http: HttpClient,
    private uploadService: UploadService,
    private router: Router,
    private sanitizer: DomSanitizer,
  ) { }



  ngOnInit() {

    //form insert data
    this.invoiceForm = new FormGroup({
      invoiceNumber: new FormControl('', [Validators.required]),
      invoiceDate: new FormControl('', [Validators.required]),
      deliveryAddress: new FormControl('', [Validators.required]),
      totalAmount: new FormControl('', [Validators.required, Validators.min(0)]), // Assuming total amount is non-negative
      company: new FormControl('', [Validators.required])
    });
  }
  saveInvoice() {
    if (this.invoiceForm.valid) {
      const invoiceData = this.invoiceForm.value as Invoice; // Extract form values to Invoice object
      this.uploadService.createInvoices(invoiceData).subscribe(
        (data) => {
          console.log(data);
        },
        (error) => {
          console.error('Error creating invoice:', error);
          // Handle error appropriately
        }
      );
    } else {
      console.error('Form is invalid');
      // Display error messages to the user
    }
  }

  goToInvoiceList() {
    this.router.navigate(['/done']);
  }
  goToInvoiceLists() {
    this.router.navigate(['/progress']);
  }

  onFileSelected(event: any) {
    const files: FileList = event.target.files;
    for (let i = 0; i < files.length; i++) {
      this.selectedFiles.push(files[i]);
    }
  }

  onSubmit() {
    this.loading = true;
    const formData = new FormData();
    for (const file of this.selectedFiles) {
      formData.append('images', file);
    }
    formData.append('projectPath', 'SampleProjects/Hello/SampleProject/SampleProject.fcproj');
    this.uploadService.uploadImages(formData).subscribe(
      response => {
        this.loading = false;
        this.responseData = response;

        console.log(JSON.stringify(this.responseData));

        this.processingCompleted = true; // Set the flag to true
        // Call the backend function when processingCompleted is true
        if (this.processingCompleted) {
          this.callBackendPdfFunction();
        }
      },
      error => {
        this.loading = false;
        console.error('Error:', error);
        // Handle errors here
      }
    );
  }


  callBackendPdfFunction() {

    const formDatas = new FormData();
    for (const file of this.selectedFiles) {
      formDatas.append('images', file);
    }
    // Call the backend function to fetch PDF data
    this.uploadService.fetchPdfData(formDatas).subscribe(
      response => {
        this.responseDataPdf = response;
        this.responseDocumentId = response.filename;
        this.uploadService.setDocumentId(response.filename);

        console.log(response);
        // Show a message in the specified section
        console.log(this.responseDocumentId);

        // Decode the base64 string
        const binaryData = atob(this.responseDataPdf.pdfData);
        // Create a Blob from the binary data
        const arrayBuffer = new ArrayBuffer(binaryData.length);
        const uint8Array = new Uint8Array(arrayBuffer);
        for (let i = 0; i < binaryData.length; i++) {
          uint8Array[i] = binaryData.charCodeAt(i);
        }
        const blob = new Blob([uint8Array], { type: 'application/pdf' });
        // Generate a URL for the Blob and sanitize it
        const url = URL.createObjectURL(blob);
        this.pdfData = this.sanitizer.bypassSecurityTrustResourceUrl(url);


      },
      error => {
        console.error('Error calling backend function:', error);
        // Handle errors here
      }
    );
  }


  validateDocument(): void {
    const document = new Document(this.uploadService.getDocumentId(), 'Done'); // Create a new document instance

    this.uploadService.validateDocument(document).subscribe(
      (response) => {

        console.log('Document validated successfully:', response);
        this.saveInvoice(); // Proceed to save the invoice after validation
        this.goToInvoiceList();
      },
      (error) => {
        console.error('Error validating document:', error);
      }
    );
  }


  // Method to reject a document
  rejectDocument(): void {
    const document = new Document(this.uploadService.getDocumentId(), 'Waiting'); // Create a new document instance

    this.uploadService.rejectDocument(document).subscribe(
      (response) => {

        console.log('Document Rejected successfully:', response);
        this.saveInvoice(); // Proceed to save the invoice after rejection
        this.goToInvoiceLists();

      },
      (error) => {
        console.error('Error Rejecting document:', error);
      }
    );
  }



}
