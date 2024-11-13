import { CommonModule } from '@angular/common';
import { Component, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { CoursePipe } from '../../services/course.pipe';
import { CourseService } from '../../services/course.service';
import { SubjectsService } from '../../services/subjects.service';
import { Course } from '../../models/course';
import { compare, SortEvent, SortingDirective } from '../../services/sorting.directive';
import { FormsModule } from '@angular/forms';
import { SubjectsPipe } from '../../services/subjects.pipe';
import { ScheduleService } from '../../services/schedule.service';

@Component({
    selector: 'app-courses',
    standalone: true,
    imports: [CommonModule, SortingDirective, FormsModule, CoursePipe, SubjectsPipe],
    templateUrl: './courses.component.html',
    styleUrl: './courses.component.scss'
})
export class CoursesComponent {
    //Variables
    originalCourseList: Course[] = [];
    courseList: Course[] = [];
    paginationList: Course[] = [];
    subjectsList: string[] = [];
    filter: string = "";
    subjectFilter: string = "";
    coursesTotal: number = 0;
    filteredTotal: number = 0;
    courseAdded: string = "";

    @ViewChildren(SortingDirective)
    headers!: QueryList<SortingDirective>;


    constructor(private courseService: CourseService, private subjectsService: SubjectsService, private scheduleService: ScheduleService) { }

    ngOnInit() {
       this.courseService.getCourses().subscribe(data => {
            this.originalCourseList = data;
            this.courseList = this.originalCourseList;
            this.coursesTotal = this.courseList.length;
        })

        this.subjectsList = this.subjectsService.getSubjects();

         /*this.originalCourseList = this.courseService.getLocalCourses();
        this.courseList = this.originalCourseList;
        this.coursesTotal = this.courseList.length;

        this.subjectsList = this.subjectsService.getLocalSubjects();*/
    }

    getData(page: number, size: number) {
        let tempList: Course[] = [];
        let start: number = page * size;
        let end: number = start + size;
        tempList = this.originalCourseList.slice(start, end)
        this.courseList = tempList;
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

    addCourse(course: Course): void {
        let schedule = this.scheduleService.getSchedule("schedule");
        let loop: number = 0;
        let courseExists: boolean = false;

        schedule.forEach(element => {
            if (element.courseCode === course.courseCode) {
                //If the course are the same, don't add it.
                this.courseAdded = `Kursen "${course.courseName}" finns redan i ditt schema.`;
                courseExists = true;
                loop = schedule.length;
            }

            //Increase loop-counter.
            loop++;
        });

        //When forEach-loop is done run this.
        if (loop === schedule.length) {

            //If course doesn't exist already, add it.            
            if (!courseExists) {
                this.scheduleService.addCourseToSchedule(course);
                this.courseAdded = `Kursen "${course.courseName}" har lagts till i schemat.`;
            }
        }
    }
}