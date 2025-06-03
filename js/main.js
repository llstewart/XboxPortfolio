// Track shown achievements for the current session
const shownAchievements = new Set();

// DOM Elements
const bootAnimation = document.getElementById('xbox-boot-animation');
const bootLogo = document.getElementById('xbox-logo');
const loadingBar = document.getElementById('loading-bar');
const loadingProgress = document.getElementById('loading-progress');
const loadingText = document.getElementById('loading-text');
const sidebar = document.getElementById('xbox-sidebar');
const toggleSidebarBtn = document.getElementById('toggle-sidebar');
const content = document.getElementById('content');
const currentTimeEl = document.getElementById('current-time');
const profileButton = document.getElementById('profile-button');
const homeButton = document.getElementById('home-button');
const xboxGuide = document.getElementById('xbox-guide');
const closeGuideBtn = document.getElementById('close-guide');
const guideTabs = document.querySelectorAll('.guide-tab-btn');
const guideContents = document.querySelectorAll('.guide-tab-content');
const filterTabs = document.querySelectorAll('.filter-tab');
const gameCardsContainer = document.getElementById('game-cards');
const projectsContainer = document.getElementById('projects-container');
const skillsContainer = document.getElementById('skills-container');
const experienceContainer = document.getElementById('experience-container');
const contactForm = document.getElementById('contact-form');

let sidebarOpen = false;

// Boot Animation Timeline
const bootSequenceTimeline = {
  logoAppear: 500,
  loadingBarAppear: 1500,
  loadingTextAppear: 2000,
  loadingComplete: 2500,
  bootComplete: 4000,
  removeBootScreen: 4500
};

// Update Role Timer
function updateRoleTimer() {
  const roleHoursEl = document.getElementById('role-hours');
  const roleMinutesEl = document.getElementById('role-minutes');
  const roleSecondsEl = document.getElementById('role-seconds');
  
  if (!roleHoursEl || !roleMinutesEl || !roleSecondsEl) return;
  
  // Start date: June 1, 2022
  const startDate = new Date(2022, 5, 1); // Month is 0-based, so 5 = June
  
  function updateTime() {
    const now = new Date();
    const diff = now - startDate;
    
    // Calculate hours, minutes, seconds
    const totalHours = Math.floor(diff / (1000 * 60 * 60));
    const totalMinutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const totalSeconds = Math.floor((diff % (1000 * 60)) / 1000);
    
    // Format with commas for thousands
    const formattedHours = totalHours.toLocaleString('en-US');
    
    roleHoursEl.textContent = formattedHours;
    roleMinutesEl.textContent = totalMinutes.toString().padStart(2, '0');
    roleSecondsEl.textContent = totalSeconds.toString().padStart(2, '0');
  }
  
  // Update immediately and then every second
  updateTime();
  setInterval(updateTime, 1000);
}

// Initialize the app
function init() {
  // Force close Xbox Guide if open
  if (xboxGuide) {
    xboxGuide.classList.add('hidden');
    xboxGuide.style.display = 'none';
  }

  // Hide main content initially
  if (content) {
    content.style.opacity = '0';
  }

  // Start boot animation if it exists
  if (bootAnimation) {
    startBootAnimation();
  } else {
    // If no boot animation, show content immediately
    if (content) {
      content.style.opacity = '1';
    }
  }

  // Setup event listeners
  setupEventListeners();

  // Update time display
  updateTime();
  setInterval(updateTime, 1000);

  // Update role timer
  updateRoleTimer();

  // Generate dynamic content based on current page
  if (gameCardsContainer) generateGameCards();
  if (projectsContainer) generateProjects();
  if (skillsContainer) generateSkills();
  if (experienceContainer) generateExperience();
}

// Start Boot Animation
function startBootAnimation() {
  if (!bootAnimation) return;

  setTimeout(() => {
    bootLogo.style.opacity = '1';
  }, bootSequenceTimeline.logoAppear);

  setTimeout(() => {
    loadingBar.style.opacity = '1';
  }, bootSequenceTimeline.loadingBarAppear);

  setTimeout(() => {
    loadingText.style.opacity = '1';
  }, bootSequenceTimeline.loadingTextAppear);

  setTimeout(() => {
    loadingProgress.style.width = '100%';
  }, bootSequenceTimeline.loadingComplete);

  setTimeout(() => {
    bootAnimation.style.opacity = '0';
  }, bootSequenceTimeline.bootComplete);

  setTimeout(() => {
    bootAnimation.style.display = 'none';
    if (content) {
      content.style.opacity = '1';
    }
  }, bootSequenceTimeline.removeBootScreen);
}

