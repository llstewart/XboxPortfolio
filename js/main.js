// Track shown achievements for the current session
const shownAchievements = new Set();

// DOM Elements
const bootAnimation = document.getElementById('xbox-boot-animation');
const bootLogo = document.getElementById('xbox-logo');
const loadingBar = document.getElementById('loading-bar');
const loadingProgress = document.getElementById('loading-progress');
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
const pageContainer = document.getElementById('page-container');
const filterTabs = document.querySelectorAll('.filter-tab');
const gameCardsContainer = document.getElementById('game-cards');
const projectsContainer = document.getElementById('projects-container');
const skillsContainer = document.getElementById('skills-container');
const experienceContainer = document.getElementById('experience-container');
const contactForm = document.getElementById('contact-form');

let sidebarOpen = window.innerWidth >= 768;
updateSidebarState();

// Boot Animation Timeline
const bootSequenceTimeline = {
  logoAppear: 500,
  loadingBarAppear: 1500,
  loadingComplete: 2000,
  logoPulse: 4000,
  bootComplete: 5000,
  removeBootScreen: 5500
};

// Initialize the app
function init() {
  // Always reset to home page on load and clear any existing hash
  history.replaceState(null, null, window.location.pathname);
  window.location.hash = '';
  
  // Start boot animation
  startBootAnimation();
  
  // Update time
  updateTime();
  setInterval(updateTime, 60000);
  
  // Set up event listeners
  setupEventListeners();
  
  // Generate content from data
  generateGameCards();
  generateProjects();
  generateSkills();
  generateExperience();
  
  // Initialize page routing after boot animation completes
  setTimeout(() => {
    navigateTo('#home');
    handleRouting();
  }, bootSequenceTimeline.removeBootScreen + 100);
}

// Xbox Boot Animation
function startBootAnimation() {
  // Always show boot animation on fresh page load, ignore user setting for initial load
  const isPageRefresh = !sessionStorage.getItem('hasVisited');
  
  if (!isPageRefresh) {
    // Check if boot animation should be skipped for subsequent loads
    const skipBoot = localStorage.getItem('xbox-skip-boot') === 'true';
    if (skipBoot) {
      bootAnimation.style.display = 'none';
      return;
    }
  }
  
  // Mark that user has visited
  sessionStorage.setItem('hasVisited', 'true');
  
  // Ensure boot animation is visible
  bootAnimation.style.display = 'flex';
  bootAnimation.classList.remove('opacity-0');
  bootLogo.classList.remove('opacity-100');
  loadingBar.classList.remove('opacity-100');
  loadingProgress.style.width = '0%';
  
  // Animate logo appearance
  setTimeout(() => {
    bootLogo.classList.add('opacity-100');
  }, bootSequenceTimeline.logoAppear);
  
  // Animate loading bar appearance
  setTimeout(() => {
    loadingBar.classList.add('opacity-100');
  }, bootSequenceTimeline.loadingBarAppear);
  
  // Animate loading progress
  setTimeout(() => {
    loadingProgress.style.width = '100%';
  }, bootSequenceTimeline.loadingComplete);
  
  // Complete boot sequence
  setTimeout(() => {
    bootAnimation.classList.add('opacity-0');
  }, bootSequenceTimeline.bootComplete);
  
  // Remove boot animation from DOM and show main content
  setTimeout(() => {
    bootAnimation.style.display = 'none';
    content.style.opacity = '1';
  }, bootSequenceTimeline.removeBootScreen);
}

// Update Current Time Display
function updateTime() {
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, '0');
  const minutes = now.getMinutes().toString().padStart(2, '0');
  currentTimeEl.textContent = `${hours}:${minutes}`;
}

