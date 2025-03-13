import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-list-arboles',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './list-arboles.component.html',
  styleUrl: './list-arboles.component.css'
})
export class ListArbolesComponent {
  public arboles = [
    {
      id: 1,
      nombre_comun: "Roble",
      nombre_cientifico: "Quercus robur",
      coordenadas: [-103.22740144442683, 20.566436345390372],
      area: "Jardín Central",
      altura: 15,
      diametro_tronco: 50,
      edad_estimada: 40,
      estado: "Saludable",
      tipo_hoja: "Caduca",
      especie: "Nativa",
      uso_ecologico: "Sombra, Purificación de aire",
      epoca_floracion: "Primavera",
      anio_plantacion: 1983,
      fotografia: "https://th.bing.com/th/id/OIP.btndntxMRlVzdrN1lUunfgHaEK?rs=1&pid=ImgDetMain",
      notas: "Árbol de gran porte con sombra densa."
    },
    {
      id: 2,
      nombre_comun: "Pino",
      nombre_cientifico: "Pinus sylvestris",
      coordenadas: [-103.22640144442620, 20.567436345390372],
      area: "Avenida Principal",
      altura: 20,
      diametro_tronco: 40,
      edad_estimada: 30,
      estado: "En declive",
      tipo_hoja: "Perenne",
      especie: "Exótica",
      uso_ecologico: "Sombra, Hábitat para fauna",
      epoca_floracion: "Verano",
      anio_plantacion: 1990,
      fotografia: "https://th.bing.com/th/id/OIP.btndntxMRlVzdrN1lUunfgHaEK?rs=1&pid=ImgDetMain",
      notas: "Árbol en declive debido a plagas."
    }
  ];

  ngOnInit(): void {
  }
}
