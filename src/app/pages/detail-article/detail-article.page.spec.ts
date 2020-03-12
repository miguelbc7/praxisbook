import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DetailArticlePage } from './detail-article.page';

describe('DetailArticlePage', () => {
  let component: DetailArticlePage;
  let fixture: ComponentFixture<DetailArticlePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailArticlePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DetailArticlePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
