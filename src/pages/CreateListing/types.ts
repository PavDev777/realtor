export interface ICreateListing {
  type: "rent" | "sale";
  name: string;
  bedrooms: number;
  bathrooms: number;
  parking: string;
  furnished: string;
  address: string;
  description: string;
  offer: string;
  regularPrice: number;
  discountedPrice: number;
}
