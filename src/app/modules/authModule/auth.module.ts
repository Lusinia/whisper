import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/authService/auth.service';
import { AuthFormComponent } from './components/auth-form/auth-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [AuthFormComponent],
  exports: [AuthFormComponent]
})
export class AuthModule {
}
