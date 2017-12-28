
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Blog } from '../blog/interfaces/blog';
import { ResultsToBlog, OneResultToBlog } from '../blog/interfaces/callback';

@Injectable()
export class BlogService {

  private http: HttpClient
  
  constructor(http: HttpClient) { 
    this.http = http 
  }
  fetch(resultsToBlog : ResultsToBlog) : void {
    this.http.get<Blog[]>('http://localhost:8080/blogs/').subscribe(resultsToBlog);
  }
  
  posti(oneResulToBlog: OneResultToBlog, b: Object) : void {
    let res = this.http.post<Blog>('http://localhost:8080/blogs/',b).subscribe(oneResulToBlog);
  } 
  delete(id : number, success : any, error : any) {
    let url = 'http://localhost:8080/blogs/' + id;
    console.log(url)
    this.http.delete(url, { observe: 'response', responseType: 'text' }).subscribe(success, error);
  }

  ngOnInit(): void {

    }
}