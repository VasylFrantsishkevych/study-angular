import {Component, OnInit} from '@angular/core';
import {NavigationEnd, NavigationStart, Router} from "@angular/router";
import {LoadService} from "../../services";

@Component({
  selector: 'app-mail-layaout',
  templateUrl: './mail-layaout.component.html',
  styleUrls: ['./mail-layaout.component.css']
})
export class MailLayaoutComponent implements OnInit {

  isLoading: boolean;

    constructor(private router: Router, private loadService: LoadService) {
    }

    ngOnInit(): void {
      this.loadService.isLoading().subscribe(value => this.isLoading = value)
      this.router.events.subscribe(e => {
        if (e instanceof NavigationStart) {
          this.loadService.startLoading()
        } else if (e instanceof NavigationEnd) {
          this.loadService.endLoading()
        }
      })
    }

}