// Setup Event Listeners
function setupEventListeners() {
  if (toggleSidebarBtn) {
    toggleSidebarBtn.addEventListener('click', toggleSidebar);
  }

  if (profileButton) {
    profileButton.addEventListener('click', openGuide);
  }

  if (homeButton) {
    homeButton.addEventListener('click', () => {
      window.location.href = 'index.html';
    });
  }

  if (closeGuideBtn) {
    closeGuideBtn.addEventListener('click', closeGuide);
  }

  if (guideTabs) {
    guideTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const tabId = tab.getAttribute('data-tab');
        activateGuideTab(tabId);
      });
    });
  }

  if (filterTabs) {
    filterTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const filter = tab.getAttribute('data-filter');
        filterGameCards(filter);
        
        filterTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
      });
    });
  }

  if (contactForm) {
    contactForm.addEventListener('submit', handleContactSubmit);
  }
}

// Update Time Display
function updateTime() {
  if (!currentTimeEl) return;
  
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, '0');
  const minutes = now.getMinutes().toString().padStart(2, '0');
  currentTimeEl.textContent = `${hours}:${minutes}`;
}

// Toggle Sidebar
function toggleSidebar() {
  sidebarOpen = !sidebarOpen;
  updateSidebarState();
}

// Update Sidebar and Content positioning
function updateSidebarState() {
  if (sidebar && content) {
    if (sidebarOpen) {
      sidebar.classList.add('open');
      content.classList.add('sidebar-open');
    } else {
      sidebar.classList.remove('open');
      content.classList.remove('sidebar-open');
    }
  }
}

// Open Xbox Guide Overlay
function openGuide() {
  if (xboxGuide) {
    xboxGuide.classList.remove('hidden');
    xboxGuide.style.display = 'flex';
  }
}

// Close Xbox Guide Overlay
function closeGuide() {
  if (xboxGuide) {
    xboxGuide.classList.add('hidden');
    xboxGuide.style.display = 'none';
  }
}

// Activate Xbox Guide Tab
function activateGuideTab(tabId) {
  // Update tab buttons
  guideTabs.forEach(tab => {
    if (tab.getAttribute('data-tab') === tabId) {
      tab.classList.add('active');
      tab.style.color = '#107C10';
    } else {
      tab.classList.remove('active');
      tab.style.color = '#a0a0a0';
    }
  });

  // Update tab content
  guideContents.forEach(content => {
    if (content.getAttribute('data-tab') === tabId) {
      content.classList.add('active');
      content.style.display = 'block';
    } else {
      content.classList.remove('active');
      content.style.display = 'none';
    }
  });
}

// Filter Game Cards
function filterGameCards(filter) {
  if (!gameCardsContainer) return;
  
  const cards = gameCardsContainer.querySelectorAll('[data-category]');
  
  cards.forEach(card => {
    const category = card.getAttribute('data-category');
    if (filter === 'all' || category === filter) {
      card.style.display = 'block';
    } else {
      card.style.display = 'none';
    }
  });
}

// Handle Contact Form Submit
function handleContactSubmit(e) {
  e.preventDefault();
  // Add your contact form submission logic here
  console.log('Contact form submitted');
}

// Generate Game Cards
function generateGameCards() {
  if (!gameCardsContainer || !resumeData.gameCards) return;
  
  gameCardsContainer.innerHTML = '';
  
  resumeData.gameCards.forEach(card => {
    const cardEl = document.createElement('div');
    cardEl.className = 'xbox-game-card';
    cardEl.setAttribute('data-category', card.category || 'all');
    
    cardEl.innerHTML = `
      <img src="${card.coverImage || 'images/default-game.jpg'}" alt="${card.title}" style="width: 100%; height: 100%; object-fit: cover;">
      <div class="launch-overlay">
        <div class="launch-content">
          <h3>${card.title}</h3>
          <p style="font-size: 14px; margin: 8px 0;">${card.subtitle}</p>
          <button class="launch-btn">Launch</button>
        </div>
      </div>
    `;
    
    cardEl.addEventListener('click', () => {
      // Convert route to actual page URL
      const pageUrl = card.route.replace('#', '') + '.html';
      window.location.href = pageUrl;
    });
    
    gameCardsContainer.appendChild(cardEl);
  });
}

