import { CommonModule } from '@angular/common';
import { Component, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { CoursePipe } from '../../services/course.pipe';
import { CourseService } from '../../services/course.service';
import { SubjectsService } from '../../services/subjects.service';
import { Course } from '../../models/course';
import { compare, SortEvent, SortingDirective } from '../../services/sorting.directive';
import { FormsModule } from '@angular/forms';
import { SubjectsPipe } from '../../services/subjects.pipe';
import { MatPaginatorModule, PageEvent} from '@angular/material/paginator';

@Component({
    selector: 'app-courses',
    standalone: true,
    imports: [CommonModule, SortingDirective, FormsModule, CoursePipe, SubjectsPipe, MatPaginatorModule],
    templateUrl: './courses.component.html',
    styleUrl: './courses.component.scss'
})
export class CoursesComponent {
    //Variables
    originalCourseList: Course[] = [];
    courseList: Course[] = [];
    subjectsList: string[] = [];
    filter: string = "";
    subjectFilter: string = "";
    totalItems: number = 0;
    pageSize: number = 10;
    currentPage: number = 1;
    items = this.getData(this.currentPage, this.pageSize);

    @ViewChildren(SortingDirective)
    headers!: QueryList<SortingDirective>;
   

    constructor(private courseService: CourseService, private subjectsService: SubjectsService) { }

    ngOnInit() {
        this.courseService.getCourses().subscribe(data => {
            this.originalCourseList = data;
            this.courseList = this.originalCourseList.slice(0, 10);

            this.totalItems = data.length;
        })

        this.subjectsList = this.subjectsService.getSubjects();
    }

    onSort({ column, direction }: SortEvent) {
        //Resetting other headers.
        this.headers.forEach((header) => {
            if (header.sortable !== column) {
                header.direction = "";
            }
        })

        //Sorting courses.
        if (direction === "" || column === "") {
            this.courseList = this.originalCourseList;
        } else {
            this.courseList = [...this.originalCourseList].sort((a, b) => {
                const res = compare(a[column], b[column]);
                return direction === "asc" ? res : -res;
            });
        }
    }

    pageChanged(event: PageEvent) {
        this.currentPage = event.pageIndex;
        this.items = this.getData(this.currentPage, this.pageSize);
    }

    getData(page: number, size: number) {
        let tempList: Course[] = [];
        let start: number = page * size;
        let end: number = start + size;

        tempList = this.originalCourseList.slice(start, end)

        this.courseList = tempList;
    }
}