import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  private baseUrl = 'http://192.168.195.128:8081/api/v1'; // Adjust this URL based on your backend endpoint

  constructor(private http: HttpClient) { }

  uploadFile(data: FormData): Observable<any> {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    return this.http.post(`${this.baseUrl}/add`, data, { headers });
  }

  // Add other methods for fetching data from backend as needed
}
