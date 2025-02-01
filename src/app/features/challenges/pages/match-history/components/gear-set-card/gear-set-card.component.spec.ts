import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GearSetCardComponent } from './gear-set-card.component';

describe('GearSetCardComponent', () => {
  let component: GearSetCardComponent;
  let fixture: ComponentFixture<GearSetCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GearSetCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GearSetCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
