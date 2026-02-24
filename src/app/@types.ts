export type CarMakeType = {
  id: string;
  name: string;
  imageUrl: string;
  createdOn: string | null;
  updatedOn: string | null;
};

export type CarModelType = {
  id: string;
  name: string;
  createdOn: string | null;
  updatedOn: string | null;
  carMake: string;
};

export type CarType = {
  id: string;
  name: string;
  imageUrl: string;
  createdOn: string | null;
  updatedOn: string | null;
  carMake: CarMakeType;
  yearOfManufacture: number;
  minPrice: number;
  color: string;
  vipStatus: 'VIP' | 'NON_VIP' | 'VIP_PLUS';
  purchaseStatus: string;
  carModel: CarModelType;
};

export type PaginationQueryValidationType = {
  order: 'asc' | 'desc';
  page: number;
  pageSize: number;
  sortKey: string;
  searchTerm?: string | undefined;
  minPrice?: number | undefined;
  maxPrice?: number | undefined;
  model?: string | undefined;
  make?: string | undefined;
  year?: number | undefined;
};
