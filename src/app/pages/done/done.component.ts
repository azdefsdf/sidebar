import { Component, OnInit } from '@angular/core';
import { DoneService } from '../../done.service';
import { Data } from '../../data';
import { Invoice } from '../../Invoice';
import { Document } from '../../Document';
import { ProgressService } from '../../progress.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { NgIf, NgFor, DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UploadService } from '../../upload.service';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatIconModule } from '@angular/material/icon';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatDividerModule} from '@angular/material/divider';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';



@Component({
  selector: 'app-done',
  standalone: true,
  imports: [HttpClientModule, MatTableModule, DatePipe, MatButtonModule,
    MatToolbarModule,
    MatTabsModule,
    MatIconModule,
    MatTooltipModule,
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
    HttpClientModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    PdfViewerModule,
    MatButtonModule,
  ],
  templateUrl: './done.component.html',
  styleUrl: './done.component.css'
})
export class DoneComponent implements OnInit {
  completedDocuments: Document[] = [];
  displayedColumns: string[] = ['id', 'documentId', 'status', 'userId', 'createdAt', 'updatedAt', 'action'];
  

  invoiceForm!: FormGroup; // Declare the FormGroup
  selectedId!: number;


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


  constructor(private doneService: DoneService,
    private progressService: ProgressService,
    private router: Router,
    private sanitizer: DomSanitizer,
    private uploadService: UploadService
    ) { }

  ngOnInit(): void {
    this.fetchCompletedDocuments();

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
  fetchCompletedDocuments(): void {
    this.doneService.getCompletedDocuments().subscribe(
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


  consultDocument(documentId: string,id:number) {    
    this.doneService.consultDocument(documentId,id).subscribe(
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
    this.doneService.consultDocumentPdf(documentId).subscribe(
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
  



}
