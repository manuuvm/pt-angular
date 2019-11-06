import { MatPaginatorIntl } from '@angular/material';
import { TranslateParser, TranslateService } from '@ngx-translate/core';
import { Injectable } from '@angular/core';

const DEFAULT_RANGE_LABEL = '{{startIndex}} - {{endIndex}} of {{length}}';

@Injectable()
export class TranslatedMatPaginator extends MatPaginatorIntl {

  private rangeLabelIntl: string;

  constructor(private translateService: TranslateService, private translateParser: TranslateParser) {
    super();
    this.rangeLabelIntl = DEFAULT_RANGE_LABEL;
    this.getTranslations();
  }

  getTranslations() {
    this.translateService.onLangChange.subscribe(() => {
      this.translateService.get([
        'USERS.TABLE_FOOTER.ITEMS_PER_PAGE',
        'USERS.TABLE_FOOTER.NEXT_PAGE',
        'USERS.TABLE_FOOTER.PREVIOUS_PAGE',
        'USERS.TABLE_FOOTER.RANGE',
        'USERS.TABLE_FOOTER.FIRST_PAGE',
        'USERS.TABLE_FOOTER.LAST_PAGE'
      ]).subscribe((translation) => {
        this.itemsPerPageLabel = translation['USERS.TABLE_FOOTER.ITEMS_PER_PAGE'];
        this.nextPageLabel = translation['USERS.TABLE_FOOTER.NEXT_PAGE'];
        this.previousPageLabel = translation['USERS.TABLE_FOOTER.PREVIOUS_PAGE'];
        this.rangeLabelIntl = translation['USERS.TABLE_FOOTER.RANGE'];
        this.firstPageLabel = translation['USERS.TABLE_FOOTER.FIRST_PAGE'];
        this.lastPageLabel = translation['USERS.TABLE_FOOTER.LAST_PAGE'];
        this.changes.next();
      });
    })
  }

  getRangeLabel = (page, pageSize, length) => {
    length = Math.max(length, 0);
    const startIndex = page * pageSize;
    const endIndex = startIndex < length ?
      Math.min(startIndex + pageSize, length) :
      startIndex + pageSize;
    return this.translateParser.interpolate(this.rangeLabelIntl, { startIndex, endIndex, length });
  };
}
