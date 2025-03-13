import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListArbolesComponent } from './list-arboles.component';

describe('ListArbolesComponent', () => {
  let component: ListArbolesComponent;
  let fixture: ComponentFixture<ListArbolesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListArbolesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListArbolesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
