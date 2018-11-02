import { Component, OnInit } from '@angular/core';
import { CapRouterService, TranslateService, SeoInfo } from '@capillarytech/pwa-framework';
import {BaseComponent} from "@capillarytech/pwa-components";
import { ArabicFAQPageText, EnglishFAQPageText } from '@assets/i18n/faq.text';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.page.html',
  styleUrls: ['./faq.page.scss'],
})
export class FaqPage extends BaseComponent {
  seoInfo: SeoInfo;
  activeAccordion: number = null;
  constructor(
    private capRouter: CapRouterService,
    private translate: TranslateService
  ) {
    super();
    this.seoInfo = this.configService.getConfig()['seo']['faq'];
  }

  async ionViewWillEnter() {
    this.addPageTagsViaSeoInfo(this.seoInfo);
    this.translate.use(this.getCurrentLanguageCode());
    this.translate.append([
      {language: 'en', text: EnglishFAQPageText},
      {language: 'ar', text: ArabicFAQPageText}
    ]);
  }

  openAccordion(acc) {
    this.activeAccordion = acc;
  }

  goToPage(pageName) {
    this.capRouter.routeByUrl(pageName);
  }
}
