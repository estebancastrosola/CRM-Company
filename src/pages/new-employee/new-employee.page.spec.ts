import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewEmployeePage } from './new-employee.page';

describe('NewEmployeePage', () => {
  let component: NewEmployeePage;
  let fixture: ComponentFixture<NewEmployeePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewEmployeePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewEmployeePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
