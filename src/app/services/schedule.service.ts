import { Injectable } from '@angular/core';
import { Course } from '../models/course';

@Injectable({
    providedIn: 'root'
})
export class ScheduleService {


    constructor() { }


    getSchedule(key: string): Course[] {

        let scheduleString = localStorage.getItem(key);

        //Check that string isn't null to avoid error.
        if (scheduleString) {

            let schedule: Course[] = JSON.parse(scheduleString);
            return schedule;
        } else {
            //If the item doesn't exist, create and return the empty item.
            localStorage.setItem(key, "[]");

            let schedule: Course[] = JSON.parse(key);
            return schedule;
        }
    }

    addCourseToSchedule(course:Course):void {
        //Get old schedule as string.
        let scheduleString = localStorage.getItem("schedule");
        
        //If old schedule exists.
        if(scheduleString) {
            //parse as JSON.
            let schedule: Course[] = JSON.parse(scheduleString);

            //Add the new course
            schedule.push(course);

            //Turn array into string.
            let value: string = JSON.stringify(schedule);

            //Save to localStorage.
            localStorage.setItem("schedule", value);
        }  else {
            //If the item doesn't exist, just create and set item.
            let schedule:Course[] = [];

            //Push item to array.
            schedule.push(course);
            
            //Turn array into string.
            let value: string = JSON.stringify(schedule);

            //Save to localStorage.
            localStorage.setItem("schedule", value);
        }
    }

    removeCourseFromSchedule(course:Course):void {
        //Get old schedule as string.
        let scheduleString = localStorage.getItem("schedule");
        
        //If old schedule exists.
        if(scheduleString) {
            let newSchedule: Course[] = [];

            //parse as JSON.
            let schedule: Course[] = JSON.parse(scheduleString);

            //Use a foreach-loop to make a new array wich doesn't have the course in it.
            schedule.forEach(element => {
                if(element.courseCode === course.courseCode) {
                    //If the coursecode (unique ID) is the same in the old schedule as the one we're removing, we're doing nothing.
                } else {
                    //If it's not the same, it's added to the new schedule.
                    newSchedule.push(element);
                }
            });

            //Turn array into string.
            let value: string = JSON.stringify(newSchedule);

            //Save to localStorage.
            localStorage.setItem("schedule", value);
        }  else {
            //If the item doesn't exist, just create and set item.
            let schedule:Course[] = [];
            
            //Turn array into string.
            let value: string = JSON.stringify(schedule);

            //Save to localStorage.
            localStorage.setItem("schedule", value);
        }
    }
}