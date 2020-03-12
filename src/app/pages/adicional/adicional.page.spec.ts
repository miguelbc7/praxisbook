import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AdicionalPage } from './adicional.page';

describe('AdicionalPage', () => {
  let component: AdicionalPage;
  let fixture: ComponentFixture<AdicionalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdicionalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AdicionalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
