import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { User } from '../interfaces/user';
import { UserRequest } from '../interfaces/user-request';
import { UpdateSuccess } from '../interfaces/update-success';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private pathService = 'api/user';

  constructor(private httpClient: HttpClient) { }

  public getUserById(id: string): Observable<User> {
    return this.httpClient.get<User>(`${this.pathService}/${id}`);
  }

  public update(userRequest: UserRequest): Observable<UpdateSuccess> {
    return this.httpClient.put<UpdateSuccess>(`${this.pathService}/`, userRequest);
  }
}
