import { HttpErrorResponse } from '@angular/common/http';
import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { BlogService } from './blog.service';
import { Blog } from '../blog/interfaces/blog';

import {Http, Response} from '@angular/http';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {

  blogs: Blog[] = []
  blogService : BlogService;
  yourName: string;
  title: string;
  body: string;
  idtoberemoved: number = -1;
  //myTime: number = new Date().get;
 
  constructor(blogService : BlogService) {
    this.blogService = blogService;
  }

ngOnInit() { 
  console.log("blog.component.ngOnInit...")
  this.blogService.fetch((result) => this.blogs = result);
  console.log("yourName: " + this.yourName);
  console.log(new Date());
} 

sendToServer() {
  console.log("blogs.component.sendToServer sending blogs...")
  let body = {"name": this.yourName, "title": this.title, "body": this.body, "time": this.myTime}
  this.blogService.posti((result) => {this.blogs.push(result)}, body);
} 
delete(id : number) {
  console.log("blogs.component.delete...")
  this.idtoberemoved = id;
  this.blogService.delete(id, this.success.bind(this), this.error.bind(this));
}
error(err : HttpErrorResponse) {
  this.idtoberemoved = -1;
  console.log("Delete did not succeed: " + err)
}
success(response : HttpResponse<string>) {
  console.log("Delete succeeded: id#" + this.idtoberemoved)

  for (let loc of this.blogs) {
    if (loc.id === this.idtoberemoved) {
      //console.log("Index of removed blog: " + this.blogs.indexOf(loc))
      this.blogs.splice(this.blogs.indexOf(loc),1)
    }
  }
}
}

