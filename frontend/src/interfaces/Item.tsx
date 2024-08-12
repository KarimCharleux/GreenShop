export interface Item {
  _id: string;
  name: string;
  description: string;
  price: number;
  previousPrice: number;
  supplier: string;
  image: string;
  rate: number;
  rateCount: number;
  createdAt: string;
  modifiedAt: string;
  labels: Label[];
  greenScore: string;
  weight_value: number;
  weight_unit: string;
  distance_value: number;
  distance_unit: string;
  transport_method: string;
}

export interface Label {
  _id: string;
  name: string;
  description: string;
  image_url: string;
  category: string;
}
