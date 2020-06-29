import { AngularMaterialModule } from './../angular-material.module';
import { NgModule } from '@angular/core';
import { CreateComponent } from './createposts/create.component';
import { ListComponent } from './listposts/list.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
declarations: [CreateComponent, ListComponent],
imports: [CommonModule, ReactiveFormsModule, AngularMaterialModule, RouterModule]
})
export class PostsModule {}
