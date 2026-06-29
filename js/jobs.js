// ==================== JOBS.JS - Job Listings Data & Logic ====================

// Sample Job Data (in production, this would come from an API/database)
const jobsData = [
    {
        id: 1, title: "Senior Frontend Developer", company: "Google", companyIcon: "fab fa-google",
        companyColor: "from-blue-500 to-blue-600", location: "Mountain View, CA", type: "Full-time",
        mode: "Remote", level: "Senior", category: "technology", salaryMin: 120000, salaryMax: 180000,
        description: "Join our team to build the next generation of web applications using React, TypeScript, and modern web technologies.",
        tags: ["React", "TypeScript", "Node.js"], posted: "2024-01-15", featured: true, applyUrl: "#"
    },
    {
        id: 2, title: "Product Designer", company: "Spotify", companyIcon: "fab fa-spotify",
        companyColor: "from-green-500 to-green-600", location: "Stockholm, Sweden", type: "Full-time",
        mode: "Hybrid", level: "Mid", category: "design", salaryMin: 100000, salaryMax: 140000,
        description: "Design beautiful and intuitive user experiences for millions of music lovers around the world.",
        tags: ["Figma", "UI/UX", "Prototyping"], posted: "2024-01-13", featured: true, applyUrl: "#"
    },
    {
        id: 3, title: "Data Scientist", company: "Microsoft", companyIcon: "fab fa-microsoft",
        companyColor: "from-emerald-500 to-emerald-600", location: "Redmond, WA", type: "Full-time",
        mode: "On-site", level: "Senior", category: "technology", salaryMin: 130000, salaryMax: 200000,
        description: "Leverage machine learning and AI to drive data-driven decisions across Microsoft's product portfolio.",
        tags: ["Python", "ML", "TensorFlow"], posted: "2024-01-16", featured: true, applyUrl: "#"
    },
    {
        id: 4, title: "iOS Developer", company: "Apple", companyIcon: "fab fa-apple",
        companyColor: "from-gray-700 to-gray-900", location: "Cupertino, CA", type: "Full-time",
        mode: "On-site", level: "Senior", category: "technology", salaryMin: 140000, salaryMax: 210000,
        description: "Build cutting-edge iOS applications using Swift and SwiftUI that touch millions of lives every day.",
        tags: ["Swift", "SwiftUI", "iOS"], posted: "2024-01-14", featured: false, applyUrl: "#"
    },
    {
        id: 5, title: "DevOps Engineer", company: "Amazon", companyIcon: "fab fa-amazon",
        companyColor: "from-amber-500 to-orange-600", location: "Seattle, WA", type: "Full-time",
        mode: "Remote", level: "Mid", category: "technology", salaryMin: 135000, salaryMax: 185000,
        description: "Scale and optimize cloud infrastructure using AWS, Kubernetes, and cutting-edge DevOps practices.",
        tags: ["AWS", "Kubernetes", "Docker"], posted: "2024-01-10", featured: false, applyUrl: "#"
    },
    {
        id: 6, title: "Marketing Manager", company: "Meta", companyIcon: "fab fa-meta",
        companyColor: "from-sky-500 to-blue-600", location: "Menlo Park, CA", type: "Full-time",
        mode: "Hybrid", level: "Lead", category: "marketing", salaryMin: 110000, salaryMax: 160000,
        description: "Lead global marketing campaigns and brand strategy for Meta's suite of social media platforms.",
        tags: ["Strategy", "Digital Marketing", "Analytics"], posted: "2024-01-12", featured: false, applyUrl: "#"
    },
    {
        id: 7, title: "Backend Engineer", company: "Netflix", companyIcon: "fas fa-film",
        companyColor: "from-red-600 to-red-700", location: "Los Gatos, CA", type: "Full-time",
        mode: "Remote", level: "Senior", category: "technology", salaryMin: 150000, salaryMax: 220000,
        description: "Build scalable microservices powering the world's leading streaming platform using Java and Spring Boot.",
        tags: ["Java", "Microservices", "Spring"], posted: "2024-01-11", featured: true, applyUrl: "#"
    },
    {
        id: 8, title: "UX Researcher", company: "Airbnb", companyIcon: "fab fa-airbnb",
        companyColor: "from-rose-500 to-pink-600", location: "San Francisco, CA", type: "Full-time",
        mode: "Hybrid", level: "Mid", category: "design", salaryMin: 95000, salaryMax: 135000,
        description: "Conduct user research to inform product decisions and improve the Airbnb experience for hosts and guests.",
        tags: ["User Research", "Usability", "Analytics"], posted: "2024-01-09", featured: false, applyUrl: "#"
    },
    {
        id: 9, title: "Financial Analyst", company: "Goldman Sachs", companyIcon: "fas fa-chart-bar",
        companyColor: "from-blue-800 to-indigo-900", location: "New York, NY", type: "Full-time",
        mode: "On-site", level: "Entry", category: "finance", salaryMin: 85000, salaryMax: 120000,
        description: "Analyze financial data and market trends to support investment decisions for institutional clients.",
        tags: ["Finance", "Excel", "SQL"], posted: "2024-01-08", featured: false, applyUrl: "#"
    },
    {
        id: 10, title: "Content Marketing Specialist", company: "HubSpot", companyIcon: "fab fa-hubspot",
        companyColor: "from-orange-500 to-orange-600", location: "Remote", type: "Full-time",
        mode: "Remote", level: "Mid", category: "marketing", salaryMin: 70000, salaryMax: 100000,
        description: "Create compelling content strategies to drive inbound marketing growth and customer acquisition.",
        tags: ["Content", "SEO", "Writing"], posted: "2024-01-07", featured: false, applyUrl: "#"
    },
    {
        id: 11, title: "Cloud Solutions Architect", company: "Google Cloud", companyIcon: "fab fa-google",
        companyColor: "from-blue-500 to-cyan-600", location: "Austin, TX", type: "Full-time",
        mode: "Hybrid", level: "Lead", category: "technology", salaryMin: 160000, salaryMax: 240000,
        description: "Design and implement cloud architectures for enterprise customers on Google Cloud Platform.",
        tags: ["GCP", "Architecture", "Cloud"], posted: "2024-01-06", featured: true, applyUrl: "#"
    },
    {
        id: 12, title: "Registered Nurse", company: "Mayo Clinic", companyIcon: "fas fa-hospital",
        companyColor: "from-teal-500 to-teal-600", location: "Rochester, MN", type: "Full-time",
        mode: "On-site", level: "Mid", category: "healthcare", salaryMin: 65000, salaryMax: 90000,
        description: "Provide compassionate patient care in one of the world's most renowned medical institutions.",
        tags: ["Nursing", "Patient Care", "Healthcare"], posted: "2024-01-05", featured: false, applyUrl: "#"
    }
];

