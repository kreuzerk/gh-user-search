import {
  Component,
  inject,
  Injector,
  OnInit,
  runInInjectionContext,
  SettableSignal,
  signal,
  Signal
} from "@angular/core";
import {fromObservable} from "./rx-interop/fromObservable";
import {delay, Observable, of} from "rxjs";
import {toObservable} from "./rx-interop/toObservable";
import {AsyncPipe} from "@angular/common";

@Component({
  selector: 'demo',
  template: `
    {{ bar | async }}
    <button (click)="foo.set('bar')">Click</button>
  `,
  imports: [
    AsyncPipe
  ],
  standalone: true
})
export class DemoComponent {

  foo = signal('foo');
  bar = toObservable(this.foo);


  /*
  foo = of('foo').pipe(
    delay(4000)
  );
  bar!: Signal<any>;
  injector = inject(Injector);

  ngOnInit(): void {
    this.bar = runInInjectionContext(this.injector, () =>
      fromObservable(this.foo, 'bar')
    );
  }
   */
}
