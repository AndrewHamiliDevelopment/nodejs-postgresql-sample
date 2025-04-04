export interface Paginated<T> {
    data: T[],
    totalItems: number;
    page: number;
    limit: number;
}