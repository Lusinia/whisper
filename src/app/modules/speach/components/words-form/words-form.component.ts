import { Component, Input, OnInit } from '@angular/core';
import { MadlibsService } from '../../../../services/madlibService/madlibs.service';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-words-form',
  templateUrl: './words-form.component.html',
  styleUrls: ['./words-form.component.scss']
})
export class WordsFormComponent {
  // wordsForm: FormGroup;
  @Input() nouns: string[];
  @Input() verbs: string[];
  @Input() adjs: string[];
  generating = false;
  placeholders = {
    noun: ['person', 'place', 'place', 'thing', 'thing'],
    verb: ['present', 'present', 'past', 'past', 'past']
  };

  constructor(private ml: MadlibsService) {
    // this.wordsForm = new FormGroup({
    //   'bio': new FormControl(null, [ Validators.minLength(2), Validators.maxLength(255) ]),
    //   'specialism': new FormControl(null, [ Validators.minLength(0), Validators.maxLength(50) ]),
    // });
  }

  trackWords(index) {
    return index;
  }

  getPlaceholder(type: string, index: number) {
    return this.placeholders[type][index];
  }

  done() {
    this.ml.submit({
      nouns: this.nouns,
      verbs: this.verbs,
      adjs: this.adjs
    });
    this.generating = true;
  }

}
