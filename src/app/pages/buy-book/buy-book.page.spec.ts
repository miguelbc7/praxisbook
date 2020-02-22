import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BuyBookPage } from './buy-book.page';

describe('BuyBookPage', () => {
  let component: BuyBookPage;
  let fixture: ComponentFixture<BuyBookPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuyBookPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BuyBookPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
