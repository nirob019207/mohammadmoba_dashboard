import { Batch } from "./interface";

export interface TProfessorDashboard {
  batches: Batch[];
  total_batches: number;
  total_students: number;
  total_materials: number;
  total_courses: number;
}

export type Material = {
  id: number;
  batch_id: number;
  course_id: number;
  professor_id: number;
  title: string;
  subtitle: string;
  date: string; // ISO date format (YYYY-MM-DD)
  total_time: string; // e.g., "5 Hours"
  description: string;
  video_path: string | null;
  assignment_path: string | null;
  submited_assignment_path: string | null;
  marks: string;
  created_at: string; // ISO 8601 format timestamp
  updated_at: string; // ISO 8601 format timestamp
};
