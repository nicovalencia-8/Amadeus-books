import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BooksRegister } from './books-register';

describe('BooksRegister', () => {
  let component: BooksRegister;
  let fixture: ComponentFixture<BooksRegister>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BooksRegister]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BooksRegister);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
