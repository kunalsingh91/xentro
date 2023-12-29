import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Movie, MoviesDto, genresDto } from '../types/movies';
import { map } from 'rxjs';
import { VideoDto } from '../types/video';
import { ImageDto } from '../types/image';
import { CreditsDto } from '../types/credit';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  getMoviesByType(arg0: string) {
    throw new Error('Method not implemented.');
  }
  private apiUrl = 'https://api.themoviedb.org/3';
  private apiKey = '8c247ea0b4b56ed2ff7d41c9a833aa77';
  constructor(private http:HttpClient) { }
  getMoviesTypes(type:string,count=20){
    return this.http.get<MoviesDto>(
      `${this.apiUrl}/movie/${type}?api_key=${this.apiKey}`
    ).pipe(map((data)=>data.results.slice(0,count)))      
  }

  getMovieById(id:string){
    return this.http.get<Movie>(
      `${this.apiUrl}/movie/${id}?api_key=${this.apiKey}`
    )
  }

  getMovieVideoes(id:string){
    return this.http.get<VideoDto>(
      `${this.apiUrl}/movie/${id}/videos?api_key=${this.apiKey}`
    ).pipe(map((data)=>data.results))
  };

  getMovieImages(id:string){
    return this.http.get<ImageDto>(
      `${this.apiUrl}/movie/${id}/images?api_key=${this.apiKey}`
    ).pipe(map((data)=>data.backdrops))
  }

  getMovieCast(id:string){
    return this.http.get<CreditsDto>(
      `${this.apiUrl}/movie/${id}/credits?api_key=${this.apiKey}`
    ).pipe(map((data)=>data.cast))
  }

  searchMovies(page:number,searchValue?:string){
    const uri = searchValue ? 'search/movie' : 'movie/popular'
    return this.http.get<MoviesDto>(
      `${this.apiUrl}/${uri}?query=${searchValue}&page=${page}&api_key=${this.apiKey}`
    )
  }
  getGenresMovies(){
    return this.http.get<genresDto>(
      `${this.apiUrl}/genre/movie/list?api_key=${this.apiKey}`
    ).pipe(map((data)=>data.genres));
    
  }

  getGenresByMovie(genreId:string,pageNumber=1){
    return this.http.get<MoviesDto>(
      `${this.apiUrl}/discover/movie?with_genres=${genreId}&page=${pageNumber}&api_key=${this.apiKey}`
    ).pipe(map((data)=>{

      return data.results
    }));
  }

}
