import { PostService } from './../post.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CreatePosts } from '../post.model';
import { Subscription } from 'rxjs';
import { PageEvent } from '@angular/material';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
templateUrl: './list.component.html',
styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit, OnDestroy {
posts: CreatePosts [] = [];
totalPosts = 0;
postsPerPage = 2;
currentPage = 1;
pageSizeOptions = [1, 2, 5, 10];
userIsAuthenticated = false;
userId: string;
private postsSub: Subscription;
private authStatusSub: Subscription;
constructor(public postsService: PostService, private authService: AuthService) {}

  ngOnInit() {
    this.postsService.getAllPosts(this.postsPerPage, this.currentPage);
    this.userId = this.authService.getUserId();
    this.postsSub = this.postsService.getPostUpdatedListener().
    subscribe((postsData: {posts: CreatePosts[], postCount: number}) => {
      this.totalPosts = postsData.postCount;
      this.posts = postsData.posts;
    });
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authStatusSub = this.authService.getAuthStatusListener().subscribe(isAuthenticated => {
      this.userIsAuthenticated = isAuthenticated;
      this.userId = this.authService.getUserId();
    });
  }

  onChangedPage(pageData: PageEvent) {
    this.currentPage = pageData.pageIndex + 1;
    this.postsPerPage = pageData.pageSize;
    this.postsService.getAllPosts(this.postsPerPage, this.currentPage);
  }

  onDelete(postId: string) {
    this.postsService.deletePost(postId).subscribe(() => {
      this.postsService.getAllPosts(this.postsPerPage, this.currentPage);
    });
  }
  ngOnDestroy() {
    this.postsSub.unsubscribe();
    this.authStatusSub.unsubscribe();
  }
}
