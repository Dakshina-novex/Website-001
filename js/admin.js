// ==================== ADMIN.JS - Admin Panel Logic ====================

document.addEventListener('DOMContentLoaded', function() {
    if (!document.getElementById('admin-jobs-table')) return;

    // Ensure default data exists
    if (!localStorage.getItem('jobhunt_jobs')) {
        // Redirect to jobs page first to seed data, or seed here
        localStorage.setItem('jobhunt_jobs', JSON.stringify(getDefaultJobs()));
    }

    renderAdminJobs();
    updateStats();

    // Form submission
    document.getElementById('job-form').addEventListener('submit', handleFormSubmit);
    
    // Cancel edit
    document.getElementById('cancel-edit').addEventListener('click', resetForm);

    // Search
    document.getElementById('admin-search').addEventListener('input', function() {
        renderAdminJobs(this.value.toLowerCase());
    });

    // Delete all
    document.getElementById('delete-all-btn').addEventListener('click', function() {
        if (confirm('Are you sure you want to delete ALL jobs? This cannot be undone.')) {
            localStorage.setItem('jobhunt_jobs', JSON.stringify([]));
            renderAdminJobs();
            updateStats();
            showAdminToast('All jobs deleted!', 'warning');
        }
    });

    // Export
    document.getElementById('export-btn').addEventListener('click', function() {
        const jobs = JSON.parse(localStorage.getItem('jobhunt_jobs') || '[]');
        const blob = new Blob([JSON.stringify(jobs, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'jobhunt_jobs_export.json';
        a.click();
        URL.revokeObjectURL(url);
        showAdminToast('Jobs exported successfully!', 'success');
    });

    // Import
    document.getElementById('import-btn').addEventListener('click', function() {
        const fileInput = document.getElementById('import-file');
        const file = fileInput.files[0];
        
        if (!file) {
            showAdminToast('Please select a JSON file first.', 'error');
            return;
        }

        const reader = new FileReader();
        reader.onload = function(e) {
            try {
                const importedJobs = JSON.parse(e.target.result);
                if (!Array.isArray(importedJobs)) throw new Error('Invalid format');
                
                const existingJobs = JSON.parse(localStorage.getItem('jobhunt_jobs') || '[]');
                const maxId = existingJobs.reduce((max, j) => Math.max(max, j.id || 0), 0);
                
                importedJobs.forEach((job, i) => {
                    job.id = maxId + i + 1;
                    if (!job.posted) job.posted = new Date().toISOString().split('T')[0];
                });

                const allJobs = [...existingJobs, ...importedJobs];
                localStorage.setItem('jobhunt_jobs', JSON.stringify(allJobs));
                renderAdminJobs();
                updateStats();
                fileInput.value = '';
                showAdminToast(`${importedJobs.length} jobs imported successfully!`, 'success');
            } catch (err) {
                showAdminToast('Invalid JSON file. Please check the format.', 'error');
            }
        };
        reader.readAsText(file);
    });
});

function getDefaultJobs() {
    return [
        { id: 1, title: "Senior Frontend Developer", company: "Google", companyIcon: "fab fa-google", companyColor: "from-blue-500 to-blue-600", location: "Mountain View, CA", type: "Full-time", mode: "Remote", level: "Senior", category: "technology", salaryMin: 120000, salaryMax: 180000, description: "Join our team to build the next generation of web applications.", tags: ["React", "TypeScript", "Node.js"], posted: "2024-01-15", featured: true, applyUrl: "#" },
        { id: 2, title: "Product Designer", company: "Spotify", companyIcon: "fab fa-spotify", companyColor: "from-green-500 to-green-600", location: "Stockholm, Sweden", type: "Full-time", mode: "Hybrid", level: "Mid", category: "design", salaryMin: 100000, salaryMax: 140000, description: "Design beautiful user experiences for millions of users.", tags: ["Figma", "UI/UX"], posted: "2024-01-13", featured: true, applyUrl: "#" },
        { id: 3, title: "Data Scientist", company: "Microsoft", companyIcon: "fab fa-microsoft", companyColor: "from-emerald-500 to-emerald-600", location: "Redmond, WA", type: "Full-time", mode: "On-site", level: "Senior", category: "technology", salaryMin: 130000, salaryMax: 200000, description: "Leverage ML and AI to drive data-driven decisions.", tags: ["Python", "ML", "TensorFlow"], posted: "2024-01-16", featured: true, applyUrl: "#" }
    ];
}

function handleFormSubmit(e) {
    e.preventDefault();
    
    const editId = document.getElementById('edit-id').value;
    const jobs = JSON.parse(localStorage.getItem('jobhunt_jobs') || '[]');
    
    const jobData = {
        title: document.getElementById('form-title-input').value.trim(),
        company: document.getElementById('form-company').value.trim(),
        location: document.getElementById('form-location').value.trim(),
        category: document.getElementById('form-category').value,
        type: document.getElementById('form-type').value,
        level: document.getElementById('form-level').value,
        mode: document.getElementById('form-mode').value,
        salaryMin: parseInt(document.getElementById('form-salary-min').value) || 0,
        salaryMax: parseInt(document.getElementById('form-salary-max').value) || 0,
        description: document.getElementById('form-description').value.trim(),
        tags: document.getElementById('form-tags').value.split(',').map(t => t.trim()).filter(t => t),
        applyUrl: document.getElementById('form-apply-url').value.trim() || '#',
        featured: document.getElementById('form-featured').checked,
        companyIcon: 'fas fa-building',
        companyColor: 'from-primary-500 to-primary-600',
        posted: new Date().toISOString().split('T')[0]
    };

    if (editId) {
        // Edit mode
        const index = jobs.findIndex(j => j.id === parseInt(editId));
        if (index !== -1) {
            jobData.id = parseInt(editId);
            jobData.posted = jobs[index].posted;
            jobData.companyIcon = jobs[index].companyIcon || 'fas fa-building';
            jobData.companyColor = jobs[index].companyColor || 'from-primary-500 to-primary-600';
            jobs[index] = jobData;
            showAdminToast('Job updated successfully!', 'success');
        }
    } else {
        // Add mode
        const maxId = jobs.reduce((max, j) => Math.max(max, j.id || 0), 0);
        jobData.id = maxId + 1;
        jobs.unshift(jobData);
        showAdminToast('Job added successfully!', 'success');
    }

    localStorage.setItem('jobhunt_jobs', JSON.stringify(jobs));
    resetForm();
    renderAdminJobs();
    updateStats();
}

function editJob(id) {
    const jobs = JSON.parse(localStorage.getItem('jobhunt_jobs') || '[]');
    const job = jobs.find(j => j.id === id);
    if (!job) return;

    document.getElementById('edit-id').value = job.id;
    document.getElementById('form-title-input').value = job.title;
    document.getElementById('form-company').value = job.company;
    document.getElementById('form-location').value = job.location;
    document.getElementById('form-category').value = job.category;
    document.getElementById('form-type').value = job.type;
    document.getElementById('form-level').value = job.level;
    document.getElementById('form-mode').value = job.mode;
    document.getElementById('form-salary-min').value = job.salaryMin;
    document.getElementById('form-salary-max').value = job.salaryMax;
    document.getElementById('form-description').value = job.description;
    document.getElementById('form-tags').value = (job.tags || []).join(', ');
    document.getElementById('form-apply-url').value = job.applyUrl || '';
    document.getElementById('form-featured').checked = job.featured;

    document.getElementById('form-title').innerHTML = '<i class="fas fa-edit text-amber-500 mr-2"></i>Edit Job';
    document.getElementById('form-submit-text').textContent = 'Update Job';
    document.getElementById('cancel-edit').classList.remove('hidden');

    // Scroll to form
    document.getElementById('job-form').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function deleteJob(id) {
    if (!confirm('Delete this job listing?')) return;
    
    let jobs = JSON.parse(localStorage.getItem('jobhunt_jobs') || '[]');
    jobs = jobs.filter(j => j.id !== id);
    localStorage.setItem('jobhunt_jobs', JSON.stringify(jobs));
    renderAdminJobs();
    updateStats();
    showAdminToast('Job deleted!', 'warning');
}

function resetForm() {
    document.getElementById('job-form').reset();
    document.getElementById('edit-id').value = '';
    document.getElementById('form-title').innerHTML = '<i class="fas fa-plus-circle text-primary-500 mr-2"></i>Add New Job';
    document.getElementById('form-submit-text').textContent = 'Add Job';
    document.getElementById('cancel-edit').classList.add('hidden');
}

function renderAdminJobs(searchQuery = '') {
    const tbody = document.getElementById('admin-jobs-table');
    let jobs = JSON.parse(localStorage.getItem('jobhunt_jobs') || '[]');

    if (searchQuery) {
        jobs = jobs.filter(j => 
            j.title.toLowerCase().includes(searchQuery) || 
            j.company.toLowerCase().includes(searchQuery)
        );
    }

    if (jobs.length === 0) {
        tbody.innerHTML = `
            <tr><td colspan="5" class="px-6 py-12 text-center text-gray-400">
                <i class="fas fa-inbox text-4xl mb-3 block"></i>
                No jobs found. Add your first job listing!
            </td></tr>
        `;
        return;
    }

    tbody.innerHTML = jobs.map(job => `
        <tr class="border-b border-gray-50 hover:bg-gray-50 transition-colors">
            <td class="px-6 py-4">
                <div class="flex items-center space-x-3">
                    <div class="w-10 h-10 bg-gradient-to-br ${job.companyColor || 'from-gray-400 to-gray-500'} rounded-lg flex items-center justify-center flex-shrink-0">
                        <i class="${job.companyIcon || 'fas fa-building'} text-white text-sm"></i>
                    </div>
                    <div>
                        <p class="font-bold text-gray-900 text-sm">${job.title}</p>
                        <p class="text-xs text-gray-500">${job.company} · ${job.location}</p>
                    </div>
                </div>
            </td>
            <td class="px-6 py-4">
                <span class="px-2.5 py-1 bg-gray-100 rounded-lg text-xs font-semibold text-gray-600 capitalize">${job.category}</span>
            </td>
            <td class="px-6 py-4">
                <span class="text-sm text-gray-600">${job.type}</span>
            </td>
            <td class="px-6 py-4">
                <span class="text-sm font-semibold text-gray-900">$${(job.salaryMin/1000).toFixed(0)}K-$${(job.salaryMax/1000).toFixed(0)}K</span>
            </td>
            <td class="px-6 py-4 text-right">
                <div class="flex items-center justify-end space-x-2">
                    <button onclick="editJob(${job.id})" class="p-2 hover:bg-blue-50 rounded-lg text-blue-500 transition-all" title="Edit">
                        <i class="fas fa-edit text-sm"></i>
                    </button>
                    <a href="job-detail.html?id=${job.id}" target="_blank" class="p-2 hover:bg-green-50 rounded-lg text-green-500 transition-all" title="View">
                        <i class="fas fa-external-link-alt text-sm"></i>
                    </a>
                    <button onclick="deleteJob(${job.id})" class="p-2 hover:bg-red-50 rounded-lg text-red-500 transition-all" title="Delete">
                        <i class="fas fa-trash text-sm"></i>
                    </button>
                </div>
            </td>
        </tr>
    `).join('');
}

function updateStats() {
    const jobs = JSON.parse(localStorage.getItem('jobhunt_jobs') || '[]');
    document.getElementById('stat-total').textContent = jobs.length;
    document.getElementById('stat-featured').textContent = jobs.filter(j => j.featured).length;
    document.getElementById('stat-categories').textContent = new Set(jobs.map(j => j.category)).size;
    document.getElementById('stat-companies').textContent = new Set(jobs.map(j => j.company)).size;
}

function showAdminToast(message, type) {
    if (window.JobHunt) {
        window.JobHunt.showToast(message, type);
    } else {
        alert(message);
    }
}