import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SregisterPage } from './sregister.page';

describe('SregisterPage', () => {
  let component: SregisterPage;
  let fixture: ComponentFixture<SregisterPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SregisterPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SregisterPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
