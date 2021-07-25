import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  message: String

  constructor() {
    this.message = "Welcome to Worknet"
  }

  ngOnInit(): void {
  }

}
