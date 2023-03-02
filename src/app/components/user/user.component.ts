import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IUser} from "../../interfaces";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  @Input()
  user: IUser;
  //передаю дані вверх по компонентах
  @Output()
  liftUser = new EventEmitter<IUser>()

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
  }
  //передаю дані вверх по компонентах
  list(): void {
    this.liftUser.emit(this.user)
  }
  // send data in state button
  getDetails() {
    this.router.navigate([this.user.id], {
      relativeTo: this.activatedRoute,
      state:{user: this.user}
    })
  }
}
