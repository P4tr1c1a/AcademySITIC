import { Component } from '@angular/core';
import { MatIconRegistry, SafeResourceUrlWithIconOptions } from '@angular/material/icon';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = "Mi primera App en Angular";

  constructor(
    private readonly matIconRegistry: MatIconRegistry,
    private readonly domSanitizer: DomSanitizer
  ) { 
    this.matIconRegistry.addSvgIconResolver(
      (
        name: string,
        namespace: string
      ): SafeResourceUrl | SafeResourceUrlWithIconOptions | null => {
        switch (namespace) {
          case 'mat':
            return this.domSanitizer.bypassSecurityTrustResourceUrl(
              `assets/img/icons/material-design-icons/two-tone/${name}.svg` // Corregido: uso de comillas invertidas para interpolación
            );
          default:
            return null; // Añadido un caso por defecto para manejar otros namespaces
        }
      }
    );
  }

  nombre: string = "bateria";
  precio: number = 1200;

  getArticuloInfo(): string {
    return `${this.nombre} - ${this.precio}`;
  }

  cambiarPrecio() { // Corregido: eliminado '/' innecesario
    this.precio = 1500;
  }

  cambiarNombre() {
    this.nombre = 'Filtro de Aire';
  }

  resetForm() {
    this.nombre = 'bateria';
    this.precio = 1200;
  }
}

