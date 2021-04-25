import { TestBed } from '@angular/core/testing';
import { AngularFirestore } from '@angular/fire/firestore';
import { ProblemListService } from './problem-list.service';

const collectionStub = {
  valueChanges: jasmine
    .createSpy('snapshotChanges')
    .and.returnValue({ name: 'value' })
};

const angularFiresotreStub = {
  collection: jasmine.createSpy('collection').and.returnValue(collectionStub)
};

describe('ProblemsService', () => {
  let service: ProblemListService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: AngularFirestore, useValue: angularFiresotreStub }]
    });
    service = TestBed.inject(ProblemListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
