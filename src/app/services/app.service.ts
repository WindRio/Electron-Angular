import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUserInfo } from '../interfaces/app.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private http: HttpClient) { }
  getData(): Observable<IUserInfo[]> {
    return this.http
      .get<IUserInfo[]>('https://server-deployment-yvii.onrender.com/todo')
  }
  deleteData(id: number): Observable<IUserInfo> {
    return this.http.delete<IUserInfo>(`https://server-deployment-yvii.onrender.com/todo/${id}`)
  }
  addData(data: Omit<IUserInfo, "id">): Observable<IUserInfo> {
    return this.http.post<IUserInfo>(`https://server-deployment-yvii.onrender.com/todo`, data)
  }
  updateData(data: IUserInfo): Observable<IUserInfo> {
    return this.http.put<IUserInfo>(`https://server-deployment-yvii.onrender.com/todo/${data.id}`, data)
  };
}
