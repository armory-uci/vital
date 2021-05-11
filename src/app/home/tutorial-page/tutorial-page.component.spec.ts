import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MaterialModule } from 'src/app/material/material.module';

import { TutorialPageComponent } from './tutorial-page.component';

describe('TutorialPageComponent', () => {
  let component: TutorialPageComponent;
  let fixture: ComponentFixture<TutorialPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MaterialModule, RouterTestingModule, HttpClientTestingModule],
      declarations: [TutorialPageComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TutorialPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
