import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WelcomeLayout } from './welcome-layout';

describe('WelcomeLayout', () => {
  let component: WelcomeLayout;
  let fixture: ComponentFixture<WelcomeLayout>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WelcomeLayout]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WelcomeLayout);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
