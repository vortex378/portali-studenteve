export type UserRole = "guest" | "admin" | "student" | "unknown";

export type ExamSeason = "Sezoni Dimëror" | "Sezoni Veror";

export type ExamStatus = "Kaluar" | "Nuk ka kaluar";

export interface Branch {
  id: string;
  code: string;
  name: string;
  created_at: string;
}

export interface Student {
  id: string;
  user_id: string;
  first_name: string;
  last_name: string;
  birth_date: string;
  id_number: string;
  academic_year: number;
  age: number;
  branch_id: string | null;
  email: string;
  created_at: string;
}

export interface Exam {
  id: string;
  student_id: string;
  exam_name: string;
  academic_year: number;
  season: ExamSeason;
  status: ExamStatus;
  created_at: string;
}

export interface AdminUser {
  id: string;
  user_id: string;
  email: string;
  created_at: string;
}

export interface Database {
  public: {
    Tables: {
      branches: {
        Row: Branch;
        Insert: Omit<Branch, "id" | "created_at"> & {
          id?: string;
          created_at?: string;
        };
        Update: Partial<Omit<Branch, "id">>;
      };
      students: {
        Row: Student;
        Insert: Omit<Student, "id" | "created_at"> & {
          id?: string;
          created_at?: string;
        };
        Update: Partial<Omit<Student, "id">>;
      };
      exams: {
        Row: Exam;
        Insert: Omit<Exam, "id" | "created_at"> & {
          id?: string;
          created_at?: string;
        };
        Update: Partial<Omit<Exam, "id">>;
      };
      admin_users: {
        Row: AdminUser;
        Insert: Omit<AdminUser, "id" | "created_at"> & {
          id?: string;
          created_at?: string;
        };
        Update: Partial<Omit<AdminUser, "id">>;
      };
    };
  };
}
