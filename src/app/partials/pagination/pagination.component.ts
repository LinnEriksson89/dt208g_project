import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-pagination',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './pagination.component.html',
    styleUrl: './pagination.component.scss'
})
export class PaginationComponent {
    @Input() currentPage: number = 1;
    @Input() total: number = 0;
    @Input() limit: number = 5;
    @Output() changePage = new EventEmitter<number>();
    pages: number[] = [];

    ngOnInit(): void {
        const pagesCount = Math.ceil(this.total / this.limit);
        console.log(pagesCount)
    }

    createRangeOfPages(start: number, end: number): number[] {
        return [...Array(end).keys()].map((el) => el + start);
    }
}
