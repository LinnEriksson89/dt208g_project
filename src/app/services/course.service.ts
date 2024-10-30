import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Course } from '../models/course';

@Injectable({
    providedIn: 'root'
})
export class CourseService {
    //URL for data, or well, path but whatever.
    url: string = "./public/data/temp.json";

    //Constructor to call httpclient
    constructor(private http: HttpClient) { }

    //Function to get courses.
    getCourses(): Observable<Course[]> {
        return this.http.get<Course[]>(this.url);
    }
}
