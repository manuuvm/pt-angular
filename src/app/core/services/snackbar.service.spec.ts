import { TestBed } from '@angular/core/testing';
import { SnackbarService } from './snackbar.service';
import { MatSnackBarModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('SnackbarService', () => {
  let snackbarService: SnackbarService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MatSnackBarModule, BrowserAnimationsModule],
      providers: [SnackbarService]
    });
    snackbarService = TestBed.get(SnackbarService);
  });

  it('should call successful and set the expect config', () => {
    const mockMessage = 'test';
    const spySnackbar = jest.spyOn(snackbarService.snackbar, 'open');
    snackbarService.successful(mockMessage);

    expect(snackbarService.config.panelClass).toEqual([]);
    expect(spySnackbar).toHaveBeenCalledWith(mockMessage, 'x', snackbarService.config);
  });

  it('should call error and set the expect config', () => {
    const mockMessage = 'test';
    const spySnackbar = jest.spyOn(snackbarService.snackbar, 'open');
    snackbarService.error(mockMessage);

    expect(snackbarService.config.panelClass).toEqual(['background-red']);
    expect(spySnackbar).toHaveBeenCalledWith(mockMessage, 'x', snackbarService.config);
  });

});
