// Interface para um Filme
export interface IMovie {
  // Lista
  id?: number;

  adult?: boolean;
  backdrop_path?: string | null;
  genre_ids?: number[];
  overview?: string;
  original_title?: string;
  original_language?: string;
  poster_path?: string | null;
  popularity?: number;
  release_date?: string;
  title?: string;
  vote_count?: number;
  vote_average?: number;
  video?: boolean;

  // Detalhes
  belongs_to_collections?: null | object;
  budget?: number;
  genres?: [
    {id?: number, name?: string}
  ]
  homepage?: string | null;
  imdb_id?: string | null;
  production_companies?: [
    {name?: string, id?: number, logo_path?: string | null, origin_country?: string}
  ]
  production_countries?: [
    {iso_3166_1: string, name?: string, release_date: string, revenue?: number, runtime?: number | null}
  ]
  spoken_languages?: [
    {iso_639_1: string, name?: string}
  ]
  status?: string
  tagline: string | null


  status_message?: string 
}
