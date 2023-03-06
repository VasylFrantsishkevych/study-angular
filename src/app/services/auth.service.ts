import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable, tap} from "rxjs";

import {IAuth, ITokens} from "../interfaces";
import {urls} from "../configs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly _accessTokenKey = 'access';
  private readonly _refreshTokenKey = 'refresh';
  private authUser = new BehaviorSubject<string|null>(null);

  constructor(private httpClient: HttpClient) { }

  register(user: IAuth): Observable<IAuth> {
    return this.httpClient.post<IAuth>(urls.users, user)
  }

  //логінеця новий юзер
  login(user: IAuth): Observable<ITokens> {
    return this.httpClient.post<ITokens>(urls.auth.login, user).pipe(
      tap((tokens) => {
        this.authUser.next(user.username)
        this._setTokens(tokens)
      })
    )
  }
  // рефрешимо access токен
  refresh(refresh: string): Observable<ITokens> {
    return this.httpClient.post<ITokens>(urls.auth.refresh, {refresh}).pipe(
      tap((tokens) => {
        this._setTokens(tokens)
      })
    )
  }
  // слідкуємо за зміною імені юзера
  getUserName(): Observable<string|null> {
    return this.authUser.asObservable();
  }
  // записую токени в localStorage
  private _setTokens({access, refresh}: ITokens): void {
    localStorage.setItem(this._accessTokenKey, access)
    localStorage.setItem(this._refreshTokenKey, refresh)
  }
  // перевірка чи юзер залогінений
  isAuthenticated(): boolean {
    return !!this.getAccessToken();
  }
  // отримую рефреш токен з локал стореджа
  getAccessToken(): string {
    return localStorage.getItem(this._accessTokenKey) || '';
  }
  // отримую аксес токен з локал стореджа
  getRefreshToken(): string {
    return localStorage.getItem(this._refreshTokenKey) || '';
  }
  // видаляю токени з локал стореджа
  deleteTokens(): void {
    localStorage.removeItem(this._accessTokenKey);
    localStorage.removeItem(this._refreshTokenKey);
    this.authUser.next(null);
  }
}
