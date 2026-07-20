// ==========================================================================
// 1. THE MAIN ARTICLE DATABASE
// ==========================================================================
const articles = [
    {
        title: "Why I Built This: Demystifying the Medical Path for Students",
        summary: "A personal look at why this website was built to break down barriers for students without healthcare connections. Discover our core pillars and see why you belong in medicine.",
        image: "images/why-i-built-this.jpg",
        link: "articles/why-i-built-this.html"
    }
];

// ==========================================================================
// 2. VOLUNTEER & CLINICAL OPPORTUNITIES DATABASE
// ==========================================================================
const opportunities = [
    {
        id: "upmc-lititz",
        title: "UPMC Lititz / Central PA",
        category: "Hospital Volunteering",
        ageLimit: "15+",
        location: "Lititz, PA (Lancaster County)",
        vibeCheck: "A welcoming community hospital that features a structured Teen Volunteer Program. This is one of the absolute best places in Lancaster County for younger high school students to get real hospital exposure without needing prior medical connections.",
        commitment: "50–100 hours/year (2–4 hours/wk)",
        bestFor: "Freshmen, Sophomores, & Juniors seeking long-term exposure",
        requirements: "Parent permission (under 18), standard immunizations",
        image: "images/hospital-UPMC-lititz.webp",
        link: "opportunities/UPMCLititz.html" 
    },
    {
        id: "soulmates",
        title: "SoulMates Teen Program (Hospice & Community Care)",
        category: "Hospice & Companionship Volunteering",
        ageLimit: "15–18 years old",
        location: "Lancaster County (Lancaster & Mount Joy)",
        vibeCheck: "Instead of medical tasks, you focus entirely on comfort and human connection—spending time with hospice patients, recording life stories, or helping out with crafts, music, and baking.",
        commitment: "Flexible hours with quarterly training sessions.",
        bestFor: "Students who are empathetic, great listeners, and interested in nursing, psychology, social work, or counseling.",
        requirements: "Parental consent required; includes free tuberculosis (TB) screening and a routine flu vaccine.",
        image: "images/hospice-SoulMates.jpg", 
        link: "opportunities/SoulMates.html"
    },
    {
        id: "gigis-playhouse",
        title: "GiGi’s Playhouse Volunteer Opportunities",
        category: "Therapeutic & Educational Support",
        ageLimit: "15+ years old",
        location: "Lancaster, PA", 
        vibeCheck: "A high-energy, rewarding environment where you help run free educational and therapeutic programs—assisting with group fitness, peer mentoring during socials, or tutoring math and reading.",
        commitment: "Varies by role; 1-on-1 tutoring requires 1 hour per week for a 10-week block.",
        bestFor: "Students interested in pediatric medicine, physical or occupational therapy, special education, and speech-language pathology.",
        requirements: "Parental waiver required for ages 15–17; includes a standard background check and attending a 1-hour orientation.",
        image: "images/gigisplayhouse.jpg", 
        link: "opportunities/GiGisPlayhouse.html"
    }
];

// ==========================================================================
// 3. HELPER FUNCTION: Fix paths for subfolder pages
// ==========================================================================
function getCorrectPath(currentPath, isInSubfolder) {
    if (isInSubfolder) {
        return "../" + currentPath;
    }
    return currentPath;
}

// ==========================================================================
// 4. MAIN ARTICLES GRID GENERATOR (Runs on Homepage / Articles Page)
// ==========================================================================
function displayArticles() {
    const grid = document.getElementById('automated-articles-grid');
    if (!grid) return; 

    grid.innerHTML = ""; 

    articles.forEach(article => {
        const cardHTML = `
            <a href="${article.link}" class="card-link">
                <article class="card">
                    <div class="img-wrapper">
                        <img src="${article.image}" alt="${article.title}">
                    </div>
                    <div class="card-content">
                        <h3>${article.title}</h3>
                        <p>${article.summary}</p>
                    </div>
                </article>
            </a>
        `;
        grid.innerHTML += cardHTML;
    });
}

