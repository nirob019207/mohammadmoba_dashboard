export interface User {
  id: number;
  first_name: string;
  last_name: string;
  date_of_birth: string;
  gender: string;
  nationality: string;
  contact_number: string;
  email: string;
  address: string;
  nid_number: string;
  program: string;
  bachelor_institution: string;
  degree_earned: string;
  graduation_year: number;
  gpa: number;
  job_title: string;
  years_experience: number;
  responsibilities: string;
  passport_path: string;
  nid_path: string;
  application_status: string;
  created_at: string;
  updated_at: string;
}

export type Batch = {
  id: number;
  title: string;
  subtitle: string;
  batch_image: string;
  created_at: string;
  updated_at: string;
};

export interface Course {
  id: number;
  name: string;
  description: string;
  course_image: string;
  professor_id: number;
  status: string;
  total_materials: number;
  created_at: string;
  updated_at: string;
}

export type Student = {
  id: number;
  profile_picture: string;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  address: string;
  postal_code: string;
  employee_id: string;
  blood_group: string;
  gender: string;
  user_status: string;
  description: string;
  created_at: string;
  updated_at: string;
};
export type Professor = {
  id: number;
  user_id: number;
  first_name: string;
  last_name: string;
  email_address: string;
  phone_number: string;
  designation: string;
  address: string;
  postal_code: string;
  employee_id: string;
  blood_group: string;
  gender: string;
  user_status: string;
  description: string;
  profile_picture: string | null;
  created_at: string; // ISO 8601 string format
  updated_at: string; // ISO 8601 string format
};

export type Result = {
  id: number;
  profile_picture: string | null;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  address: string;
  postal_code: string | null;
  student_id: string;
  blood_group: string | null;
  gender: string;
  user_status: string;
  description: string;
  batch_id: number;
  topic: string | null;
  course_id: string | null;
  created_at: string;
  updated_at: string;
  user_id: number;
  results: any[];
};

export type Material = {
  id: number;
  batch_id: number;
  course_id: number;
  professor_id: number;
  title: string;
  subtitle: string;
  date: string;
  total_time: string;
  description: string;
  video_path: string | null;
  assignment_path: string | null;
  submited_assignment_path: string | null;
  marks: string;
  created_at: string;
  updated_at: string;
  message: string;
  student_id: number;
  courses: Course[];
  first_name: string;
  last_name: string;
  email_address: string;
  phone_number: string;
  designation: string;
  name: string;
  course_image: string;
  status: string;
  materials: Material[];
  professor: Professor;
};
