import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Data } from './data';
import { Invoice } from './Invoice';
import { Document } from './Document';

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  private apiUrl = 'http://192.168.195.128:8081/api/v1'; // Remove /data from the URL
  //private baseURL = "http://192.168.36.128:8080/save";

  private baseURL = "http://192.168.195.128:8081/api/v1/invoices";
  idDocument : any;
  statusDocument : any;
  constructor(private http: HttpClient) { }


  updateInvoice(id: number, invoice: Invoice): Observable<Object>{
    return this.http.put(`${this.baseURL}/${id}`, invoice);
  }


  uploadImages(formData: FormData): Observable<any> {
    return this.http.post(`${this.apiUrl}/data`, formData);
  }

  fetchPdfData(formDatas: FormData): Observable<any> {
    return this.http.post(`${this.apiUrl}/pdf`, formDatas);
  }

  //sendData(data: any): Observable<any> {
   // return this.http.post<any>(this.apiUrl + '/save', data);
  //}
  createInvoices(invoice: Invoice): Observable<Object>{
    return this.http.post(`${this.baseURL}`, invoice);
  }

  submitInvoiceData(datainvoice: Data): Observable<Object>{
    return this.http.post(`${this.baseURL}`, datainvoice);
  }


  saveData(data: Data): Observable<Data> {
    return this.http.post<Data>(this.baseURL, data);
  }
  

  validateDocument(document: Document): Observable<Document> {
    return this.http.post<Document>(`${this.apiUrl}/documents/validate`, document);
  }
  

// Example Angular service method to reject a document
rejectDocument(document: Document): Observable<void> {
  return this.http.post<void>(`${this.apiUrl}/documents/reject`,document);
}


setDocumentId(id:any){
this.idDocument = id;
}

getDocumentId(){
 return this.idDocument;
}


   

}
