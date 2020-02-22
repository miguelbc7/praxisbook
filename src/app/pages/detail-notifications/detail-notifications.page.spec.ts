import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DetailNotificationsPage } from './detail-notifications.page';

describe('DetailNotificationsPage', () => {
  let component: DetailNotificationsPage;
  let fixture: ComponentFixture<DetailNotificationsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailNotificationsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DetailNotificationsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
