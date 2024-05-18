import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Data } from './data';
import { Invoice } from './Invoice';
import { Document } from './Document';


@Injectable({
  providedIn: 'root'
})
export class DoneService {
  private apiUrl = 'http://192.168.195.128:8081/api/v1'; // Remove /data from the URL

  idDocument : any;
  statusDocument : any;
  constructor(private http: HttpClient) { }


    // Method to fetch documents with status "done" from the backend
   getCompletedDocuments(): Observable<Document[]> {
     return this.http.get<Document[]>(`${this.apiUrl}/documents/completed`);
   }
    consultDocument(documentId: string,id:number): Observable<any> {
      const params = new HttpParams().set('documentId', documentId)
                                      .set('id',id);
      return this.http.post(`${this.apiUrl}/documents/consultjson`, null, { params });
    }
    
    consultDocumentPdf(documentId: string): Observable<any> {
      const params = new HttpParams().set('documentId', documentId);
      return this.http.post(`${this.apiUrl}/documents/consultpdf`, null, { params });
    }
}
