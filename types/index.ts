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
  graceMarks: boolean;
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

interface StudentProfile {
  name: string;
  rollNumber: string;
  collegeCode: string;
  fatherName: string;
  CGPA: string;
  backlogs: string;
  credits: string;
}

interface SemesterRecord {
  semester: string;
  semesterSGPA: string;
  semesterCredits: string;
  semesterGrades: string;
  backlogs: number;
  failed: boolean;
}

interface CreditContrastReport {
  studentProfiles: StudentProfile[];
  semesters: SemesterRecord[][];
}
interface Result {
  title: string;
  date: string;
  link: string;
  releaseDate: string;
}

interface NotificationFormProps {
  handleSearch: (event: any) => void;
  handleYearChange: (event: any) => void;
  handleDegreeChange: (event: any) => void;
  handleRegulationChange: (event: any) => void;
}

interface Params {
  title: string;
  year: string;
  degree: string;
  regulation: string;
  page: number;
}

interface notificationResultsProps {
  results: Result[];
  incrementPage: () => void;
}
