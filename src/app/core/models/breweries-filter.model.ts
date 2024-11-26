import { BreweryType, Country } from "../types";

export class BreweriesFilter {
  by_country?: Country;
  by_name?: string;
  by_type?: BreweryType;

  constructor(props?: Partial<BreweriesFilter>) {
    Object.assign(this, props);
  }
}