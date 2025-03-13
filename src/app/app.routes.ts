import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MapaComponent } from './mapa/mapa.component';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component'

export const routes: Routes = [
  // { path: '', component: AppComponent }, 
  { path: 'mapa', component: MapaComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
