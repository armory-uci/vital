import { Component, OnInit } from '@angular/core';
import { UserInfoService } from 'src/app/services/utility-services/user-info.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
