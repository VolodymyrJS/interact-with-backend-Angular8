import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Post } from './post.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  endpoint = 'https://back-end-practice-angular8.firebaseio.com/posts.json';

  constructor(private http: HttpClient) { }

  createAndStorePost(title: string, content: string) {
    const postData: Post = { title, content };
    this.http
      .post<{ name: string }>
      (this.endpoint, postData)
      .subscribe(
        (respData => console.log(respData))
      );
  }

  fetchingPost() {
    return this.http
      .get<{ [key: string]: Post }>(this.endpoint,
        {
          headers: new HttpHeaders({ 'Custom-Header': 'Header from PostService' })
        })
      .pipe
      (map(responseData => {
        const postsArray: Post[] = [];
        for (const key in responseData) {
          if (responseData.hasOwnProperty(key)) {
            postsArray.push({ ...responseData[key], id: key });
          }
        }
        return postsArray;
      })
      )
  }

  deleteAllPosts() {
    return this.http.delete(this.endpoint);
  }
}
