import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { BannerWidgetModule, EventTrackModule, ImagePreloadModule } from '@capillarytech/pwa-framework';
import { BannerComponent } from './banner.component';
import { SkeletonModule } from '../../helpers/skeleton/skeleton.module';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpLoaderFactory } from '../../translation.loader';
import { HttpClient } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BannerWidgetModule,
    EventTrackModule,
    ImagePreloadModule,
    SkeletonModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  declarations: [
    BannerComponent,
  ],
  exports: [
    BannerComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})

export class BannerModule {
}
