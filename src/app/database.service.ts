import { Injectable } from '@angular/core';
import * as sql from 'mssql';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  config = {
    user: 'FC12-VM\\student', // Windows Authentication user name
    password: '', // No password for Windows Authentication
    server: '192.168.36.128\\SQLEXPRESS01', // IP address and instance name
    database: 'kycdata',
    options: {
      trustedConnection: true   // Use Windows authentication
    }
  };

  
  
}
