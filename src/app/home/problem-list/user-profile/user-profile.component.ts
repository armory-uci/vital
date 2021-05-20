import { Component, Input, OnInit } from '@angular/core';
import { IUserInfo } from 'src/app/login/login.model';
import { UserProfileService } from 'src/app/services/utility-services/user-profile.service';
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
  total: number;
  constructor(private userProfileService: UserProfileService) {}

  ngOnInit(): void {
    this.userProfileService
      .getUserProfile(this.userInfo.uid)
      .subscribe((docArray) => {
        for (const item of docArray) {
          const itemData = item.payload.doc.data() as IProfileDetails;
          if (itemData.status === '0') {
            this.unattemptedCount++;
          } else if (itemData.status === '1') {
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
