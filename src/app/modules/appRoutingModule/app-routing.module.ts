import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from '../layoutModule/components/landing-page/landing-page.component';
import { AuthGuardService } from '../../services/authGuard/auth-guard.service';
import { AuthFormComponent } from '../authModule/components/auth-form/auth-form.component';
import { AuthPageComponent } from '../layoutModule/components/auth-page/auth-page.component';
import { ChatComponent } from '../chat/components/chat-page/chat.component';
import { ListenComponent } from '../speach/components/listen/listen.component';
import { SignUpComponent } from '../authModule/components/sign-up/sign-up.component';
import { SignUpPageComponent } from '../layoutModule/components/sign-up/sign-up.component';
import { AlreadyAuthGuardService } from '../../services/alrearyAuthGuard/already-auth-guard.service';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'landing',
    pathMatch: 'full',
    // canActivate: [AuthGuardService]
  },
  {
    path: 'landing',
    component: LandingPageComponent,
    // canActivate: [AuthGuard],
  },
  {
    path: 'listen',
    component: ListenComponent,
    // canActivate: [AuthGuard],
  },
  {
    path: 'signup',
    component: SignUpPageComponent,
    // canActivate: [AuthGuardService]
  },
  {
    path: 'signin',
    component: AuthPageComponent,
    canActivate: [AuthGuardService]

    // canActivate: [AuthGuardService]
  },
  {
    path: 'chat',
    component: ChatComponent,
    canActivate: [AuthGuardService]
  },
  // {
  //   path: 'logout',
  //   component: LandingPageComponent,
    // canActivate: [AlreadyAuthGuardService]
  // },
  // {
  //   path: 'signin',
  //   canActivate: [AlreadyAuthGuard],
  //   component: SigninComponent
  // },
  // {
  //   path: 'profile', component: ProfileComponent,
  //   canActivate: [AuthGuard],
  //   children: [
  //     { path: '', redirectTo: 'my', pathMatch: 'full' },
  //     { path: 'my', component: MyProfileComponent },
  //     { path: 'edit', component: EditProfileComponent },
  //     { path: 'notifications', component: ProfileNotificationsComponent },
  //     { path: 'change-password', component: ProfilePasswordComponent },
  //     { path: 'detail/:id', component: MemberDetailsComponent },
  //     { path: 'privacy-and-terms', component: PrivacyAndTermsComponent },
  //     { path: '**', redirectTo: 'my' }
  //   ]
  // },
  {
    path: '**',
    redirectTo: 'landing'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
