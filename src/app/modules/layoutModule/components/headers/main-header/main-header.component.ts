import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../../services/authService/auth.service';


@Component({
  selector: 'main-header',
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.scss']
})
export class MainHeaderComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit() {

  }
}
