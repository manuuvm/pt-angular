import { Injectable } from "@angular/core";
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";
import { finalize, } from "rxjs/operators";
import { SpinnerService } from '../services';

@Injectable()
export class SpinnerInterceptor implements HttpInterceptor {
  count = 0;
  constructor(public spinnerService: SpinnerService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.spinnerService.show();
    this.count++;

    return next.handle(req).pipe(
      finalize(() => {
        this.count--;

        if (this.count == 0) {
          this.spinnerService.hide()
        }
      })
    );
  }
}
