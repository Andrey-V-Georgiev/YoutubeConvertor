import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConvertOptions } from '../interfaces/convertOptions';

@Injectable({
  providedIn: 'root'
})
export class ConvertService {

  private apiServerUrl = "http://localhost:3000";

  constructor(private http: HttpClient) { }

  public convertYoutubeLink(options: ConvertOptions) {
    console.log(options)
    return this.http.post<any>(`${this.apiServerUrl}`, options)
  }
}
