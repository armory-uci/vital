import { Component, OnInit } from '@angular/core';
import { IRefer } from './reference.model';
import { ReferenceService } from './reference.service';

@Component({
  selector: 'app-reference',
  templateUrl: './reference.component.html',
  styleUrls: ['./reference.component.scss']
})
export class ReferenceComponent implements OnInit {
  referenceList: IRefer[] = [];
  refer: IRefer;

  constructor(private referenceService: ReferenceService) { }

  ngOnInit(): void {
    this.referenceService.getReference().subscribe(data => {
      this.referenceList = data.posts;
    });
  }

  sendData() {
    const data: IRefer = {
      id: 'xx',
      title: 'r1',
      content: ''
    };
  }

  receiveData() {
    this.referenceService.getReference().subscribe(data => {
      this.referenceList = data.posts;
    });
  }

}
