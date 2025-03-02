type Subject = {
  subjectCode: string;
  subjectName: string;
  internalMarks: number;
  externalMarks: number;
  totalMarks: number;
  grades: string;
  credits: number;
};

type Exam = {
  examCode: string;
  rcrv: boolean;
  subjects: Subject[];
};

type Semester = {
  semester: string;
  exams: Exam[];
};

type StudentResults = Semester[];
