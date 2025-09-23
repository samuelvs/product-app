import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss'
})
export class PaginationComponent {

  showItemsPerPage = input(true);
  currentPage = input(1);
  itemsPerPage = input(10);
  totalItems = input(0);

  handlePage = output<number>();
  handleItemsPerPage = output<number>();

  get pages(): number[] {
    return Array.from({ length: this.totalPages() }, (_, i) => i + 1);
  }

  totalPages() {
    return Math.ceil(this.totalItems() / this.itemsPerPage());
  }

  goToPage(page: number) {   
    if (page < 1 || page > this.totalPages()) return;
    this.handlePage.emit(page);
  }

  onItemsPerPageChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    this.handleItemsPerPage.emit(Number(target.value));
  }

}
