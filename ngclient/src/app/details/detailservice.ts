import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Student {
  id: string;
  name: string;
  address: string;
  class: string;
  rollNo: string;
  fatherName: string;
  motherName: string;
}

@Injectable({
  providedIn: 'root',
})
export class DetailService {
  private apiUrl = 'http://localhost:3000/students';
  private http = inject(HttpClient);

  getStudents(
    search: string = '',
    sortBy: string = '',
    order: string = 'asc'
  ): Observable<Student[]> {
    let params = new HttpParams();
    if (search) params = params.set('search', search);
    if (sortBy) params = params.set('sortBy', sortBy).set('order', order);

    return this.http.get<Student[]>(this.apiUrl, { params });
  }
}
