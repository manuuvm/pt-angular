import { TestBed } from "@angular/core/testing";
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { SpinnerService } from '../services';

describe('SpinnerService', () => {
  let service: SpinnerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        SpinnerService,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: SpinnerService,
          multi: true,
        },
      ],
    });

    service = TestBed.get(SpinnerService);
  });

  it('should be true if service.show is called', () => {
    service.show();
    service.isLoading.subscribe((isLoading) => {
      expect(isLoading).toBeTruthy();
    })
  });

  it('should be false if service.hide is called', () => {
    service.hide();
    service.isLoading.subscribe((isLoading) => {
      expect(isLoading).toBeFalsy();
    })
  });
})
