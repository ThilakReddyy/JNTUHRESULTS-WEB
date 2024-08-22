interface JobDetailsProps {
  jobs: {
    title: string;
    company: string;
    link: string;
    locations: string[];
    qualifications: string[];

    minqualifications: string[];
    preferredqualifications: string[];
    experience: number;
    responsibilities: string[];
    about: string[];
  }[];
  internships: {
    title: string;
    company: string;
    link: string;
    job_id: string;
    posted_date: string;
    locations: string[];
    qualifications: string[];
    minqualifications: string[];
    preferredqualifications: string[];
    experience: number;
    responsibilities: string[];
    about: string[];
    experience_word: string;
  }[];
}

export const jobDetails: JobDetailsProps = {
  jobs: [
    {
      title: "2024 Software Engineer I: India",
      company: "Uber",
      locations: ["Bangalore, Karnataka, India"],
      experience: 0,
      about: [
        "We’re changing the way people think about transportation. Not that long ago we were just an app to request premium black cars in a few metropolitan areas. Now we’re a part of the logistical fabric of more than 600 cities around the world. Whether it’s a ride or a sandwich, we use technology to give people what they want, when they want it.",
        "For the people who drive with Uber, our app represents a flexible new way to earn money. For cities, we help strengthen local economies, improve access to transportation, and make streets safer.",
        "And that’s just what we’re doing today. We’re thinking about the future, too. With teams working on self-driving cars and flying vehicles, we’re in for the long haul. We’re reimagining how people and things move from one place to the next.",
        "We're bringing Uber to every major city in the world. We need your skills and passion to help make it happen! Be sure to check out the Uber Engineering Blog to learn more about the team.",
        "Uber is an equal opportunity employer and enthusiastically encourages people from a wide variety of backgrounds and experiences to apply. We don’t discriminate on the basis of race, color, religion, sex (including pregnancy), gender, national origin, citizenship, age, mental or physical disability, veteran status, marital status, sexual orientation or any other basis prohibited by law.",
      ],
      responsibilities: [
        "As a Software engineer, you'll have a direct impact on the customer experience for both riders and drivers. Do you like our service and want to bring them to the next level? Do you have a beef with our app and want to fix it? Then you should apply to join our team. We are ambitious, engaged and excited about disrupting the transportation industry across the world. Not just another social web app: we are moving real assets and real people around their cities. Outside of your work, you will  build meaningful relationships with other Interns and Uber mentors through a variety of summer activities.",
        "If you meet these criteria, we welcome you to apply.",
      ],
      qualifications: [
        "Actively pursuing a B.Tech, Integrated Dual Degree, M.Tech, MSc (anticipated graduation in 2024) in Computer Science, Electronics Eng, Electrical Engineering, Mechanical or Mathematical Sciences or related fields.",
        "Demonstrated software engineering experience through previous internships, work experience, coding competitions, and/or publications",
        "Programming experience one or more application or systems languages (Go, Python, Ruby, Java, C/C++, etc)",
        "Interest in  building tools/infrastructure",
        "A desire to be part of a team that delivers impactful results every day",
        "A commitment to writing understandable, maintainable, and reusable software",
        "An innate desire to deliver and a strong sense of accountability for your work",
        "Willingness to learn new languages and methodologies",
      ],
      minqualifications: [],
      preferredqualifications: [],
      link: "https://www.google.com/about/careers/applications/jobs/results/132262270928331462-software-engineer-fullstack-core",
    },
  ],
  internships: [
    {
      job_id: "85255437783311046",
      title: "Student Researcher, PhD, 2024",
      company: "Google",
      experience: 0,
      experience_word: "Intern & Apprentice",
      posted_date: "2024-08-10T02:08:35.310Z",
      link: "https://www.google.com/about/careers/applications/jobs/results/85255437783311046-student-researcher-phd-2024?target_level=INTERN_AND_APPRENTICE&location=India",
      locations: ["Bengaluru, Karnataka, India"],
      about: [
        "The Student Researcher Program’s primary objective is to foster academic collaborations with students through research at Google. Join us for a paid Student Researcher position that offers the opportunity to work directly with Google research scientists and engineers on research projects.",
        "The Student Researcher Program offers more opportunities for research students to work on critical research projects at Google in a less structured way. The program allows opportunities beyond the limitations of traditional internship program on aspects such as duration, time commitment, and working location (with options for on-site or remote). The topics student researchers work on tend to be open-ended and exploratory, and don't always have a clear deliverable like a traditional internship would.",
        "Google Research is building the next generation of intelligent systems for all Google products. To achieve this, we’re working on projects that utilize the latest computer science techniques developed by skilled software engineers and research scientists. Google Research teams collaborate with other teams across Google, maintaining the flexibility and versatility required to adapt projects, and focus that meets the demands of the business needs.",
        "Google Research is building the next generation of intelligent systems for all Google products. To achieve this, we’re working on projects that utilize the latest computer science techniques developed by skilled software engineers and research scientists. Google Research teams collaborate closely with other teams across Google, maintaining the flexibility and versatility required to adapt new projects and foci that meet the demands of the world's fast-paced business needs.",
      ],
      qualifications: [],
      responsibilities: [
        "Participate in research to develop solutions for real-world, large-scale problems and focus on computer vision research for building climate solutions.",
      ],
      preferredqualifications: [
        "Currently enrolled in a full-time degree program and returning to the program after completion of the internship.",
        "Experience as a researcher (e.g., internships, full-time, or at a lab).",
        "Experience with one or more general purpose programming languages (e.g., C/C++, Java, MATLAB, Go, Python, etc.).",
        "Ability to design and execute on research agendas.",
      ],
      minqualifications: [
        "Currently enrolled in a PhD or Master's program in Computer Science or a related technical field.",
        "Experience in one area of computer science (e.g., Computer Vision, Deep Learning, Neural Networks, Machine Learning, Data Science or Machine Intelligence/Artificial Intelligence).",
      ],
    },
  ],
};