// Set up Event Listeners
function setupEventListeners() {
  // Toggle Sidebar
  toggleSidebarBtn.addEventListener('click', toggleSidebar);
  
  // Profile Button (Open Guide)
  profileButton.addEventListener('click', openGuide);
  
  // Home Button (Go to Home)
  homeButton.addEventListener('click', () => navigateTo('#home'));
  
  // Close Guide Button
  closeGuideBtn.addEventListener('click', closeGuide);
  
  // Guide Tab Buttons
  guideTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const tabId = tab.getAttribute('data-tab');
      activateGuideTab(tabId);
    });
  });
  
  // Filter Tabs
  filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const filter = tab.getAttribute('data-filter');
      filterGameCards(filter);
      
      // Update active state
      filterTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
    });
  });
  
  // Sidebar Links
  document.querySelectorAll('.sidebar-link').forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href.startsWith('#')) {
        e.preventDefault();
        navigateTo(href);
      }
    });
  });
  
  // Contact Form
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      showAchievement('Message Sent!', 'Your message has been submitted successfully.');
    });
  }
  
  // Keyboard Navigation
  document.addEventListener('keydown', (e) => {
    // Xbox Guide Button (Home key)
    if (e.key === 'Home') {
      e.preventDefault();
      if (xboxGuide.classList.contains('hidden')) {
        openGuide();
      } else {
        closeGuide();
      }
    }
    
    // B Button (Escape key) - Close Guide
    if (e.key === 'Escape' && !xboxGuide.classList.contains('hidden')) {
      closeGuide();
    }
  });
  
  // Settings toggles
  const bootAnimToggle = document.getElementById('boot-animation-toggle');
  if (bootAnimToggle) {
    bootAnimToggle.checked = localStorage.getItem('xbox-skip-boot') !== 'true';
    bootAnimToggle.addEventListener('change', () => {
      localStorage.setItem('xbox-skip-boot', !bootAnimToggle.checked);
    });
  }
  
  const achievementsToggle = document.getElementById('achievements-toggle');
  if (achievementsToggle) {
    achievementsToggle.checked = localStorage.getItem('xbox-disable-achievements') !== 'true';
    achievementsToggle.addEventListener('change', () => {
      localStorage.setItem('xbox-disable-achievements', !achievementsToggle.checked);
    });
  }
}

// Sidebar Toggle
function toggleSidebar() {
  sidebarOpen = !sidebarOpen;
  updateSidebarState();
}

// Update Sidebar and Content positioning
function updateSidebarState() {
  if (sidebarOpen) {
    sidebar.style.transform = 'translateX(0)';
    content.style.paddingLeft = '14rem'; // 56px (w-56)
  } else {
    sidebar.style.transform = 'translateX(-100%)';
    content.style.paddingLeft = '0';
  }
}

// Open Xbox Guide Overlay
function openGuide() {
  xboxGuide.classList.remove('hidden');
  activateGuideTab('profile');
  showAchievement('Guide Opened', 'Accessed the Xbox Guide menu!');
}

// Close Xbox Guide Overlay
function closeGuide() {
  xboxGuide.classList.add('hidden');
}

// Activate Guide Tab
function activateGuideTab(tabId) {
  // Update tab buttons
  guideTabs.forEach(tab => {
    if (tab.getAttribute('data-tab') === tabId) {
      tab.classList.add('active');
    } else {
      tab.classList.remove('active');
    }
  });
  
  // Update tab content
  guideContents.forEach(content => {
    if (content.getAttribute('data-tab') === tabId) {
      content.classList.add('active');
    } else {
      content.classList.remove('active');
    }
  });
}

// Generate Game Cards for Homepage
function generateGameCards() {
  if (!gameCardsContainer) return;
  
  gameCardsContainer.innerHTML = '';
  
  resumeData.gameCards.forEach(card => {
    const cardEl = document.createElement('div');
    cardEl.className = 'relative';
    cardEl.setAttribute('data-category', card.category);
    
    cardEl.innerHTML = `
      <div class="xbox-game-card relative rounded-lg overflow-hidden cursor-pointer transition-all duration-300 shadow-md">
        <div class="absolute inset-0 bg-cover bg-center transition-transform duration-300" 
             style="background-image: url('${card.coverImage || 'https://via.placeholder.com/210x280/1e1e1e/107C10?text=Xbox+Game'}');">
        </div>
        
        <div class="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70"></div>
        
        <div class="absolute bottom-0 left-0 right-0 p-4 text-white">
          <h3 class="text-lg font-bold text-white mb-1">${card.title}</h3>
          ${card.subtitle ? `<p class="text-sm text-gray-300 mb-2">${card.subtitle}</p>` : ''}
        </div>
        
        <div class="absolute top-3 right-3 bg-xbox-green text-white text-xs px-2 py-1 rounded font-bold">
          XBOX
        </div>
        
        <div class="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-70 flex flex-col justify-center items-center z-10 p-4 transition-all duration-200 opacity-0 hover:opacity-100">
          <h4 class="text-xl font-bold text-xbox-green mb-3">${card.title}</h4>
          ${card.description ? `<p class="text-sm text-gray-300 mb-4 text-center">${card.description}</p>` : ''}
          <div class="text-sm text-white bg-xbox-green px-4 py-2 rounded-md inline-block mt-2 font-semibold hover:bg-xbox-light-green transition-colors">
            Launch
          </div>
        </div>
      </div>
    `;
    
    // Add click event for navigation and achievements
    cardEl.querySelector('.xbox-game-card').addEventListener('click', () => {
      // Show launch animation
      launchGameAnimation(card);
      
      // Show achievement if available
      if (card.achievements && card.achievements.length > 0) {
        const achievement = card.achievements[0];
        setTimeout(() => {
          showAchievement(achievement.title, achievement.description);
        }, 1000);
      }
      
      // Navigate to the route after animation completes
      setTimeout(() => {
        navigateTo(card.route);
      }, 1500);
    });
    
    gameCardsContainer.appendChild(cardEl);
  });
}

