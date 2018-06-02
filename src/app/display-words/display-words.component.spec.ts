import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayWordsComponent } from './display-words.component';

describe('DisplayWordsComponent', () => {
  let component: DisplayWordsComponent;
  let fixture: ComponentFixture<DisplayWordsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisplayWordsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayWordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
