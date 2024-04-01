import { Component, OnInit } from '@angular/core';
import {  RouterModule } from '@angular/router';
import { DoneService } from '../../done.service';
import { Data } from '../../data';
import { Invoice } from '../../Invoice';
import { Document } from '../../Document';
import { HttpClientModule } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { DatePipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { ProgressService } from '../../progress.service';

@Component({
  selector: 'app-progress',
  standalone: true,
  imports: [
    RouterModule,HttpClientModule, MatTableModule, DatePipe, MatButtonModule
],
  templateUrl: './progress.component.html',
  styleUrl: './progress.component.css'
})


export class ProgressComponent implements OnInit {
  completedDocuments: Document[] = [];
  displayedColumns: string[] = ['id', 'documentId', 'status', 'userId', 'createdAt', 'updatedAt', 'action'];


  constructor(private progressService: ProgressService) { }

  ngOnInit(): void {
    this.getWaitingDocuments();
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


  consultDocument(element: any): void {
    // Implement the logic to consult the document
    console.log('Consulting document:', document);
    // You can navigate to a new page or display additional information about the document
  }

}