// Filter Game Cards on Homepage
function filterGameCards(filter) {
  const cards = document.querySelectorAll('#game-cards > div');
  
  cards.forEach(card => {
    const category = card.getAttribute('data-category');
    
    if (filter === 'all' || category === filter) {
      card.style.display = 'block';
    } else {
      card.style.display = 'none';
    }
  });
}

// Game Launch Animation
function launchGameAnimation(card) {
  // Create overlay
  const overlay = document.createElement('div');
  overlay.className = 'fixed inset-0 bg-black bg-opacity-80 z-40 flex items-center justify-center';
  
  overlay.innerHTML = `
    <div class="text-center">
      <div class="w-24 h-24 rounded-full bg-xbox-green mx-auto flex items-center justify-center animate-pulse">
        <span class="text-white font-bold text-2xl">X</span>
      </div>
      <p class="text-white mt-4 text-lg">Loading ${card.title}...</p>
    </div>
  `;
  
  document.body.appendChild(overlay);
  
  // Remove after animation completes
  setTimeout(() => {
    document.body.removeChild(overlay);
  }, 1500);
}

// Generate Projects
function generateProjects() {
  if (!projectsContainer) return;
  
  projectsContainer.innerHTML = '';
  
  resumeData.projects.forEach(project => {
    const projectEl = document.createElement('div');
    projectEl.className = 'bg-xbox-dark rounded-lg overflow-hidden';
    
    projectEl.innerHTML = `
      <div class="p-6 cursor-pointer hover:bg-xbox-gray transition-colors duration-200 flex justify-between items-start project-header" data-id="${project.id}">
        <h2 class="text-xl font-bold text-xbox-green">${project.title}</h2>
        <div class="flex items-center">
          <div class="text-sm text-gray-400 mr-3">${project.date}</div>
          <div class="transform transition-transform duration-200">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </div>
        </div>
      </div>
      
      <div class="p-6 pt-0 border-t border-xbox-gray animate-fadeIn project-details" data-id="${project.id}" style="display: none;">
        ${project.subtitle ? `<p class="text-gray-300 mb-4">${project.subtitle}</p>` : ''}
        <ul class="space-y-2 text-gray-300">
          ${project.details.map(detail => `
            <li class="flex">
              <span class="text-xbox-green mr-2">•</span>
              <span>${detail}</span>
            </li>
          `).join('')}
        </ul>
      </div>
    `;
    
    projectsContainer.appendChild(projectEl);
  });
  
  // Add click event for toggling project details
  document.querySelectorAll('.project-header').forEach(header => {
    header.addEventListener('click', () => {
      const projectId = header.getAttribute('data-id');
      const detailsEl = document.querySelector(`.project-details[data-id="${projectId}"]`);
      const arrowEl = header.querySelector('svg').parentElement;
      
      if (detailsEl.style.display === 'none') {
        detailsEl.style.display = 'block';
        arrowEl.classList.add('rotate-180');
        
        // Show achievement first time viewing any project
        if (!sessionStorage.getItem('project-viewed')) {
          sessionStorage.setItem('project-viewed', 'true');
          showAchievement('Project Inspector', 'Examined your first project in detail!');
        }
      } else {
        detailsEl.style.display = 'none';
        arrowEl.classList.remove('rotate-180');
      }
    });
  });
}

