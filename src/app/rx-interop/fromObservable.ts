import {DestroyRef, inject, signal, Signal} from "@angular/core";
import {Observable, Subject, takeUntil} from "rxjs";

export function fromObservable(source: Observable<any>, initialValue: any): Signal<any> {
  const destroy = new Subject<void>();

  const destroyRef = inject(DestroyRef).onDestroy(
    () => destroy.next()
  );
  const result = signal(initialValue);

  const observer = {
    next: (value: any) => {
      result.set(value)
    },
    error: (error: any) => result.set(error.toString()),
  }

  source.pipe(
    takeUntil(destroy)
  ).subscribe(observer);

  return result;
}
