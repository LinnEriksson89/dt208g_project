import { Pipe, PipeTransform } from "@angular/core";
import { Course } from "../models/course";

@Pipe({
    name: "course",
    standalone: true
})

export class CoursePipe implements PipeTransform {
    transform(values: Course[], filter: string): Course[] {
        if (!filter || filter.length === 0) {
            return values;
        }

        if (values.length === 0) {
            return values;
        }

        return values.filter((value: Course) => {
            const courseCodeFound = value.courseCode.toLowerCase().indexOf(filter.toLowerCase()) !== -1;
            const courseNameFound = value.courseName.toLowerCase().indexOf(filter.toLowerCase()) !== -1;

            if (courseCodeFound || courseNameFound) {
                return value;
            } else {
                return "";
            }
        });
    }
}