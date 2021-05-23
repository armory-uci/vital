import { Component, Input, OnInit } from '@angular/core';
import { IUserInfo } from 'src/app/login/login.model';
import { UserProfileService } from 'src/app/services/utility-services/user-profile.service';
import { ProblemStatus } from '../problem-table/problem-table.component';
import { IProfileDetails } from './user-profile.model';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  @Input() userInfo: IUserInfo;
  profileDetails: IProfileDetails[] = [];
  barValue: string;
  doneCount = 0;
  inProgressCount = 0;
  unattemptedCount = 0;
  total = 0;
  constructor(private userProfileService: UserProfileService) {}

  ngOnInit(): void {
    this.userProfileService
      .getUserProfile(this.userInfo.uid)
      .subscribe((docArray) => {
        this.unattemptedCount = this.doneCount = this.total = this.inProgressCount = 0;
        for (const item of docArray) {
          const itemData = item.payload.doc.data() as IProfileDetails;
          if (itemData.status === ProblemStatus.notStarted) {
            this.unattemptedCount++;
          } else if (itemData.status === ProblemStatus.correct) {
            this.doneCount++;
          } else {
            this.inProgressCount++;
          }
          this.profileDetails.push(itemData);
        }
        this.setProfileDetails();
      });
  }

  setProfileDetails() {
    this.total = this.profileDetails.length;
    this.barValue = ((this.doneCount / this.total) * 100).toString();
  }

  resetProgress() {} //Future work
}
