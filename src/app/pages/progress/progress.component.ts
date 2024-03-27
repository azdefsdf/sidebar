import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import PSPDFKit from 'pspdfkit';
import { UploadService } from '../../upload.service';
import { HttpClient } from '@angular/common/http';
import { Data } from '../../data';
import {  RouterModule } from '@angular/router';
import { NgIf, NgFor } from '@angular/common';
import { MySharedComponent } from '../../my-shared/my-shared.component';
import { HttpClientModule, provideHttpClient } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { FormsModule, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatIconModule } from '@angular/material/icon';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatDividerModule} from '@angular/material/divider';
import { DatabaseService } from '../../database.service';
import { Invoice } from '../../Invoice';


@Component({
  selector: 'app-progress',
  standalone: true,
  imports: [NgIf,
    PdfViewerModule,
    NgFor,
    RouterModule,
    MySharedComponent,
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
    MatDividerModule,],
  templateUrl: './progress.component.html',
  styleUrl: './progress.component.css'
})


export class ProgressComponent  implements OnInit {



	constructor(
	  private http: HttpClient,
	  private uploadService: UploadService,
	  private router: Router
	) { }
  
  invoice: Invoice = new Invoice();

  ngOnInit(): void {
  }

  saveInvoice(){
    this.uploadService.createInvoices(this.invoice).subscribe( data =>{
      console.log(data);
      this.goToInvoiceList();
    },
    error => console.log(error));
  }

  goToInvoiceList(){
    this.router.navigate(['/done']);
  }
  
  onSubmitInvoice(){
    console.log(this.invoice);
    this.saveInvoice();
  }




}