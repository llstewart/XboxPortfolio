// Resume Data
const resumeData = {
  profile: {
    name: "Lincoln Stewart",
    title: "Software Engineer",
    location: "Milwaukee, WI",
    email: "lincoln.stewart@example.com",
    phone: "(555) 123-4567",
    linkedin: "linkedin.com/in/lincolnstewart",
    github: "github.com/lincolnstewart"
  },
  
  skills: [
    {
      id: "programming",
      title: "Programming Languages",
      items: [
        { name: "Python", proficiency: 90 },
        { name: "JavaScript", proficiency: 85 },
        { name: "Java", proficiency: 80 },
        { name: "C/C++", proficiency: 75 },
        { name: "SQL", proficiency: 85 },
        { name: "HTML/CSS", proficiency: 90 }
      ]
    },
    {
      id: "frameworks",
      title: "Frameworks & Libraries",
      items: [
        { name: "React.js", proficiency: 85 },
        { name: "Node.js", proficiency: 80 },
        { name: "Django", proficiency: 75 },
        { name: "Flask", proficiency: 80 },
        { name: "Vue.js", proficiency: 70 },
        { name: "Bootstrap", proficiency: 85 }
      ]
    },
    {
      id: "tools",
      title: "Tools & Platforms",
      items: [
        { name: "Docker", proficiency: 75 },
        { name: "Git", proficiency: 90 },
        { name: "AWS", proficiency: 70 },
        { name: "Google Cloud", proficiency: 65 },
        { name: "MongoDB", proficiency: 75 },
        { name: "PostgreSQL", proficiency: 80 }
      ]
    }
  ],
  
  experience: [
    {
      id: "software-engineer",
      title: "Software Engineer",
      company: "TechCorp Solutions",
      location: "Milwaukee, WI",
      startDate: "Jan 2023",
      endDate: "Present",
      description: "Developed and maintained full-stack web applications using Python, JavaScript, and React. Collaborated with cross-functional teams to deliver high-quality software solutions.",
      responsibilities: [
        "Built responsive web applications using React.js and Node.js",
        "Designed and implemented RESTful APIs with Python/Django",
        "Collaborated with UI/UX designers to create intuitive user interfaces",
        "Participated in code reviews and maintained high coding standards",
        "Deployed applications using Docker and cloud platforms"
      ],
      technologies: ["Python", "React", "Node.js", "PostgreSQL", "Docker", "AWS"]
    },
    {
      id: "junior-developer",
      title: "Junior Developer",
      company: "StartupHub Inc",
      location: "Milwaukee, WI",
      startDate: "Jun 2022",
      endDate: "Dec 2022",
      description: "Built responsive web interfaces and implemented RESTful APIs. Gained experience in agile development methodologies and version control.",
      responsibilities: [
        "Developed front-end components using HTML, CSS, and JavaScript",
        "Implemented backend APIs using Node.js and Express",
        "Worked with databases to store and retrieve application data",
        "Participated in daily standups and sprint planning meetings",
        "Maintained and updated existing web applications"
      ],
      technologies: ["JavaScript", "Node.js", "Express", "MongoDB", "Git"]
    }
  ],
  
  projects: [
    {
      id: "ecommerce-platform",
      title: "E-Commerce Platform",
      description: "Full-stack e-commerce application with user authentication, product catalog, shopping cart, and payment processing. Built with React frontend and Python backend.",
      technologies: ["React", "Python", "Django", "PostgreSQL", "Stripe", "Docker"],
      features: [
        "User authentication and authorization",
        "Product catalog with search and filtering",
        "Shopping cart and checkout process",
        "Payment integration with Stripe",
        "Admin dashboard for inventory management"
      ],
      githubUrl: "https://github.com/lincolnstewart/ecommerce-platform",
      liveUrl: "https://ecommerce-demo.example.com",
      imageUrl: "images/projects-card.svg"
    },
    {
      id: "task-management",
      title: "Task Management App",
      description: "Collaborative task management application with real-time updates, drag-and-drop functionality, and team collaboration features.",
      technologies: ["Vue.js", "Node.js", "Socket.io", "MongoDB", "Express"],
      features: [
        "Real-time collaboration with Socket.io",
        "Drag-and-drop task organization",
        "Team member management",
        "Progress tracking and reporting",
        "Mobile-responsive design"
      ],
      githubUrl: "https://github.com/lincolnstewart/task-manager",
      liveUrl: "https://taskmanager-demo.example.com",
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
        "Deployed on Google Compute Engine"
      ],
      githubUrl: "https://github.com/lincolnstewart/dmv-explorer",
      imageUrl: "images/projects-card.svg"
    }
  ],
  
  education: [
    {
      id: "bs-computer-science",
      degree: "BS, Computer Science & Engineering",
      school: "University of Wisconsin - Madison",
      location: "Madison, WI",
      startDate: "Aug 2019",
      endDate: "May 2023",
      gpa: "3.7/4.0",
      description: "Graduated with honors. Focused on software development, data structures, and algorithms. Participated in software engineering projects and hackathons.",
      relevantCourses: [
        "Data Structures and Algorithms",
        "Software Engineering",
        "Database Management Systems",
        "Web Development",
        "Computer Networks",
        "Operating Systems"
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