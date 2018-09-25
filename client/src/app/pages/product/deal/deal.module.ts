import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { DealPage } from './deal.page';

import { ProductDetailsWidgetModule, ImagePreloadModule } from "@capillarytech/pwa-framework";

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpLoaderFactory } from '../../../translation.loader';
import { HttpClient } from '@angular/common/http';
import { SkeletonModule } from '../../../helpers/skeleton/skeleton.module';

const routes: Routes = [
  {
    path: '',
    component: DealPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProductDetailsWidgetModule,
    ImagePreloadModule,
    SkeletonModule,
    RouterModule.forChild(routes),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  declarations: [DealPage]
})
export class DealPageModule {}
