// ==================== JOB-DETAIL.JS ====================

document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const jobId = parseInt(urlParams.get('id'));
    
    if (!jobId) {
        window.location.href = 'jobs.html';
        return;
    }

    const jobs = JSON.parse(localStorage.getItem('jobhunt_jobs') || '[]');
    const job = jobs.find(j => j.id === jobId);

    if (!job) {
        document.getElementById('job-detail-content').innerHTML = `
            <div class="text-center py-16">
                <div class="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <i class="fas fa-exclamation-triangle text-gray-400 text-3xl"></i>
                </div>
                <h3 class="text-xl font-bold text-gray-900 mb-2">Job Not Found</h3>
                <p class="text-gray-500 mb-6">This job may have been removed or the link is invalid.</p>
                <a href="jobs.html" class="px-6 py-3 bg-primary-600 text-white rounded-xl font-semibold hover:bg-primary-700 transition-all">Browse All Jobs</a>
            </div>
        `;
        document.getElementById('job-sidebar').innerHTML = '';
        return;
    }

    // Update page title & breadcrumb
    document.title = `${job.title} at ${job.company} - JobHunt`;
    document.getElementById('breadcrumb-title').textContent = job.title;

    const salary = `$${(job.salaryMin/1000).toFixed(0)}K - $${(job.salaryMax/1000).toFixed(0)}K`;
    const timeAgo = window.JobHunt ? window.JobHunt.formatDate(job.posted) : job.posted;

    // Render main content
    document.getElementById('job-detail-content').innerHTML = `
        <!-- Header -->
        <div class="flex flex-col sm:flex-row sm:items-center gap-4 mb-8 pb-8 border-b border-gray-100">
            <div class="w-16 h-16 bg-gradient-to-br ${job.companyColor} rounded-2xl flex items-center justify-center shadow-lg flex-shrink-0">
                <i class="${job.companyIcon} text-white text-2xl"></i>
            </div>
            <div class="flex-1">
                <h1 class="text-2xl lg:text-3xl font-extrabold text-gray-900 mb-1">${job.title}</h1>
                <div class="flex items-center flex-wrap gap-x-4 gap-y-1 text-sm text-gray-500">
                    <span class="font-semibold text-gray-700">${job.company}</span>
                    <span class="flex items-center"><i class="fas fa-map-marker-alt mr-1"></i>${job.location}</span>
                    <span class="flex items-center"><i class="far fa-clock mr-1"></i>${timeAgo}</span>
                </div>
            </div>
        </div>

        <!-- Tags -->
        <div class="flex flex-wrap gap-2 mb-8">
            <span class="px-4 py-2 bg-primary-50 text-primary-600 rounded-xl text-sm font-semibold">${job.type}</span>
            <span class="px-4 py-2 bg-green-50 text-green-600 rounded-xl text-sm font-semibold">${job.mode}</span>
            <span class="px-4 py-2 bg-purple-50 text-purple-600 rounded-xl text-sm font-semibold">${job.level} Level</span>
            <span class="px-4 py-2 bg-amber-50 text-amber-600 rounded-xl text-sm font-semibold">${job.category.charAt(0).toUpperCase() + job.category.slice(1)}</span>
        </div>

        <!-- Description -->
        <div class="prose prose-gray max-w-none">
            <h2 class="text-xl font-bold text-gray-900 mb-4">Job Description</h2>
            <p class="text-gray-600 leading-relaxed mb-6">${job.description}</p>
            
            <h3 class="text-lg font-bold text-gray-900 mb-3">Key Responsibilities</h3>
            <ul class="space-y-2 mb-6 text-gray-600">
                <li class="flex items-start"><i class="fas fa-check text-green-500 mr-3 mt-1"></i>Design, develop, and maintain high-quality software solutions</li>
                <li class="flex items-start"><i class="fas fa-check text-green-500 mr-3 mt-1"></i>Collaborate with cross-functional teams to define and ship new features</li>
                <li class="flex items-start"><i class="fas fa-check text-green-500 mr-3 mt-1"></i>Write clean, maintainable, and efficient code following best practices</li>
                <li class="flex items-start"><i class="fas fa-check text-green-500 mr-3 mt-1"></i>Participate in code reviews and contribute to team standards</li>
                <li class="flex items-start"><i class="fas fa-check text-green-500 mr-3 mt-1"></i>Mentor junior team members and contribute to a positive team culture</li>
            </ul>

            <h3 class="text-lg font-bold text-gray-900 mb-3">Requirements</h3>
            <ul class="space-y-2 mb-6 text-gray-600">
                <li class="flex items-start"><i class="fas fa-star text-amber-500 mr-3 mt-1 text-xs"></i>5+ years of relevant professional experience</li>
                <li class="flex items-start"><i class="fas fa-star text-amber-500 mr-3 mt-1 text-xs"></i>Strong proficiency in ${job.tags.join(', ')}</li>
                <li class="flex items-start"><i class="fas fa-star text-amber-500 mr-3 mt-1 text-xs"></i>Excellent problem-solving and analytical skills</li>
                <li class="flex items-start"><i class="fas fa-star text-amber-500 mr-3 mt-1 text-xs"></i>Strong communication and teamwork abilities</li>
                <li class="flex items-start"><i class="fas fa-star text-amber-500 mr-3 mt-1 text-xs"></i>Bachelor's degree in a related field or equivalent experience</li>
            </ul>

            <h3 class="text-lg font-bold text-gray-900 mb-3">Skills & Technologies</h3>
            <div class="flex flex-wrap gap-2 mb-6">
                ${job.tags.map(tag => `<span class="px-4 py-2 bg-gray-100 text-gray-700 rounded-xl text-sm font-medium">${tag}</span>`).join('')}
            </div>

            <h3 class="text-lg font-bold text-gray-900 mb-3">Benefits & Perks</h3>
            <div class="grid grid-cols-2 gap-3 mb-6">
                <div class="flex items-center space-x-2 text-gray-600 text-sm">
                    <i class="fas fa-heartbeat text-red-400"></i><span>Health Insurance</span>
                </div>
                <div class="flex items-center space-x-2 text-gray-600 text-sm">
                    <i class="fas fa-umbrella-beach text-blue-400"></i><span>Unlimited PTO</span>
                </div>
                <div class="flex items-center space-x-2 text-gray-600 text-sm">
                    <i class="fas fa-home text-green-400"></i><span>Remote Flexible</span>
                </div>
                <div class="flex items-center space-x-2 text-gray-600 text-sm">
                    <i class="fas fa-graduation-cap text-purple-400"></i><span>Learning Budget</span>
                </div>
                <div class="flex items-center space-x-2 text-gray-600 text-sm">
                    <i class="fas fa-chart-line text-amber-400"></i><span>Stock Options</span>
                </div>
                <div class="flex items-center space-x-2 text-gray-600 text-sm">
                    <i class="fas fa-utensils text-orange-400"></i><span>Free Meals</span>
                </div>
            </div>
        </div>
    `;

    // Render sidebar
    document.getElementById('job-sidebar').innerHTML = `
        <div class="text-center mb-6">
            <div class="text-3xl font-extrabold text-gray-900 mb-1">${salary}</div>
            <p class="text-sm text-gray-500">Annual Salary</p>
        </div>

        <a href="${job.applyUrl}" target="_blank" class="block w-full px-6 py-4 bg-gradient-to-r from-primary-600 to-primary-700 text-white font-bold rounded-xl text-center shadow-lg shadow-primary-500/30 hover:shadow-primary-500/50 hover:from-primary-700 hover:to-primary-800 transition-all transform hover:-translate-y-0.5 mb-4">
            <i class="fas fa-paper-plane mr-2"></i>Apply Now
        </a>

        <button class="w-full px-6 py-3 border-2 border-gray-200 text-gray-700 font-semibold rounded-xl hover:border-primary-300 hover:text-primary-600 transition-all mb-6 save-job-btn">
            <i class="far fa-heart mr-2"></i>Save Job
        </button>

        <div class="space-y-4 pt-6 border-t border-gray-100">
            <div class="flex items-center justify-between">
                <span class="text-sm text-gray-500">Company</span>
                <span class="text-sm font-semibold text-gray-900">${job.company}</span>
            </div>
            <div class="flex items-center justify-between">
                <span class="text-sm text-gray-500">Location</span>
                <span class="text-sm font-semibold text-gray-900">${job.location}</span>
            </div>
            <div class="flex items-center justify-between">
                <span class="text-sm text-gray-500">Job Type</span>
                <span class="text-sm font-semibold text-gray-900">${job.type}</span>
            </div>
            <div class="flex items-center justify-between">
                <span class="text-sm text-gray-500">Work Mode</span>
                <span class="text-sm font-semibold text-gray-900">${job.mode}</span>
            </div>
            <div class="flex items-center justify-between">
                <span class="text-sm text-gray-500">Experience</span>
                <span class="text-sm font-semibold text-gray-900">${job.level} Level</span>
            </div>
            <div class="flex items-center justify-between">
                <span class="text-sm text-gray-500">Category</span>
                <span class="text-sm font-semibold text-gray-900">${job.category.charAt(0).toUpperCase() + job.category.slice(1)}</span>
            </div>
            <div class="flex items-center justify-between">
                <span class="text-sm text-gray-500">Posted</span>
                <span class="text-sm font-semibold text-gray-900">${timeAgo}</span>
            </div>
        </div>

        <!-- Share -->
        <div class="mt-6 pt-6 border-t border-gray-100">
            <h4 class="text-sm font-semibold text-gray-700 mb-3">Share this job</h4>
            <div class="flex space-x-2">
                <button onclick="navigator.clipboard.writeText(window.location.href); window.JobHunt && window.JobHunt.showToast('Link copied!', 'success')" class="flex-1 px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium text-gray-700 transition-all"><i class="fas fa-link mr-1"></i>Copy</button>
                <a href="https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(job.title + ' at ' + job.company)}" target="_blank" class="px-3 py-2 bg-gray-100 hover:bg-blue-100 rounded-lg text-sm transition-all"><i class="fab fa-twitter text-blue-500"></i></a>
                <a href="https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}" target="_blank" class="px-3 py-2 bg-gray-100 hover:bg-blue-100 rounded-lg text-sm transition-all"><i class="fab fa-linkedin text-blue-700"></i></a>
            </div>
        </div>
    `;

    // Save job button
    document.querySelector('.save-job-btn')?.addEventListener('click', function() {
        const icon = this.querySelector('i');
        if (icon.classList.contains('far')) {
            icon.classList.replace('far', 'fas');
            icon.classList.add('text-red-500');
            this.innerHTML = '<i class="fas fa-heart mr-2 text-red-500"></i>Saved!';
            window.JobHunt?.showToast('Job saved!', 'success');
        } else {
            icon.classList.replace('fas', 'far');
            icon.classList.remove('text-red-500');
            this.innerHTML = '<i class="far fa-heart mr-2"></i>Save Job';
        }
    });
});