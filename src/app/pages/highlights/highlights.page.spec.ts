import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HighlightsPage } from './highlights.page';

describe('HighlightsPage', () => {
  let component: HighlightsPage;
  let fixture: ComponentFixture<HighlightsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HighlightsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(HighlightsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
