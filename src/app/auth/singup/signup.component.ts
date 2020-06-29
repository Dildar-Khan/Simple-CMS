import { Subscription } from 'rxjs';
import { AuthService } from './../auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { OnInit, Component, OnDestroy } from '@angular/core';

@Component({
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SingupComponent implements OnInit, OnDestroy {
  form: FormGroup;
  private authStatusSub: Subscription;
  constructor(public authService: AuthService) {}
  ngOnInit() {
    this.form = new FormGroup ({
      email: new FormControl(null, {validators: [Validators.required]}),
      password: new FormControl(null, {validators: [Validators.required]})
    });
    this.authStatusSub = this.authService.getAuthStatusListener().subscribe(
      authStatus => {
        // this.isLoading = false;
      }
    );
  }

  onSignup() {
    if (this.form.invalid) {
      return;
    }
    this.authService.createUser(this.form.value.email, this.form.value.password);
  }

  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
  }
}
