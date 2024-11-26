import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Brewery } from '../../../core/models/brewery.model';
import { CommonModule } from '@angular/common';
import { CardComponent } from '../card/card.component';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [
    CommonModule,
    CardComponent,
  ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListComponent {
  @Input() data: Array<Brewery> = [];

}
