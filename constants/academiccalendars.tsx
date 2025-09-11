// Define the type for a single academic calendar entry
export interface CalendarEntry {
  [key: string]: string;
}

// Define the type for the year-wise academic calendar
export interface AcademicYearDetails {
  [key: string]: CalendarEntry;
}

// Define the type for the degree-wise academic calendar
export interface DegreeDetails {
  [key: string]: AcademicYearDetails;
}

// Define the type for the overall academic calendar
export interface AcademicCalendars {
  [key: string]: DegreeDetails;
}

// Example usage with the provided data
export const academicCalendars: AcademicCalendars = {
  "2025-2026": {
    "B.Tech": {
      "1st": {
        "Academic Calender of B.Tech. I YEAR I & II SEMESTERS":
          "https://jntuh.ac.in/uploads/calendars/B.Tech_._I_YEAR_I_II_SEMESTERS_1.pdf",
      },
      "2nd": {
        "Academic Calender of B.Tech.II YEAR I & II SEMESTERS":
          "https://jntuh.ac.in/uploads/calendars/B._Tech_II_YEAR_I_II_SEMESTERS_.pdf",
      },
      "3rd": {
        "Academic Calender of B.Tech.III YEAR I & II SEMESTERS":
          "https://jntuh.ac.in/uploads/calendars/B._Tech_III_YEAR_I_II_SEMESTERS_.pdf",
      },
      "4th": {
        "Academic Calender of B.Tech.IV YEAR I & II SEMESTERS":
          "https://jntuh.ac.in/uploads/calendars/B._Tech_IV_YEAR_I_II_SEMESTERS_1.pdf",
      },
    },
  },
  "2024-2025": {
    "B.Tech": {
      "1st": {
        "Academic Calender of B.Tech. I YEAR I & II SEMESTERS":
          "https://jntuh.ac.in/uploads/calendars/B.Tech_._I_YEAR_I_II_SEMESTERS_.pdf",
      },
      "2nd": {
        "Academic Calender of B.Tech.II YEAR I & II SEMESTERS":
          "https://jntuh.ac.in/uploads/calendars/20240802094745683.pdf",
      },
      "3rd": {
        "Academic Calender of B.Tech.III YEAR I & II SEMESTERS":
          "https://jntuh.ac.in/uploads/calendars/B._Tech_._III_YEAR_I_II_SEMESTERS_.pdf",
      },
      "4th": {
        "Academic Calender of B.Tech.IV YEAR I & II SEMESTERS":
          "https://jntuh.ac.in/uploads/calendars/B._Tech_.B_._Pharm_._IV_YEAR_I_II_SEMESTERS_.pdf",
      },
      //
    },
    "B.Pharmacy": {
      "4th": {
        "Academic Calender of B.Pharmacy.IV YEAR I & II SEMESTERS":
          "https://jntuh.ac.in/uploads/calendars/B._Tech_.B_._Pharm_._IV_YEAR_I_II_SEMESTERS_.pdf",
      },
    },
  },
  "2023-2024": {
    "B.Tech": {
      "1st": {
        "Academic Calender of B.Tech.I YEAR I & II SEMESTERS":
          "https://jntuh.ac.in/uploads/bulletins/AcademicCalenderofB.Tech.IYEARI_IISEMESTERS.pdf",
      },
      "2nd": {
        "Academic Calender of B.Tech.II YEAR I & II SEMESTERS":
          "https://jntuh.ac.in/uploads/bulletins/B.TechIIYEARIIISEMESTERS.pdf",
      },
      "3rd": {
        "Academic Calender of B.Tech.III YEAR I & II SEMESTERS":
          "https://jntuh.ac.in/uploads/bulletins/B.Tech.B.Pharm.IIIYEARIIISEMESTERS.pdf",
      },
      "4th": {
        "Revised Academic Calender of B.Tech.IV YEAR I & II SEMESTERS":
          "https://jntuh.ac.in/uploads/calendars/Revised_B._Tech_.B_._Pharm_._IV_YEAR_I_II_Semesters_Academic_Calendar_for_2023-24_.pdf",
      },
    },
    "B.Pharmacy": {
      "1st": {
        "Academic Calender of B. Pharm. I YEAR I & II SEMESTERS":
          "https://jntuh.ac.in/uploads/bulletins/B.Pharm.IYEARIIISEMESTERS.pdf",
      },
      "2nd": {
        "Academic Calender of B.Pharm. II YEAR I & II SEMESTERS":
          "https://jntuh.ac.in/uploads/bulletins/B.TechIIYEARIIISEMESTERS.pdf",
      },
      "3rd": {
        "Academic Calender of B.Pharm. III YEAR I & II SEMESTERS":
          "https://jntuh.ac.in/uploads/bulletins/B.Tech.B.Pharm.IIIYEARIIISEMESTERS.pdf",
      },
      "4th": {
        "Revised Academic Calender of B.Pharm. IV YEAR I & II SEMESTERS":
          "https://jntuh.ac.in/uploads/calendars/Revised_B._Tech_.B_._Pharm_._IV_YEAR_I_II_Semesters_Academic_Calendar_for_2023-24_.pdf",
      },
    },
    "M. Tech": {
      "1st": {
        "Academic Calender of M. Tech. I YEAR I & II SEMESTERS":
          "https://jntuh.ac.in/uploads/calendars/M._Tech_._I_YEAR_I_II_SEMESTERS_.pdf",
      },
    },
  },
};
