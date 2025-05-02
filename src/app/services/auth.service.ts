import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CustomerDto } from '../dto/customer-dto';
import { AppConstants } from '../../app.constants';
import { RegisterRequestDTO } from '../dto/register-request-dto';
import { ResetPasswordRequestDTO } from '../dto/reset-password-request-dto';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(customer: CustomerDto): Observable<any> {
    return this.http.post(`${AppConstants.LOGIN_ENDPOINT}/login`, customer);
  }

  register(register: RegisterRequestDTO): Observable<any> {
    return this.http.post(`${AppConstants.LOGIN_ENDPOINT}/register`, register);
  }

  resetPassword(request: ResetPasswordRequestDTO): Observable<any> {
    return this.http.post(`${AppConstants.LOGIN_ENDPOINT}/resetPwd`, request);
  }

  forgotPassword(email: string): Observable<any> {
    return this.http.get(`${AppConstants.LOGIN_ENDPOINT}/forgot-pwd/${email}`);
  }

}
