const username = 'dwibudifitriadi'; // Ganti ini!
const repoList = document.getElementById('repoList');

async function fetchRecentRepos() {
    try {
        const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=3`);
        const repos = await response.json();

        repos.forEach(repo => {
            const repoCard = document.createElement('div');
            repoCard.className = 'neo-box challenge-card d-flex align-items-center gap-3';

            repoCard.innerHTML = `
          <div>
            <h5><i class="fa-brands fa-github"></i> ${repo.name}</h5>
            <p>${repo.description || 'No description'}</p>            
            <button class="btn-accent btn"><a href="https://www.github.com/dwibudifitriadi/${repo.name}">Lihat <i class="ms-2 fa-solid fa-arrow-right"></i></a></button>
          </div>
          
        `;
            repoList.appendChild(repoCard);
        });
    } catch (err) {
        console.error('Error fetching repos:', err);
        repoList.innerHTML = `<p>Failed to load repositories 😢</p>`;
    }
}

fetchRecentRepos();