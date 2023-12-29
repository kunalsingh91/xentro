import { Component, Input, OnInit } from '@angular/core';
import { MoviesService } from '../../services/movies.service';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { imagesBaseUrl } from '../../constants/imageUrl';
import { Movie } from '../../types/movies';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrl: './slider.component.scss',
  animations: [
    trigger('slideFade',[
      state('void', style({opacity:2})),
      transition('void <=> *',[animate('1s')])
    ])
  ]
})
export class SliderComponent implements OnInit {
  @Input() slides: Movie[]=[];
  @Input() isHeader = false

  // constructor(private moviesService:MoviesService){}
 
  // movies$ = this.moviesService.getMoviesTypes('popular');

  slideIndex = 0;

  imagesBaseUrl = imagesBaseUrl;

  ngOnInit() {
    if (!this.isHeader) {
      this.changeSlide();
    }
  }

  changeSlide() {
    setInterval(() => {
      this.slideIndex += 1;
      if (this.slideIndex > 10) {
        this.slideIndex = 0;
      }
    }, 5000);
  }
}
// function state(arg0: string, arg1: any): import("@angular/animations").AnimationMetadata {
//   throw new Error('Function not implemented.');
// }

// function style(arg0: { opacity: number; }): any {
//   throw new Error('Function not implemented.');
// }

// function animate(arg0: string): any {
//   throw new Error('Function not implemented.');
// }

