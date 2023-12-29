import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MoviesService } from '../../services/movies.service';
import { Movie } from '../../types/movies';
import { Observable, map } from 'rxjs';
import { Video } from '../../types/video';
import { IMAGES_SIZES } from '../../constants/imageUrl';
import { Image } from '../../types/image';
import { Actor } from '../../types/credit';
import { TvshowsService } from '../../services/tvshows.service';
import { mapToMovie, mapToMoviesDto } from '../../types/tvShow';

@Component({
  selector: 'app-show-detail',
  templateUrl: './show-detail.component.html',
  styleUrl: './show-detail.component.scss'
})
export class ShowDetailComponent implements OnInit {
  showId='';
  showType: 'tv' | 'movie' = 'movie';
  show$: Observable<Movie> | null =null
  showVideos$: Observable<Video[]> | null =null
  showImages$:Observable<Image[]>|null = null
  showCast$:Observable<Actor[]>|null = null
  similarShows$: Observable<Movie[]>|null=null


  imageSizes=IMAGES_SIZES

  constructor(private router:ActivatedRoute, private moviesServices:MoviesService,private tvServices:TvshowsService){}

  ngOnInit(): void {
    // this.router.params.subscribe((params)=>{
    //   console.log(params);
    //   this.showId = params['id']
      
    // })
    this.showId=this.router.snapshot.params['id']
    this.showType=this.router.snapshot.params['type']
    
    if (this.showType==='movie') {
      
    this.show$=this.moviesServices.getMovieById(this.showId)
    this.showVideos$=this.moviesServices.getMovieVideoes(this.showId)
    this.showImages$ = this.moviesServices.getMovieImages(this.showId)
    this.showCast$=this.moviesServices.getMovieCast(this.showId)
    }

    if (this.showType==='tv') {
      this.show$=this.tvServices.getTvShowById(this.showId).pipe(map(mapToMovie))
      this.showVideos$=this.tvServices.getTvShowVideos(this.showId)
      this.showImages$=this.tvServices.getTvShowImages(this.showId);
      this.showCast$=this.tvServices.getTvShowCast(this.showId);
      // this.similarShows$ = this.tvServices
      // .getTvShowSimilar(this.showId)
      // .pipe(map(mapToMovie));
    }
  }
}
