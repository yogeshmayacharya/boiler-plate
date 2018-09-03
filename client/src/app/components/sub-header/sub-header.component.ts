import { Component, OnInit, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Utils } from '../../helpers/utils';
import { Location } from '@angular/common';

@Component({
  selector: 'app-sub-header',
  templateUrl: './sub-header.component.html',
  styleUrls: ['./sub-header.component.scss']
})
export class SubHeaderComponent implements OnInit {

  /**To get heading in the sub-header for each page */
  @Input() title: string;

  constructor(
    private translate: TranslateService,
    private location: Location
  ) {
    this.translate.use(Utils.getLanguageCode());
  }

  ngOnInit() {
  }

  /** Function to go to previous page */
  goBack() {
    this.location.back();
  }

}