import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../../../base/base-component';
import { pwaLifeCycle, pageView, OnWidgetActionsLifecyle, OnWidgetLifecyle, UserAddressWidgetActions, ConfigService } from '@capillarytech/pwa-framework';
import { Utils } from '../../../../helpers/utils';
import { Router } from '@angular/router';
import { LoaderService, AlertService } from '@capillarytech/pwa-ui-helpers';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-saved-address',
  templateUrl: './saved-address.page.html',
  styleUrls: ['./saved-address.page.scss'],
})

@pwaLifeCycle()
@pageView()

export class SavedAddressPage extends BaseComponent implements OnInit, OnWidgetLifecyle, OnWidgetActionsLifecyle {

  titleValue: string = '';
  toggleDeleteModal: boolean = false;

  constructor(private router: Router, private loaderService: LoaderService, private alertService: AlertService, private translate: TranslateService, private config: ConfigService) {
    super();

    // this.loaderService.startLoading();

    this.translate.use(Utils.getLanguageCode());
  }

  ngOnInit() {
    this.translate.get('saved_address_page.saved_address').subscribe(value => {
      this.titleValue = value;
    });
  }

  
  getFlatAddress(address, index = 0) {
    
    let storeConfig = this.config.getConfig()['address'];
    let sep = storeConfig.storeSep;

    let addresses = address.split(sep);

    return addresses[index] ? addresses[index] : address.split(',')[index];
  }

  deleteAddress() {
    this.toggleDeleteModal = !this.toggleDeleteModal;
  }
  
  goToPage(pageName) {
    this.router.navigateByUrl(pageName);
  }

  dismissAddressModal() {
    this.toggleDeleteModal = !this.toggleDeleteModal;
  }

  widgetActionFailed(name: string, data: any): any {
    console.log(name, 'Action Failed');
  }

  widgetActionSuccess(name: string, data: any): any {
    console.log(name, 'Action Success');
  }

  widgetLoadingFailed(name: string, data: any): any {
    console.log(name, 'Loading Failed');
  }

  widgetLoadingStarted(name: string, data: any): any {
    console.log(name, 'Loading Started');
  }

  widgetLoadingSuccess(name: string, data: any): any {
    console.log(name, 'Loading Success');
  }

}
