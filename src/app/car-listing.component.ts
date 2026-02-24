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
