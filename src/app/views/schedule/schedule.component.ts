import { Component } from '@angular/core';
import { Course } from '../../models/course';
import { Exam } from '../../models/exam';
import { ScheduleService } from '../../services/schedule.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-schedule',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './schedule.component.html',
    styleUrl: './schedule.component.scss'
})
export class ScheduleComponent {
    //Variables
    schedule: Course[] = [];
    scheduledPoints: number = 0;
    courseRemoved: string = "";
    examPoints: number = 120;
    exams: Exam[] = [
        { exam: "Högskoleexamen", points: 120 },
        { exam: "Kandidatexamen", points: 180 },
        { exam: "Magisterexamen", points: 240 },
        { exam: "Masterexamen", points: 300 }
    ]

    constructor(private scheduleService: ScheduleService) { }

    ngOnInit() {
        this.schedule = this.scheduleService.getSchedule("schedule");

        this.schedule.forEach(course => {
            this.scheduledPoints = course.points + this.scheduledPoints;
        });
    }

    removeCourse(course: Course): void {
        this.scheduleService.removeCourseFromSchedule(course);
        this.scheduledPoints = this.scheduledPoints - course.points;
        this.courseRemoved = `Kursen "${course.courseName}" har tagits bort.`;

        this.schedule = this.scheduleService.getSchedule("schedule");
    }
}
