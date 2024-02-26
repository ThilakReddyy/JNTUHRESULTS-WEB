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
      title: "IN-Technical Specialist",
      company: "Apple",
      locations: ["India"],
      experience: 0,
      about: [
        "Do you love how it feels to help others?  After customers purchase our products, you’re the one who helps them get more out of their new Apple technology. Your day in the Apple Store is filled with a range of focused support and service tasks. Whether you’re helping customers get started with the Mac or finding answers to their questions about other Apple devices, you’re ready to share knowledge and provide exceptional assistance. You gain satisfaction from bringing resolution and insight to each customer, elevating his or her relationship with Apple to the next level.",
        "Both full-time and part-time jobs are available.",
      ],
      responsibilities: [
        "As a Technical Specialist, you help new owners get started and current ones get quick, efficient support — developing strong, positive relationships with Apple. When a customer needs assistance, you quickly assess their situation. Sometimes you take care of customers with advice or a solution on the spot, using your knowledge of current Apple technology to help with iPod, iPhone and iPad devices. At other times, you refer customers to support team members who get them up and running again. You even provide personal training for new customers, helping them acquire the basic skills they need to get started on photo, video and music projects. The entire store team benefits from your commitment to providing the best care for customers. By helping Apple maintain strong relationships with customers, you are instrumental to our success.",
        "Discover even more benefits of doing what you love. Apple’s most important resource, our soul, is our people. Apple benefits help further the well-being of our employees and their families in meaningful ways. No matter where you work at Apple, you can take advantage of our health and wellness resources and time-away programmes. We’re proud to provide stock grants to employees at all levels of the company, and we also give employees the option to buy Apple stock at a discount — both offer everyone at Apple the chance to share in the company’s success. You’ll discover many more benefits of working at Apple, such as programmes that match your charitable contributions, reimburse you for continuing your education and give you special employee pricing on Apple product",
      ],
      qualifications: [],
      minqualifications: [
        "Ability to assess customers’ support needs when they arrive, then provide solutions or refer them to other team members",
        "Flexibility to regularly rotate through different technical specialities and skill sets",
        "Ability to thrive on change as products evolve",
        "Contribute to an inclusive environment through respecting each others’ differences and having the curiosity to learn.",
        "Demonstrate Apple’s values of inclusion and diversity in daily activities.",
      ],
      preferredqualifications: [
        "You have excellent time management skills and can make decisions quickly.",
        "You maintain composure and customer focus while troubleshooting and solving issues.",
        "You reassure customers when delivering product diagnoses and potential solutions.",
        "You’re fluent in the local language.",
      ],
      link: "https://jobs.apple.com/en-in/details/200314122/in-technical-specialist?team=APPST",
    },

    {
      title: "Software Engineer, Full-stack, Core",
      company: "Google",
      locations: ["Hyderabad, Telangana, India"],
      experience: 1,
      about: [
        "Google's software engineers develop the next-generation technologies that change how billions of users connect, explore, and interact with information and one another. Our products need to handle information at massive scale, and extend well beyond web search. We're looking for engineers who bring fresh ideas from all areas, including information retrieval, distributed computing, large-scale system design, networking and data storage, security, artificial intelligence, natural language processing, UI design and mobile; the list goes on and is growing every day. As a software engineer, you will work on a specific project critical to Googleâ€™s needs with opportunities to switch teams and projects as you and our fast-paced business grow and evolve. We need our engineers to be versatile, display leadership qualities and be enthusiastic to take on new problems across the full-stack as we continue to push technology forward.",
        "The Core team builds the technical foundation behind Googleâ€™s flagship products. We are owners and advocates for the underlying design elements, developer platforms, product components, and infrastructure at Google. These are the essential building blocks for excellent, safe, and coherent experiences for our users and drive the pace of innovation for every developer. We look across Googleâ€™s products to build central solutions, break down technical barriers and strengthen existing systems. As the Core team, we have a mandate and a unique opportunity to impact important technical decisions across the company.",
      ],
      responsibilities: [
        "Work on security products that are used by Googlers to keep Google secure.",
        "Design, implement, and land products that require working knowledge of back-ends, front-ends, and storage.",
        "Be part of the on-duty rotation and ensure systems remain running.",
        "Partner and collaborateÂ\xa0with other job functions (e.g., product managers, program managers, user experience, etc.) as well different sites spanning the globe.",
      ],
      qualifications: [],
      minqualifications: [
        "Bachelorâ€™s degree or equivalent practical experience.",
        "1 year of experience with software development in one or more programming languages (e.g., Python, C, C++, Java, JavaScript).",
      ],
      preferredqualifications: [
        "Master's degree or PhD in Computer Science or related technical field.",
        "Experience in Full Stack Software Development.",
        "Experience in common storage services (e.g. Spanner).",
        "Experience in developing security or privacy products.",
        "Experience in a Java server framework.",
        "Experience in Angular, TypeScript, or JavaScript front-end development.",
      ],
      link: "https://www.google.com/about/careers/applications/jobs/results/132262270928331462-software-engineer-fullstack-core",
    },
    {
      title: "Test Engineer, Google Distributed Cloud Hosted",
      company: "Google",
      locations: ["Bangalore, Karnataka, India"],
      experience: 1,
      about: [
        "At Google, our philosophy is build it, break it and then rebuild it better. That thinking is at the core of how we approach testing at Google. Unlike roles with similar names at the other companies, Test Engineers at Google aren't manual testers -- you write scripts to automate testing and create tools so developers can test their own code. As a Test Engineer, you navigate Google's massive codebase, identify weak spots and constantly design better and creative ways to break software and identify potential problems. You'll have a huge impact on the quality of Google's growing suite of products and services.",
        "Behind everything our users see online is the architecture built by the Technical Infrastructure team to keep it running. From developing and maintaining our data centers to building the next generation of Google platforms, we make Google's product portfolio possible. We're proud to be our engineers' engineers and love voiding warranties by taking things apart so we can rebuild them. We keep our networks up and running, ensuring our users have the best and fastest experience possible.",
      ],
      responsibilities: [
        "Work closely with developers, technical program managers, and technical leads to curate test plans and automated test scenarios, and enable our platformâ€™s testing effort.",
        "Develop frameworks and automation for running tests, collecting results, and triaging issues on the Google Distributed Cloud Hosted (GDCH) platform.",
        "Work with partner teams to evaluate testing requirements, come up with test plans, and implement test cases using Google frameworks to accelerate testing of the platform.",
        "Collaborate with other Engineers to deliver a high quality system.",
      ],
      qualifications: [],
      minqualifications: [
        "Bachelor's degree in Information Technology, Computer Science, Engineering, a related technical field, or equivalent practical experience.",
        "1 year of experience as a Developer, Testing Engineer, or Automation Engineer.",
      ],
      preferredqualifications: [
        "Experience working with Kubernetes or other Google Cloud technologies.",
        "Experience with object oriented programming languages (e.g., Python or Go).",
        "Experience with testing large-scale distributed systems.",
      ],
      link: "https://www.google.com/about/careers/applications/jobs/results/105245636535689926-test-engineer-google-distributed-cloud-hosted",
    },
    {
      title: "Video Streaming Specialist Engineer, gTech Professional Services",
      company: "Google",
      locations: ["Gurugram, Haryana, India"],
      experience: 3,
      about: [
        "The Google Technical Services (gTech) organization serves as the primary point of contact for our global Sales, Business Development, and Partnerships teams to support our sales organization across all products. We provide tools so that our sales teams can focus on generating business and leverage our strong relationships with Google's Technical teams to enable our business organization to do multi-solution selling, launch and support new products, and help engage our users.",
        "gTech Professional Services (gPS) is a team of solution-oriented trusted advisors supporting millions of users worldwide. Our consultative services take our deep technical and product expertise and combine it with our powerful understanding of our customerâ€™s needs and goals to solve their biggest business challenges allowing them to grow and get the most out of Google solutions.",
        "gPS Video Streaming Specialist (VSS) team is at the forefront of video innovation, paving the way for the future of TV. VSS are OTT streaming experts supporting Dynamic Ad Insertion (DAI) and ad serving for Googleâ€™s largest Video and Broadcaster partners. VSS team members interact directly with customers as well as Googleâ€™s Sales, Product and Engineering teams to support Googleâ€™s suite of video products.",
        "Google creates products and services that make the world a better place, and gTechâ€™s role is to help bring them to life. Our teams of trusted advisors support customers globally. Our solutions are rooted in our technical skill, product expertise, and a thorough understanding of our customersâ€™ complex needs. Whether the answer is a bespoke solution to solve a unique problem, or a new tool that can scale across Google, everything we do aims to ensure our customers benefit from the full potential of Google products.To learn more about gTech, check out our video.",
      ],
      responsibilities: [
        "Deliver innovative and scalable solutions to strategic video publishers. Manage local monitoring capabilities in Googleâ€™s video operations centers to enable troubleshooting on all devices/platforms.",
        "Identify, drive, and optimize business growth from partners and ad-networks by leveraging Google technologies. Manage tool development to automate/improve monitoring capabilities and reduce risk of customer impacting issues or outages.",
        "Provide 24/7 support for Googleâ€™s Dynamic Ad Insertion business as part of a global team (including covering some nights/weekends) to ensure prompt and proper resolution of customer impacting technical challenges.",
        "Improve product offerings by providing feedback on customer and serviceability needs to internal cross-functional teams including Product Management and Engineering.",
        "Provide internal and external stakeholders with appropriate, timely, and accurate customer and project status updates.",
      ],
      qualifications: [],
      minqualifications: [
        "Bachelor's degree in computer science, a related technical field, or equivalent practical experience.",
        "3 years of experience troubleshooting technical issues using Web technologies (XML, HTML5, JavaScript).",
        "3 years of experience with Google Ad Manager (GAM), business generation options for display and video, video related technologies and with scripting languages (Python, Bash, PHP).",
      ],
      preferredqualifications: [
        "Experience troubleshooting OTT streaming devices.",
        "Experience in one or both of the following: Java, C/C++.",
        "Experience supporting large broadcasters in live streaming or developer operations position.",
        "Experience in technical support environment, working directly with customers/clients.",
        "Knowledge of Google's Interactive Media Ads (IMAs) Software Development Kits (SDKs).",
        "Ability to understand technical concepts and communicate them to a non-technical audience.",
      ],
      link: "https://www.google.com/about/careers/applications/jobs/results/115346925323985606-video-streaming-specialist-engineer-gtech-professional-services",
    },
    {
      title: "Cloud Technical Solutions Engineer, Storage, Google Cloud",
      company: "Google",
      locations: ["Bangalore, Karnataka, India", "; Pune, Maharashtra, India"],
      experience: 0,
      about: [
        "The Google Cloud team helps companies, schools, and government seamlessly make the switch to Google products and supports them along the way. You listen to the customer and swiftly problem-solve technical issues to show how our products can make businesses more productive, collaborative, and innovative. You work closely with a cross-functional team of web developers and systems administrators, not to mention a variety of both regional and international customers. Your relationships with customers are crucial in helping Google grow its Cloud business and helping companies around the world innovate.",
        "As a Technical Solutions Engineer you will be a part of a global team that provides 24/7 support to help customers seamlessly make the switch to Google Cloud. When customers cannot resolve issues themselves, you will ensure that we have the necessary tools, processes, and needed technical knowledge to resolve the issue.",
        "You will troubleshoot technical problems for customers with a mix of debugging, networking, system administration, updating documentation, and when needed, coding/scripting. You will make our products easier to adopt and use by making improvements to the product, tools, processes, and documentation. You will help drive the success of Google Cloud by understanding and advocating for our customersâ€™ issues.",
        "This will include a need to sometimes work non-standard work hours or shifts (nights, weekends, and holidays).",
        "Google Cloud accelerates organizationsâ€™ ability to digitally transform their business with the best infrastructure, platform, industry solutions and expertise. We deliver enterprise-grade solutions that leverage Googleâ€™s cutting-edge technology â€“ all on the cleanest cloud in the industry. Customers in more than 200 countries and territories turn to Google Cloud as their trusted partner to enable growth and solve their most critical business problems.",
      ],
      responsibilities: [
        "Manage customer issues through effective diagnosis, resolution, or implementation of investigation tools to increase productivity for customers on Google Cloud Platform products.",
        "Develop an in-depth knowledge of Google's product technology and underlying architectures by troubleshooting, reproducing, determining the root cause for customer reported challenges, and building tools for faster diagnosis.",
        "Act as a consultant and subject matter expert for internal stakeholders in Engineering, Sales, and Customer organizations to resolve technical deployment obstacles and improve Google Cloud.",
        "Work closely with multiple Product and Engineering teams to find ways to improve supportability for products, and interact with our Site Reliability Engineering (SRE) teams to drive high-quality production.",
        "Work as part of a team of Engineers/Consultants that globally ensure 24-hour customer support. Work non-standard work hours or shifts, including weekends, as needed.",
      ],
      qualifications: [],
      minqualifications: [
        "Bachelor's degree in a technical field or equivalent practical experience in technical support, professional services, software development, or product operations management.",
        "Experience reading and debugging in Java, C, C++, .NET, Python, Shell, Perl, or JavaScript.",
        "Experience troubleshooting and advocating for customers' needs.",
      ],
      preferredqualifications: [
        "Experience with object storage systems (e.g. Google Cloud Storage or similar).",
        "Experience with network troubleshooting, including collecting and reading packet captures.",
        "Experience writing and executing SQL queries against large datasets and log files to troubleshoot technical issues and analyze usage patterns.",
        "Knowledge of Linux/Unix or Windows systems at a System/Network Administrator level, from Kernel to Shell and beyond, file systems, and client-server protocols.",
        "Knowledge of core data structures and concepts, including HTTP, web frameworks, and common web technologies.",
      ],
      link: "https://www.google.com/about/careers/applications/jobs/results/78554502547808966-cloud-technical-solutions-engineer-storage-google-cloud",
    },
    {
      title: "DFT Design Verification Engineer, Test Infrastructure",
      company: "Google",
      locations: ["Bangalore, Karnataka, India"],
      experience: 3,
      about: [
        "Our computational challenges are so big, complex and unique we can't just purchase off-the-shelf hardware, we've got to make it ourselves. Your team designs and builds the hardware, software and networking technologies that power all of Google's services. As a Hardware Engineer, you design and build the systems that are the heart of the world's largest and most powerful computing infrastructure. You develop from the lowest levels of circuit design to large system design and see those systems all the way through to high volume manufacturing. Your work has the potential to shape the machinery that goes into our cutting-edge data centers affecting millions of Google users.",
        "In this role, you will work closely with various teams within the design process with other engineers to deliver the design of the chip. You will collaborate with the Functional Verification team to develop Design for Testing (DFT) verification environments, drive DFT verification strategy, and ensure our DFT solutions are properly verified for all usage scenarios.",
        "Behind everything our users see online is the architecture built by the Technical Infrastructure team to keep it running. From developing and maintaining our data centers to building the next generation of Google platforms, we make Google's product portfolio possible. We're proud to be our engineers' engineers and love voiding warranties by taking things apart so we can rebuild them. We keep our networks up and running, ensuring our users have the best and fastest experience possible.",
      ],
      responsibilities: [
        "Deliver confidence in the correctness of the design for testability and debug features of the server scale CPU SoC.",
        "Integrate DFT verification into the overall ASIC design flow.",
        "Prepare silicon debug verification strategy, test plan, and readiness for tester.",
        "Participate in post-manufacturing silicon bring-up tasks.",
      ],
      qualifications: [],
      minqualifications: [
        "Bachelor's degree in Electrical Engineering, Computer Science, or equivalent practical experience.",
        "3 years of experience with DFT features (e.g., JTAG/MBIST) or functional infrastructure/global validation experience.",
        "Experience with verification methods (e.g. UVM), and experience with a scripting language (e.g., Python, Perl, TCL).",
        "Experience with SystemVerilog coding for design and verification, SoC development cycle.",
      ],
      preferredqualifications: [
        "Master's degree in Electrical Engineering.",
        "Experience in silicon bringup.",
      ],
      link: "https://www.google.com/about/careers/applications/jobs/results/86438860214411974-dft-design-verification-engineer-test-infrastructure",
    },
    {
      title: "Software Engineer II, Infrastructure, Core",
      company: "Google",
      locations: [
        "Bangalore, Karnataka, India",
        "; Hyderabad, Telangana, India",
      ],
      experience: 1,
      about: [
        "Google's software engineers develop the next-generation technologies that change how billions of users connect, explore, and interact with information and one another. Our products need to handle information at massive scale, and extend well beyond web search. We're looking for engineers who bring fresh ideas from all areas, including information retrieval, distributed computing, large-scale system design, networking and data storage, security, artificial intelligence, natural language processing, UI design and mobile; the list goes on and is growing every day. As a software engineer, you will work on a specific project critical to Googleâ€™s needs with opportunities to switch teams and projects as you and our fast-paced business grow and evolve. We need our engineers to be versatile, display leadership qualities and be enthusiastic to take on new problems across the full-stack as we continue to push technology forward.",
        "With your technical expertise you will manage project priorities, deadlines, and deliverables. You will design, develop, test, deploy, maintain, and enhance software solutions.\n",
        "The Core team builds the technical foundation behind Googleâ€™s flagship products. We are owners and advocates for the underlying design elements, developer platforms, product components, and infrastructure at Google. These are the essential building blocks for excellent, safe, and coherent experiences for our users and drive the pace of innovation for every developer. We look across Googleâ€™s products to build central solutions, break down technical barriers and strengthen existing systems. As the Core team, we have a mandate and a unique opportunity to impact important technical decisions across the company.",
      ],
      responsibilities: [
        "Write product or system development code.",
        "Participate in, or lead design reviews with peers and stakeholders to decide amongst available technologies.",
        "Review code developed by other developers and provide feedback to ensure best practices (e.g., style guidelines, checking code in, accuracy, testability, and efficiency).",
        "Contribute to existing documentation or educational content and adapt content based on product/program updates and user feedback.",
        "Triage product or system issues and debug/track/resolve by analyzing the sources of issues and the impact on hardware, network, or service operations and quality.",
      ],
      qualifications: [],
      minqualifications: [
        "Bachelorâ€™s degree or equivalent practical experience.",
        "1 year of experience with software development in one or more programming languages (e.g., Python, C, C++, Java, JavaScript).",
        "1 year of experience with data structures or algorithms.",
      ],
      preferredqualifications: [
        "Master's degree or PhD in Computer Science or related technical field.",
        "1 year of experience building and developing large-scale infrastructure, distributed systems or networks, and/or experience with compute technologies, storage, and/or hardware architecture. ",
        "Experience developing accessible technologies.",
      ],
      link: "https://www.google.com/about/careers/applications/jobs/results/96437907138454214-software-engineer-ii-infrastructure-core",
    },
    {
      title: "People Systems Analyst, People Operations",
      company: "Google",
      locations: [
        "Bangalore, Karnataka, India",
        "; Hyderabad, Telangana, India",
      ],
      experience: 3,
      about: [
        "Google's known for our innovative technologies, products and services -- and for the people behind them. Whether you are making our staffing systems more efficient, planning for our growth, building relationships on college campuses or cultivating the next generation of computer scientists, you have an eye on the staffing needs of Google and the broader hiring landscape. You are focused on cultivating outstanding candidates for Google's long-term hiring needs, and work across a cross-functional and international group of staffing teams. You are both scrappy and resourceful, creative and driven -- and excited to share the magic of working at Google.",
        "The People Systems and Solutions team pictures better processes and builds, operates, and improves upon them. As a People Systems Analyst, you will think holistically about technology and develop the system solutions that support our People Operations processes.",
        "Great just isn't good enough for our People Operations team (known elsewhere as \"Human Resources\"). We bring the world's most innovative people to Google and provide the programs that help them thrive. Whether recruiting the next Googler, refining our core programs, developing talent, or simply looking for ways to inject some more fun into the lives of our Googlers, we bring a data-driven approach that is reinventing the human resources field. Youâ€™ll play an essential role advancing a more diverse, accessible, equitable, and inclusive Google through our hiring, promotion, retention, and inclusion practices.",
      ],
      responsibilities: [
        "Support the day-to-day functionality of the people systems. Lead high-quality support, user queries resolution, and continuous improvement of the system.",
        "Deliver specific system processes including configuration, documentation, testing, and security in cooperation and communication with relevant stakeholders (i.e., Finance, Legal, Business HR, Staffing, and Corporate Engineering).",
        "Provide Workday knowledge and configuration development to implement features with internal teams and third-party vendors.",
        "Develop and share an understanding of Workday global business processes to allow effective troubleshooting and predict downstream implications of issues and system changes.",
        "Provide customer-friendly management and resolution of user inquiries, questions, problems, auditing of process data, and analysis/resolution of problems and special cases. Provide training and communication with Operations, HR Business partners, and other stakeholders.",
      ],
      qualifications: [],
      minqualifications: [
        "Bachelor's degree or equivalent practical experience.",
        "Certification in Workday in one or more of the following modules: HCM, Reporting, Talent, Performance, Advanced Compensation, or Absence Management.",
        "3 years of experience in Workday administration, implementation, or system configuration.",
      ],
      preferredqualifications: [
        "Experience in global Human Resources and Payroll (e.g. HCM administration).",
        "Experience in SaaS HR system configuration.",
        "Ability to work across geographies and different regulatory environments.",
        "Ability to analyze and understand complex problems and their resulting dependencies.",
        "Excellent attention to detail, time management, and multitasking skills.",
      ],
      link: "https://www.google.com/about/careers/applications/jobs/results/117204107669709510-people-systems-analyst-people-operations",
    },
    {
      title: "Technical Program Manager, Cellular System Validation",
      company: "Google",
      locations: ["Gurgaon, Haryana, India"],
      experience: 3,
      about: [
        "A problem isnâ€™t truly solved until itâ€™s solved for all. Thatâ€™s why Googlers build products that help create opportunities for everyone, whether down the street or across the globe. As a Technical Program Manager at Google, youâ€™ll use your technical expertise to lead complex, multi-disciplinary projects from start to finish. Youâ€™ll work with stakeholders to plan requirements, identify risks, manage project schedules, and communicate clearly with cross-functional partners across the company. You're equally comfortable explaining your team's analyses and recommendations to executives as you are discussing the technical tradeoffs in product development with engineers.Our goal is to build a Google that looks like the world around us â€” and we want Googlers to stay and grow when they join us. As part of our efforts to build a Google for everyone, we build diversity, equity, and inclusion into our work and we aim to cultivate a sense of belonging throughout the company.",
        "Google's mission is to organize the world's information and make it universally accessible and useful. Our Devices & Services team combines the best of Google AI, Software, and Hardware to create radically helpful experiences for users. We research, design, and develop new technologies and hardware to make our user's interaction with computing faster, seamless, and more powerful. Whether finding new ways to capture and sense the world around us, advancing form factors, or improving interaction methods, the Devices & Services team is making people's lives better through technology.",
      ],
      responsibilities: [
        "Lead and manage cellular system validation for field test activity in various markets across India.",
        "Analyze the 5G/4G logs from field test in India and identify keys issues and work with Test/Software team to resolve it.",
        "Summarize the 3GPP/Google/carrier features, analyze data, and manage bug reporting to drive and secure the Pixel modem quality, from modem/telephony perspective.",
        "Exercise technical judgment to keep goals for programs, projects, and products attainable within a given timeline.",
        "Communicate with stakeholders with clear quality signal per testing progress and identify opportunities for field automation and process/test coverage improvements.",
      ],
      qualifications: [],
      minqualifications: [
        "Bachelorâ€™s degree in Engineering or equivalent practical experience.",
        "3 years of experience in mobile phone field testing.",
        "Experience in mobile phone testing of 5G/4G technologies.",
      ],
      preferredqualifications: [
        "Experience in 5G/4G log analysis and debug issues from field tests.",
        "Experience in 5G (FR2/FR1)/4G Modem/Telephony.",
        "Experience in 5G R15/R16 carrier requirements and driving cellular field testing projects across multiple product areas and distributed sites, with competing resources and priorities.",
        "Knowledge of 5G/4G to drive field functional/performance and Carrier test.",
        "Ability to influence, collaborate, and deliver solutions in a complex, always-changing environment.",
        "Excellent organizational, stakeholder management, project management, data analysis, and communication skills.",
      ],
      link: "https://www.google.com/about/careers/applications/jobs/results/95986097080672966-technical-program-manager-cellular-system-validation",
    },
    {
      title: "Network Engineer, Operations, Corporate",
      company: "Google",
      locations: ["Hyderabad, Telangana, India"],
      experience: 1,
      about: [
        "",
        "As Network Engineer on the Operations team, you will maintain safe and efficient network operations. You will oversee our network performance, planned maintenance, and will respond to outages and issues in real time.\n",
        "Behind everything our users see online is the architecture built by the Technical Infrastructure team to keep it running. From developing and maintaining our data centers to building the next generation of Google platforms, we make Google's product portfolio possible. We're proud to be our engineers' engineers and love voiding warranties by taking things apart so we can rebuild them. We keep our networks up and running, ensuring our users have the best and fastest experience possible.",
      ],
      responsibilities: [
        "Participate in rotating on call schedule with other members of the team, including weekends supporting multi-vendor network, both wired and wireless connectivity for Enterprise (Corporate) Network.",
        "Identify, define, and update operational requirements to adopt new technology into Operations in collaboration with Engineering, Architecture, and Developers.",
        "Identify network issues, determine, and recommend appropriate solutions in partnership with Engineering.",
        "Create, maintain, and review Operational best practices across teams.",
        "Drive efficiencies through automation.",
      ],
      qualifications: [],
      minqualifications: [
        "Bachelor's degree in Electrical Engineering, Computer Science, Computer Engineering, or equivalent practical exprience.",
        "1 year of experience in the networking domain.",
        "Experience with networking technologies and protocols (ARP, Ethernet, DHCP, IPSec, GRE, WiFi standards, routing protocols, DNS, RADIUS, 802.1x).",
      ],
      preferredqualifications: [
        "Master's in Electrical Engineering, Computer Science, Mathematics, Physics, or a related field.",
        "Experience in operating Enterprise (Corporate) Network.",
        "Solid linux and networking troubleshooting skills.",
      ],
      link: "https://www.google.com/about/careers/applications/jobs/results/83306946976719558-network-engineer-operations-corporate",
    },
    {
      title: "Software Engineer, Google Distributed Cloud Hosted",
      company: "Google",
      locations: ["Bangalore, Karnataka, India"],
      experience: 2,
      about: [
        "Google's software engineers develop the next-generation technologies that change how billions of users connect, explore, and interact with information and one another. Our products need to handle information at massive scale, and extend well beyond web search. We're looking for engineers who bring fresh ideas from all areas, including information retrieval, distributed computing, large-scale system design, networking and data storage, security, artificial intelligence, natural language processing, UI design and mobile; the list goes on and is growing every day. As a software engineer, you will work on a specific project critical to Googleâ€™s needs with opportunities to switch teams and projects as you and our fast-paced business grow and evolve. We need our engineers to be versatile, display leadership qualities and be enthusiastic to take on new problems across the full-stack as we continue to push technology forward.",
        "Google Distributed Cloud Hosted (GDCH) is a new offering designed as a converged hardware/software solution for customers who want the benefits of Google Cloud on premises. GDCH will include dedicated hardware (e.g., rack, network switch, servers, storage), operating system, selected first-party GCP services verified and supported by Google. This enables a shorter and cost effective time to market for customers and enables us to deliver SLAâ€™s on reliability, scalability, performance and operations.",
        "In this role, you will build the next generation cloud experience for customers who are unable to run their workloads on public clouds. You will build a modern technical stack based on Kubernetes, designed to run at customer sites on our dedicated hardware platform.",
        "Google Cloud accelerates organizationsâ€™ ability to digitally transform their business with the best infrastructure, platform, industry solutions and expertise. We deliver enterprise-grade solutions that leverage Googleâ€™s cutting-edge technology â€“ all on the cleanest cloud in the industry. Customers in more than 200 countries and territories turn to Google Cloud as their trusted partner to enable growth and solve their most critical business problems.",
      ],
      responsibilities: [
        "Design and develop software systems and tools to enable customers to manage their private cloud infrastructure efficiently.",
        "Use software development and testing skills to implement features on GDCH that are distributed, scalable, and available.",
        "Work with partner teams to build/re-use open source or Google frameworks to accelerate development and delivery of the platform.",
      ],
      qualifications: [],
      minqualifications: [
        "Bachelor's degree or equivalent practical experience.",
        "2 years of experience with data structures or algorithms in academic or industry settings.",
        "1 year of experience with software development in one or more programming languages (e.g., Python, C, C++, Java, JavaScript).",
      ],
      preferredqualifications: [
        "Master's degree or PhD in Computer Science, or a related technical field.",
        "Experience working with Kubernetes or other cloud technologies.",
        "Experience in building distributed systems.",
        "Excellent software engineering skills, including algorithm design, implementation and testing (e.g., Go).",
      ],
      link: "https://www.google.com/about/careers/applications/jobs/results/123767323833049798-software-engineer-google-distributed-cloud-hosted",
    },
    {
      title: "Data Center Technician, Global Server Operations",
      company: "Google",
      locations: ["Mumbai, Maharashtra, India", "; New Delhi, Delhi, India"],
      experience: 2,
      about: [
        "Google isn't just a software company. The Hardware Operations team is responsible for monitoring the state-of-the-art physical infrastructure behind Google's powerful search technology. As an Operations Technician, you'll install, configure, test, troubleshoot and maintain hardware (like servers and its components) and server software (like Google's Linux cluster). You'll also take on the configuration of more complex components such as networks, routers, hubs, bridges, switches and networking protocols. You'll participate in or lead small project teams on larger installations and develop project contingency plans. A typical day involves manual movement and installation of racks, and while it can sometimes be physically demanding, you are excited to work with infrastructure that is at the cutting-edge of computer technology.",
        "The Data Center team designs and operates some of the most sophisticated electrical and HVAC systems in the world. We are a diverse, upbeat, creative, team-oriented group of engineers committed to building and operating powerful data centers.",
      ],
      responsibilities: [
        "Contribute and lead efforts/projects in the deployment, maintenance, and support of current and new data center infrastructure.",
        "Install servers, switches, routers, and other networking gear, and resolve issues with broken equipment. Configure and troubleshoot Linux OS related issues.",
        "Assist in deploying, repairing, and troubleshooting next generation ML platforms providing feedback to local deployment/project teams.",
        "Participate in complex troubleshooting and resolve critical technical issues. Test and troubleshoot new server and network hardware components and designs.",
      ],
      qualifications: [],
      minqualifications: [
        "Bachelorâ€™s degree or equivalent practical experience.",
        "2 years of experience with operating systems and networking protocols.",
        "Experience with LPIC or working with Linux (e.g., Red Hat, Slackware, Fedora, SUSE, Ubuntu, Debian, Gentoo), Unix (e.g., Solaris, AIX, HP-UX, BSD), or other similar OS.",
        "Experience with troubleshooting hardware or network issues using Linux tools.",
      ],
      preferredqualifications: [
        "Experience in maintenance and monitoring of server systems.",
        "Experience in working within a data center or networking operation center environment.",
        "Experience with networking protocols.",
      ],
      link: "https://www.google.com/about/careers/applications/jobs/results/126185987521815238-data-center-technician-global-server-operations",
    },
    {
      title: "Software Engineer, Mobile, Android",
      company: "Google",
      locations: ["Bangalore, Karnataka, India"],
      experience: 1,
      about: [
        "Google's software engineers develop the next-generation technologies that change how billions of users connect, explore, and interact with information and one another. Our products need to handle information at massive scale, and extend well beyond web search. We're looking for engineers who bring fresh ideas from all areas, including information retrieval, distributed computing, large-scale system design, networking and data storage, security, artificial intelligence, natural language processing, UI design and mobile; the list goes on and is growing every day. As a software engineer, you will work on a specific project critical to Googleâ€™s needs with opportunities to switch teams and projects as you and our fast-paced business grow and evolve. We need our engineers to be versatile, display leadership qualities and be enthusiastic to take on new problems across the full-stack as we continue to push technology forward.",
        "With your technical expertise you will manage project priorities, deadlines, and deliverables. You will design, develop, test, deploy, maintain, and enhance software solutions.",
        "Android is Googleâ€™s open-source mobile operating system powering more than 3 billion devices worldwide. Android is about bringing computing to everyone in the world. We believe computing is a super power for good, enabling access to information, economic opportunity, productivity, connectivity between friends and family and more. We think everyone in the world should have access to the best computing has to offer. We provide the platform for original equipment manufacturers (OEMs) and developers to build compelling computing devices (smartphones, tablets, TVs, wearables, etc) that run the best apps/services for everyone in the world.",
      ],
      responsibilities: [
        "Write product or system development code.",
        "Participate in, or lead design reviews with peers and stakeholders to decide amongst available technologies.",
        "Review code developed by other developers and provide feedback to ensure best practices (e.g., style guidelines, checking code in, accuracy, testability, and efficiency).",
        "Contribute to existing documentation or educational content and adapt content based on product/program updates and user feedback.",
        "Triage product or system issues and debug/track/resolve by analyzing the sources of issues and the impact on hardware, network, or service operations and quality.",
      ],
      qualifications: [],
      minqualifications: [
        "Bachelorâ€™s degree or equivalent practical experience.",
        "1 year of experience with software development in one or more programming languages (e.g., Python, C, C++, Java, JavaScript).",
        "1 year of experience with data structures or algorithms.",
      ],
      preferredqualifications: [
        "Master's degree or PhD in Computer Science or related technical field.",
        "1 year of experience with Android application development.",
        "1 year of experience with performance, large scale systems data analysis, visualization tools, and/or debugging.",
        "Experience developing accessible technologies.",
      ],
      link: "https://www.google.com/about/careers/applications/jobs/results/136803722102481606-software-engineer-mobile-android",
    },
    {
      title: "Software Engineer, Core",
      company: "Google",
      locations: ["Bangalore, Karnataka, India"],
      experience: 1,
      about: [
        "Google's software engineers develop the next-generation technologies that change how billions of users connect, explore, and interact with information and one another. Our products need to handle information at massive scale, and extend well beyond web search. We're looking for engineers who bring fresh ideas from all areas, including information retrieval, distributed computing, large-scale system design, networking and data storage, security, artificial intelligence, natural language processing, UI design and mobile; the list goes on and is growing every day. As a software engineer, you will work on a specific project critical to Googleâ€™s needs with opportunities to switch teams and projects as you and our fast-paced business grow and evolve. We need our engineers to be versatile, display leadership qualities and be enthusiastic to take on new problems across the full-stack as we continue to push technology forward.",
        "With your technical expertise you will manage project priorities, deadlines, and deliverables. You will design, develop, test, deploy, maintain, and enhance software solutions.",
        "The Core team builds the technical foundation behind Googleâ€™s flagship products. We are owners and advocates for the underlying design elements, developer platforms, product components, and infrastructure at Google. These are the essential building blocks for excellent, safe, and coherent experiences for our users and drive the pace of innovation for every developer. We look across Googleâ€™s products to build central solutions, break down technical barriers and strengthen existing systems. As the Core team, we have a mandate and a unique opportunity to impact important technical decisions across the company.",
      ],
      responsibilities: [
        "Write product or system development code.",
        "Participate in, or lead design reviews with peers and stakeholders to decide amongst available technologies.",
        "Review code developed by other developers and provide feedback to ensure best practices (e.g., style guidelines, checking code in, accuracy, testability, and efficiency).",
        "Contribute to existing documentation or educational content and adapt content based on product/program updates and user feedback.",
        "Triage product or system issues and debug/track/resolve by analyzing the sources of issues and the impact on hardware, network, or service operations and quality.",
      ],
      qualifications: [],
      minqualifications: [
        "Bachelorâ€™s degree or equivalent practical experience.",
        "1 year of experience with software development in one or more programming languages (e.g., Python, C, C++, Java, JavaScript).",
      ],
      preferredqualifications: [
        "Master's degree or PhD in Computer Science or related technical field.",
        "Experience developing accessible technologies.",
      ],
      link: "https://www.google.com/about/careers/applications/jobs/results/120019644892226246-software-engineer-core",
    },
    {
      title: "Technical Solutions Engineer, Platform, Google Cloud",
      company: "Google",
      locations: ["Bangalore, Karnataka, India", "; Pune, Maharashtra, India"],
      experience: 0,
      about: [
        "The Google Cloud team helps companies, schools, and government seamlessly make the switch to Google products and supports them along the way. You listen to the customer and swiftly problem-solve technical issues to show how our products can make businesses more productive, collaborative, and innovative. You work closely with a cross-functional team of web developers and systems administrators, not to mention a variety of both regional and international customers. Your relationships with customers are crucial in helping Google grow its Cloud business and helping companies around the world innovate.",
        "Our Technical Solutions Engineers own our customer issues in addition to providing level two support to our other support teams. In this role, you will troubleshoot technical problems for customers with a mix of debugging, networking, system administration, updating documentation, and when needed coding/scripting. You will make our products easier to adopt and use by making improvements to the product, tools, processes, and documentation. Additionally, you will be required to work in a shift pattern or non-standard work hours as required, this may include weekend work.",
        "Google Cloud accelerates organizationsâ€™ ability to digitally transform their business with the best infrastructure, platform, industry solutions and expertise. We deliver enterprise-grade solutions that leverage Googleâ€™s cutting-edge technology â€“ all on the cleanest cloud in the industry. Customers in more than 200 countries and territories turn to Google Cloud as their trusted partner to enable growth and solve their most critical business problems.",
      ],
      responsibilities: [
        "Manage customer problems through effective diagnosis, resolution, or implementation of new investigation tools to increase productivity for customer challenges on Google Cloud Platform products.",
        "Develop an in-depth understanding of Google's product technology and underlying architectures by troubleshooting, reproducing, determining the root cause for customer reported challenges, and building tools for faster diagnosis so we can identify and resolve future challenges quickly.",
        "Act as a consultant and subject matter expert for internal stakeholders in engineering, sales, and customer organizations to resolve technical deployment obstacles and improve Google Cloud.",
        "Work closely with multiple Product and Engineering teams to find ways to improve the supportability, products, and interact with our Site Reliability Engineering (SRE) teams to drive high-quality production.",
        "Work as part of a team of engineers/consultants that globally ensure 24-hour customer support.",
      ],
      qualifications: [],
      minqualifications: [
        "Bachelor's degree in Science, Technology, Engineering, Mathematics, or equivalent practical experience.",
        "Experience in reading or debugging code with one or more of the following: Java, C, C++, Python, Shell, Perl, or JavaScript.",
        "Experience advocating for customer needs.",
      ],
      preferredqualifications: [
        "Experience with cloud based Serverless and developer tools technologies.",
        "Experience with one or more of these solutions: Google App Engine, Cloud Function, Cloud run, or open source software communities.",
        "Experience with Web or Mobile App Development.",
        "Knowledge of core data structures and concepts: MVCC, CI/CD Pipelines, HTTP Protocol, Web frameworks, and common Web Technologies.",
        "System/Network Administrator level knowledge of Linux/Unix or other operating systems (from Kernel to Shell and beyond, file systems and client-server protocols).",
      ],
      link: "https://www.google.com/about/careers/applications/jobs/results/98394544686408390-technical-solutions-engineer-platform-google-cloud",
    },
    {
      title: "Software Engineer, Front End, Google Cloud",
      company: "Google",
      locations: ["Bangalore, Karnataka, India"],
      experience: 1,
      about: [
        "Google's software engineers develop the next-generation technologies that change how billions of users connect, explore, and interact with information and one another. Our products need to handle information at massive scale, and extend well beyond web search. We're looking for engineers who bring fresh ideas from all areas, including information retrieval, distributed computing, large-scale system design, networking and data storage, security, artificial intelligence, natural language processing, UI design and mobile; the list goes on and is growing every day. As a software engineer, you will work on a specific project critical to Googleâ€™s needs with opportunities to switch teams and projects as you and our fast-paced business grow and evolve. We need our engineers to be versatile, display leadership qualities and be enthusiastic to take on new problems across the full-stack as we continue to push technology forward.",
        "With your technical expertise you will manage project priorities, deadlines, and deliverables. You will design, develop, test, deploy, maintain, and enhance software solutions.\n",
        "Google Cloud accelerates organizationsâ€™ ability to digitally transform their business with the best infrastructure, platform, industry solutions and expertise. We deliver enterprise-grade solutions that leverage Googleâ€™s cutting-edge technology â€“ all on the cleanest cloud in the industry. Customers in more than 200 countries and territories turn to Google Cloud as their trusted partner to enable growth and solve their most critical business problems.",
      ],
      responsibilities: [
        "Write product or system development code.",
        "Participate in, or lead design reviews with peers and stakeholders to decide amongst available technologies.",
        "Review code developed by other developers and provide feedback to ensure best practices (e.g., style guidelines, checking code in, accuracy, testability, and efficiency).",
        "Contribute to existing documentation or educational content and adapt content based on product/program updates and user feedback.",
        "Triage product or system issues and debug/track/resolve by analyzing the sources of issues and the impact on hardware, network, or service operations and quality.",
      ],
      qualifications: [],
      minqualifications: [
        "Bachelorâ€™s degree or equivalent practical experience.\n",
        "1 year of experience with software development in one or more programming languages (e.g., Python, C, C++, Java, JavaScript).",
        "1 year of experience with data structures or algorithms.",
      ],
      preferredqualifications: [
        "Master's degree or PhD in Computer Science or related technical field.",
        "1 year of experience with front-end frameworks, full-stack development, and/or API development.",
        "Experience developing accessible technologies.",
      ],
      link: "https://www.google.com/about/careers/applications/jobs/results/96395135371092678-software-engineer-front-end-google-cloud",
    },
    {
      title: "Software Engineer, Machine Learning, Google Ads",
      company: "Google",
      locations: ["Hyderabad, Telangana, India"],
      experience: 1,
      about: [
        "Google's software engineers develop the next-generation technologies that change how billions of users connect, explore, and interact with information and one another. Our products need to handle information at massive scale, and extend well beyond web search. We're looking for engineers who bring fresh ideas from all areas, including information retrieval, distributed computing, large-scale system design, networking and data storage, security, artificial intelligence, natural language processing, UI design and mobile; the list goes on and is growing every day. As a software engineer, you will work on a specific project critical to Googleâ€™s needs with opportunities to switch teams and projects as you and our fast-paced business grow and evolve. We need our engineers to be versatile, display leadership qualities and be enthusiastic to take on new problems across the full-stack as we continue to push technology forward.",
        "With your technical expertise you will manage project priorities, deadlines, and deliverables. You will design, develop, test, deploy, maintain, and enhance software solutions.\n",
        "Google Ads is helping power the open internet with the best technology that connects and creates value for people, publishers, advertisers, and Google. Weâ€™re made up of multiple teams, building Googleâ€™s Advertising products including search, display, shopping, travel and video advertising, as well as analytics. Our teams create trusted experiences between people and businesses with useful ads. We help grow businesses of all sizes from small businesses, to large brands, to YouTube creators, with effective advertiser tools that deliver measurable results. We also enable Google to engage with customers at scale. ",
      ],
      responsibilities: [
        "Write product or system development code.",
        "Participate in, or lead design reviews with peers and stakeholders to decide amongst available technologies.",
        "Review code developed by other developers and provide feedback to ensure best practices (e.g., style guidelines, checking code in, accuracy, testability, and efficiency).",
        "Contribute to existing documentation or educational content and adapt content based on product/program updates and user feedback.",
        "Triage product or system issues and debug/track/resolve by analyzing the sources of issues and the impact on hardware, network, or service operations and quality.",
      ],
      qualifications: [],
      minqualifications: [
        "Bachelorâ€™s degree or equivalent practical experience.",
        "1 year of experience with software development in one or more programming languages (e.g., Python, C, C++, Java, JavaScript).",
        "1 year of experience with data structures or algorithms.",
      ],
      preferredqualifications: [
        "Master's degree or PhD in Computer Science or related technical field.",
        "1 year of experience with machine learning algorithms and tools(e.g., TensorFlow), artificial intelligence, deep learning and/or natural language processing.",
        "Experience developing accessible technologies.",
      ],
      link: "https://www.google.com/about/careers/applications/jobs/results/93764160308814534-software-engineer-machine-learning-google-ads",
    },
    {
      title: "Software Test Engineer, System Test Engineering Team",
      company: "Google",
      locations: ["Bangalore, Karnataka, India"],
      experience: 1,
      about: [
        "At Google, our philosophy is build it, break it and then rebuild it better. That thinking is at the core of how we approach testing at Google. Unlike roles with similar names at the other companies, Test Engineers at Google aren't manual testers -- you write scripts to automate testing and create tools so developers can test their own code. As a Test Engineer, you navigate Google's massive codebase, identify weak spots and constantly design better and creative ways to break software and identify potential problems. You'll have a huge impact on the quality of Google's growing suite of products and services.",
        "In this role, you will focus on developing automation infrastructure to test system software. You will partner with cross-functional teams to deliver high quality, power and performance optimized software to enable the best user experience on Pixel portfolio products. The System Software team builds firmware, drivers to bring our custom hardware to life. We work cross-functionally with many teams, including Research, Machine Learning, Android, Chrome, and Hardware. You will bring enthusiasm for software testing and expertise in embedded to implement testing strategies, promote good software engineering practices, and build out our testing infrastructure. Our testing needs range from traditional software tests to complex on-device testing of full Android applications.",
        "Google's mission is to organize the world's information and make it universally accessible and useful. Our Devices & Services team combines the best of Google AI, Software, and Hardware to create radically helpful experiences for users. We research, design, and develop new technologies and hardware to make our user's interaction with computing faster, seamless, and more powerful. Whether finding new ways to capture and sense the world around us, advancing form factors, or improving interaction methods, the Devices & Services team is making people's lives better through technology.",
      ],
      responsibilities: [
        "Develop scalable and reliable automated tests and frameworks for testing embedded hardware devices.",
        "Own and drive Pixel product testing and performance strategies for quality.",
        "Own a technical area and deliver polished automation solutions.",
        "Work closely with cross-functional teams and strive to come up with optimal and creative solutions.Â\xa0",
        "Interface with counterparts, stakeholders and peers to drive team and test strategies and drive to improve software productivity processes and methodologies.",
      ],
      qualifications: [],
      minqualifications: [
        "Bachelor's degree in Computer Science or equivalent practical experience.",
        "1 year of coding/testing experience on automation (e,g., C++, Java, or Python), debugging and triage.",
      ],
      preferredqualifications: [
        "Master's degree in Computer Science or equivalent practical experience.",
        "Experience building automation stations for testing Embedded devices with iOS and Android.",
        "Experience with hardware communication interfaces such as USB, UART, I2C, and SPI.",
        "Experience with connectivity technologies like Bluetooth, Wifi etc.",
        "Experience with Mobile App automation tools such as UI Automator or Appium.",
      ],
      link: "https://www.google.com/about/careers/applications/jobs/results/127397491529130694-software-test-engineer-system-test-engineering-team",
    },
  ],
  internships: [
    {
      title: "Research Scientist Intern, PhD",
      company: "Google",
      locations: ["Bangalore, Karnataka, India"],
      experience_word: "Intern & Apprentice",
      minqualifications: [
        "Currently enrolled in a Master's degree or PhD program in Computer Science, Linguistics, Statistics, Applied Mathematics or a related technical field.",
        "Experience in one area of Computer Science (e.g., Large Language Models, Natural Language Understanding, Computer Vision, Machine Learning, Deep Learning, Algorithmic Foundations of Optimization, Software Engineering, etc.).",
        "Experience programming in one or more of the following: C/C++, Java, or Python.",
      ],
      preferredqualifications: [
        "Currently enrolled in a full-time degree program and returning to the program after completion of the internship.",
        "Experience as a researcher, including internships, full-time, or at a lab.",
        "Experience contributing to research communities or efforts, including publishing papers in conferences or journals.",
        "Experience with one or more general purpose programming languages (e.g., C/C++, Java, MATLAB, Go, Python, TF, PAX/JAX etc.).",
        "Ability to design and execute on research agendas.",
      ],
      about: [
        "Research happens across Google everyday, in many different teams. Our research has already impacted user-facing services across Google including Search, Maps, and Google Now, and is central to the success of Google Cloud and our computing, storage, and networking infrastructure.",
        "Research Interns work closely with Research Scientists and Software Engineers to discover, invent, and build at scale. Ideas may come from internal projects as well as from collaborations with research programs at partner universities and technical institutes. From creating experiments and prototyping implementations to designing architectures, Research Interns work on challenges in artificial intelligence, machine perception, data mining, machine learning, natural language understanding, privacy, computer architecture, networking, operating systems, storage and data management, and more. You are also expected to contribute to the wider research community by publishing papers.",
        "We're constantly refining our signature search engine to provide better results, expanding the scope and utility of our data-analytics systems, enhancing our cloud applications and infrastructure, among a broad range of other Google products.",
        "At Google, engineers work on search, and they routinely work on scalability and storage solutions, large-scale applications, and platforms for developers. ",
        "Google is and always will be an engineering company. We hire people with a broad set of technical skills who are ready to address some of technology's greatest challenges and make an impact on millions, if not billions, of users. At Google, engineers not only revolutionize search, they routinely work on massive scalability and storage solutions, large-scale applications and entirely new platforms for developers around the world. From Google Ads to Chrome, Android to YouTube, Social to Local, Google engineers are changing the world one technological achievement after another.",
      ],
      responsibilities: [
        "Participate in research to develop solutions for real-world, large-scale problems.",
        "Research, conceive, and develop software applications to extend and improve on Google's product offering.",
        "Contribute to a wide variety of projects utilizing natural language processing, artificial intelligence, data compression, machine learning, and search technologies.",
      ],
      link: "https://www.google.com/about/careers/applications/jobs/results/108147199134573254-research-scientist-intern-phd",
      qualifications: [],
      job_id: "108147199134573254",
      experience: 0,
      posted_date: "",
    },
    {
      title: "Software Engineering Intern, PhD, Summer 2024",
      company: "Google",
      locations: ["Bangalore, Karnataka, India"],
      experience_word: "Intern & Apprentice",
      minqualifications: [
        "Currently pursuing a PhD degree in Computer Science or a related technical field.",
        "Experience programming in one or more of the following: C/C++, Java, or Python.",
      ],
      preferredqualifications: [
        "In their penultimate academic year or returning to a degree program after completion of the internship.",
        "Experience with research in the following areas: Algorithms, Architecture, Artificial Intelligence, Compilers, Database, Data Mining, Distributed Systems, Machine Learning, Networking, or Systems.",
        "Excellent implementation skills with one or more general purpose programming languages, including but not limited to: Java, C/C++, C#, Objective C, Python, JavaScript, and/or Go.",
        "Experience with competencies in data structures, algorithms, and software design.",
      ],
      about: [
        "Join us for a 10-12 week paid internship that offers personal and professional development, and community-building. The Software Engineering Internship program will give you an opportunity to work on computer science solutions, develop scalable, distributed software systems, and also collaborate on multitudes of smaller projects that have universal appeal.",
        "Google is and always will be an engineering company. We hire people with a broad set of technical skills who are ready to address some of technology's greatest challenges and make an impact on millions, if not billions, of users. At Google, engineers not only revolutionize search, they routinely work on massive scalability and storage solutions, large-scale applications and entirely new platforms for developers around the world. From Google Ads to Chrome, Android to YouTube, Social to Local, Google engineers are changing the world one technological achievement after another.",
      ],
      responsibilities: [
        "Research, conceive, and develop software applications to extend and improve on Google's product offering.",
        "Contribute to a wide variety of projects utilizing natural language processing, artificial intelligence, data compression, machine learning, and search technologies.",
        "Collaborate on scalability challenges involving access to massive amounts of data and information.",
      ],
      link: "https://www.google.com/about/careers/applications/jobs/results/81725067135722182-software-engineering-intern-phd-summer-2024",
      qualifications: [],
      job_id: "81725067135722182",
      experience: 0,
      posted_date: "",
    },
    {
      title: "Data Science- Fulltime Opportunities for University Graduates",
      company: "Microsoft",
      locations: ["Multiple Locations, India"],
      experience_word: "Full-Time",
      qualifications: [
        "Bachelor's Degree in Data Science, Mathematics, Statistics, Computer Science, or related field OR equivalent experience.",
      ],
      minqualifications: [],
      preferredqualifications: [],
      about: [
        "Every year, we welcome thousands of university students from every corner of the world to join Microsoft. You bring your aspirations, talent, potential—and excitement for the journey ahead. We’re a company of learn-it-all’s rather than know-it-alls and our culture is centered around embracing a growth mindset, a theme of inspiring excellence, and encouraging teams and leaders to bring their best each day. Does this sound like you? Learn more about our cultural attributes.",
        "Microsoft’s mission is to empower every person and every organization on the planet to achieve more. As employees we come together with a growth mindset, innovate to empower others, and collaborate to realize our shared goals. Each day we build on our values of respect, integrity, and accountability to create a culture of inclusion where everyone can thrive at work and beyond. ",
        "Those hired into this role are invited to participate in Microsoft Aspire Experience, a two-year learning and development experience where you'll build your network, cultivate intentional capabilities and gain perspective into the career opportunities across Microsoft’s many exciting businesses.",
        "Come build community, explore your passions, and do your best work at Microsoft with thousands of university graduates from every corner of the world.",
      ],
      responsibilities: [
        "Learns and understands project objectives and requirements from a business perspective. Assists senior leads with the assessment of a project, including risks, contingencies, requirements, assumptions, and constraints. Contributes to the development of a project plan. Shares insights with stakeholders based on direct work.",
        "Assists with initial data collection and familiarizes self with data in order to identify quality problems, discover insights into the data, and/or detect subsets to form hypotheses. Understands which analysis techniques are appropriate for data and which key technologies and tools are necessary for data exploration (e.g., structured query language [SQL], Python). Leverages data analysis knowledge to clean, transform, analyze, integrate, and organize data to the level required by the analysis techniques selected. Contributes to the description and exploration of data. Develops foundational understanding of methodology and standard statistical options and when they should be used. Understands and follows ethics and privacy policies when collecting and preparing data. Adheres to Microsoft's privacy policy related to collecting and preparing data. Identifies data integrity problems.",
        "Learns and understands various modeling techniques used within the team (e.g., linear regression, multiple regression, decision-tree building, neural network generation, support machines, derivatives). Runs model tools on prepared dataset to create one or more models, seeking guidance as needed. Contributes to the research, identification, prototyping, and productizing of machine learning (ML)/artificial intelligence (AI) techniques and algorithms. Collaborates with project managers and development engineers to design machine learning and artificial intelligence-driven features in the product.",
      ],
      link: "https://jobs.careers.microsoft.com/global/en/job/1692117",
      job_id: "1692117",
      posted_date: "2024-02-19T11:55:00+00:00",
      experience: 0,
    },
  ],
};
