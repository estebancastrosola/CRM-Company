import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListDepartmentPage } from './list-department.page';

describe('ListDepartmentPage', () => {
  let component: ListDepartmentPage;
  let fixture: ComponentFixture<ListDepartmentPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListDepartmentPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListDepartmentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
