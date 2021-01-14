import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpProductosComponent } from './op-productos.component';

describe('OpProductosComponent', () => {
  let component: OpProductosComponent;
  let fixture: ComponentFixture<OpProductosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpProductosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OpProductosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
