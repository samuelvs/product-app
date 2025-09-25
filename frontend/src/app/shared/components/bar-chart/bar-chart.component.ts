import { Component, effect, Inject, input, PLATFORM_ID, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Product } from '../../interfaces/product.interface';

@Component({
  selector: 'app-bar-chart',
  standalone: true,
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss']
})
export class BarChartComponent {

  data = input.required<Product[]>();
  private resizeObserver: (() => void) | null = null;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    effect(() => {
      const products = this.data();
      if (!isPlatformBrowser(this.platformId) || !products.length) return;

      this.renderPlot();
      this.setupResizeListener();
    });
  }

  renderPlot() {
    if (!isPlatformBrowser(this.platformId) || !this.data()) return;

    import('plotly.js-dist-min').then((PlotlyModule) => {
      const categories = [...new Set(this.data().map(p => p.category || 'Sem categoria'))];
      const counts = categories.map(c => this.data().filter(p => (p.category || 'Sem categoria') === c).length);

      const data: any = [{ x: categories, y: counts, type: 'bar', marker: { color: '#018643' } }];
      const layout = {
        title: { text: 'Produtos por categoria' },
        autosize: true
      };

      PlotlyModule.default.newPlot('plotlyChart', data, layout, { responsive: true });
    });
  }

  setupResizeListener() {
    if (!isPlatformBrowser(this.platformId) || this.resizeObserver) return;

    this.resizeObserver = () => this.renderPlot();
    window.addEventListener('resize', this.resizeObserver);
  }

  ngOnDestroy() {
    if (this.resizeObserver) {
      window.removeEventListener('resize', this.resizeObserver);
    }
  }
}
