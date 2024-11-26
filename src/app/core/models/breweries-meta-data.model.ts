import { IBreweriesMetaData } from "../interfaces/breweries-meta-data.interface";

export class BreweriesMetaData implements IBreweriesMetaData {
  total!: string;
  page!: string;
  per_page!: string;
}