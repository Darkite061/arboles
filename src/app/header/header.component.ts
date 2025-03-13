import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MenubarModule, ButtonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  items: MenuItem[] | undefined;

  ngOnInit() {
    this.items = [
        {
            label: 'Inicio',
            icon: 'pi pi-home',
            routerLink: ['/dashboard']  // Ruta a dashboard (Inicio)
        },
        {
            label: 'Árboles',
            icon: 'pi pi-search',
            items: [
                {
                    label: 'Listado',
                    icon: 'pi pi-bolt',
                    routerLink: ['/lista']  // Ruta a la lista de árboles
                },
                {
                    label: 'Importancia',
                    icon: 'pi pi-server',
                    routerLink: ['/importancia']  // Ruta a la importancia de los árboles
                },
                {
                    label: 'Mapa',
                    icon: 'pi pi-star',
                    routerLink: ['/mapa']  // Ruta al mapa
                }
            ]
        },
        {
            label: 'Noticias',
            icon: 'pi pi-star',
            routerLink: ['/noticias']  // Ruta al mapa
        },
        {
            label: 'Contacto',
            icon: 'pi pi-envelope',
            routerLink: ['/contacto']  // Ruta a contactos
        }
    ];
}


}
