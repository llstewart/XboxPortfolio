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

// Initialize the app
function init() {
  // Clear any existing hash and force home page
  window.location.hash = '';
  history.replaceState(null, null, window.location.pathname);

  // Force close Xbox Guide if open
  if (xboxGuide) {
    xboxGuide.classList.add('hidden');
    xboxGuide.style.display = 'none';
  }

  // Hide main content initially
  if (content) {
    content.style.opacity = '0';
  }

  // Start boot animation
  startBootAnimation();

  // Setup event listeners
  setupEventListeners();

  // Update time display
  updateTime();
  setInterval(updateTime, 1000);

  // Generate dynamic content
  generateGameCards();
  generateProjects();
  generateSkills();
  generateExperience();

  // Handle initial routing
  handleRouting();
}

// Xbox Boot Animation
function startBootAnimation() {
  console.log('Starting Xbox boot animation');

  if (bootAnimation) {
    bootAnimation.style.display = 'flex';
    bootAnimation.style.opacity = '1';
  }

  // Reset all elements
  if (bootLogo) bootLogo.style.opacity = '0';
  if (loadingBar) loadingBar.style.opacity = '0';
  if (loadingText) loadingText.style.opacity = '0';
  if (loadingProgress) loadingProgress.style.width = '0%';

  // Logo appears
  setTimeout(() => {
    if (bootLogo) bootLogo.style.opacity = '1';
  }, bootSequenceTimeline.logoAppear);

  // Loading bar appears
  setTimeout(() => {
    if (loadingBar) loadingBar.style.opacity = '1';
  }, bootSequenceTimeline.loadingBarAppear);

  // Loading text appears
  setTimeout(() => {
    if (loadingText) loadingText.style.opacity = '1';
  }, bootSequenceTimeline.loadingTextAppear);

  // Loading completes
  setTimeout(() => {
    if (loadingProgress) loadingProgress.style.width = '100%';
  }, bootSequenceTimeline.loadingComplete);

  // Boot completes
  setTimeout(() => {
    if (bootAnimation) bootAnimation.style.opacity = '0';
  }, bootSequenceTimeline.bootComplete);

  // Remove boot screen and show main content
  setTimeout(() => {
    if (bootAnimation) bootAnimation.style.display = 'none';
    if (content) content.style.opacity = '1';
    
    // Show welcome achievement
    showAchievement('Welcome!', 'Visited the homepage for the first time.');
    console.log('Boot animation complete, showing main content');
  }, bootSequenceTimeline.removeBootScreen);
}

// Update Current Time Display
function updateTime() {
  const now = new Date();
  const time = now.toLocaleTimeString('en-US', { 
    hour: '2-digit', 
    minute: '2-digit',
    hour12: false 
  });
  if (currentTimeEl) {
    currentTimeEl.textContent = time;
  }
}

// Setup Event Listeners
function setupEventListeners() {
  // Sidebar toggle
  if (toggleSidebarBtn) {
    toggleSidebarBtn.addEventListener('click', toggleSidebar);
  }

  // Profile button opens Xbox Guide
  if (profileButton) {
    profileButton.addEventListener('click', openGuide);
  }

  // Home button navigation
  if (homeButton) {
    homeButton.addEventListener('click', () => navigateTo('#home'));
  }

  // Close Xbox Guide
  if (closeGuideBtn) {
    closeGuideBtn.addEventListener('click', closeGuide);
  }

  // Xbox Guide background click to close
  if (xboxGuide) {
    xboxGuide.addEventListener('click', (e) => {
      if (e.target === xboxGuide) {
        closeGuide();
      }
    });
  }

  // Xbox Guide tabs
  guideTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const tabId = tab.getAttribute('data-tab');
      activateGuideTab(tabId);
    });
  });

  // Filter tabs
  filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const filter = tab.getAttribute('data-filter');
      filterGameCards(filter);
      
      // Update active tab
      filterTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
    });
  });

  // Sidebar links
  const sidebarLinks = document.querySelectorAll('.sidebar-link');
  sidebarLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const href = link.getAttribute('href');
      if (href && href.startsWith('#')) {
        navigateTo(href);
        
        // Update active sidebar link
        sidebarLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
        
        // Close sidebar on mobile
        if (window.innerWidth < 768) {
          toggleSidebar();
        }
      }
    });
  });

  // Global keyboard shortcuts
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Home') {
      e.preventDefault();
      openGuide();
    }
    if (e.key === 'Escape' && xboxGuide && !xboxGuide.classList.contains('hidden')) {
      closeGuide();
    }
  });

  // Contact form submission
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      showAchievement('Message Sent!', 'Your contact form has been submitted.');
      contactForm.reset();
    });
  }
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
  console.log('Opening Xbox Guide');
  if (xboxGuide) {
    xboxGuide.classList.remove('hidden');
    xboxGuide.style.display = 'flex';
    showAchievement('Guide Opened', 'Accessed the Xbox Guide interface.');
  }
}