// Generate Skills
function generateSkills() {
  if (!skillsContainer) return;
  
  skillsContainer.innerHTML = '';
  
  resumeData.skills.forEach(category => {
    const categoryEl = document.createElement('div');
    categoryEl.className = 'bg-xbox-dark rounded-lg overflow-hidden';
    
    categoryEl.innerHTML = `
      <div class="p-6 cursor-pointer hover:bg-xbox-gray transition-colors duration-200 flex justify-between items-center skill-header" data-id="${category.id}">
        <h2 class="text-xl font-bold text-xbox-green">${category.title}</h2>
        <div class="transform transition-transform duration-200">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </div>
      </div>
      
      <div class="p-6 pt-0 border-t border-xbox-gray animate-fadeIn skill-details" data-id="${category.id}" style="display: none;">
        <ul class="space-y-2 text-gray-300 mt-4">
          ${category.skills.map(skill => `
            <li class="flex items-center">
              <span class="w-2 h-2 bg-xbox-green rounded-full mr-2"></span>
              <span>${skill}</span>
            </li>
          `).join('')}
        </ul>
      </div>
    `;
    
    skillsContainer.appendChild(categoryEl);
  });
  
  // Add click event for toggling skill details
  document.querySelectorAll('.skill-header').forEach(header => {
    header.addEventListener('click', () => {
      const categoryId = header.getAttribute('data-id');
      const detailsEl = document.querySelector(`.skill-details[data-id="${categoryId}"]`);
      const arrowEl = header.querySelector('svg').parentElement;
      
      if (detailsEl.style.display === 'none') {
        detailsEl.style.display = 'block';
        arrowEl.classList.add('rotate-180');
        
        // Show achievement first time viewing any skill
        if (!sessionStorage.getItem('skill-viewed')) {
          sessionStorage.setItem('skill-viewed', 'true');
          showAchievement('Skill Master', 'Discovered your areas of expertise!');
        }
      } else {
        detailsEl.style.display = 'none';
        arrowEl.classList.remove('rotate-180');
      }
    });
  });
}

// Generate Experience
function generateExperience() {
  if (!experienceContainer) return;
  
  experienceContainer.innerHTML = '';
  
  resumeData.experience.forEach(experience => {
    const experienceEl = document.createElement('div');
    experienceEl.className = 'bg-xbox-dark rounded-lg overflow-hidden';
    
    experienceEl.innerHTML = `
      <div class="p-6 cursor-pointer hover:bg-xbox-gray transition-colors duration-200 experience-header" data-id="${experience.id}">
        <div class="flex flex-col md:flex-row md:justify-between md:items-start">
          <div>
            <h2 class="text-xl font-bold text-xbox-green">${experience.title}</h2>
            <h3 class="text-lg">${experience.company}</h3>
          </div>
          <div class="flex items-center mt-2 md:mt-0">
            <div class="text-gray-400 mr-3">${experience.period}</div>
            <div class="transform transition-transform duration-200">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </div>
          </div>
        </div>
      </div>
      
      <div class="p-6 pt-0 border-t border-xbox-gray animate-fadeIn experience-details" data-id="${experience.id}" style="display: none;">
        <ul class="space-y-3 text-gray-300 mt-4">
          ${experience.responsibilities.map(responsibility => `
            <li class="flex">
              <span class="text-xbox-green mr-2">•</span>
              <span>${responsibility}</span>
            </li>
          `).join('')}
        </ul>
      </div>
    `;
    
    experienceContainer.appendChild(experienceEl);
  });
  
  // Add click event for toggling experience details
  document.querySelectorAll('.experience-header').forEach(header => {
    header.addEventListener('click', () => {
      const experienceId = header.getAttribute('data-id');
      const detailsEl = document.querySelector(`.experience-details[data-id="${experienceId}"]`);
      const arrowEl = header.querySelector('svg').parentElement;
      
      if (detailsEl.style.display === 'none') {
        detailsEl.style.display = 'block';
        arrowEl.classList.add('rotate-180');
        
        // Show achievement first time viewing any experience
        if (!sessionStorage.getItem('experience-viewed')) {
          sessionStorage.setItem('experience-viewed', 'true');
          showAchievement('Career Explorer', 'Discovered professional experience details!');
        }
      } else {
        detailsEl.style.display = 'none';
        arrowEl.classList.remove('rotate-180');
      }
    });
  });
}

