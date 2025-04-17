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
    
    for(let i = 1; i <= totalPages; i++) {
        pagination.innerHTML += `
            <button class="page-btn ${i === currentPage ? 'active' : ''}" 
                    onclick="changePage(${i})">
                ${i}
            </button>
        `;
    }
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
