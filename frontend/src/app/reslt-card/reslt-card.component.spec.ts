import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResltCardComponent } from './reslt-card.component';

describe('ResltCardComponent', () => {
  let component: ResltCardComponent;
  let fixture: ComponentFixture<ResltCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResltCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResltCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
