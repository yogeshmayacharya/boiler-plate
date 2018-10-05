import { Component, OnInit, Input, ViewEncapsulation, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  Action,
  OnWidgetActionsLifecyle,
  OnWidgetLifecyle,
  DeliveryModes,
  LogoutWidgetActions,
  LanguageService,
  LogoutWidget, pwaLifeCycle
} from '@capillarytech/pwa-framework';
import { BaseComponent } from '../../base/base-component';
import { ModalController } from '@ionic/angular';
import { DeliverySlotSelectionPage } from '../../pages/checkout/delivery-slot-selection/delivery-slot-selection.page';
import { LocationPage } from '../../pages/checkout/location/location.page';
import { TranslateService } from '@ngx-translate/core';
import { UtilService } from '../../helpers/utils';
import { AlertService } from '@capillarytech/pwa-ui-helpers';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  encapsulation: ViewEncapsulation.None
})

@pwaLifeCycle()
export class HeaderComponent extends BaseComponent implements OnInit, OnWidgetLifecyle, OnWidgetActionsLifecyle {

  deliveryModes: any;
  logoutWidgetAction = new EventEmitter();
  navigations = [];
  categoryId: string = null;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public modalController: ModalController,
    private translate: TranslateService,
    private alertService: AlertService,
    private languageService: LanguageService,
    private utilService: UtilService
  ) {
    super();
    this.deliveryModes = DeliveryModes;
    this.translate.use(this.utilService.getLanguageCode());
  }

  /** Inputs to show only required tags in header */
  @Input() showHalalTag = false;
  @Input() showLanguage = false;
  @Input() showTime = false;
  @Input() showCart = false;
  @Input() showMode = true;
  @Input() showLocation = true;
  @Input() headerClass = '';
  @Input() showUserIcon = true;
  @Input() dealsHeader = false;
  @Input() dealsHeadershowLocation = false;
  @Input() dealsHeadershowTime = false;
  enableUserDropdown: boolean = false;
  @Output() switchCategory: EventEmitter<any> = new EventEmitter<any>();
  @Input() isModalActive = false;

  ngOnInit() {
    const data = this.route.snapshot.queryParams;
    this.categoryId = data.id;
  }

  goToPage(pageName) {
    const page = this.utilService.getLanguageCode() + '/' + pageName;
    this.router.navigateByUrl(page);
  }

  async switchLanguage() {
    const langCode = this.utilService.getLanguageCode();
    //console.log('Check this current lang to be changed: ', langCode);
    switch (langCode) {
      case 'ar':
        await this.languageService.updateLanguageByCode('en');
        this.router.navigateByUrl('en/home', { replaceUrl: true });

        break;

      case 'en':
        await this.languageService.updateLanguageByCode('ar');
        this.router.navigateByUrl('ar/home', { replaceUrl: true });
        break;

      default:
        // do nothing
        break;
    }

  }

  async presentSlotModal() {
    const modal = await this.modalController.create({
      component: DeliverySlotSelectionPage,
    });
    return await modal.present();
  }

  showDropDown() {
    this.enableUserDropdown = !this.enableUserDropdown;
  }

  async widgetActionFailed(name: string, data: any) {
    console.log('name action failed: ' + name + ' data: ' + data);
    switch (name) {
      case LogoutWidgetActions.ACTION_LOGOUT:
        const coupon_remove_success = await this.translate.instant('my_account_page.error_logging_out');
        this.alertService.presentToast(coupon_remove_success, 3000, 'bottom');
        break;
    }
  }

  async widgetActionSuccess(name: string, data: any) {
    console.log('name action success: ' + name + ' data: ' + data);
    switch (name) {
      case LogoutWidgetActions.ACTION_LOGOUT:
        const coupon_remove_success = await this.translate.instant('my_account_page.successfully_loged_out');
        this.router.navigateByUrl(this.utilService.getLanguageCode() + '/home');
        this.alertService.presentToast(coupon_remove_success, 3000, 'bottom');
        break;
    }
  }

  widgetLoadingFailed(name: string, data: any): any {
  }

  widgetLoadingStarted(name: string, data: any): any {
  }

  widgetLoadingSuccess(name: string, data: any): any {
    switch (name) {
      case 'NAVIGATIONS' :
        this.navigations = data.items;
        break;
    }
  }

  async openLocationModal() {
    this.router.navigateByUrl(this.utilService.getLanguageCode() + '/home');
  }

  logout() {
    const action = new Action(LogoutWidgetActions.ACTION_LOGOUT);
    this.logoutWidgetAction.emit(action);
  }

  switchCategories(category, categoryId) {
    this.categoryId = categoryId;
    this.switchCategory.emit({ category, id: categoryId });
    // this.router.navigateByUrl(`/products?category=${category}&id=${categoryId}`);
  }

  switchCategoryPage(category, categoryId) {
    if (this.isModalActive) this.modalController.dismiss();
    this.router.navigateByUrl(`/products?category=${category}&id=${categoryId}`);
  }

}
