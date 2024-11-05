export interface Covid {
  id?:string;
  continent: string;
  country: string;
  population:number;
  cases: {
    active: number;
    recovered: number;
    total:number;
  };
  deaths: {
    total:number;
  };
  tests: {
    total: number;
  };
}