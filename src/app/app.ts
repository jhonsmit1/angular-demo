import { Component, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ApiService, Product } from './services/api';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  title = "Productos desde NestJS";

  // signal para el estado
  products = signal<Product[]>([]);

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {

    this.apiService.getProducts().subscribe({
      next: (data) => {
        console.log("productos:", data);

        // actualizar signal
        this.products.set(data);
      },
      error: (err) => {
        console.error("error llamando backend", err);
      }
    });

  }


}
