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
  // Clear any existing hash and force home page
  window.location.hash = '';
  history.replaceState(null, null, window.location.pathname);
  
  // Reset all pages and show home immediately
  const pages = document.querySelectorAll('.page-content');
  pages.forEach(page => page.classList.remove('active'));
  const homePage = document.getElementById('home-page');
  if (homePage) {
    homePage.classList.add('active');
  }
  
  // Ensure boot animation elements are visible during initialization
  if (bootAnimation) {
    bootAnimation.style.display = 'flex';
    bootAnimation.style.opacity = '1';
    bootAnimation.classList.remove('opacity-0');
  }

  if (bootLogo) {
    bootLogo.style.opacity = '0';
    bootLogo.classList.remove('opacity-100');
  }

  if (loadingBar) {
    loadingBar.style.opacity = '0';
    loadingBar.classList.remove('opacity-100');
  }

  if (loadingProgress) {
    loadingProgress.style.width = '0%';
  }

  setTimeout(() => {
    if (bootLogo) {
      bootLogo.style.opacity = '1';
      bootLogo.classList.add('opacity-100');
    }
  }, bootSequenceTimeline.logoAppear);

  setTimeout(() => {
    if (loadingBar) {
      loadingBar.style.opacity = '1';
      loadingBar.classList.add('opacity-100');
    }
  }, bootSequenceTimeline.loadingBarAppear);

  setTimeout(() => {
    if (loadingProgress) {
      loadingProgress.style.width = '100%';
    }
  }, bootSequenceTimeline.loadingComplete);

  setTimeout(() => {
    if (bootAnimation) {
      bootAnimation.classList.add('opacity-0');
    }
  }, bootSequenceTimeline.bootComplete);

  setTimeout(() => {
    if (bootAnimation) {
      bootAnimation.style.display = 'none';
    }
    if (content) {
      content.style.opacity = '1';
    }
    console.log('Boot animation complete, showing main content');
  }, bootSequenceTimeline.removeBootScreen);
  
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
  
  // Initialize page routing after a short delay
  setTimeout(() => {
    handleRouting();
  }, 100);
}

