import { Component, OnInit, inject, signal } from '@angular/core';
import { CarType } from './@types';
import { CarCardComponent } from './car-card.component';
import { CarService } from './car.service';

@Component({
  selector: 'app-car-listing',
  standalone: true,
  imports: [CarCardComponent],
  template: `
    <div class="container">
      <header class="header">
        <h1 class="title">Premium Car Listings</h1>
        <p class="subtitle">Find your dream car from our curated collection</p>
      </header>

      <div class="filters">
        <div class="search-container">
          <svg class="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <circle cx="11" cy="11" r="8" stroke-width="2" />
            <path d="M21 21l-4.35-4.35" stroke-width="2" stroke-linecap="round" />
          </svg>
          <input
            type="text"
            placeholder="Search by make, model, or year..."
            class="search-input"
            (input)="onSearch($event)"
          />
          <svg
            class="filter-icon"
            width="800px"
            height="800px"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M20.058 9.72255C21.0065 9.18858 21.4808 8.9216 21.7404 8.49142C22 8.06124 22 7.54232 22 6.50448V5.81466C22 4.48782 22 3.8244 21.5607 3.4122C21.1213 3 20.4142 3 19 3H5C3.58579 3 2.87868 3 2.43934 3.4122C2 3.8244 2 4.48782 2 5.81466V6.50448C2 7.54232 2 8.06124 2.2596 8.49142C2.5192 8.9216 2.99347 9.18858 3.94202 9.72255L6.85504 11.3624C7.49146 11.7206 7.80967 11.8998 8.03751 12.0976C8.51199 12.5095 8.80408 12.9935 8.93644 13.5872C9 13.8722 9 14.2058 9 14.8729L9 17.5424C9 18.452 9 18.9067 9.25192 19.2613C9.50385 19.6158 9.95128 19.7907 10.8462 20.1406C12.7248 20.875 13.6641 21.2422 14.3321 20.8244C15 20.4066 15 19.4519 15 17.5424V14.8729C15 14.2058 15 13.8722 15.0636 13.5872C15.1959 12.9935 15.488 12.5095 15.9625 12.0976"
              stroke="#1C274C"
              stroke-width="1.5"
              stroke-linecap="round"
            />
          </svg>
        </div>
      </div>

      @if (loading()) {
        <div class="loading">
          <div class="spinner"></div>
          <p>Loading cars...</p>
        </div>
      }

      @if (!loading() && cars().length === 0) {
        <div class="no-results">
          <svg class="no-results-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          <p>No cars found matching your search</p>
        </div>
      }

      <div class="car-grid">
        @for (car of cars(); track car.id) {
          <app-car-card [car]="car"></app-car-card>
        }
      </div>
    </div>
  `,
  styles: [],
})
export class CarListingComponent implements OnInit {
  carService = inject(CarService);

  cars = signal<CarType[]>([]);
  loading = signal(true);

  ngOnInit() {
    this.loading.set(true);
    const data = this.carService.getCarListings().subscribe((data) => {
      this.cars.set(data.output ?? []);
      this.loading.set(false);
    });
  }

  onSearch(event: Event) {
    this.loading.set(true);
    const data = this.carService
      .getCarListings({
        searchTerm: (event.target as unknown as { value: string }).value,
      })
      .subscribe((data) => {
        this.cars.set(data.output ?? []);
        this.loading.set(false);
      });
  }
}
