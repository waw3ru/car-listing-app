import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CarType, PaginationQueryValidationType } from './@types';

@Injectable({
  providedIn: 'root',
})
export class CarService {
  constructor(private http: HttpClient) {}

  async getCarListings(filters?: Partial<PaginationQueryValidationType>): Promise<any> {
    return this.http.get<CarType[]>('http://localhost:3000/q', {
      params: this.#applyFilters(filters),
    });
  }

  #applyFilters(filters?: Partial<PaginationQueryValidationType>) {
    const params = new HttpParams();
    params.set('pageSize', filters?.pageSize ?? 10);
    params.set('sortKey', filters?.sortKey ?? 'createdOn');
    params.set('order', filters?.order ?? 'desc');

    if (filters?.make) params.set('make', filters.make);

    if (filters?.model) params.set('model', filters.model);

    if (filters?.year) params.set('year', filters.year);

    if (filters?.minPrice) params.set('minPrice', filters.minPrice);

    if (filters?.maxPrice) params.set('maxPrice', filters.maxPrice);

    if (filters?.searchTerm && filters.searchTerm.length)
      params.set('searchTerm', filters.searchTerm);

    return params;
  }
}
