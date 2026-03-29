import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Footeer } from './footeer';

describe('Footeer', () => {
  let component: Footeer;
  let fixture: ComponentFixture<Footeer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Footeer]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Footeer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