// Store in localStorage for persistence
if (!localStorage.getItem('jobhunt_jobs')) {
    localStorage.setItem('jobhunt_jobs', JSON.stringify(jobsData));
}

// ==================== JOBS PAGE INITIALIZATION ====================
document.addEventListener('DOMContentLoaded', function() {
    if (!document.getElementById('jobs-list')) return;

    // Parse URL params
    const urlParams = new URLSearchParams(window.location.search);
    const keywordParam = urlParams.get('keyword');
    const locationParam = urlParams.get('location');
    const categoryParam = urlParams.get('category');

    if (keywordParam) document.getElementById('search-keyword').value = keywordParam;
    if (locationParam) document.getElementById('search-location').value = locationParam;
    if (categoryParam) document.getElementById('search-category').value = categoryParam;

    // Initial render
    renderJobs();

    // Event listeners
    document.getElementById('search-form').addEventListener('submit', function(e) {
        e.preventDefault();
        renderJobs();
    });

    document.getElementById('sort-by').addEventListener('change', renderJobs);
    document.getElementById('apply-filters').addEventListener('click', renderJobs);
    document.getElementById('clear-filters').addEventListener('click', clearFilters);
    document.getElementById('filter-salary').addEventListener('change', renderJobs);

    // Auto-filter on checkbox change
    document.querySelectorAll('.filter-type, .filter-level, .filter-mode').forEach(cb => {
        cb.addEventListener('change', renderJobs);
    });
});

