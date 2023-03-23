import {Component, inject, signal} from '@angular/core';

import {NgForOf, NgIf} from "@angular/common";
import {debounceTime, distinctUntilChanged, filter, switchMap, tap} from "rxjs";

import {fromObservable} from "./rx-interop/fromObservable";
import {toObservable} from "./rx-interop/toObservable";
import {GithubUserService} from "./gh-user.service";
import {DemoComponent} from "./demo.component";

@Component({
  selector: 'app-root',
  template: `
      <div class="container p-10">
          <input
                  (input)="inputValueChange.set($any($event.target).value)"
                  class="outline-0 p-2 border-white border-2 rounded-lg bg-slate-800 text-white w-full"
                  type="text"/>
          <ul class="bg-slate-700 px-4 py-2 mt-2 rounded-lg" *ngIf="users().length">
              <li class="flex items-center text-white p-3 border-b-2 border-white"
                  *ngFor="let user of users()">
                  <img
                          class="rounded-full w-10 h-10 mr-2"
                          [src]="user.avatarUrl"
                  />
                  {{user.name}}
              </li>
          </ul>
      </div>
  `,
  imports: [DemoComponent, NgIf, NgForOf],
  standalone: true
})
export class AppComponent {
  private ghUsers = inject(GithubUserService);
  inputValueChange = signal('');

  users = fromObservable(
      toObservable(this.inputValueChange).pipe(
        debounceTime(500),
        distinctUntilChanged(),
        filter(value => value.length > 2),
        switchMap(value => this.ghUsers.getGithubUsers(value)),
      ),
    []
    )
}
