import { BreweriesMetaData } from "./breweries-meta-data.model";
import { Brewery } from "./brewery.model";

export class BreweriesData {
  metaData!: BreweriesMetaData;
  data!: Array<Brewery>;
}