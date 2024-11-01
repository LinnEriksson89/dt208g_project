import { Injectable } from '@angular/core';
import { CourseService } from './course.service';

@Injectable({
    providedIn: 'root'
})
export class SubjectsService {
    //Variables
    subjectList: string[] = [];
    doubleCheck: string[] = [];
    subject: string = "";

    constructor(private courseService: CourseService) { }

    getSubjects(): string[] {
        this.courseService.getCourses().subscribe(data => {
            data.forEach(course => {

                if (course.subject === this.subject) {
                    //If the subject is the same, do nothing.
                } else if (this.doubleCheck.length === 0) {
                    //The first time everything is ran the doublecheckarray will be empty and everything should be added here.
                    this.subject = course.subject;
                    this.subjectList.push(course.subject);
                    this.doubleCheck.push(course.subject);
                } else {
                    //If they are not the same, double check agains other array.
                    for (let i = 0; i < this.doubleCheck.length; i++) {
                        const element = this.doubleCheck[i];

                        if (element === course.subject) {
                            //If the element is the same as the subject we're trying to add the subject is already added and the loop should break.
                            i = this.doubleCheck.length;
                        } else {
                            //If the subject does not exist in the double-check-array it can be pushed to the main array and the doublecheck-array.
                            this.subject = course.subject;
                            this.subjectList.push(course.subject);
                            this.doubleCheck.push(course.subject);
                        }
                    }
                }
            });
        })
        return this.subjectList;
    }
}
