import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DetailService, Student } from './detailservice';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './details.html',
  styleUrls: ['./details.css']
})
export class DetailsComponent implements OnInit {
  students: Student[] = [];
  searchValue = '';
  sortBy: keyof Student | '' = '';
  sortOrder: 'asc' | 'desc' = 'asc';
  selectedClass = '';
  classList: string[] = [];

  constructor(private detailService: DetailService) { }

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData(
    search: string = '',
    sortBy: string = '',
    order: string = 'asc',
    filterClass: string = ''
  ) {
    this.detailService.getStudents(search, sortBy, order).subscribe({
      next: (data) => {
        // build class list dynamically
        this.classList = [...new Set(data.map((s) => s.class))];

        // filter by class if selected
        this.students = filterClass
          ? data.filter((s) => s.class === filterClass)
          : data;
      },
      error: (err) => console.error('❌ Error:', err),
    });
  }

  onSearch() {
    this.fetchData(
      this.searchValue,
      this.sortBy,
      this.sortOrder,
      this.selectedClass
    );
  }

  onFilter() {
    this.fetchData(
      this.searchValue,
      this.sortBy,
      this.sortOrder,
      this.selectedClass
    );
  }

  onSort(column: keyof Student) {
    if (this.sortBy === column) {
      this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortBy = column;
      this.sortOrder = 'asc';
    }
    this.fetchData(
      this.searchValue,
      this.sortBy,
      this.sortOrder,
      this.selectedClass
    );
  }
  
  getSortIcon(column: keyof Student): string {
    if (this.sortBy !== column) return '↕';  // Neutral (no sorting yet)
    return this.sortOrder === 'asc' ? '▲' : '▼';
  }

}
