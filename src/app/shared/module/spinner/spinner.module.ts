import { NgModule } from '@angular/core';
import { SpinnerComponent } from './spinner.component';
import { SpinnerService } from 'src/app/core/services';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { SpinnerInterceptor } from 'src/app/core/interceptors';
import { SharedModule } from '../shared';

@NgModule({
  declarations: [
    SpinnerComponent
  ],
  imports: [
    SharedModule
  ],
  entryComponents: [],
  providers: [
    SpinnerService,
    { provide: HTTP_INTERCEPTORS, useClass: SpinnerInterceptor, multi: true }
  ],
  exports: [SpinnerComponent],
  bootstrap: []
})
export class SpinnerModule { }
