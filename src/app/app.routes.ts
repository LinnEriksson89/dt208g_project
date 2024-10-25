import { Routes } from '@angular/router';
import { StartComponent } from './views/start/start.component';
import { AboutComponent } from './views/about/about.component';
import { CoursesComponent } from './views/courses/courses.component';
import { ScheduleComponent } from './views/schedule/schedule.component';
import { NotFoundComponent } from './views/not-found/not-found.component';

export const routes: Routes = [
    { path: "index", title: "Start", component: StartComponent },
    { path: "", redirectTo: "index", pathMatch: "full" },
    { path: "about", title: "Om oss", component: AboutComponent },
    { path: "courses", title: "Kurser", component: CoursesComponent },
    { path: "schedule", title: "Ramschema", component: ScheduleComponent },
    { path: "**", title: "404", component: NotFoundComponent }
];
