import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { HttpClient, HttpParams } from "@angular/common/http";
import { IBrewery } from "../interfaces/brewery.interface";
import { Observable } from "rxjs";
import { IBreweriesMetaData } from "../interfaces/breweries-meta-data.interface";
import { BreweriesFilter } from "../models/breweries-filter.model";
import { UUID } from "../types";
import { Brewery } from "../models/brewery.model";

@Injectable({
  providedIn: 'root'
})
export class BreweriesApiSource {
  get apiUrl(): string {
    return environment.apiUrl;
  }

  constructor(
    private _httpClient: HttpClient,
  ) {}

  private _generateFilterParams(page: number, pageSize: number, filter?: BreweriesFilter): HttpParams {
    let params = new HttpParams();
    if (!!filter?.by_name) {
      params = params.set('by_name', filter.by_name);
    }
    if (!!filter?.by_country) {
      params = params.set('by_country', filter.by_country);
    }
    if (!!filter?.by_type) {
      params = params.set('by_type', filter.by_type);
    }
    params = params.set('page', page);
    params = params.set('per_page', pageSize);

    return params;
  }

  public getBreweryDetails(id: UUID): Observable<Brewery> {
    return this._httpClient.get<Brewery>(this.apiUrl + id);
  }

  public getBreweriesList(page: number, pageSize: number, filter?: BreweriesFilter): Observable<Array<IBrewery>> {
    return this._httpClient.get<Array<IBrewery>>(this.apiUrl, {
      params: this._generateFilterParams(page, pageSize, filter),
    });
  }

  public getBreweriesMetaData(page: number, pageSize: number, filter?: any): Observable<IBreweriesMetaData> {
    return this._httpClient.get<IBreweriesMetaData>(this.apiUrl + 'meta', {
      params: this._generateFilterParams(page, pageSize, filter),
    });
  }
}