import { Component } from '@angular/core';
import { MoviesService } from '../../services/movies.service';
import { TvshowsService } from '../../services/tvshows.service';
import { map } from 'rxjs';
import {  mapToMovies } from '../../types/tvShow';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  popularMovies$= this.moviesServies.getMoviesTypes('popular',12)
  upcomingMovies$ =this.moviesServies.getMoviesTypes('upcoming',12);
  topRatedMovies$ =this.moviesServies.getMoviesTypes('top_rated',12);
  popularTvShows$ =this.tvServices
  .getTvShowsByType('popular',12)
  .pipe(map(mapToMovies));

  constructor(private moviesServies:MoviesService, private tvServices:TvshowsService ){}

}
