import { Movie, MoviesDto } from "./movies";

export type Tvshow = {
    id: number;
    backdrop_path: string;
    genre_ids: number[];
    original_language: string;
    original_name: string;
    overview: string;
    popularity: number;
    poster_path: string;
    release_date: string;
    vote_average: number;
    vote_count: number;
    name:string;
    first_air_date:string
  };
  
  export type TvshowsDto = {
    page: number;
    results: Tvshow[];
    total_pages: number;
    total_results: number;
  };

  // export function mapTvShow(tvShows:Tvshow[]):Movie[]{
  //   return tvShows.map((tvShows:Tvshow)=>{
  //     return{
  //       ...tvShows,
  //       title:tvShows.name,
  //       original_title:tvShows.original_name
  //     }
  //   })
  // }
  
  // export function mapToMovie(tvshow: Tvshow): Movie {
  //   return {
  //     ...tvshow,
  //     title: tvshow.name,
  //     original_title: tvshow.original_name,
  //   };
  // }
  
  // export function mapToMoviesDto(tvshowDto: TvshowsDto): MoviesDto {
  //   return {
  //     results: tvshowDto.results.map(mapToMovie),
  //     total_pages: tvshowDto.total_pages,
  //     total_results: tvshowDto.total_results,
  //     page: tvshowDto.page,
  //   };
  // }
  
  export function mapToMovies(tvshows: Tvshow[]): Movie[] {
    return tvshows.map((tvshow: Tvshow) => {
      return {
        ...tvshow,
        title: tvshow.name,
        original_title: tvshow.original_name,
      };
    });
  }
  
  export function mapToMovie(tvshow: Tvshow): Movie {
    return {
      ...tvshow,
      title: tvshow.name,
      original_title: tvshow.original_name,
    };
  }
  
  export function mapToMoviesDto(tvshowDto: TvshowsDto): MoviesDto {
    return {
      results: tvshowDto.results.map(mapToMovie),
      total_pages: tvshowDto.total_pages,
      total_results: tvshowDto.total_results,
      page: tvshowDto.page,
    };
  }