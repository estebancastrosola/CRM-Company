import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListEmployeePage } from './list-employee.page';

describe('ListEmployeePage', () => {
  let component: ListEmployeePage;
  let fixture: ComponentFixture<ListEmployeePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListEmployeePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListEmployeePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
