import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { BannerWidgetModule, EventTrackServiceModule, ImagePreloadModule } from '@capillarytech/pwa-framework';
import { SkeletonComponent } from './skeleton.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BannerWidgetModule,
    EventTrackServiceModule,
    ImagePreloadModule
  ],
  declarations: [
    SkeletonComponent,
  ],
  exports: [
    SkeletonComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})

export class SkeletonModule {
}
