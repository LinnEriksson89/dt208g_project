import { Pipe, PipeTransform } from "@angular/core";
import { Course } from "../models/course";

@Pipe({
    name: "subjects",
    standalone: true
})

export class SubjectsPipe implements PipeTransform {
    transform(value: Course[], subjectFilter: string): Course[] {
        if(!subjectFilter || subjectFilter.length === 0) {
            return value;
        }

        if(value.length === 0) {
            return value;
        }

        return value.filter((value: Course) => {
            const subjectFound = value.subject.toLowerCase().indexOf(subjectFilter.toLowerCase()) !== -1;
            
            if(subjectFound) {
                return value;
            } else {
                return "";
            }
        
        })
        
    }
}