import { Component, OnInit } from '@angular/core';
import { IRefer } from './reference.model';
import { ReferenceService } from '../services/http-services/reference.service';

@Component({
  selector: 'app-reference',
  templateUrl: './reference.component.html',
  styleUrls: ['./reference.component.scss']
})
export class ReferenceComponent implements OnInit {
  referenceList: IRefer[] = [];
  refer: IRefer;

  constructor(private referenceService: ReferenceService) {}

  ngOnInit(): void {
    this.referenceService.getReference().subscribe((data) => {
      this.referenceList = data.posts;
    });
  }

  sendData() {
    const post: IRefer = {
      id: '343ff4',
      title: 'Post Request Title',
      content: 'Some post content'
    };
    this.referenceService.postReference(post).subscribe((responseData) => {
    });
  }

  receiveData() {
    this.referenceService.getReference().subscribe((data) => {
      this.referenceList = data.posts;
    });
  }
}
