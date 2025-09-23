import { Component, effect, Inject, input, PLATFORM_ID, signal, SimpleChanges } from '@angular/core';
import { DocxService } from '../../services/docx/docx.service';
import { isPlatformBrowser } from '@angular/common';
import { Product } from '../../interfaces/product.interface';

@Component({
  selector: 'app-bar-chart',
  standalone: true,
  imports: [],
  templateUrl: './bar-chart.component.html',
  styleUrl: './bar-chart.component.scss'
})
export class BarChartComponent {

  data = input.required<Product[]>();

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    effect(() => {
      const products = this.data();

      if (!isPlatformBrowser(this.platformId) || !products.length) return;
      this.renderPlot();
    });
  }

  renderPlot() {
    if (!isPlatformBrowser(this.platformId) || !this.data()) return;    
    import('plotly.js-dist-min').then((PlotlyModule) => {
      const categories = [...new Set(this.data().map(p => p.category || 'Sem categoria'))];
      const counts = categories.map(c => this.data().filter(p => (p.category || 'Sem categoria') === c).length);
      const data: any = [{ x: categories, y: counts, type: 'bar' }];
      const layout = { title: { text: 'Produtos por categoria' } };
      PlotlyModule.default.newPlot('plotlyChart', data, layout);
    });
  }
}
