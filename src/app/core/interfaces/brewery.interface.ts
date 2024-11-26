import { BreweryType, Country, UUID } from "../types";

export interface IBrewery {
  id: UUID;
  name: string;
  brewery_type: BreweryType;
  address_1?: string;
  address_2?: string;
  address_3?: string;
  city: string;
  state_province: string;
  postal_code: string;
  country: Country;
  longitude?: number;
  latitude?: number;
  phone?: string;
  website_url?: string;
  state: string;
  street?: string;
}