function getJobs() {
    return JSON.parse(localStorage.getItem('jobhunt_jobs') || '[]');
}

function renderJobs() {
    const jobsList = document.getElementById('jobs-list');
    const loading = document.getElementById('loading');
    const noResults = document.getElementById('no-results');
    const resultsCount = document.getElementById('results-count');
    
    // Show loading
    jobsList.innerHTML = '';
    loading.classList.remove('hidden');
    noResults.classList.add('hidden');

    setTimeout(() => {
        let jobs = getJobs();

        // Apply keyword filter
        const keyword = document.getElementById('search-keyword').value.toLowerCase().trim();
        if (keyword) {
            jobs = jobs.filter(j => 
                j.title.toLowerCase().includes(keyword) || 
                j.company.toLowerCase().includes(keyword) ||
                j.description.toLowerCase().includes(keyword) ||
                j.tags.some(t => t.toLowerCase().includes(keyword))
            );
        }

        // Apply location filter
        const location = document.getElementById('search-location').value.toLowerCase().trim();
        if (location) {
            jobs = jobs.filter(j => j.location.toLowerCase().includes(location));
        }

        // Apply category filter
        const category = document.getElementById('search-category').value;
        if (category) {
            jobs = jobs.filter(j => j.category === category);
        }

        // Apply type filter
        const types = [...document.querySelectorAll('.filter-type:checked')].map(c => c.value);
        if (types.length > 0) {
            jobs = jobs.filter(j => types.some(t => j.type.toLowerCase().replace('-', '').includes(t.replace('-', ''))));
        }

        // Apply level filter
        const levels = [...document.querySelectorAll('.filter-level:checked')].map(c => c.value);
        if (levels.length > 0) {
            jobs = jobs.filter(j => levels.some(l => j.level.toLowerCase().includes(l)));
        }

        // Apply mode filter
        const modes = [...document.querySelectorAll('.filter-mode:checked')].map(c => c.value);
        if (modes.length > 0) {
            jobs = jobs.filter(j => modes.some(m => j.mode.toLowerCase().replace('-', '').includes(m)));
        }

        // Apply salary filter
        const salary = document.getElementById('filter-salary').value;
        if (salary) {
            if (salary === '200000+') {
                jobs = jobs.filter(j => j.salaryMax >= 200000);
            } else {
                const [min, max] = salary.split('-').map(Number);
                jobs = jobs.filter(j => j.salaryMax >= min && j.salaryMin <= max);
            }
        }

        // Sort
        const sortBy = document.getElementById('sort-by').value;
        switch(sortBy) {
            case 'newest': jobs.sort((a, b) => new Date(b.posted) - new Date(a.posted)); break;
            case 'salary-high': jobs.sort((a, b) => b.salaryMax - a.salaryMax); break;
            case 'salary-low': jobs.sort((a, b) => a.salaryMin - b.salaryMin); break;
        }

        // Hide loading
        loading.classList.add('hidden');

        // Update count
        resultsCount.textContent = jobs.length;

        if (jobs.length === 0) {
            noResults.classList.remove('hidden');
            return;
        }

        // Render job cards
        jobs.forEach((job, index) => {
            const card = createJobCard(job, index);
            jobsList.appendChild(card);
        });
    }, 300);
}

