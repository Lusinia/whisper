/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { WordsFormComponent } from './words-form.component';

describe('WordsFormComponent', () => {
  let component: WordsFormComponent;
  let fixture: ComponentFixture<WordsFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WordsFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WordsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