// Xbox Boot Animation
function startBootAnimation() {
  console.log('Starting Xbox boot animation');

  if (bootAnimation) {
    bootAnimation.style.display = 'flex';
    bootAnimation.style.opacity = '1';
    bootAnimation.classList.remove('opacity-0');
  }

  if (bootLogo) {
    bootLogo.style.opacity = '0';
    bootLogo.classList.remove('opacity-100');
  }

  if (loadingBar) {
    loadingBar.style.opacity = '0';
    loadingBar.classList.remove('opacity-100');
  }

  if (loadingProgress) {
    loadingProgress.style.width = '0%';
  }

  setTimeout(() => {
    if (bootLogo) {
      bootLogo.style.opacity = '1';
      bootLogo.classList.add('opacity-100');
    }
  }, bootSequenceTimeline.logoAppear);

  setTimeout(() => {
    if (loadingBar) {
      loadingBar.style.opacity = '1';
      loadingBar.classList.add('opacity-100');
    }
  }, bootSequenceTimeline.loadingBarAppear);

  setTimeout(() => {
    if (loadingProgress) {
      loadingProgress.style.width = '100%';
    }
  }, bootSequenceTimeline.loadingComplete);

  setTimeout(() => {
    if (bootAnimation) {
      bootAnimation.classList.add('opacity-0');
    }
  }, bootSequenceTimeline.bootComplete);

  setTimeout(() => {
    if (bootAnimation) {
      bootAnimation.style.display = 'none';
    }
    if (content) {
      content.style.opacity = '1';
    }
    console.log('Boot animation complete, showing main content');
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
  if (toggleSidebarBtn) {
    toggleSidebarBtn.addEventListener('click', toggleSidebar);
  }
  
  // Profile Button (Open Guide)
  if (profileButton) {
    profileButton.addEventListener('click', openGuide);
  }
  
  // Home Button (Go to Home)
  if (homeButton) {
    homeButton.addEventListener('click', () => navigateTo('#home'));
  }
  
  // Close Guide Button
  if (closeGuideBtn) {
    closeGuideBtn.addEventListener('click', closeGuide);
  }
  
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
  
  // Sidebar Links - Use event delegation for better reliability
  document.addEventListener('click', (e) => {
    if (e.target.closest('.sidebar-link')) {
      const link = e.target.closest('.sidebar-link');
      const href = link.getAttribute('href');
      if (href && href.startsWith('#')) {
        e.preventDefault();
        navigateTo(href);
      }
    }
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
  console.log('Opening Xbox Guide');
  if (xboxGuide) {
    xboxGuide.classList.remove('hidden');
    xboxGuide.style.display = 'flex';
    activateGuideTab('profile');
    showAchievement('Guide Opened', 'Accessed the Xbox Guide menu!');
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

// Activate Guide Tab
function activateGuideTab(tabId) {
  console.log('Activating tab:', tabId);

  guideTabs.forEach(tab => {
    if (tab.getAttribute('data-tab') === tabId) {
      tab.classList.add('active');
    } else {
      tab.classList.remove('active');
    }
  });

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
  console.log('Navigating to:', pageName);
  
  // Hide all pages
  const pages = document.querySelectorAll('.page-content');
  pages.forEach(page => {
    page.classList.remove('active');
  });
  
  // Show the selected page
  const targetPage = document.getElementById(`${pageName}-page`);
  if (targetPage) {
    targetPage.classList.add('active');
    
    // Update URL hash without triggering hashchange event
    if (hash !== window.location.hash) {
      history.pushState(null, null, hash);
    }
    
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

// Show Achievement Notification
function showAchievement(title, description) {
  // Check if achievements are disabled
  if (localStorage.getItem('xbox-disable-achievements') === 'true') return;
  
  // Create achievement element
  const achievementEl = document.createElement('div');
  achievementEl.className = 'fixed bottom-4 right-4 bg-xbox-green text-white rounded-lg p-4 shadow-lg transition-transform transform';
  achievementEl.style.transform = 'translateY(100px)';
  achievementEl.innerHTML = `
    <strong class="block font-semibold">${title}</strong>
    <span class="block text-sm">${description}</span>
  `;
  
  document.body.appendChild(achievementEl);
  
  // Animate in
  setTimeout(() => {
    achievementEl.style.transform = 'translateY(0)';
  }, 100);
  
  // Animate out and remove
  setTimeout(() => {
    achievementEl.style.transform = 'translateY(100px)';
    setTimeout(() => {
      document.body.removeChild(achievementEl);
    }, 300);
  }, 3000);
}

// Ensure the boot animation is triggered on DOM content load
document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM Content Loaded - Starting Boot Animation');
  startBootAnimation();
});

// Resume Data (Mock)
const resumeData = {
  gameCards: [
    {
      title: 'Halo Infinite',
      subtitle: 'The Master Chief returns',
      description: 'Experience the next chapter of the legendary Halo series.',
      coverImage: 'https://via.placeholder.com/210x280/1e1e1e/107C10?text=Halo+Infinite',
      category: 'shooter',
      route: '#halo-infinite',
      achievements: [
        { title: 'First Blood', description: 'Get your first kill.' },
        { title: 'Sharpshooter', description: 'Achieve a headshot.' }
      ]
    },
    {
      title: 'Forza Horizon 5',
      subtitle: 'Go extreme',
      description: 'The latest installment in the Forza Horizon series.',
      coverImage: 'https://via.placeholder.com/210x280/1e1e1e/107C10?text=Forza+Horizon+5',
      category: 'racing',
      route: '#forza-horizon-5',
      achievements: [
        { title: 'Speed Demon', description: 'Reach 200 mph.' },
        { title: 'Drift King', description: 'Achieve a drift score of 100,000.' }
      ]
    },
    {
      title: 'Fable',
      subtitle: 'A new beginning',
      description: 'Experience the reimagining of the beloved RPG series.',
      coverImage: 'https://via.placeholder.com/210x280/1e1e1e/107C10?text=Fable',
      category: 'rpg',
      route: '#fable',
      achievements: [
        { title: 'Hero\'s Welcome', description: 'Enter the world of Fable.' },
        { title: 'Treasure Hunter', description: 'Find your first hidden treasure.' }
      ]
    },
    {
      title: 'Gears 5',
      subtitle: 'The saga continues',
      description: 'Join Kait Diaz as she uncovers the origins of the Locust.',
      coverImage: 'https://via.placeholder.com/210x280/1e1e1e/107C10?text=Gears+5',
      category: 'shooter',
      route: '#gears-5',
      achievements: [
        { title: 'Lancer Mastery', description: 'Get 100 kills with the Lancer.' },
        { title: 'Headshot Expert', description: 'Achieve 50 headshots in a single match.' }
      ]
    },
    {
      title: 'Sea of Thieves',
      subtitle: 'Pirate life',
      description: 'Embark on a pirate adventure in a shared world.',
      coverImage: 'https://via.placeholder.com/210x280/1e1e1e/107C10?text=Sea+of+Thieves',
      category: 'adventure',
      route: '#sea-of-thieves',
      achievements: [
        { title: 'First Voyage', description: 'Complete your first voyage.' },
        { title: 'Treasure Seeker', description: 'Find and return a treasure chest.' }
      ]
    },
    {
      title: 'State of Decay 2',
      subtitle: 'Zombie survival',
      description: 'Build a community and survive the zombie apocalypse.',
      coverImage: 'https://via.placeholder.com/210x280/1e1e1e/107C10?text=State+of+Decay+2',
      category: 'survival',
      route: '#state-of-decay-2',
      achievements: [
        { title: 'Survivor', description: 'Be the last survivor in your group.' },
        { title: 'Builder', description: 'Construct a facility upgrade.' }
      ]
    },
    {
      title: 'The Ascent',
      subtitle: 'Cyberpunk action',
      description: 'Dive into the neon-lit world of The Ascent.',
      coverImage: 'https://via.placeholder.com/210x280/1e1e1e/107C10?text=The+Ascent',
      category: 'action',
      route: '#the-ascent',
      achievements: [
        { title: 'Neon Warrior', description: 'Defeat 100 enemies.' },
        { title: 'Cyber Ninja', description: 'Perform 50 stealth takedowns.' }
      ]
    },
    {
      title: 'Psychonauts 2',
      subtitle: 'Join the Psychonauts',
      description: 'Help Razputin achieve his dream of becoming a Psychonaut.',
      coverImage: 'https://via.placeholder.com/210x280/1e1e1e/107C10?text=Psychonauts+2',
      category: 'platformer',
      route: '#psychonauts-2',
      achievements: [
        { title: 'Mind Reader', description: 'Complete the first level.' },
        { title: 'Memory Vault', description: 'Find a hidden memory vault.' }
      ]
    },
    {
      title: 'Halo: The Fall of Reach',
      subtitle: 'The story begins',
      description: 'Experience the events that lead to the Halo saga.',
      coverImage: 'https://via.placeholder.com/210x280/1e1e1e/107C10?text=Halo%3A+The+Fall+of+Reach',
      category: 'shooter',
      route: '#halo-reach',
      achievements: [
        { title: 'Legend Begins', description: 'Complete the first mission.' },
        { title: 'Covenant Killer', description: 'Defeat 50 Covenant enemies.' }
      ]
    },
    {
      title: 'Forza Motorsport 7',
      subtitle: 'Race the world',
      description: 'The ultimate racing experience awaits.',
      coverImage: 'https://via.placeholder.com/210x280/1e1e1e/107C10?text=Forza+Motorsport+7',
      category: 'racing',
      route: '#forza-motorsport-7',
      achievements: [
        { title: 'Track Star', description: 'Complete a race on every track.' },
        { title: 'Speed Freak', description: 'Achieve a lap time under 1 minute on any track.' }
      ]
    }
  ],
  projects: [
    {
      id: 'project-1',
      title: 'Project Phoenix',
      subtitle: 'Next-gen game engine',
      date: '2023',
      details: [
        'Developed a high-performance game engine using C++ and DirectX 12.',
        'Implemented advanced rendering techniques, including ray tracing and global illumination.',
        'Optimized engine performance, achieving 120 FPS on next-gen hardware.'
      ]
    },
    {
      id: 'project-2',
      title: 'Halo: Echoes',
      subtitle: 'Fan-made Halo game',
      date: '2022',
      details: [
        'Created a fan tribute to Halo using Unreal Engine 5.',
        'Modeled and textured iconic Halo weapons and vehicles.',
        'Recreated the Halo ring world environment with high detail.'
      ]
    },
    {
      id: 'project-3',
      title: 'Forza Street',
      subtitle: 'Mobile racing game',
      date: '2021',
      details: [
        'Developed a mobile racing game with real-time multiplayer using Unity.',
        'Integrated Xbox Live services for player authentication and leaderboards.',
        'Designed and balanced game economy and progression systems.'
      ]
    }
  ],
  skills: [
    {
      id: 'skill-1',
      title: 'Programming Languages',
      skills: ['C++', 'C#', 'JavaScript', 'Python']
    },
    {
      id: 'skill-2',
      title: 'Game Development',
      skills: ['Unity', 'Unreal Engine', 'Godot']
    },
    {
      id: 'skill-3',
      title: 'Web Development',
      skills: ['HTML', 'CSS', 'React', 'Node.js']
    },
    {
      id: 'skill-4',
      title: 'Tools & Technologies',
      skills: ['Git', 'Docker', 'Jenkins', 'Azure DevOps']
    }
  ],
  experience: [
    {
      id: 'experience-1',
      title: 'Senior Game Developer',
      company: 'Xbox Game Studios',
      period: '2020 - Present',
      responsibilities: [
        'Lead a team of developers in creating AAA games for Xbox and PC.',
        'Architect and implement game systems and features.',
        'Collaborate with designers and artists to deliver high-quality gameplay experiences.'
      ]
    },
    {
      id: 'experience-2',
      title: 'Game Developer',
      company: 'Riot Games',
      period: '2018 - 2020',
      responsibilities: [
        'Developed and maintained game features for League of Legends.',
        'Worked on optimizing game performance and network latency.',
        'Participated in game design discussions and contributed to game mechanics.'
      ]
    },
    {
      id: 'experience-3',
      title: 'Junior Game Developer',
      company: 'Ubisoft',
      period: '2016 - 2018',
      responsibilities: [
        'Assisted in the development of game levels and environments.',
        'Implemented gameplay mechanics and AI behaviors.',
        'Conducted playtests and gathered feedback for game improvements.'
      ]
    }
  ]
};

// Start the app
init();