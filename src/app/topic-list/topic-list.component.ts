import { Component, OnInit } from '@angular/core';
import { TopicService } from 'src/app/topic.service';
import { Topic } from 'src/app/topic.model';

@Component({
  selector: 'app-topic-list',
  templateUrl: './topic-list.component.html',
  styleUrls: ['./topic-list.component.scss']
})
export class TopicListComponent implements OnInit {

  topics: Topic[];
  constructor(private topicService: TopicService) { }

  ngOnInit(): void {
    this.topicService.getTopics().subscribe(data => {
      this.topics = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data()
        } as Topic;
      })
    });
  }


}
