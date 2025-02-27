import { Batch } from "./interface";

export interface TProfessorDashboard {
  batches: Batch[];
  total_batches: number;
  total_students: number;
  total_materials: number;
  total_courses: number;
}
