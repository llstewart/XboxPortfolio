// Resume Data
const resumeData = {
  profile: {
    name: "Lincoln Stewart",
    title: "Software Engineer",
    location: "Hyattsville, MD",
    email: "lincolnstewart4@gmail.com",
    phone: "(443) 460-8224",
    linkedin: "linkedin.com/in/lincolnstewart",
    github: "github.com/lincolnstewart"
  },
  
  skills: [
    {
      id: "programming",
      title: "Programming Languages",
      items: [
        { name: "Python", proficiency: 95 },
        { name: "JavaScript", proficiency: 90 },
        { name: "Java", proficiency: 85 },
        { name: "C/C++", proficiency: 80 },
        { name: "SQL", proficiency: 90 },
        { name: "HTML/CSS", proficiency: 90 },
        { name: "Bash/Shell", proficiency: 80 },
        { name: "PHP", proficiency: 75 }
      ]
    },
    {
      id: "frameworks",
      title: "Libraries & Frameworks",
      items: [
        { name: "React.js", proficiency: 90 },
        { name: "Vue.js", proficiency: 85 },
        { name: "Node.js", proficiency: 85 },
        { name: "Django/Flask", proficiency: 85 },
        { name: ".NET", proficiency: 80 },
        { name: "TensorFlow", proficiency: 75 },
        { name: "OpenCV", proficiency: 80 },
        { name: "Bootstrap", proficiency: 85 }
      ]
    },
    {
      id: "platforms",
      title: "Platforms & Tools",
      items: [
        { name: "Docker", proficiency: 85 },
        { name: "Git", proficiency: 95 },
        { name: "GitHub Actions", proficiency: 85 },
        { name: "Azure SDK", proficiency: 80 },
        { name: "Google Cloud", proficiency: 80 },
        { name: "PostgreSQL", proficiency: 85 },
        { name: "MySQL", proficiency: 80 },
        { name: "Linux/Unix", proficiency: 85 },
        { name: "Ignition SCADA", proficiency: 90 },
        { name: "OPC-UA", proficiency: 85 },
        { name: "MQTT", proficiency: 80 }
      ]
    },
    {
      id: "concepts",
      title: "Technical Concepts",
      items: [
        { name: "REST APIs", proficiency: 90 },
        { name: "CI/CD", proficiency: 85 },
        { name: "Server Configuration", proficiency: 80 },
        { name: "Database Design", proficiency: 85 },
        { name: "Cloud Deployment", proficiency: 80 },
        { name: "Real-Time Monitoring", proficiency: 90 }
      ]
    }
  ],
  
  experience: [
    {
      id: "software-engineer",
      title: "Software Engineer",
      company: "Oshkosh Corporation",
      location: "Remote",
      startDate: "Dec 2023",
      endDate: "Present",
      description: "Full-stack development of enterprise-grade applications using Python, React.js, ASP.NET, Vue.js, and Ignition SCADA—streamlining operations and boosting system efficiency by 25%.",
      responsibilities: [
        "Design, develop, test, and deploy enterprise-grade applications using Python, React.js, ASP.NET, Vue.js, and Ignition SCADA",
        "Implement CI/CD pipelines with GitHub Actions, achieving 40% faster deployments with zero downtime",
        "Develop real-time monitoring dashboards with JavaScript, Tailwind CSS, and SQL, supporting mission-critical enterprise decisions",
        "Build secure REST APIs to enable cross-system communication, reducing data retrieval latency by 15%"
      ],
      technologies: ["Python", "React.js", "ASP.NET", "Vue.js", "Ignition SCADA", "JavaScript", "Tailwind CSS", "SQL", "GitHub Actions"]
    },
    {
      id: "system-engineer-intern",
      title: "System Engineer, Intern",
      company: "Oshkosh Corporation",
      location: "Hybrid/Hagerstown",
      startDate: "Jun 2022",
      endDate: "Nov 2023",
      description: "Developed Azure-hosted computer vision tools and real-time monitoring systems, achieving significant improvements in operational efficiency and system reliability.",
      responsibilities: [
        "Developed Azure-hosted Computer vision tools using Python, CNNs, and OCR for automated text recognition, achieving 98% accuracy",
        "Created live dashboards with React, JavaScript, Python and SQL, reducing operational downtime by 25% through live data visualization",
        "Reconfigured robotic system operations in C++ to improve welding precision by 30%",
        "Configured Linux servers to support 24/7 diagnostics, enhancing uptime by 20%"
      ],
      technologies: ["Python", "Azure", "CNNs", "OCR", "React", "JavaScript", "SQL", "C++", "Linux"]
    }
  ],
  
  projects: [
    {
      id: "global-report-builder",
      title: "Global Report Builder Application",
      description: "Multi-site global reporting tool enabling users to generate personalized reports across enterprise facilities using Ignition Platform.",
      technologies: ["Vue.js", "Python", "Ignition SCADA", "MQTT", "OPC-UA"],
      features: [
        "Multi-site global reporting across enterprise facilities",
        "Vue.js frontend with Python-based services on Ignition Platform",
        "Integrated MQTT and OPC-UA protocols for real-time data fetching",
        "User authentication and data filtering capabilities",
        "Scheduled report exports within Ignition gateway",
        "Scalable platform used by 100+ users across global operations"
      ],
      dateRange: "Aug 2024 - Oct 2024",
      imageUrl: "images/projects-card.svg"
    },
    {
      id: "real-time-monitoring",
      title: "Real-Time System Monitoring Dashboard",
      description: "Integrated real-time metrics from distributed systems with modular dashboard framework for dynamic visualization and automated alerts.",
      technologies: ["Python", "OPC-UA", "SQL", "JavaScript", "REST APIs"],
      features: [
        "Real-time metrics integration from distributed systems using OPC-UA",
        "Structured SQL databases for system health metrics storage",
        "Modular dashboard framework with dynamic visualization",
        "Automated threshold-based alerts system",
        "Custom APIs for cross-platform system connectivity",
        "25% reduction in anomaly detection latency"
      ],
      dateRange: "Jan 2024 - Mar 2024",
      imageUrl: "images/projects-card.svg"
    },
    {
      id: "dmv-explorer",
      title: "DmvExplorer Web App",
      description: "Location-based web app with Python/Node.js backend and Bootstrap/JavaScript frontend, aggregating real-time data from Yelp Fusion API.",
      technologies: ["Python", "Node.js", "Bootstrap", "JavaScript", "Google Cloud SQL", "Docker"],
      features: [
        "Location-based service discovery",
        "Real-time data from Yelp Fusion API",
        "Responsive Bootstrap frontend",
        "ETL pipelines for data processing",
        "Deployed on Google Compute Engine using Docker",
        "High scalability and uptime architecture"
      ],
      dateRange: "Jun 2023 - Dec 2023",
      githubUrl: "https://github.com/lincolnstewart/dmv-explorer",
      imageUrl: "images/projects-card.svg"
    }
  ],
  
  education: [
    {
      id: "bs-information-science",
      degree: "Bachelor of Science, Information Science",
      school: "University of Maryland, College Park",
      location: "College Park, MD",
      startDate: "Jan 2021",
      endDate: "Dec 2023",
      description: "Focused on information systems, data science, and software development. Gained expertise in programming, database design, and system analysis.",
      relevantCourses: [
        "Data Structures and Algorithms",
        "Database Design",
        "Web Development",
        "Software Engineering",
        "Information Systems",
        "Data Science"
      ]
    }
  ],
  
  gameCards: [
    {
      id: "experience-card",
      title: "Professional Experience",
      subtitle: "Career Journey",
      description: "Explore my professional experience and career growth",
      coverImage: "images/experience-card.svg",
      route: "#experience",
      category: "experience",
      achievements: [
        {
          title: "Career Explorer",
          description: "Discovered professional experience details!"
        }
      ]
    },
    {
      id: "skills-card",
      title: "Technical Skills",
      subtitle: "Developer Toolkit",
      description: "Discover my technical expertise and competencies",
      coverImage: "images/skills-card.svg",
      route: "#skills",
      category: "skills",
      achievements: [
        {
          title: "Skill Master",
          description: "Discovered your areas of expertise!"
        }
      ]
    },
    {
      id: "projects-card",
      title: "Projects Portfolio",
      subtitle: "Development Showcase",
      description: "View my latest software development projects",
      coverImage: "images/projects-card.svg",
      route: "#projects",
      category: "projects",
      achievements: [
        {
          title: "Project Inspector",
          description: "Examined your first project in detail!"
        }
      ]
    },
    {
      id: "education-card",
      title: "Education",
      subtitle: "Academic Background",
      description: "Learn about my academic qualifications",
      coverImage: "images/education-card.svg",
      route: "#education",
      category: "all",
      achievements: [
        {
          title: "Scholar",
          description: "Viewed educational background!"
        }
      ]
    },
    {
      id: "contact-card",
      title: "Contact Me",
      subtitle: "Get In Touch",
      description: "Find ways to connect with me",
      coverImage: "images/contact-card.svg",
      route: "#contact",
      category: "all",
      achievements: [
        {
          title: "Networker",
          description: "Reached out through the contact page!"
        }
      ]
    }
  ]
};