import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxFileExporter } from './ngx-file-exporter';

describe('NgxFileExporter', () => {
  let component: NgxFileExporter;
  let fixture: ComponentFixture<NgxFileExporter>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgxFileExporter]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NgxFileExporter);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
