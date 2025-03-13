export interface Product {
  id: string;
  barcode: string | null;
  name: string;
  imgURL: string | null;
  description: string;
  price: string;
  category: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export type AddProductPayload = {
  branchId: string;
  formData: FormData;
};

export type UpdateProductPayload = {
  id: string;
  formData: FormData;
};
