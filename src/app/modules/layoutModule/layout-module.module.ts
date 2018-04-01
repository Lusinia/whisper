import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { MainHeaderComponent } from './components/headers/main-header/main-header.component';
import { SpeachModule } from '../speach/speach.module';
import { AuthModule } from '../authModule/auth.module';
import { AuthPageComponent } from './components/auth-page/auth-page.component';
import { AppRoutingModule } from '../appRoutingModule/app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { SignUpPageComponent } from './components/sign-up/sign-up.component';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    AuthModule,
    AppRoutingModule,
    SpeachModule
  ],
  declarations: [LandingPageComponent, MainHeaderComponent, AuthPageComponent, SignUpPageComponent],
  exports: [LandingPageComponent, MainHeaderComponent, AuthPageComponent, SignUpPageComponent]
})
export class LayoutModuleModule {
}