// Close Xbox Guide Overlay
function closeGuide() {
  console.log('Closing Xbox Guide');
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

// Generate Game Cards
function generateGameCards() {
  if (!gameCardsContainer || !resumeData.gameCards) return;
  
  gameCardsContainer.innerHTML = '';
  
  resumeData.gameCards.forEach(card => {
    const cardEl = document.createElement('div');
    cardEl.className = 'relative';
    cardEl.setAttribute('data-category', card.category);
    
    cardEl.innerHTML = `
      <div class="xbox-game-card">
        <img src="${card.coverImage}" alt="${card.title}" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
        <div style="display: none; height: 180px; background: linear-gradient(135deg, #1e1e1e 0%, #2d2d2d 100%); align-items: center; justify-content: center;">
          <i class="fas fa-gamepad" style="font-size: 48px; color: #107C10;"></i>
        </div>
        <div class="xbox-badge">XBOX</div>
        <div class="card-content">
          <h3 class="card-title">${card.title}</h3>
          <p class="card-subtitle">${card.subtitle}</p>
        </div>
      </div>
    `;
    
    // Add click event
    cardEl.querySelector('.xbox-game-card').addEventListener('click', () => {
      launchGameAnimation(card);
      
      if (card.achievements && card.achievements.length > 0) {
        const achievement = card.achievements[0];
        setTimeout(() => {
          showAchievement(achievement.title, achievement.description);
        }, 1000);
      }
      
      setTimeout(() => {
        navigateTo(card.route);
      }, 1500);
    });
    
    gameCardsContainer.appendChild(cardEl);
  });
}

// Filter Game Cards
function filterGameCards(filter) {
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

// Launch Game Animation
function launchGameAnimation(card) {
  // Simple launch effect
  const cardEl = document.querySelector(`[data-category="${card.category}"] .xbox-game-card`);
  if (cardEl) {
    cardEl.style.transform = 'scale(1.1)';
    setTimeout(() => {
      cardEl.style.transform = 'scale(1)';
    }, 300);
  }
}

// Generate Projects
function generateProjects() {
  if (!projectsContainer || !resumeData.projects) return;
  
  projectsContainer.innerHTML = '';
  
  resumeData.projects.forEach(project => {
    const projectEl = document.createElement('div');
    projectEl.className = 'section';
    
    projectEl.innerHTML = `
      <h3 style="font-size: 20px; font-weight: bold; color: #107C10; margin-bottom: 15px;">${project.title}</h3>
      <p style="color: #a0a0a0; margin-bottom: 15px;">${project.description}</p>
      
      <div style="margin-bottom: 15px;">
        <h4 style="font-weight: bold; margin-bottom: 8px;">Key Features:</h4>
        <ul style="list-style: none; padding-left: 0;">
          ${project.features.map(feature => `<li style="color: #a0a0a0; margin-bottom: 5px;">• ${feature}</li>`).join('')}
        </ul>
      </div>
      
      <div style="margin-bottom: 20px;">
        ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
      </div>
      
      <div style="display: flex; gap: 15px;">
        ${project.githubUrl ? `<a href="${project.githubUrl}" target="_blank" class="btn btn-secondary"><i class="fab fa-github"></i> Code</a>` : ''}
        ${project.liveUrl ? `<a href="${project.liveUrl}" target="_blank" class="btn"><i class="fas fa-external-link-alt"></i> Demo</a>` : ''}
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
    skillEl.className = 'section';
    
    skillEl.innerHTML = `
      <h3 style="font-size: 20px; font-weight: bold; color: #107C10; margin-bottom: 20px;">${skillGroup.title}</h3>
      <div style="display: flex; flex-direction: column; gap: 15px;">
        ${skillGroup.items.map(skill => `
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <span style="font-weight: 500;">${skill.name}</span>
            <div style="width: 120px; height: 8px; background: #2d2d2d; border-radius: 4px; overflow: hidden;">
              <div class="skill-progress-fill" style="width: ${skill.proficiency}%; background: #107C10; height: 100%; border-radius: 4px;"></div>
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
      <div class="experience-header" style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 15px; flex-wrap: wrap; gap: 10px;">
        <div>
          <h3 class="experience-title">${exp.title}</h3>
          <h4 class="experience-company">${exp.company}</h4>
        </div>
        <div class="experience-date">${exp.startDate} - ${exp.endDate}</div>
      </div>
      
      <p style="color: #a0a0a0; margin-bottom: 15px;">${exp.description}</p>
      
      <div style="margin-bottom: 15px;">
        <h4 style="font-weight: bold; margin-bottom: 8px;">Key Responsibilities:</h4>
        <ul style="list-style: none; padding-left: 0;">
          ${exp.responsibilities.map(resp => `<li style="color: #a0a0a0; margin-bottom: 5px;">• ${resp}</li>`).join('')}
        </ul>
      </div>
      
      <div>
        ${exp.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
      </div>
    `;
    
    experienceContainer.appendChild(expEl);
  });
}

// Handle Routing
function handleRouting() {
  const hash = window.location.hash || '#home';
  navigateTo(hash);
  
  window.addEventListener('hashchange', () => {
    navigateTo(window.location.hash);
  });
}

// Navigate to Page
function navigateTo(hash) {
  const pages = document.querySelectorAll('.page-content');
  const targetPageId = hash.replace('#', '') + '-page';
  
  pages.forEach(page => {
    page.classList.remove('active');
  });
  
  const targetPage = document.getElementById(targetPageId);
  if (targetPage) {
    targetPage.classList.add('active');
  }
  
  // Update URL
  if (hash !== window.location.hash) {
    history.pushState(null, null, hash);
  }
}

// Show Achievement Notification
function showAchievement(title, description) {
  const achievementKey = title + description;
  if (shownAchievements.has(achievementKey)) return;
  
  shownAchievements.add(achievementKey);
  
  const achievement = document.createElement('div');
  achievement.className = 'achievement';
  achievement.innerHTML = `
    <div style="display: flex; align-items: start;">
      <div style="width: 48px; height: 48px; border-radius: 50%; background: #107C10; display: flex; align-items: center; justify-content: center; margin-right: 15px; flex-shrink: 0;">
        <i class="fas fa-trophy" style="color: white;"></i>
      </div>
      <div>
        <h4 style="font-weight: bold; color: white;">${title}</h4>
        <p style="font-size: 12px; color: #a0a0a0; margin-bottom: 5px;">${description}</p>
        <div style="font-size: 12px; color: #107C10;">+15G</div>
      </div>
    </div>
  `;
  
  const container = document.getElementById('achievement-container');
  if (container) {
    container.appendChild(achievement);
    
    setTimeout(() => {
      achievement.remove();
    }, 4000);
  }
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', init);