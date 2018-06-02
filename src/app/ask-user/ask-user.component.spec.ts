import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AskUserComponent } from './ask-user.component';

describe('AskUserComponent', () => {
  let component: AskUserComponent;
  let fixture: ComponentFixture<AskUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AskUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AskUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
