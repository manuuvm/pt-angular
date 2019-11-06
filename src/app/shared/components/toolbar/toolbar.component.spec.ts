import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Injector } from '@angular/core';
import { async, ComponentFixture, getTestBed, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatButtonToggleModule, MatToolbarModule } from '@angular/material';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MaterialModule } from '../../module/material';
import { NewUserDialogComponent } from '../newUserDialog';
import { ToolbarComponent } from './toolbar.component';
import { SpinnerModule } from '../../module/spinner';

describe('ToolbarComponent', () => {
  let component: ToolbarComponent;
  let injector: Injector;
  let translateService: TranslateService;
  let fixture: ComponentFixture<ToolbarComponent>;
  let matDialog: MatDialog;

  beforeEach(async(() => {

    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        HttpClientTestingModule,
        TranslateModule.forRoot({}),
        FormsModule,
        MaterialModule,
        MatToolbarModule,
        MatButtonToggleModule,
        MatButtonModule,
        MatDialogModule,
        SpinnerModule,
        ReactiveFormsModule,
      ],
      declarations: [
        ToolbarComponent,
        NewUserDialogComponent
      ],
      providers: [],
    }).compileComponents();

    injector = getTestBed();
    translateService = injector.get(TranslateService);
    matDialog = injector.get(MatDialog);

    fixture = TestBed.createComponent(ToolbarComponent);
    component = fixture.componentInstance;
  }));

  it('ngOnInit', () => {
    // Arrange
    const spyTranslateServiceSetDefaultLang = jest.spyOn(translateService, 'setDefaultLang');

    // Act
    component.ngOnInit();
    fixture.detectChanges();

    // Assert
    expect(spyTranslateServiceSetDefaultLang).toHaveBeenCalledWith('en');
  });

  it('changeLanguage', () => {
    // Arrange
    const spyTranslateServiceUse = jest.spyOn(translateService, 'use');

    // Act
    component.changeLanguage('es');
    fixture.detectChanges();

    // Assert
    expect(spyTranslateServiceUse).toHaveBeenCalledWith('es');
  });

  it('openDialog', () => {
    // Arrange
    const spyMatDialogOpen = jest.spyOn(matDialog, 'open').mockImplementation(() => null);

    // Act
    component.openDialog();
    fixture.detectChanges();

    // Assert
    expect(spyMatDialogOpen).toHaveBeenCalled();
  });
});
