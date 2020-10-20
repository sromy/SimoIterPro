import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { UserService} from './services/user.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserInfo } from './models/user'

const apiUrl = '/simoiterpro-api/api/';
const headers = new HttpHeaders().set('Content-Type', 'text/plain; charset=utf-8');
const options : Object ={headers,  responseType: 'text' as 'text'};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  risultato = '';
  isCollapsed = true;
  userinfo$: Observable<UserInfo>;

  constructor(private http: HttpClient,
              private router: Router,
              private userService: UserService) { }  

  ngOnInit() { 
    this.getData();
    this.getUserDetails();
   }

  getData() {    
    return this.http.get<string>(apiUrl,options)
      .subscribe(data => {
        this.risultato = data;
      });
  }

  getUserDetails() {
    this.userinfo$ = this.userService.getUserInfo().asObservable();
  }

  doLogin(): void {
    console.log('dologin');
  }

  async doLogout() {
    await this.router.navigate(['/']);
    await this.userService.logout();
  }

  
}
