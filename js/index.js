// ==========================================================================
// 1. THE MAIN ARTICLE DATABASE
// ==========================================================================
// Note: We use absolute-style paths (starting with "images/" or "articles/")
// The functions below will automatically fix the paths if you are in a subfolder.
const articles = [
    {
        title: "Hidden Cortex: 5 Surprising New Discoveries About the Human Brain",
        summary: "A brief look into the cool brain facts, including its natural Wi-Fi signal.",
        image: "images/brain.jpg",
        link: "articles/article1.html"
    },
    {
        title: "Template Article: Exploring the Brain",
        summary: "click on this template",
        image: "images/brain.jpg",
        link: "articles/template.html"
    }
];

// ==========================================================================
// HELPER FUNCTION: Fix paths for subfolder pages (like your article pages)
// ==========================================================================
function getCorrectPath(currentPath, isInSubfolder) {
    if (isInSubfolder) {
        // If we are inside the 'articles' folder, add '../' to step out to the root
        return "../" + currentPath;
    }
    return currentPath;
}

// ==========================================================================
// 2. MAIN GRID GENERATOR (Runs on Homepage / Directory Page)
// ==========================================================================
function displayArticles() {
    const grid = document.getElementById('automated-articles-grid');
    if (!grid) return; 

    grid.innerHTML = ""; 

    articles.forEach(article => {
        // UPDATED: The entire card is now wrapped inside the anchor link tag
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
// 3. SIDEBAR SUGGESTIONS GENERATOR (Runs on Article Pages - Prevents Duplicates)
// ==========================================================================
function displaySidebarSuggestions() {
    const sidebarGrid = document.getElementById('sidebar-suggestions-grid');
    if (!sidebarGrid) return; 

    sidebarGrid.innerHTML = "";

    const currentPageFile = window.location.pathname.split("/").pop();
    const isInSubfolder = window.location.pathname.includes("/articles/");

    articles.forEach(article => {
        if (article.link.includes(currentPageFile)) {
            return; 
        }

        const correctedImage = getCorrectPath(article.image, isInSubfolder);
        const correctedLink = currentPageFile === "" || !isInSubfolder ? article.link : article.link.split("/").pop();

        // UPDATED: Wrapped the sidebar cards inside the link container too
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
// 4. THE MASTER COMMAND: RUN EVERYTHING WHEN PAGE LOADS
// ==========================================================================
window.addEventListener('DOMContentLoaded', () => {
    displayArticles();             // Dynamically loads home/directory page cards
    displaySidebarSuggestions();   // Dynamically loads sidebar cards minus the duplicate
});