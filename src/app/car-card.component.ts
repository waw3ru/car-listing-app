import { CommonModule, DatePipe } from '@angular/common';
import { Component, inject, input, Input } from '@angular/core';
import { CarService } from './car.service';
import { CarType } from './@types';

@Component({
  selector: 'app-car-card',
  standalone: true,
  imports: [DatePipe],
  template: `
    <div class="car-card">
      <div class="car-image-container">
        <img
          [src]="car()?.imageUrl"
          [alt]="car()?.carMake?.name + ' ' + car()?.carModel?.name"
          class="car-image"
        />
      </div>

      <div class="car-details">
        <h2 class="car-title">
          {{ car()?.yearOfManufacture }} {{ car()?.carMake?.name }} {{ car()?.carModel?.name }}
        </h2>
        <p class="car-price">\${{ formatPrice(car()?.minPrice!) }}</p>
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
            {{ car()?.createdOn | date: 'short' }}
          </span>
          <span class="spec-item">
            <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <circle cx="12" cy="12" r="10" stroke-width="2" />
              <circle cx="12" cy="12" r="3" fill="currentColor" />
            </svg>
            {{ car()?.color }}
          </span>
        </div>
      </div>
    </div>
  `,
})
export class CarCardComponent {
  car = input<CarType | undefined>();

  formatPrice(price: number): string {
    return price.toLocaleString('en-US');
  }

  formatMileage(mileage: number): string {
    return mileage.toLocaleString('en-US');
  }
}
