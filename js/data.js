// Resume Data
const resumeData = {
  profile: {
    name: "Lincoln Stewart",
    title: "Software Engineer",
    location: "Milwaukee, WI",
    email: "lincoln.stewart@example.com",
    phone: "(555) 123-4567",
    linkedin: "linkedin.com/in/lincolnstewart"
  },
  skills: [
    {
      id: "programming",
      title: "Programming",
      skills: ["Python", "Java", "C/C++", "JavaScript", "SQL", "HTML/CSS", "Bash/Shell", "PHP"]
    },
    {
      id: "libraries-frameworks",
      title: "Libraries/Frameworks",
      skills: ["React.js", "Vue.js", "Node.js", "Django/Flask", ".NET", "TensorFlow", "OpenCV", "Bootstrap"]
    },
    {
      id: "platforms",
      title: "Platforms",
      skills: [
        "Docker", 
        "Git", 
        "GitHub Actions", 
        "Azure SDK", 
        "Google Cloud", 
        "PostgreSQL, MySQL", 
        "Linux/Unix", 
        "Ignition SCADA"
      ]
    },
    {
      id: "concepts",
      title: "Concepts",
      skills: [
        "REST APIs", 
        "CI/CD", 
        "Server Configuration", 
        "Database Design", 
        "Cloud Deployment", 
        "Real-Time Monitoring"
      ]
    }
  ],
  experience: [
    {
      id: "software-engineer",
      title: "Software Engineer",
      company: "Oshkosh Corporation",
      period: "Dec 2023 - Current",
      responsibilities: [
        "Full-Stack Development: Design, develop, test, and deploy enterprise-grade applications using Python, React.js, ASP.NET, Vue.js, and Ignition SCADA—streamlining operations and boosting system efficiency by 25%.",
        "DevOps Automation: Fulfill DevOps efforts by Implementing CI/CD pipelines with GitHub Actions, achieving 40% faster deployments with zero downtime.",
        "Dashboard Development: Develop real-time monitoring dashboards with JavaScript, Tailwind CSS, and SQL, supporting mission-critical enterprise decisions.",
        "API Integration: Build secure REST APIs to enable cross-system communication, reducing data retrieval latency by 15%."
      ]
    },
    {
      id: "system-engineer",
      title: "System Engineer, Intern",
      company: "Oshkosh Corporation",
      period: "June 2022 - Nov 2023",
      responsibilities: [
        "Cloud-Based Computer Vision: Developed Azure-hosted Computer vision tools using Python, CNNs, and OCR for automate text recognition, achieving 98% accuracy.",
        "Real-Time Monitoring Systems: Created live dashboards with React, JavaScript, Python and SQL, reducing operational downtime by 25% through live data visualization.",
        "Optimized Robotic Operations and Server Management: Reconfigured robotic system operations in C++ to improve welding precision by 30%, while configuring Linux servers to support 24/7 diagnostics, enhancing uptime by 20%."
      ]
    }
  ],
  projects: [
    {
      id: "global-report",
      title: "Global Report Builder Application",
      date: "Aug - Oct 2024",
      subtitle: "Built on Ignition Platform",
      details: [
        "Designed a multi-site global reporting tool enabling users to generate personalized reports across enterprise facilities.",
        "Built the front-end with Vue.js and developed Python-based services on Ignition Perspective and WebDev modules.",
        "Integrated Ignition's MQTT and OPC-UA protocols for real-time data fetching across multiple factory floors.",
        "Configured user authentication, data filtering, and scheduled report exports within the Ignition gateway.",
        "Delivered a scalable platform used by 100+ users across global operations, standardizing site reporting and improving data accessibility."
      ]
    },
    {
      id: "monitoring-dashboard",
      title: "Real-Time System Monitoring Dashboard",
      date: "Jan - Mar 2024",
      details: [
        "Integrated real-time metrics from distributed systems using OPC-UA and Python, storing system health metrics in structured SQL databases.",
        "Designed modular dashboard framework, enabling dynamic visualization of system health metrics and automated threshold-based alerts.",
        "Developed custom APIs to connect bridge cross-platform systems, ensuring real-time seamless data flow and interoperability across platforms.",
        "Reduced latency in anomaly detection by 25%, improving system reliability/enabling ample response to performance issues."
      ]
    },
    {
      id: "dmv-explorer",
      title: "DmvExplorer Web App",
      date: "Jun - Dec 2023",
      details: [
        "Built a location-based web app with Python/Node.js backend and Bootstrap/JavaScript frontend, aggregating real-time data from Yelp Fusion API.",
        "Deployed using Docker on Google Compute Engine for high scalability and uptime.",
        "Structured ETL pipelines with Google Cloud SQL for efficient data processing and API access."
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