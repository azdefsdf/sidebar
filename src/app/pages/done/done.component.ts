import { Component, OnInit } from '@angular/core';
import { DoneService } from '../../done.service';
import { Data } from '../../data';
import { Invoice } from '../../Invoice';
import { Document } from '../../Document';
import { HttpClientModule } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { DatePipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-done',
  standalone: true,
  imports: [HttpClientModule, MatTableModule, DatePipe, MatButtonModule],
  templateUrl: './done.component.html',
  styleUrl: './done.component.css'
})
export class DoneComponent implements OnInit {
  completedDocuments: Document[] = [];
  displayedColumns: string[] = ['id', 'documentId', 'status', 'userId', 'createdAt', 'updatedAt', 'action'];


  constructor(private doneService: DoneService) { }

  ngOnInit(): void {
    this.fetchCompletedDocuments();
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


  consultDocument(element: any): void {
    // Implement the logic to consult the document
    console.log('Consulting document:', document);
    // You can navigate to a new page or display additional information about the document
  }


}
