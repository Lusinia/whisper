import { Component, OnInit, OnDestroy } from '@angular/core';
import { SpeechService } from '../../../../services/speachSevice/speech.service';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import { Words } from '../../../../services/words';

@Component({
  selector: 'app-listen',
  templateUrl: './listen.component.html',
  styleUrls: ['./listen.component.scss']
})
export class ListenComponent  implements OnInit, OnDestroy  {
  nouns: string[] = new Words().array;
  verbs: string[] = new Words().array;
  adjs: string[] = new Words().array;
  nounSub: Subscription;
  verbSub: Subscription;
  adjSub: Subscription;
  arrayFull: string;
  errorsSub: Subscription;
  errorMsg: string;

  constructor(public speech: SpeechService) { }

  ngOnInit() {
    this.speech.init();
    this._listenNouns();
    this._listenVerbs();
    this._listenAdj();
    this._listenErrors();
  }

  get btnLabel(): string {
    return this.speech.listening ? 'Listening...' : 'Listen';
  }

  private _listenNouns() {
    this.nounSub = this.speech.words$
      .filter(obj => obj['type'] === 'noun')
      .map(nounObj => nounObj['word'])
      .subscribe(
        noun => {
          console.log('noun:', noun);
          this.nouns = this._updateWords('nouns', this.nouns, noun);
        },
          err => {this._setError();}
      );
  }

  private _listenVerbs() {
    this.verbSub = this.speech.words$
      .filter(obj => obj['type']=== 'verb')
      .map(verbObj => verbObj['word'])
      .subscribe(
        verb => {
          console.log('verb:', verb);
          this.verbs = this._updateWords('verbs', this.verbs, verb);
        },
        err => {this._setError();}
      );
  }

  private _listenAdj() {
    this.adjSub = this.speech.words$
      .filter(obj => obj['type'] === 'adj')
      .map(adjObj => adjObj['word'])
      .subscribe(
        adj => {
           console.log('adjective:', adj);
          this.adjs = this._updateWords('adjectives', this.adjs, adj);
        },
        err => {this._setError();}
      );
  }

  private _updateWords(type: string, arr: string[], newWord: string) {
    const _checkArrayFull = arr.every(item => !!item === true);

    if (_checkArrayFull) {
      this.arrayFull = type;
      return arr;
    } else {
      let _added = false;
      this.arrayFull = null;
      return arr.map(item => {
        if (!item && !_added) {
          _added = true;
          return newWord;
        } else {
          return item;
        }
      });
    }
  }

  private _listenErrors() {
    this.errorsSub = this.speech.errors$
      .subscribe(err => this._setError(err));
  }

  private _setError(err?: any) {
    if (err) {
      console.log('Speech Recognition:', err);
      this.errorMsg = err.message;
    } else {
      this.errorMsg = null;
    }
  }

  ngOnDestroy() {
    this.nounSub.unsubscribe();
    this.verbSub.unsubscribe();
    this.adjSub.unsubscribe();
    this.errorsSub.unsubscribe();
  }

}


