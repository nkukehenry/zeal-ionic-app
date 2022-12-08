import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RefferalsPage } from './refferals.page';

describe('RefferalsPage', () => {
  let component: RefferalsPage;
  let fixture: ComponentFixture<RefferalsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RefferalsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RefferalsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
