import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import ArbolesService from '../services/arboles.service';
import { Arbol } from '../models/arbol.model';
import { FormsModule } from '@angular/forms';
import { TabsModule } from 'primeng/tabs';
import { MenubarModule } from 'primeng/menubar';
import { TabViewModule } from 'primeng/tabview';
import { Router } from '@angular/router';
import sh from '../Helpers/SessionHelper'
import alerts from '../Alert/Alerts';

@Component({
  selector: 'app-admin',
  imports: [TableModule, CommonModule, FormsModule, TabsModule, MenubarModule, TabViewModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {
  arboles: Arbol[] = [];
  arbol: Arbol = {
    id_arbol: 0,
    nombre_comun: '',
    altura: 0,
    area: '',
    nombre_cientifico: '',
    diametro_tronco: 0,
    edad_estimada: 0,
    estado: '',
    tipo_hoja: '',
    especie: '',
    uso_ecologico: '',
    oxigeno_anual: 0,
    epoca_floracion: '',
    notas: '',
    latitud: 0,
    longitud: 0,
    imagen_url: ''
  };
  currentSection: string = 'arboles'; 
  isModalOpen = false;
  isModalOpen2 = false;
  selectedArbol?: Arbol;
  selectedFile: any;

  filteredArboles: any[] = [];
  filterText: string = ''; 

  openModal(): void {
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
    this.arbol = { id_arbol: 0,
      nombre_comun: '',
      altura: 0,
      area: '',
      nombre_cientifico: '',
      diametro_tronco: 0,
      edad_estimada: 0,
      estado: '',
      tipo_hoja: '',
      especie: '',
      uso_ecologico: '',
      oxigeno_anual: 0,
      epoca_floracion: '',
      notas: '',
      latitud: 0,
      longitud: 0,
      imagen_url: ''}; // Reset form
    this.selectedArbol = undefined;
  }

  constructor(private arbolesService: ArbolesService, private router: Router, private http: HttpClient) {}

  currentTabIndex: number = 0;  // Índice de la pestaña activa
  tabs: { title: string; value: number; content: string }[] = [];

  // Modelo de items para p-menubar
  items = [
    {
      label: 'Arboles',
      icon: 'pi pi-list',
      command: () => { this.changeSection('arboles'); this.changeTab(0); }
    },
    {
      label: 'Usuarios',
      icon: 'pi pi-users',
      command: () => { this.changeSection('users'); this.changeTab(1); }
    },
    {
      label: 'Cerrar Sesión',
      icon: 'pi pi-sign-out',
      styleClass: 'sign-out-button',
      command: () => { this.signOut(); }
    }
  ];

  ngOnInit() {
    alerts.Loading('Cargando arboles','Se estan cargando los arboles...\nEspere un poco');
    this.getAllArboles();
    this.tabs = [
      { title: 'arboles', value: 0, content: 'Contenido de arboles' },
      { title: 'users', value: 1, content: 'Contenido de Usuarios' },
    ];
  }

  //--------------------------Arboles-=--------------------------
  getAllArboles(){
    this.arbolesService.GetArboles(new FormData()).subscribe({
      next: (response) => {
        this.arboles = response.data;   
        alerts.CloseAlert();
      },
      error: (error) => {
        alerts.Correct('No hay arboles registrados','');
      }
    });
  } 

  // Función para registrar un árbol
  registrarArbol(): void {
    // Crear el objeto JSON con los datos del árbol
    const arbolData = {
      nombre_comun: this.arbol.nombre_comun,
      altura: this.arbol.altura,
      area: this.arbol.area,
      nombre_cientifico: this.arbol.nombre_cientifico,
      diametro_tronco: this.arbol.diametro_tronco,
      edad_estimada: this.arbol.edad_estimada,
      estado: this.arbol.estado,
      tipo_hoja: this.arbol.tipo_hoja,
      especie: this.arbol.especie,
      uso_ecologico: this.arbol.uso_ecologico,
      oxigeno_anual: this.arbol.oxigeno_anual,
      epoca_floracion: this.arbol.epoca_floracion,
      notas: this.arbol.notas,
      latitud: this.arbol.latitud,
      longitud: this.arbol.longitud,
      imagen_url: this.arbol.imagen_url || '', // Si no hay imagen, se deja como cadena vacía
      file: this.selectedFile ? this.selectedFile : null // Agregar el archivo si existe
    };
  
    // Enviar el objeto JSON al backend
    this.arbolesService.CreateArboles(arbolData).subscribe(
      (response) => {
        alerts.Correct('Árbol creado:', '');
        this.getAllArboles(); // Refrescar lista
        this.closeModal();
      },
      (error) => {
        alerts.Error('Error al crear Árbol:', 'Asegurate de que todos los campos esten llenos');
        if (error.error && error.error.errors) {
          console.log('Errores de validación:', error.error.errors);
        }
      }
    );
  }
  

// Función para actualizar un árbol
updateArbol(): void {
  // Crear el objeto JSON con los datos del árbol
  const arbolData = {
    id_arbol: this.arbol.id_arbol,
    nombre_comun: this.arbol.nombre_comun,
    altura: this.arbol.altura,
    area: this.arbol.area,
    nombre_cientifico: this.arbol.nombre_cientifico,
    diametro_tronco: this.arbol.diametro_tronco,
    edad_estimada: this.arbol.edad_estimada,
    estado: this.arbol.estado,
    tipo_hoja: this.arbol.tipo_hoja,
    especie: this.arbol.especie,
    uso_ecologico: this.arbol.uso_ecologico,
    oxigeno_anual: this.arbol.oxigeno_anual,
    epoca_floracion: this.arbol.epoca_floracion,
    notas: this.arbol.notas,
    latitud: this.arbol.latitud,
    longitud: this.arbol.longitud,
    imagen_url: this.arbol.imagen_url || ''
  };

  // Realizar la solicitud POST con el objeto JSON
  this.arbolesService.UpdateArboles(arbolData).subscribe(
    (response) => {
      alerts.Correct('Árbol actualizado:', '');
      this.getAllArboles(); // Refrescar lista
      this.closeModal();
    },
    (error) => {
      alerts.Error('Error al actualizar árbol:', error);
    }
  );
}


// Función para eliminar un árbol
eliminarArbol(id_arbol: number): void {
  alerts.Question('¿Estás seguro?', '¿Deseas eliminar este árbol?')
    .then((confirmed) => {
      if (confirmed) {
        this.arbolesService.DeleteArboles(id_arbol).subscribe(
          () => {
            console.log('Árbol eliminado');
            this.getAllArboles(); // Refrescar lista
          },
          (error) => {
            console.error('Error al eliminar Árbol', error);
          }
        );
      }
    });
}


// Función para abrir el modal de editar árbol
editArbol(arbol: Arbol): void {
  this.selectedArbol = arbol;
  this.arbol = { ...arbol };
  this.openModal();
}

onFileSelected(event: any): void {
  const file: File = event.target.files[0];

  if (file) {
    const formData = new FormData();
    formData.append('file', file);

    this.arbolesService.uploadArbolFile(formData).subscribe(
      (response) => {
        alerts.Correct('¡Éxito!', 'Árboles registrados desde el Excel');
        this.getAllArboles(); // Actualizar la lista
      },
      (error) => {
        alerts.Error('Error al subir Excel', error.message || error);
      }
    );
  }
}


  
  //--------------------end section-------------------

  changeSection(section: string): void {
    this.currentSection = section;
  }

  changeTab(tabIndex: number): void {
    this.currentTabIndex = tabIndex; // Cambia el índice de la pestaña activa
    this.changeSection(this.tabs[tabIndex].title.toLowerCase()); // Actualiza la sección según el tab seleccionado
  }


  signOut(){
    sh.signout();
    this.router.navigate(["login"]);
  }

  newUser = {
    username: '',
    password: ''
  };

  registrar(): void {
    this.arbolesService.createAdmin(this.newUser).subscribe(
      (response) => {
        alerts.Correct('¡Admin creado!', 'Se registró correctamente');
        // Puedes limpiar el formulario si quieres:
        this.newUser = { username: '', password: '' };
      },
      (error) => {
        alerts.Error('Error al registrar admin', error.message || error);
      }
    );
  }
  
}