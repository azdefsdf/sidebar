import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnInit,Input, Output} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UploadService } from '../../upload.service';
import { Router, RouterModule } from '@angular/router';
import { NgIf, NgFor, CommonModule } from '@angular/common';
import { HttpClientModule, provideHttpClient } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button'
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
import { Document } from '../../Document';
import { provideNativeDateAdapter } from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import { ClientService } from '../../client.service';


@Component({
  selector: 'app-logout',
  standalone: true,
  imports: [
    CommonModule,
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
    MatFormFieldModule, 
    MatInputModule,
    MatDatepickerModule,
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.css'
})
export class LogoutComponent {
  
  nom: string = '';
  prenom: string = '';
  sex: string = '';
  dateDelivre: Date | null = null;
  dateExpiration: Date | null = null;
  dateNaissance: Date | null = null;
  numeroPasseport: string = '';
  pays: string = '';
  selectedFile: File | null = null;

  constructor(private clientService: ClientService,
    private router: Router,
  ) { }

  onFileSelected(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement && inputElement.files && inputElement.files.length > 0) {
      this.selectedFile = inputElement.files[0];
    }
  }

  onSubmit(): void {
    const formData = new FormData();
    formData.append('nom', this.nom);
    formData.append('prenom', this.prenom);
    formData.append('sex', this.sex);
    formData.append('dateDelivre', this.dateDelivre ? this.dateDelivre.toISOString() : ''); // Adjusted date format
    formData.append('dateExpiration', this.dateExpiration ? this.dateExpiration.toISOString() : ''); // Adjusted date format
    formData.append('dateNaissance', this.dateNaissance ? this.dateNaissance.toISOString() : ''); // Adjusted date format
    formData.append('numeroPasseport', this.numeroPasseport);
    formData.append('pays', this.pays);
    formData.append('file', this.selectedFile as Blob); // Append the selected file

    this.clientService.uploadFile(formData).subscribe(
      response => {
        console.log(response);
        this.router.navigate(['/upload']);

        // Handle success response
      },
      error => {
        console.error(error);
        // Handle error response
      }
    );
  }
}