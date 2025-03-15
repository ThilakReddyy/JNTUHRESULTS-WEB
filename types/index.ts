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

interface SemesterWiseCredits {
  [semester: string]: number;
}

interface AcademicYear {
  semesterWiseCredits: SemesterWiseCredits;
  creditsObtained: number;
  totalCredits: number;
}

interface StudentCredits {
  academicYears: AcademicYear[];
  totalCredits: number;
  totalObtainedCredits: number;
  totalRequiredCredits: number;
}

interface ResultDetailsProps {
  details: Record<string, any>;
}
interface AcademicResultProps {
  result: Record<string, any>;
  academic: boolean;
}

interface AcademicResulProps {
  details: Record<string, any>;
  results: Record<string, any>;
}
