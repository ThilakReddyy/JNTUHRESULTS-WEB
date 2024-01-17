interface JobDetailsProps {
  jobs: [];
  internships: {
    title: string;
    company: string;
    link: string;
    locations: string[];
    minqualifications: string[];
    preferredqualifications: string[];
    about: string;
  }[];
}

export const jobDetails: JobDetailsProps = {
  jobs: [],
  internships: [
    {
      title:
        "Software Student Training in Engineering Program (STEP) Intern, 2024",
      company: "Google",
      link: "https://www.google.com/about/careers/applications/jobs/results/99460232238768838-software-student-training-in-engineering-program-step-intern-2024",
      locations: [
        "Hyderabad, Telangana",
        "Bangalore, Karnataka",
        "Pune, Maharasthra",
      ],
      minqualifications: [
        "Currently enrolled in a Bachelor's program, majoring or intending to major in Computer Science or related technical field.",
        "Experience in one or more general purpose programming languages.",
        "Ability to communicate in English fluently.",
      ],
      preferredqualifications: [
        "Currently enrolled in a full time degree program and returning to the program after the completion of the internship",
        "Excellent programming skills (C++, Java, Python).",
        "Ability to complete a full-time, 10-12 week internship between May and August 2024 (exact program dates will be provided at a later point in the process)",
      ],
      about: `Google is invested in increasing future computer scientists and software developers, particularly those who are historically underrepresented in the field. Many aspiring computer scientists could benefit from a program that bridges the gap between academic study and a professional internship. Google aims to inspire these underrepresented students to continue in the field with such a program.

With this in mind, Google is pleased to announce the 2024 STEP internship in India. It will be open to under-represented groups who will be in the second year of their university studies by the Summer of 2024 and are studying Computer Science or a related subject.

This program includes three main components: a software project, skills-based training, and professional development. This program is open to all qualified University students and is committed to addressing diversity in our company and in the technology industry. Students who are a member of a group that is historically underrepresented in the technology industry are encouraged to apply.

This summer trainee program includes a development project that you will work on with a team of Googlers and other STEP Interns. You will enhance your coding skills, and gain exposure to tools and programming languages. You will attend ongoing technical talks by executive Googlers, match with a Google Engineer, to guide you through your summer experience, and engage in social activities, community building, and networking.

Google is and always will be an engineering company. We hire people with a broad set of technical skills who are ready to address some of technology's greatest challenges and make an impact on millions, if not billions, of users. At Google, engineers not only revolutionize search, they routinely work on massive scalability and storage solutions, large-scale applications and entirely new platforms for developers around the world. From Google Ads to Chrome, Android to YouTube, Social to Local, Google engineers are changing the world one technological achievement after another.`,
    },
  ],
};
