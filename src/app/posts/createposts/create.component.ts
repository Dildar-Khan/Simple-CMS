import { CreatePosts } from './../post.model';
import { OnInit, Component, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PostService } from '../post.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Subscription } from 'rxjs';
import { mimeType } from './mime-type.validator';

@Component({
templateUrl: './create.component.html',
styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit, OnDestroy {
  form: FormGroup;
  post: CreatePosts;
  posts: CreatePosts [] = [];
  private mode = 'create';
  private postId: string;
  private postsSub: Subscription;
  imagePreview: string;
  totalPosts = 0;
  postsPerPage = 2;
  currentPage = 1;
  constructor(public postService: PostService, public route: ActivatedRoute) {}

  onCreatPost() {
    if (this.form.invalid) {
      return;
    }
    if (this.mode === 'create') {
      this.postService.createPosts(
      this.form.value.postTitle, this.form.value.postStatus,
      // this.form.value.allowComments,
      this.form.value.postDescription, this.form.value.image
      );
    } else {
      this.postService.updatePost(
        this.postId, this.form.value.postTitle, this.form.value.postStatus,
        // this.form.value.allowComments,
        this.form.value.postDescription,
        this.form.value.image
        );
    }
      this.form.reset();
    // console.log('working');
  }

  uploadImage(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({image: file});
    this.form.get('image').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  ngOnInit() {
    this.form = new FormGroup ({
      postTitle: new FormControl(null, {validators: [Validators.required]}),
      postStatus: new FormControl(null, {validators: [Validators.required]}),
      // allowComments: new FormControl(null),
      postDescription: new FormControl(null, {validators: [Validators.required]}),
      image: new FormControl(null, {validators: [Validators.required], asyncValidators: [mimeType]})
    });

    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('postId')) {
        this.mode = 'edit';
        this.postId = paramMap.get('postId');
        this.postService.getPost(this.postId).subscribe(postData => {
          this.post = {
            id: postData._id,
            postTitle: postData.postTitle,
            postStatus: postData.postStatus,
            // allowComments: postData.allowComments,
            postDescription: postData.postDescription,
            imagePath: postData.imagePath,
            creator: postData.creator
          };
          this.form.setValue({
            postTitle: this.post.postTitle,
            postStatus: this.post.postStatus,
            // allowComments: this.post.allowComments,
            postDescription: this.post.postDescription,
            image: this.post.imagePath
          });
        });
      } else {
        this.mode = 'create';
        this.postId = null;
      }
    });


    this.postService.getAllPosts(this.postsPerPage, this.currentPage);
    this.postsSub = this.postService.getPostUpdatedListener().
    subscribe((postsData: {posts: CreatePosts[], postCount: number}) => {
      this.totalPosts = postsData.postCount;
      this.posts = postsData.posts;
    });


  }

  onDelete(postId: string) {
    this.postService.deletePost(postId).subscribe(() => {
      this.postService.getAllPosts(this.postsPerPage, this.currentPage);
    });
  }
  ngOnDestroy() {
    this.postsSub.unsubscribe();
  }
}
