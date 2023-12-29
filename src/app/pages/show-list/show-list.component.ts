import { Component, OnInit } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Movie, MoviesDto } from '../../types/movies';
import { MoviesService } from '../../services/movies.service';
import { Paginator, PaginatorState } from 'primeng/paginator';
import { TvshowsService } from '../../services/tvshows.service';
import { mapToMoviesDto } from '../../types/tvShow';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-show-list',
  templateUrl: './show-list.component.html',
  styleUrl: './show-list.component.scss'
})
export class ShowListComponent implements OnInit{
  showList$: Observable<MoviesDto>|null =null;
  searchValue=''
  showType: 'movie' |'tv'='movie'
  constructor(private moviesService: MoviesService, private tvShowsService: TvshowsService,private route:ActivatedRoute){}
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.showType= params['type'];
    this.getShowPages(this.showType,1)
    })
  }

  
  getShowPages(showsType: 'movie' | 'tv',page:number,searchKeyword?:string){
    if (showsType === 'movie') {
      this.showList$ = this.moviesService.searchMovies(page, searchKeyword);
    };
    if (showsType === 'tv') {
      this.showList$ = this.tvShowsService
        .searchTvShows(page, searchKeyword)
        .pipe(map(mapToMoviesDto));
    }
    this.showList$ = this.moviesService.searchMovies(page,searchKeyword)

  }
  searchChanged(){
    this.getShowPages(this.showType,1,this.searchValue)
  }

  pageChanged(event:PaginatorState){
    const pageNumber = event.page ? event.page +1 :1;

    this.getShowPages(this.showType,pageNumber,this.searchValue)
  }
}
