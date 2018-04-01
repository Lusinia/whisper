import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './modules/appRoutingModule/app-routing.module';
import { AuthService } from './services/authService/auth.service';
import { SpeachModule } from './modules/speach/speach.module';
import { SpeechService } from './services/speachSevice/speech.service';
import { MadlibsService } from './services/madlibService/madlibs.service';
import { AuthModule } from './modules/authModule/auth.module';
import { LayoutModuleModule } from './modules/layoutModule/layout-module.module';
import { ChatModule } from './modules/chat/chat.module';
import { ProductsService } from './services/products/products.service';
import { SocketService } from './services/sockets/socket.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './services/authService/token.interceptor';
import { AlreadyAuthGuardService } from './services/alrearyAuthGuard/already-auth-guard.service';
import { AuthGuardService } from './services/authGuard/auth-guard.service';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    // HttpModule,
    HttpClientModule,
    AuthModule,
    LayoutModuleModule,
    SpeachModule,
    AppRoutingModule,
    ChatModule
  ],
  providers: [
    AuthService,
    SpeechService,
    MadlibsService,
    ProductsService,
    SocketService,
    AuthGuardService,
    AlreadyAuthGuardService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent],
  exports: [AppRoutingModule]
})
export class AppModule {
}
