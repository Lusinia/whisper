import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { MainHeaderComponent } from './components/headers/main-header/main-header.component';
import { HttpModule } from '@angular/http';
import { SpeachModule } from '../speach/speach.module';
import { AuthModule } from '../authModule/auth.module';
import { AuthPageComponent } from './components/auth-page/auth-page.component';
import { AppRoutingModule } from '../appRoutingModule/app-routing.module';

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    AuthModule,
    AppRoutingModule,
    SpeachModule
  ],
  declarations: [LandingPageComponent, MainHeaderComponent, AuthPageComponent],
  exports: [LandingPageComponent, MainHeaderComponent, AuthPageComponent]
})
export class LayoutModuleModule {
}
