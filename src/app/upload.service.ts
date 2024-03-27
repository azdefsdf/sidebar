import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Data } from './data';
import { Invoice } from './Invoice';

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  private apiUrl = 'http://192.168.36.128:8080/api/v1'; // Remove /data from the URL
  //private baseURL = "http://192.168.36.128:8080/save";

  private baseURL = "http://192.168.36.128:8080/api/v1/invoices";

  constructor(private http: HttpClient) { }


  createInvoices(invoice: Invoice): Observable<Object>{
    return this.http.post(`${this.baseURL}`, invoice);
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
  

  submitInvoiceData(datainvoice: Data): Observable<Object>{
    return this.http.post(`${this.baseURL}`, datainvoice);
  }


  saveData(data: Data): Observable<Data> {
    return this.http.post<Data>(this.baseURL, data);
  }
  
}
