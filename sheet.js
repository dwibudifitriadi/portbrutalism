let currentPage = 1;
const itemsPerPage = 5;
let allFeedback = [];

function loadFeedback() {
    const sheetURL = 'https://script.google.com/macros/s/AKfycbyTT3MFOsU4QM5hO3dfCCPSnKs3_-KsoHzF20YAX9z6abJNtX-bx_fFWrcDonyAGYq5/exec';
    
    fetch(sheetURL)
        .then(response => response.json())
        .then(data => {
            allFeedback = data.sort((a, b) => 
                new Date(b.timestamp) - new Date(a.timestamp));
            
            displayFeedback(currentPage);
            createPagination();
        });
}
function formatDate(timestamp) {
    const date = new Date(timestamp);
    return date.toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}
function displayFeedback(page) {
    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const pageData = allFeedback.slice(start, end);
    
    const container = document.getElementById('feedbackList');
    container.innerHTML = '';
    
    pageData.forEach((entry) => {
        const card = `
            <div class="col-12">
                <div class="feedback-card">
                    <div class="d-flex align-items-center gap-3 mb-2">
                        <div>
                            <h5 class="mb-0">${entry.nama}</h5>
                            <div class="rating-stars">
                                ${generateStars(entry.rating)}
                            </div>
                        </div>
                        <small class="timestamp ms-auto">
                            ${formatDate(entry.timestamp)}
                        </small>
                    </div>
                    <p class="mb-0">${entry.komentar}</p>
                </div>
            </div>
        `;
        container.innerHTML += card;
    });
}

function createPagination() {
    const totalPages = Math.ceil(allFeedback.length / itemsPerPage);
    const pagination = document.getElementById('pagination');
    pagination.innerHTML = '';

    // Previous Button
    const prevDisabled = currentPage === 1 ? 'disabled' : '';
    pagination.innerHTML += `
        <button class="page-btn" ${prevDisabled} onclick="changePage(${currentPage - 1})">
            <i class="fa-solid fa-chevron-left"></i>
        </button>
    `;

    // Page Numbers with Ellipsis
    const visiblePages = [];
    const maxVisible = 2; // Jumlah halaman yang ditampilkan di sekitar current page

    // Tambahkan halaman pertama
    if (currentPage > maxVisible + 1) {
        visiblePages.push(1);
        if (currentPage > maxVisible + 2) {
            visiblePages.push('...');
        }
    }

    // Tambahkan halaman sekitar current page
    const start = Math.max(1, currentPage - maxVisible);
    const end = Math.min(totalPages, currentPage + maxVisible);
    
    for (let i = start; i <= end; i++) {
        visiblePages.push(i);
    }

    // Tambahkan halaman terakhir
    if (currentPage < totalPages - maxVisible) {
        if (currentPage < totalPages - maxVisible - 1) {
            visiblePages.push('...');
        }
        visiblePages.push(totalPages);
    }

    // Render page numbers
    visiblePages.forEach(page => {
        if (page === '...') {
            pagination.innerHTML += `<span class="ellipsis">...</span>`;
        } else {
            const active = page === currentPage ? 'active' : '';
            pagination.innerHTML += `
                <button class="page-btn ${active}" onclick="changePage(${page})">
                    ${page}
                </button>
            `;
        }
    });

    // Next Button
    const nextDisabled = currentPage === totalPages ? 'disabled' : '';
    pagination.innerHTML += `
        <button class="page-btn" ${nextDisabled} onclick="changePage(${currentPage + 1})">
            <i class="fa-solid fa-chevron-right"></i>
        </button>
    `;
}
function generateStars(rating) {
    let stars = '';
    for (let i = 1; i <= 5; i++) {
        stars += `<i class="fa-star ${i <= rating ? 'fa-solid' : 'fa-regular'}"></i>`;
    }
    return stars;
}
function changePage(page) {
    currentPage = page;
    displayFeedback(currentPage);
    createPagination();
}
window.addEventListener('load', loadFeedback)
