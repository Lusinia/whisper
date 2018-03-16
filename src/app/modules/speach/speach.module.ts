import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpeechService } from '../../services/speachSevice/speech.service';
import { ListenComponent } from './components/listen/listen.component';
import { WordsFormComponent } from './components/words-form/words-form.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [ListenComponent, WordsFormComponent],
  exports: [ListenComponent]
})
export class SpeachModule { }
