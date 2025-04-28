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
import  ArbolesService  from '../services/arboles.service';
import { HttpClient } from '@angular/common/http';
import { Arbol } from '../models/arbol.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-mapa',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css']
})
export class MapaComponent implements OnInit {
  private mapa: any;
  private popup: Overlay | null = null;
  isLoading = true;
  arboles: Arbol[] = [];
  arbolId: number | null = null;

  constructor(private http: HttpClient, private arbolesService: ArbolesService, private route: ActivatedRoute ) {}

  ngOnInit(): void {
    // Obtener el id del árbol de la URL
    this.route.params.subscribe(params => {
      this.arbolId = +params['id'];
    });

    // Llamar al servicio para obtener los árboles
    this.arbolesService.GetArboles(new FormData()).subscribe({
      next: (response) => {
        this.arboles = response.data;
        console.log(this.arboles);
        this.inicializarMapa();
      },
      error: (error) => {
        console.error('Error al obtener los árboles:', error);
      }
    });
  }

  // Método para inicializar el mapa
  private inicializarMapa(): void {
    this.mapa = new Map({
      target: 'mapa',
      layers: [
        new TileLayer({
          source: new OSM({ attributions: [] })
        })
      ],
      view: new View({
        center: fromLonLat([-103.22740144442683, 20.566436345390372]),  // Coordenadas iniciales
        zoom: 17
      }),
      controls: []
    });

    // Agregar controles de zoom y pantalla completa
    this.mapa.addControl(new Zoom());
    this.mapa.addControl(new FullScreen());

    const vectorSource = new VectorSource();

    // Crear los marcadores para cada árbol
    this.arboles.forEach(arbol => {
      const marker = new Feature({
        geometry: new Point(fromLonLat([arbol.longitud, arbol.latitud])),
      });

      marker.set('id', arbol.id_arbol); // Guardar el id del árbol en el marcador

      marker.setStyle(new Style({
        image: new Icon({
          src: 'assets/icons/icons8-tree-32 (1).png',  // Icono del árbol
          scale: 0.9
        })
      }));

      vectorSource.addFeature(marker);
    });

    // Agregar capa vectorial con los árboles
    const vectorLayer = new VectorLayer({ source: vectorSource });
    this.mapa.addLayer(vectorLayer);

    // Agregar interacción para seleccionar un marcador
    const selectInteraction = new Select({ condition: click });
    this.mapa.addInteraction(selectInteraction);

    // Crear el popup para mostrar la información del árbol
    this.popup = new Overlay({
      element: document.getElementById('popup') as HTMLElement,
      autoPan: true,
    });
    this.mapa.addOverlay(this.popup);

    // Evento de selección de árbol
    selectInteraction.on('select', (event) => {
      const selectedFeatures = event.selected;
      if (selectedFeatures.length > 0) {
        const selectedFeature = selectedFeatures[0];
        const arbolId = selectedFeature.get('id');

        const arbol = this.arboles.find(a => a.id_arbol === arbolId);
        if (arbol && this.popup) {
          const contenido = `
            <h3>${arbol.nombre_comun} (${arbol.nombre_cientifico})</h3>
            <p><strong>Área:</strong> ${arbol.area}</p>
            <p><strong>Altura:</strong> ${arbol.altura} metros</p>
            <p><strong>Estado:</strong> ${arbol.estado}</p>
            <p><strong>Uso ecológico:</strong> ${arbol.uso_ecologico}</p>
            <p><strong>Flora:</strong> ${arbol.especie}</p>
            <img src="${arbol.imagen_url}" alt="Imagen del árbol" style="width:100%; max-width:300px;">
            <p><strong>Notas:</strong> ${arbol.notas}</p>
          `;
          this.popup.setPosition(fromLonLat([arbol.longitud, arbol.latitud]));
          document.getElementById('popup-content')!.innerHTML = contenido;
        }
      }
    });

    // Evento para cerrar el popup
    const closeButton = document.getElementById('popup-close');
    if (closeButton) {
      closeButton.addEventListener('click', () => {
        if (this.popup) {
          this.popup.setPosition(undefined);
          console.log("Popup cerrado");
        }
      });
    }

    // Una vez que el mapa está cargado
    this.mapa.once('rendercomplete', () => {
      this.isLoading = false;
      console.log("Mapa cargado");
    });

    // Centrar el mapa en el árbol seleccionado si se pasa un id en la URL
    if (this.arbolId) {
      const arbol = this.arboles.find(a => a.id_arbol === this.arbolId);
      if (arbol) {
        this.mapa.getView().setCenter(fromLonLat([arbol.longitud, arbol.latitud]));
        const feature = vectorSource.getFeatureById(this.arbolId);
        if (feature) {
          selectInteraction.getFeatures().push(feature);
        }
      }
    }
  }
}
