import { Injectable } from '@angular/core';
import { CourseService } from './course.service';

@Injectable({
    providedIn: 'root'
})
export class SubjectsService {
    //Variables
    subjectList: string[] = [];

    constructor(private courseService: CourseService) { }

    getSubjects(): string[] {
        this.courseService.getCourses().subscribe(data => {
            data.forEach(course => {
                if (this.subjectList.includes(course.subject)) {
                    //If the subject is already include, do nothing.
                } else{
                    //If the subject is not included in the array, include it in the array.
                    this.subjectList.push(course.subject);
                }
            });
        })
        return this.subjectList.sort();
    }

    getLocalSubjects(): string[] {

        let courseList = this.courseService.getLocalCourses();

        courseList.forEach(course => {
            if (this.subjectList.includes(course.subject)) {
                //If the subject is already include, do nothing.
            } else{
                //If the subject is not included in the array, include it in the array.
                this.subjectList.push(course.subject);
            }
        });

        //Return the subjectList in a sorted version. A-Z
        return this.subjectList.sort();

    }
}
