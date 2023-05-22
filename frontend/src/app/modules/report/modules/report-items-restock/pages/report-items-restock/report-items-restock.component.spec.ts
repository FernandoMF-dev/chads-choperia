import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportItemsRestockComponent } from './report-items-restock.component';

describe('ReportItemsRestockComponent', () => {
  let component: ReportItemsRestockComponent;
  let fixture: ComponentFixture<ReportItemsRestockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportItemsRestockComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportItemsRestockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
