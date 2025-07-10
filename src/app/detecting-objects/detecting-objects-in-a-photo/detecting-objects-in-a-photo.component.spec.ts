import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetectingObjectsInAPhotoComponent } from './detecting-objects-in-a-photo.component';

describe('DetectingObjectsInAPhotoComponent', () => {
  let component: DetectingObjectsInAPhotoComponent;
  let fixture: ComponentFixture<DetectingObjectsInAPhotoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetectingObjectsInAPhotoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetectingObjectsInAPhotoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