// ==========================================================================
// 5. SIDEBAR ARTICLES GENERATOR (Runs on Article Pages)
// ==========================================================================
function displaySidebarSuggestions() {
    const sidebarGrid = document.getElementById('sidebar-suggestions-grid');
    if (!sidebarGrid) return; 

    sidebarGrid.innerHTML = "";

    const currentPageFile = window.location.pathname.split("/").pop();
    const isInSubfolder = window.location.pathname.includes("/articles/");

    articles.forEach(article => {
        if (currentPageFile && article.link.includes(currentPageFile)) {
            return; 
        }

        const correctedImage = getCorrectPath(article.image, isInSubfolder);
        const correctedLink = currentPageFile === "" || !isInSubfolder ? article.link : article.link.split("/").pop();

        const cardHTML = `
            <a href="${correctedLink}" class="card-link">
                <article class="card">
                    <div class="img-wrapper">
                        <img src="${correctedImage}" alt="${article.title}">
                    </div>
                    <div class="card-content">
                        <h3>${article.title}</h3>
                        <p>${article.summary}</p>
                    </div>
                </article>
            </a>
        `;
        sidebarGrid.innerHTML += cardHTML;
    });
}

// ==========================================================================
// 6. VOLUNTEER DIRECTORY GENERATOR (Runs on Resources Page)
// ==========================================================================
function displayOpportunities() {
    const resourceGrid = document.getElementById('automated-resources-grid');
    if (!resourceGrid) return; 

    resourceGrid.innerHTML = ""; 

    const isInSubfolder = window.location.pathname.includes("/opportunities/") || window.location.pathname.includes("/articles/");

    opportunities.forEach(opp => {
        const correctedLink = getCorrectPath(opp.link, isInSubfolder);
        const correctedImage = getCorrectPath(opp.image, isInSubfolder);

        const resourceHTML = `
            <a href="${correctedLink}" class="card-link">
                <article class="card flex-layout-card">
                    <div class="img-wrapper">
                        <img src="${correctedImage}" alt="${opp.title}">
                    </div>
                    <div class="card-content structural-flex-content">
                        <div class="meta-tag-wrapper">
                            <span class="category-tag">${opp.category}</span>
                            <span class="age-badge-tag">Age: ${opp.ageLimit}</span>
                        </div>

                        <h3>${opp.title}</h3>
                        <p class="location-stamp">${opp.location}</p>

                        <div class="specs-checklist-box">
                            <div class="spec-line">Commitment: <strong>${opp.commitment}</strong></div>
                            <div class="spec-line">Best For: <strong>${opp.bestFor}</strong></div>
                            <div class="spec-line">Requirements: <strong>${opp.requirements}</strong></div>
                        </div>
                        
                        <div style="margin-top: auto; padding-top: 15px; text-align: center;">
                            <div class="read-more-btn">
                                View full application guide and requirements
                            </div>
                        </div>
                    </div>
                </article>
            </a>
        `;
        resourceGrid.innerHTML += resourceHTML;
    });
}

// ==========================================================================
// 6b. OPPORTUNITY SIDEBAR GENERATOR (Runs on Individual Opportunity Pages)
// ==========================================================================
function displayOpportunitySidebar() {
    const sidebarGrid = document.getElementById('opportunity-sidebar-grid');
    if (!sidebarGrid) return; 

    sidebarGrid.innerHTML = "";

    const currentPageFile = window.location.pathname.split("/").pop();
    const isInSubfolder = window.location.pathname.includes("/opportunities/");

    const filteredOpportunities = opportunities.filter(opp => {
        if (!currentPageFile) return true;
        return !opp.link.toLowerCase().includes(currentPageFile.toLowerCase());
    });

    const limitedOpportunities = filteredOpportunities.slice(0, 3);

    limitedOpportunities.forEach(opp => {
        const correctedImage = getCorrectPath(opp.image, isInSubfolder);
        const correctedLink = currentPageFile === "" || !isInSubfolder ? opp.link : opp.link.split("/").pop();

        const cardHTML = `
            <a href="${correctedLink}" class="card-link">
                <article class="card">
                    <div class="img-wrapper">
                        <img src="${correctedImage}" alt="${opp.title}">
                    </div>
                    <div class="card-content">
                        <div class="meta-tag-wrapper">
                            <span class="category-tag" style="font-size:0.65rem; padding:2px 6px;">${opp.category}</span>
                        </div>
                        <h3 style="font-size:1rem; margin-top:4px;">${opp.title}</h3>
                        <p class="location-stamp" style="font-size:0.75rem; margin-bottom:0 !important;">${opp.location}</p>
                    </div>
                </article>
            </a>
        `;
        sidebarGrid.innerHTML += cardHTML;
    });
}

// ==========================================================================
// 7. THE MASTER COMMAND: RUN EVERYTHING SAFELY ON LOAD
// ==========================================================================
window.addEventListener('DOMContentLoaded', () => {
    displayArticles();           
    displaySidebarSuggestions();   
    displayOpportunities();        
    displayOpportunitySidebar();   
});