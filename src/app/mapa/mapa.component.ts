import { Component, OnInit } from '@angular/core';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import { fromLonLat } from 'ol/proj';
import { Overlay } from 'ol';
import { Point } from 'ol/geom';
import { Feature } from 'ol';
import { Icon, Style } from 'ol/style';
import { Vector as VectorLayer } from 'ol/layer';
import { Vector as VectorSource } from 'ol/source';
import Select from 'ol/interaction/Select';
import { click } from 'ol/events/condition';
import { CommonModule } from '@angular/common';
import FullScreen from 'ol/control/FullScreen';
import Zoom from 'ol/control/Zoom';

@Component({
  selector: 'app-mapa',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css']
})
export class MapaComponent implements OnInit {
  private mapa: any;
  private popup: Overlay | null = null;  // Inicializado como null
  isLoading = true;

  private arboles = [
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
    this.inicializarMapa();
  }

  private inicializarMapa(): void {
    this.mapa = new Map({
      target: 'mapa',
      layers: [
        new TileLayer({
          source: new OSM({
            attributions: [] // Elimina la atribución de OpenStreetMap
          })
        })
      ],
      view: new View({
        center: fromLonLat([-103.22740144442683, 20.566436345390372]),
        zoom: 17
      }),
      controls: [] // Inicialmente sin controles para agregar solo los necesarios
    });

    // Agregar control de zoom
    const zoomControl = new Zoom();
    this.mapa.addControl(zoomControl);

    // Agregar el control de pantalla completa
    const fullScreenControl = new FullScreen();
    this.mapa.addControl(fullScreenControl);

    const vectorSource = new VectorSource();
    this.arboles.forEach(arbol => {
      const marker = new Feature({
        geometry: new Point(fromLonLat(arbol.coordenadas)),
        name: arbol.nombre_comun
      });
  
      marker.setStyle(new Style({
        image: new Icon({
          // src: 'https://openlayers.org/en/v4.6.5/examples/data/icon.png',
          src: 'assets/icons/icons8-tree-32 (1).png',
          scale: 0.9
        })
      }));
  
      vectorSource.addFeature(marker);
    });
  
    const vectorLayer = new VectorLayer({
      source: vectorSource
    });
    this.mapa.addLayer(vectorLayer);
  
    // Agregar la interacción select para manejar el clic en los marcadores
    const selectInteraction = new Select({
      condition: click
    });
    this.mapa.addInteraction(selectInteraction);
  
    // Crear el popup con autoPan y autoPanMargin configurados correctamente
    this.popup = new Overlay({
      element: document.getElementById('popup') as HTMLElement,
      autoPan: true,  // Enable automatic panning
    });
    
    this.mapa.addOverlay(this.popup);
  
    selectInteraction.on('select', (event) => {
      const selectedFeatures = event.selected;
      if (selectedFeatures.length > 0) {
        const selectedFeature = selectedFeatures[0];
        const arbolId = selectedFeature.get('name');
  
        // Aquí puedes mostrar la información del árbol en el popup
        const arbol = this.arboles.find(arbol => arbol.nombre_comun === arbolId);
        if (arbol && this.popup) {
          const contenido = `
            <h3>${arbol.nombre_comun} (${arbol.nombre_cientifico})</h3>
            <p><strong>Área:</strong> ${arbol.area}</p>
            <p><strong>Altura:</strong> ${arbol.altura} metros</p>
            <p><strong>Estado:</strong> ${arbol.estado}</p>
            <p><strong>Uso ecológico:</strong> ${arbol.uso_ecologico}</p>
            <p><strong>Flora:</strong> ${arbol.especie}</p>
            <img src="${arbol.fotografia}" alt="Imagen del árbol" style="width:100%; max-width:300px;">
            <p><strong>Notas:</strong> ${arbol.notas}</p>
          `;
          this.popup.setPosition(fromLonLat(arbol.coordenadas));
          document.getElementById('popup-content')!.innerHTML = contenido;
        }
      }
    });
    // this.mapa.on('singleclick', (event: { pixel: any; }) => {
    //   // Verificar si se hizo clic en un marcador
    //   const feature = this.mapa.forEachFeatureAtPixel(event.pixel, (feature: any) => feature);
      
    //   if (!feature && this.popup) {
    //     this.popup.setPosition(undefined); // Ocultar popup
    //     console.log("Popup cerrado");
    //   }
    // });
    // Obtener el botón de cerrar
    const closeButton = document.getElementById('popup-close');

    if (closeButton) {
      closeButton.addEventListener('click', () => {
        if (this.popup) {
          this.popup.setPosition(undefined); // Oculta el popup
          console.log("Popup cerrado");
        }
      });
    }

  

    this.mapa.once('rendercomplete', () => {
      this.isLoading = false;
      console.log("Mapa cargado");
    });
    
  // this.mapa.getView().on('change:resolution', () => {
  //   this.isLoading = false;
  //   console.log("Mapa cargado");
  // });
  
}
  
}
