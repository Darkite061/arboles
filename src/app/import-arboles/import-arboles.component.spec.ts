import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportArbolesComponent } from './import-arboles.component';

describe('ImportArbolesComponent', () => {
  let component: ImportArbolesComponent;
  let fixture: ComponentFixture<ImportArbolesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImportArbolesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImportArbolesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
