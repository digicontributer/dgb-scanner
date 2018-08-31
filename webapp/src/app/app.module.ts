import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {
  MatButtonModule, MatIconModule, MatPaginatorModule, MatTableModule, MatToolbarModule, MatInputModule,
  MatFormFieldModule, MatListModule, MatProgressBarModule, MatSlideToggleModule, MatExpansionModule, MatSortModule,
  MatTabsModule, MatButtonToggleModule, MatCardModule, MatDialogModule, MatProgressSpinnerModule, MatStepperModule,
  MatIconRegistry, MatMenuModule, MatSelectModule
} from "@angular/material";
import {FlexLayoutModule} from "@angular/flex-layout";
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MomentModule} from "angular2-moment";
import {ChartsModule} from "ng2-charts";
import {RouterModule, Routes} from "@angular/router";
import {NodeComponent} from './node/node.component';
import {AgmCoreModule, GoogleMapsAPIWrapper} from '@agm/core';
import {NodeService} from "./node.service";
import {AgmJsMarkerClustererModule, ClusterManager} from '@agm/js-marker-clusterer';
import {ClipboardModule} from "ngx-clipboard/dist";
import {HttpModule} from "@angular/http";
import { environment } from '../environments/environment';

const appRoutes: Routes = [
  {
    path: '',
    component: NodeComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    NodeComponent,
  ],
  imports: [
    AgmCoreModule.forRoot({
      apiKey: environment.GOOGLE_API_KEY
    }),
    AgmJsMarkerClustererModule,
    MomentModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatTableModule,
    MatTabsModule,
    MatMenuModule,
    MatPaginatorModule,
    FlexLayoutModule,
    MatInputModule,
    MatFormFieldModule,
    MatProgressBarModule,
    MatListModule,
    BrowserModule,
    MatListModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatButtonToggleModule,
    FormsModule,
    MatExpansionModule,
    HttpModule,
    MatSortModule,
    MatCardModule,
    MatSlideToggleModule,
    ReactiveFormsModule,
    ChartsModule,
    MatDialogModule,
    ClipboardModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatStepperModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    NodeService,
    ClusterManager,
    GoogleMapsAPIWrapper
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
