function loadFeedback() {
    const sheetURL = 'https://script.google.com/macros/s/AKfycbyTT3MFOsU4QM5hO3dfCCPSnKs3_-KsoHzF20YAX9z6abJNtX-bx_fFWrcDonyAGYq5/exec'; // Ganti dengan URL GET Apps Script
    
    fetch(sheetURL)
        .then(response => response.json())
        .then(data => {
            const container = document.getElementById('feedbackList');
            container.innerHTML = '';
            
            data.forEach((entry, index) => {
                const card = `
                    <div class="col-12">
                        <div class="feedback-card">
                            <div class="d-flex align-items-center gap-3 mb-2">
                                <div class="avatar">
                                    ${entry.nama.charAt(0).toUpperCase()}
                                </div>
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
        });
}

// Fungsi generate bintang
function generateStars(rating) {
    let stars = '';
    for (let i = 1; i <= 5; i++) {
        stars += `<i class="fa-star ${i <= rating ? 'fa-solid' : 'fa-regular'}"></i>`;
    }
    return stars;
}

// Fungsi format tanggal
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

// Panggil fungsi saat halaman dimuat
window.addEventListener('load', loadFeedback);
