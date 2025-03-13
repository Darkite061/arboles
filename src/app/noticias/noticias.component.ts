import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-noticias',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './noticias.component.html',
  styleUrls: ['./noticias.component.css']
})
export class NoticiasComponent {
  // Aquí tienes un arreglo de noticias que simulan datos de un backend (puedes integrar una API o servicio más tarde)
  noticias = [
    {
      id: 1,
      titulo: "La importancia de los árboles en las ciudades",
      fecha: "2025-03-10",
      descripcion: "Los árboles urbanos son fundamentales para mejorar la calidad de vida en las ciudades. Ayudan a reducir la contaminación, mejoran la salud mental y proporcionan sombra...",
      contenido: "Los árboles son fundamentales para el ecosistema urbano. Su presencia en las ciudades mejora la calidad del aire, reduce el estrés térmico y proporciona un entorno más saludable. Además, contribuyen al bienestar de los ciudadanos al ofrecer espacios verdes...",
      imagen: "https://www.example.com/imagen1.jpg"
    },
    {
      id: 2,
      titulo: "Reforestación: Un paso hacia la sostenibilidad",
      fecha: "2025-03-12",
      descripcion: "La reforestación es una de las estrategias más efectivas para luchar contra el cambio climático. Este artículo explora cómo las plantaciones de árboles ayudan a restaurar los ecosistemas...",
      contenido: "La reforestación es una técnica crucial para restaurar áreas degradadas. A través de esta práctica, podemos reforestar bosques destruidos, aumentar la biodiversidad, y capturar el carbono en la atmósfera, lo que ayuda a frenar el cambio climático...",
      imagen: "https://www.example.com/imagen2.jpg"
    }
  ];

  // Función para manejar el clic en una noticia y mostrar su contenido completo
  verNoticia(id: number) {
    const noticia = this.noticias.find(n => n.id === id);
    if (noticia) {
      alert(`Título: ${noticia.titulo}\n\n${noticia.contenido}`);
    }
  }
}
