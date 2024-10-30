import { MatPaginatorIntl } from "@angular/material/paginator";

export function CustomPaginator() {
    const CustomPaginatorIntl = new MatPaginatorIntl();
    CustomPaginatorIntl.itemsPerPageLabel = 'Antal per sida:';
    return CustomPaginatorIntl;
}