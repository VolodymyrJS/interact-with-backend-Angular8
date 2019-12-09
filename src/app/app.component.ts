import { Component, OnInit } from '@angular/core';
import { Post } from './post.model';
import { PostService } from './post.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  endpoint = 'https://back-end-practice-angular8.firebaseio.com/posts.json';
  loadedPosts: Post[] = [];
  isFetching = false;
  error = null;

  constructor(private postService: PostService) { }

  ngOnInit() {
    this.isFetching = true;
    this.postService.fetchingPost().subscribe(post => {
      this.loadedPosts = post;
      this.isFetching = false;
    }, error => {
      this.error = error.status
      this.isFetching = false;
    });
  }

  onCreatePost(postData: Post) {
    this.postService.createAndStorePost(postData.title, postData.content);
  }

  onFetchPosts() {
    this.isFetching = true;
    this.postService.fetchingPost().subscribe(post => {
      this.loadedPosts = post;
      this.isFetching = false;
    }, error => {
      this.error = error.status
      this.isFetching = false;
    });
  }

  onClearPosts() {
    this.postService.deleteAllPosts().subscribe(() => {
      this.loadedPosts = [];
    });
  }

  handleError() {
    this.error = null;
  }

}
