import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { UploadService } from '../upload.service';

@NgModule({
  declarations: [],
  exports: [CommonModule, RouterModule],
})
export class MySharedComponent {}