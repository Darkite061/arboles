import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-import-arboles',
  imports: [],
  templateUrl: './import-arboles.component.html',
  styleUrl: './import-arboles.component.css'
})
export class ImportArbolesComponent {

  constructor(private router: Router) {}

  irAMapa() {
    this.router.navigate(['/mapa']);
  }


}
