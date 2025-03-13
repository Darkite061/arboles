import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MapaComponent } from './mapa/mapa.component';
import { AppComponent } from './app.component';
import { ListArbolesComponent } from './list-arboles/list-arboles.component'
import { ImportArbolesComponent } from './import-arboles/import-arboles.component'
import { DashboardComponent } from './dashboard/dashboard.component';
import { ContactoComponent } from './contacto/contacto.component';
import { NoticiasComponent } from './noticias/noticias.component';

export const routes: Routes = [
  // { path: '', component: AppComponent }, 
  { path: 'mapa', component: MapaComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'lista', component: ListArbolesComponent },
  { path: 'importancia', component: ImportArbolesComponent },
  { path: 'contacto', component: ContactoComponent },
  { path: 'noticias', component: NoticiasComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
