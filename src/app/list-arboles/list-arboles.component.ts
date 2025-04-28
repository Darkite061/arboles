import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';  // Importar Router para navegación
import  ArbolesService  from '../services/arboles.service';
import { Arbol } from '../models/arbol.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-list-arboles',
  imports: [CommonModule],
  templateUrl: './list-arboles.component.html',
  styleUrls: ['./list-arboles.component.css']
})
export class ListArbolesComponent implements OnInit {
  public arboles: Arbol[] = [];

  constructor(
    private arbolesService: ArbolesService,
    private router: Router  // Inyectar el Router
  ) {}

  ngOnInit(): void {
    this.getAllArboles();  // Llamar al servicio cuando el componente se inicializa
  }

  // Método para obtener todos los árboles
  getAllArboles() {
    this.arbolesService.GetArboles(new FormData()).subscribe({
      next: (response) => {
        this.arboles = response.data;  // Asignar la respuesta de la API a la variable arboles
      },
      error: (error) => {
        console.error('Error al obtener los árboles:', error);
      }
    });
  }

  // Método para redirigir al mapa con el id del árbol
  verEnMapa(arbolId: number) {
    this.router.navigate(['/mapa', arbolId]);  // Redirigir al mapa pasando el id del árbol
  }
}