function createJobCard(job, index) {
    const div = document.createElement('div');
    div.className = 'group bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl border border-gray-100 hover:border-primary-200 transition-all duration-500 transform hover:-translate-y-1';
    div.setAttribute('data-aos', 'fade-up');
    div.setAttribute('data-aos-delay', (index * 50).toString());

    const timeAgo = window.JobHunt ? window.JobHunt.formatDate(job.posted) : job.posted;
    const salary = `$${(job.salaryMin/1000).toFixed(0)}K - $${(job.salaryMax/1000).toFixed(0)}K`;

    const modeColors = {
        'Remote': 'bg-green-50 text-green-600',
        'Hybrid': 'bg-amber-50 text-amber-600',
        'On-site': 'bg-blue-50 text-blue-600'
    };

    div.innerHTML = `
        <div class="flex flex-col sm:flex-row sm:items-start gap-4">
            <div class="w-14 h-14 bg-gradient-to-br ${job.companyColor} rounded-xl flex items-center justify-center shadow-lg flex-shrink-0">
                <i class="${job.companyIcon} text-white text-xl"></i>
            </div>
            <div class="flex-1 min-w-0">
                <div class="flex items-start justify-between mb-1">
                    <div>
                        <h3 class="text-lg font-bold text-gray-900 group-hover:text-primary-600 transition-colors">
                            <a href="job-detail.html?id=${job.id}">${job.title}</a>
                        </h3>
                        <div class="flex items-center flex-wrap gap-x-3 gap-y-1 text-sm text-gray-500 mt-1">
                            <span class="font-semibold text-gray-700">${job.company}</span>
                            <span class="flex items-center"><i class="fas fa-map-marker-alt mr-1 text-xs"></i>${job.location}</span>
                            <span class="flex items-center"><i class="far fa-clock mr-1 text-xs"></i>${timeAgo}</span>
                        </div>
                    </div>
                    <button class="hidden sm:flex w-9 h-9 rounded-lg border border-gray-200 items-center justify-center hover:bg-red-50 hover:border-red-200 transition-all flex-shrink-0 fav-btn">
                        <i class="far fa-heart text-gray-400 text-sm"></i>
                    </button>
                </div>
                <p class="text-sm text-gray-500 mt-2 line-clamp-2">${job.description}</p>
                <div class="flex flex-wrap items-center gap-2 mt-3">
                    <span class="px-3 py-1 bg-primary-50 text-primary-600 rounded-lg text-xs font-semibold">${job.type}</span>
                    <span class="px-3 py-1 ${modeColors[job.mode] || 'bg-gray-50 text-gray-600'} rounded-lg text-xs font-semibold">${job.mode}</span>
                    <span class="px-3 py-1 bg-purple-50 text-purple-600 rounded-lg text-xs font-semibold">${job.level}</span>
                    ${job.featured ? '<span class="px-3 py-1 bg-amber-100 text-amber-700 rounded-lg text-xs font-bold">⭐ Featured</span>' : ''}
                </div>
                <div class="flex items-center justify-between mt-4 pt-3 border-t border-gray-100">
                    <span class="text-lg font-extrabold text-gray-900">${salary}</span>
                    <a href="job-detail.html?id=${job.id}" class="px-5 py-2 bg-primary-600 hover:bg-primary-700 text-white text-sm font-semibold rounded-lg transition-all transform hover:-translate-y-0.5 shadow-sm hover:shadow-md">
                        View Details
                    </a>
                </div>
            </div>
        </div>
    `;

    // Favorite button
    const favBtn = div.querySelector('.fav-btn');
    if (favBtn) {
        favBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            const icon = this.querySelector('i');
            icon.classList.toggle('far');
            icon.classList.toggle('fas');
            icon.classList.toggle('text-red-500');
        });
    }

    // Re-init AOS for dynamically added elements
    setTimeout(() => AOS.refresh(), 100);

    return div;
}

function clearFilters() {
    document.getElementById('search-keyword').value = '';
    document.getElementById('search-location').value = '';
    document.getElementById('search-category').value = '';
    document.getElementById('filter-salary').value = '';
    document.querySelectorAll('.filter-type, .filter-level, .filter-mode').forEach(cb => cb.checked = false);
    renderJobs();
    if (window.JobHunt) window.JobHunt.showToast('Filters cleared!', 'info');
}