// Generate Projects
function generateProjects() {
  if (!projectsContainer || !resumeData.projects) return;
  
  projectsContainer.innerHTML = '';
  
  resumeData.projects.forEach(project => {
    const projectEl = document.createElement('div');
    projectEl.className = 'xbox-card';
    
    projectEl.innerHTML = `
      <div class="xbox-card-header">
        <div class="xbox-card-badge">PROJECT</div>
        <h2>${project.title}</h2>
        <p>${project.description}</p>
        ${project.dateRange ? `<div style="color: var(--xbox-green); font-size: 12px; margin-top: 8px;">${project.dateRange}</div>` : ''}
      </div>
      <div class="xbox-card-content">
        <div style="margin-bottom: 20px;">
          <h4 style="color: var(--xbox-green); margin-bottom: 12px;">Key Features:</h4>
          <ul class="project-features">
            ${project.features.map(feature => `<li>${feature}</li>`).join('')}
          </ul>
        </div>
        
        <div class="project-tech-tags">
          ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
        </div>
        
        <div class="project-links">
          ${project.githubUrl ? `<a href="${project.githubUrl}" target="_blank" class="xbox-button"><i class="fab fa-github"></i> View Code</a>` : ''}
          ${project.liveUrl ? `<a href="${project.liveUrl}" target="_blank" class="xbox-button"><i class="fas fa-external-link-alt"></i> Live Demo</a>` : ''}
        </div>
      </div>
    `;
    
    projectsContainer.appendChild(projectEl);
  });
}

// Generate Skills
function generateSkills() {
  if (!skillsContainer || !resumeData.skills) return;
  
  skillsContainer.innerHTML = '';
  
  resumeData.skills.forEach(skillGroup => {
    const skillEl = document.createElement('div');
    skillEl.className = 'skill-category';
    
    skillEl.innerHTML = `
      <div class="xbox-card-header" style="padding: 0; border-bottom: 1px solid rgba(255, 255, 255, 0.1); margin-bottom: 20px; padding-bottom: 15px;">
        <div class="xbox-card-badge">SKILLS</div>
        <h2 style="margin: 0;">${skillGroup.title}</h2>
      </div>
      <div class="skills-list">
        ${skillGroup.items.map(skill => `
          <div class="skill-item">
            <span class="skill-name">${skill.name}</span>
            <div class="skill-bar-container">
              <div class="skill-bar" style="width: ${skill.proficiency}%;"></div>
            </div>
          </div>
        `).join('')}
      </div>
    `;
    
    skillsContainer.appendChild(skillEl);
  });
}

// Generate Experience
function generateExperience() {
  if (!experienceContainer || !resumeData.experience) return;
  
  experienceContainer.innerHTML = '';
  
  resumeData.experience.forEach(exp => {
    const expEl = document.createElement('div');
    expEl.className = 'experience-item';
    
    expEl.innerHTML = `
      <div class="experience-header">
        <div>
          <h3 class="experience-title">${exp.title}</h3>
          <h4 class="experience-company">${exp.company}</h4>
          <div class="experience-location">${exp.location}</div>
        </div>
        <div class="experience-date">${exp.startDate} - ${exp.endDate}</div>
      </div>
      
      <div class="experience-description">${exp.description}</div>
      
      <div style="margin-bottom: 20px;">
        <h4 style="color: var(--xbox-green); margin-bottom: 15px;">Key Responsibilities:</h4>
        <ul class="experience-responsibilities">
          ${exp.responsibilities.map(resp => `<li>${resp}</li>`).join('')}
        </ul>
      </div>
      
      <div class="project-tech-tags">
        ${exp.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
      </div>
    `;
    
    experienceContainer.appendChild(expEl);
  });
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', init);