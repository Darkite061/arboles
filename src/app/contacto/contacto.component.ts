import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contacto',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './contacto.component.html',
  styleUrl: './contacto.component.css'
})
export class ContactoComponent {
  // Propiedades para el formulario
  nombre: string = '';
  correo: string = '';
  mensaje: string = '';

  // Lógica para manejar el envío del formulario
  enviarFormulario() {
    if (this.nombre && this.correo && this.mensaje) {
      console.log('Formulario enviado', {
        nombre: this.nombre,
        correo: this.correo,
        mensaje: this.mensaje
      });
      alert('¡Gracias por ponerte en contacto con nosotros!');
      // Aquí podrías enviar los datos al backend si lo deseas.
    } else {
      alert('Por favor, completa todos los campos');
    }
  }
}
