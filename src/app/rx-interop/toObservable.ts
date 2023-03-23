import {effect, Signal} from "@angular/core";
import {Observable, Subject} from "rxjs";

export function toObservable(signalValue: Signal<any>): Observable<any> {
  const result = new Subject();

  effect(() => {
    result.next(signalValue());
  })

  return result.asObservable();
}