// Handle Page Navigation/Routing
function handleRouting() {
  // Always start at home page
  navigateTo('#home');
  
  // Listen for hash changes
  window.addEventListener('hashchange', () => {
    const hash = window.location.hash || '#home';
    navigateTo(hash);
  });
}

// Navigate to a specific page
function navigateTo(hash) {
  const pageName = hash.substring(1) || 'home';
  
  // Hide all pages
  const pages = document.querySelectorAll('.page-content');
  pages.forEach(page => {
    page.classList.remove('active');
  });
  
  // Show the selected page
  const targetPage = document.getElementById(`${pageName}-page`);
  if (targetPage) {
    targetPage.classList.add('active');
    
    // Show welcome achievement on first home visit
    if (pageName === 'home' && !sessionStorage.getItem('home-visited')) {
      sessionStorage.setItem('home-visited', 'true');
      showAchievement('Welcome!', 'Visited the homepage for the first time.');
    }
  }
  
  // Update active state in sidebar
  document.querySelectorAll('.sidebar-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href === hash) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
  
  // Close sidebar on mobile after navigation
  if (window.innerWidth < 768) {
    sidebarOpen = false;
    updateSidebarState();
  }
}

// Generate Xbox achievement style notification
function showAchievement(title, description) {
  // Check if achievements are disabled
  if (localStorage.getItem('xbox-disable-achievements') === 'true') {
    return;
  }
  
  // Create unique ID for this achievement to track if it's been shown
  const achievementId = `${title}:${description}`;
  
  // Check if we've already shown this achievement in this session
  if (shownAchievements.has(achievementId)) {
    return;
  }
  
  // Mark this achievement as shown
  shownAchievements.add(achievementId);
  
  // Create achievement notification container if it doesn't exist
  const achievementContainer = document.getElementById('achievement-container');
  if (!achievementContainer) return;
  
  // Create the achievement element
  const achievementEl = document.createElement('div');
  achievementEl.className = 'achievement-notification flex items-center bg-xbox-dark border border-xbox-gray rounded-md p-3 mb-3 transform translate-x-full opacity-0 transition-all duration-500';
  achievementEl.style.boxShadow = '0 0 10px rgba(16, 124, 16, 0.5)';
  
  // Add achievement icon
  const iconEl = document.createElement('div');
  iconEl.className = 'w-10 h-10 rounded-full bg-xbox-green flex items-center justify-center mr-3 flex-shrink-0';
  iconEl.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>';
  
  // Achievement content
  const contentEl = document.createElement('div');
  contentEl.className = 'flex-1';
  
  // Achievement header
  const headerEl = document.createElement('div');
  headerEl.className = 'text-sm text-gray-400';
  headerEl.textContent = 'Achievement Unlocked';
  
  // Achievement title
  const titleEl = document.createElement('div');
  titleEl.className = 'font-bold text-white';
  titleEl.textContent = title;
  
  // Achievement description
  const descEl = document.createElement('div');
  descEl.className = 'text-xs text-gray-300';
  descEl.textContent = description;
  
  // Add gamerscore
  const scoreEl = document.createElement('div');
  scoreEl.className = 'ml-2 bg-xbox-green text-white text-xs px-2 py-1 rounded flex-shrink-0 flex items-center justify-center';
  scoreEl.textContent = '+15G';
  
  // Assemble the notification
  contentEl.appendChild(headerEl);
  contentEl.appendChild(titleEl);
  contentEl.appendChild(descEl);
  achievementEl.appendChild(iconEl);
  achievementEl.appendChild(contentEl);
  achievementEl.appendChild(scoreEl);
  
  // Add to container
  achievementContainer.appendChild(achievementEl);
  
  // Animate in
  setTimeout(() => {
    achievementEl.classList.add('opacity-100');
    achievementEl.classList.remove('translate-x-full');
  }, 100);
  
  // Remove after delay
  setTimeout(() => {
    achievementEl.classList.add('translate-x-full');
    achievementEl.classList.add('opacity-0');
    
    setTimeout(() => {
      achievementContainer.removeChild(achievementEl);
    }, 500);
  }, 5000);
  
  // Play sound effect (simplified)
  try {
    const audio = new Audio();
    audio.play().catch(e => console.log('Audio not supported'));
  } catch (e) {
    console.log('Audio not supported');
  }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', init);