import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportActiveProductsComponent } from './report-active-products.component';

describe('ReportActiveProductsComponent', () => {
  let component: ReportActiveProductsComponent;
  let fixture: ComponentFixture<ReportActiveProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReportActiveProductsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportActiveProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
