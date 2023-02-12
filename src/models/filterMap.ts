import { Task } from "./task";

export interface FilterMap {
    All: () => boolean; 
    Active: (task: Task) => boolean; 
    Compeleted: (task: Task) => boolean;
}