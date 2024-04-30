import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Data, RouterModule } from '@angular/router';
import { DoneService } from '../../done.service';
import { HttpClientModule } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { DatePipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { ProgressService } from '../../progress.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { NgIf, NgFor } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Document } from '../../Document';
import { Invoice } from '../../Invoice';
import { UploadService } from '../../upload.service';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDividerModule } from '@angular/material/divider';
import { Observable, catchError, tap, throwError } from 'rxjs';

@Component({
  selector: 'app-progress',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatTabsModule,
    MatIconModule,
    MatTooltipModule,
    RouterModule,
    MatDividerModule,
    MatSlideToggleModule,
    MatRadioModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    HttpClientModule,
    MatTableModule,
    DatePipe,
    MatButtonModule,
    NgIf,
    PdfViewerModule,
    NgFor,
    RouterModule,
    HttpClientModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    PdfViewerModule,
    MatButtonModule,
  ],
  templateUrl: './progress.component.html',
  styleUrl: './progress.component.css'
})


export class ProgressComponent implements OnInit {



  completedDocuments: Document[] = [];
  displayedColumns: string[] = ['id', 'documentId', 'status', 'userId', 'createdAt', 'updatedAt', 'action'];
  invoiceForm!: FormGroup; // Declare the FormGroup
  selectedId!: number;
  invoiceId!: number;

  processingCompleted = false;
  pdfData: SafeResourceUrl | null = null;
  jsonData: any;
  loading = false;
  responseData: any;
  responseDataPdf: any;
  responseDocumentId: any;
  responseDatas: any = {}; // Assuming you have responseData available
  newData: Data = {} as Data; // Initialize empty object
  invoice: Invoice = new Invoice();
  selectedFiles: File[] = [];


  constructor(
    private progressService: ProgressService,
    private router: Router,
    private sanitizer: DomSanitizer,
    private uploadService: UploadService,
  ) { }

  ngOnInit(): void {
    this.getWaitingDocuments();
    //form insert data
    this.invoiceForm = new FormGroup({
      invoiceNumber: new FormControl('', [Validators.required]),
      invoiceDate: new FormControl('', [Validators.required]),
      deliveryAddress: new FormControl('', [Validators.required]),
      totalAmount: new FormControl('', [Validators.required, Validators.min(0)]), // Assuming total amount is non-negative
      company: new FormControl('', [Validators.required])
    });

  }


  goToInvoiceList() {
    this.router.navigate(['/done']);
  }
  goToInvoiceLists() {
    this.router.navigate(['/progress']);
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


  updateInvoice(invoiceId: number): void {
    // Fetch the invoice data by its ID
    this.progressService.getInvoice(invoiceId).subscribe(
      (invoice: Invoice) => {
        // Populate form fields with current invoice data
        this.invoiceForm.patchValue({
          invoiceNumber: invoice.invoiceNumber,
          invoiceDate: invoice.invoiceDate,
          deliveryAddress: invoice.deliveryAddress,
          totalAmount: invoice.totalAmount,
          company: invoice.company,
          // Populate other fields similarly
        });
      },
      (error) => {
        console.error('Error fetching invoice data:', error);
      }
    );
  }

  saveUpdatedInvoice(): void {
    if (this.invoiceForm.valid) {
      const updatedInvoiceData = this.invoiceForm.value as Invoice;
      this.progressService.updateInvoice(this.invoiceId, updatedInvoiceData).subscribe(
        (data) => {
          console.error('id2 : ', this.invoiceId);
          console.log('Invoice updated successfully:', data);
          // Handle success, e.g., show a success message
        },
        (error) => {
          console.error('Error updating invoice:', error);
          // Handle error appropriately
        }
      );
    } else {
      console.error('Form is invalid');
      // Display error messages to the user
    }
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


  getWaitingDocuments(): void {
    this.progressService.getWaitingDocuments().subscribe(
      (documents) => {
        this.completedDocuments = documents;
        console.log('Completed documents:', documents);
      },
      (error) => {
        console.error('Error fetching completed documents:', error);
        // Handle errors
      }
    );
  }

  consultDocument(documentId: string, id: number) {
    this.progressService.consultDocument(documentId, id).subscribe(
      (response) => {
        // Assuming the response contains the JSON data

        this.processingCompleted = true;
        this.responseData = response;
        console.log(JSON.stringify(this.responseData));
        // Call the function to retrieve the PDF content
        this.consultDocumentPdf(documentId);
        this.selectedId = id;
      },
      (error) => {
        console.error('Error consulting document:', error);
      }
    );
  }

  consultDocumentPdf(documentId: string) {
    this.progressService.consultDocumentPdf(documentId).subscribe(
      (response) => {
        // Assuming the response contains the PDF content
        const binaryData = atob(response.pdfContent);
        const arrayBuffer = new ArrayBuffer(binaryData.length);
        const uint8Array = new Uint8Array(arrayBuffer);
        for (let i = 0; i < binaryData.length; i++) {
          uint8Array[i] = binaryData.charCodeAt(i);
        }
        const blob = new Blob([uint8Array], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);
        this.pdfData = this.sanitizer.bypassSecurityTrustResourceUrl(url);
      },
      (error) => {
        console.error('Error consulting PDF document:', error);
      }
    );
  }


  updateDocument(): void {
    if (!this.selectedId) {
      console.error('No document id selected');
      return;
    }
    this.progressService.updateDocument(this.selectedId).subscribe(
      (response) => {

        console.log('Document updated successfully:', response);
        console.error('document id : ', this.selectedId);
        this.updateInvoice(this.invoiceId);
        // Optionally, update the UI or reload the document list
        this.goToInvoiceList();
      },
      (error) => {
        console.error('Error updating document:', error);
        // Handle error
      }
    );
  }





}