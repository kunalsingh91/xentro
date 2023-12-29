import { Component, Input } from '@angular/core';
import { Movie } from '../../types/movies';
import { imagesBaseUrl } from '../../constants/imageUrl';

@Component({
  selector: 'app-show-item',
  templateUrl: './show-item.component.html',
  styleUrl: './show-item.component.scss'
})
export class ShowItemComponent {
  @Input() showItem: Movie | null = null;
  @Input() showType: 'tv' | 'movie' = 'movie';

  imageBaseUrl = imagesBaseUrl;
}
