import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportClientExpensesComponent } from './report-client-expenses.component';

describe('ReportClientExpensesComponent', () => {
  let component: ReportClientExpensesComponent;
  let fixture: ComponentFixture<ReportClientExpensesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportClientExpensesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportClientExpensesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
