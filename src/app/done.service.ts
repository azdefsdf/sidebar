import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Data } from './data';
import { Invoice } from './Invoice';
import { Document } from './Document';


@Injectable({
  providedIn: 'root'
})
export class DoneService {
  private apiUrl = 'http://192.168.36.128:8080/api/v1'; // Remove /data from the URL

  idDocument : any;
  statusDocument : any;
  constructor(private http: HttpClient) { }


    // Method to fetch documents with status "done" from the backend
    getCompletedDocuments(): Observable<Document[]> {
      return this.http.get<Document[]>(`${this.apiUrl}/documents/completed`);
    }
}
