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

export interface TProfessor {
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
  created_at: string;
  updated_at: string;
}

export interface Material {
  // Define material properties here if applicable, currently empty in JSON data
}

export interface ProfessorData {
  professor: TProfessor;
  total_students: number;
  total_materials: number;
  materials: Material[];
}
