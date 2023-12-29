import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../../services/movies.service';
import { Observable } from 'rxjs';
import { Genre, Movie, genresDto } from '../../types/movies';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-genres',
  templateUrl: './genres.component.html',
  styleUrl: './genres.component.scss'
})
export class GenresComponent implements OnInit {
  genres$:Observable<Genre[]>|null=null
  shows$:Observable<Movie[]>|null=null
  genreId =''
  constructor(private moviesServices:MoviesService,private router:ActivatedRoute){}
  ngOnInit(): void {
    this.router.params.subscribe((params) => {
      this.genreId = params['genreId'];
      this.shows$ = this.moviesServices.getGenresByMovie(this.genreId)
    });
    this.genres$ = this.moviesServices.getGenresMovies()
 console.log(this.genres$);
 
  }
  findByGenres(genreId:string){
    // this.show$=this.moviesServices.getGenresByMovie(genreId)
  }
}
