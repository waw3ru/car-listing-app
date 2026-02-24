import { CommonModule } from '@angular/common';
import { Component, inject, input, Input } from '@angular/core';
import { CarService } from './car.service';

@Component({
  selector: 'app-car-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="car-card">
      <div class="car-image-container">
        <img [src]="car.image_url" [alt]="car.carMake + ' ' + car.cardModel" class="car-image" />
      </div>
      <div class="car-details">
        <h2 class="car-title">{{ car.yearOfManufacture }} {{ car.carMake }} {{ car.cardModel }}</h2>
        <p class="car-price">\${{ formatPrice(car.price) }}</p>
        <div class="car-specs">
          <span class="spec-item">
            <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            {{ formatMileage(car.mileage) }} miles
          </span>
          <span class="spec-item">
            <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <circle cx="12" cy="12" r="10" stroke-width="2" />
              <circle cx="12" cy="12" r="3" fill="currentColor" />
            </svg>
            {{ car.color }}
          </span>
        </div>
        <p class="car-description">{{ car.description }}</p>
        <button class="view-details-btn">View Details</button>
      </div>
    </div>
  `,
})
export class CarCardComponent {
  car = input();

  formatPrice(price: number): string {
    return price.toLocaleString('en-US');
  }

  formatMileage(mileage: number): string {
    return mileage.toLocaleString('en-US');
  }
}
