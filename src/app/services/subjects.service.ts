import { Injectable } from '@angular/core';
import { CourseService } from './course.service';

@Injectable({
    providedIn: 'root'
})
export class SubjectsService {
    //Variables
    subjectList: string[] = [];
    subject: string = "";

    constructor(private courseService: CourseService) { }

    getSubjects(): string[] {
        this.courseService.getCourses().subscribe(data => {
            data.forEach(course => {

                if (course.subject === this.subject) {
                    //If the subject is the same, do nothing.
                } else {
                    //If they are not the same, save the subject and push it to the subjectList.
                    //Here there should be some sort of check that the course doesn't already exists but there isn't.
                    this.subject = course.subject;
                    this.subjectList.push(course.subject);
                }
            });
        })
        return this.subjectList;
    }
}
