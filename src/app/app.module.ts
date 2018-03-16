import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './modules/appRoutingModule/app-routing.module';
import { AuthService } from './services/authService/auth.service';
import { SpeachModule } from './modules/speach/speach.module';
import { SpeechService } from './services/speachSevice/speech.service';
import { MadlibsService } from './services/madlibService/madlibs.service';
import { AuthModule } from './modules/authModule/auth.module';
import { LayoutModuleModule } from './modules/layoutModule/layout-module.module';
import { ChatComponent } from './modules/chat/components/chat/chat.component';
import { ChatModule } from './modules/chat/chat.module';
import { ProductsService } from './services/products/products.service';
import { SocketService } from './services/sockets/socket.service';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
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
    SocketService
  ],
  bootstrap: [AppComponent],
  exports: [AppRoutingModule]
})
export class AppModule {
}
