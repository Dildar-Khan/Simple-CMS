import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreatePosts } from './post.model';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

const BACKEND_URL = environment.apiUrl + '/posts';
@Injectable({providedIn: 'root'})
export class PostService {
  private posts: CreatePosts [] = [];
  private postsUpdated = new Subject<{posts: CreatePosts[], postCount: number}>();
constructor(private http: HttpClient, private router: Router) {}

getAllPosts(postsPerPage: number, currentPage: number) {
  const queryParams = `?pagesize=${postsPerPage}&page=${currentPage}`;
  this.http.get<{message: string, posts: any, maxPosts: number}>(BACKEND_URL + '/posts' +  queryParams).
  pipe(
    map(postData => {
    return {
      posts: postData.posts.map(post => {
      return {
        id: post._id,
        postTitle: post.postTitle,
        postStatus: post.postStatus,
        // allowComments: post.allowComments,
        postDescription: post.postDescription,
        imagePath: post.imagePath,
        creator: post.creator
      };
    }), maxPosts: postData.maxPosts };
  })).
  subscribe(transformedPostData => {
    this.posts = transformedPostData.posts;
    this.postsUpdated.next({posts: [...this.posts], postCount: transformedPostData.maxPosts});
  });
}

getPostUpdatedListener() {
  return this.postsUpdated.asObservable();
}

getPost(id: string) {
  return this.http.get<{_id: string, postTitle: string, postStatus: string,
    // allowComments: boolean,
    postDescription: string, imagePath: string, creator: string }>
  (BACKEND_URL + '/posts/' + id);
}

createPosts(postTitle: string, postStatus: string,
  // allowComments: boolean,
  postDescription: string, image: File) {
  const postData = new FormData();
  postData.append('postTitle', postTitle);
  postData.append('postStatus', postStatus);
  // postData.append('allowComments', allowComments);
  postData.append('postDescription', postDescription);
  postData.append('image', image, postTitle);
  // const createPosts: CreatePosts = {
  //  id: null, postTitle: postTitle, postStatus: postStatus, allowComments: allowComments, postDescription: postDescription
  // };
this.http.post<{ message: string, post: CreatePosts}>(BACKEND_URL + '/create', postData).
subscribe(response => {
//   const post: CreatePosts = {
//     id: response.post.id,
//      postTitle: postTitle, postStatus: postStatus,
//     // allowComments: allowComments,
//     postDescription: postDescription,
//     imagePath: response.post.imagePath
//   };
// this.posts.push(post);
// this.postsUpdated.next([...this.posts]);
this.router.navigate(['/']);
// console.log(response);
});
}

updatePost(id: string, postTitle: string, postStatus: string,
  // allowComments: boolean,
  postDescription: string, image: File | string
  )  {
    let postData: CreatePosts | FormData;
    if (typeof(image) === 'object') {
      postData = new FormData();
      postData.append('id', id);
      postData.append('postTitle', postTitle);
      postData.append('postStatus', postStatus);
  //  postData.append('allowComments', allowComments);
      postData.append('postDescription', postDescription);
      postData.append('image', image, postTitle);
    } else {
      postData = {
        id: id, postTitle: postTitle, postStatus: postStatus, postDescription: postDescription, imagePath: image, creator: null
      };
    }
  this.http.put(BACKEND_URL + '/update/' + id, postData).subscribe(response => {
    // const updatedPosts = [...this.posts];
    // const oldPostIndex = updatedPosts.findIndex(p => p.id === id);
    // const post: CreatePosts = {
    //   id: id, postTitle: postTitle, postStatus: postStatus, postDescription: postDescription, imagePath: ''
    // };
    // updatedPosts[oldPostIndex] = post;
    // this.posts = updatedPosts;
    // this.postsUpdated.next([...this.posts]);
    this.router.navigate(['/']);
  });
}

deletePost(postId: string) {
return this.http.delete(BACKEND_URL + '/delete/' + postId);
// .subscribe(() => {
//   const updatedPosts = this.posts.filter(post => post.id !== postId);
//   this.posts = updatedPosts;
//   this.postsUpdated.next([...this.posts]);
// });
}


}
