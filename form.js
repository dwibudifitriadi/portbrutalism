// Perbaikan URL yang salah (terdapat duplikasi)
const scriptURL = 'https://script.google.com/macros/s/AKfycbyy9ZKyF6QjIJjabW9p3mgksCtnRnJBR-bIrAuf44DIDeUGsfFkj8K19HjMXKyBn1I/exec';
// Pindahkan pembuatan rating stars ke luar event listener submit
const ratingContainer = document.getElementById('ratingStars');

// Generate stars saat halaman dimuat
for (let i = 1; i <= 5; i++) {
    const star = document.createElement('i');
    star.className = 'fa-regular fa-star rating-star';
    star.dataset.value = i;
    ratingContainer.appendChild(star);
}

// Tambahkan event listener untuk stars
document.querySelectorAll('.rating-star').forEach(star => {
    star.addEventListener('click', () => {
        const rating = parseInt(star.dataset.value);
        document.querySelectorAll('.rating-star').forEach((s, i) => {
            s.classList.toggle('fa-solid', i < rating);
            s.classList.toggle('active', i < rating);
            s.classList.toggle('fa-regular', i >= rating);
        });
    });
});

// Form submission handler
document.getElementById('feedbackForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const btnSubmit = this.querySelector('button[type="submit"]');
    const originalText = btnSubmit.innerHTML;
    
    // Validasi form
    const rating = document.querySelectorAll('.rating-star.active').length;
    if(rating === 0) {
        alert('Harap beri rating!');
        return;
    }

    // Tampilkan loading
    btnSubmit.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Mengirim...';
    btnSubmit.disabled = true;

    // Format data
    const formData = {
        nama: this.querySelector('input').value,
        rating: rating,
        komentar: this.querySelector('textarea').value
    };

    // Kirim ke Google Sheets
    fetch(scriptURL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
    })
    .then(() => {
        alert('Terima kasih! Feedback berhasil disimpan ✨');
        this.reset();
        document.querySelectorAll('.rating-star').forEach(star => {
            star.classList.remove('active', 'fa-solid');
            star.classList.add('fa-regular');
        });
    })
    .catch(error => {
        alert('Oops! Terjadi error: ' + error.message);
    })
    .finally(() => {
        btnSubmit.innerHTML = originalText;
        btnSubmit.disabled = false;
    });
});