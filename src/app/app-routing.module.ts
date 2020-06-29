import { AuthGuard } from './auth/auth.guard';
import { CreateComponent } from './posts/createposts/create.component';
import { ListComponent } from './posts/listposts/list.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
{ path: '', component: ListComponent },
{ path: 'create', component: CreateComponent, canActivate: [AuthGuard] },
{ path: 'edit/:postId', component: CreateComponent, canActivate: [AuthGuard] },
{ path: 'auth', loadChildren: './auth/auth.module#AuthModule'}
];
@NgModule({
imports: [RouterModule.forRoot(routes)],
exports: [RouterModule],
providers: [AuthGuard]
})
export class AppRoutingModule {}
