// Function to fetch and parse markdown files
async function loadBlogPosts() {
    try {
        const blogContainer = document.querySelector('.blog-grid');
        blogContainer.innerHTML = ''; // Clear existing posts

        // Fetch the list of blog posts from your blogs directory
        const response = await fetch('/blogs/posts.json');
        const posts = await response.json();

        posts.forEach(post => {
            const article = createBlogPostElement(post);
            blogContainer.appendChild(article);
        });
    } catch (error) {
        console.error('Error loading blog posts:', error);
    }
}

function createBlogPostElement(post) {
    const article = document.createElement('article');
    article.className = 'blog-post';
    
    article.innerHTML = `
        <img src="${post.image || 'https://via.placeholder.com/400x200'}" alt="${post.title}">
        <div class="post-content">
            <h2>${post.title}</h2>
            <div class="post-meta">
                <span><i class="far fa-calendar"></i> ${post.date}</span>
                <span><i class="far fa-folder"></i> ${post.tags[0]}</span>
            </div>
            <p>${post.description}</p>
            <a href="/blogs/${post.path}" class="read-more">Read More</a>
        </div>
    `;
    
    return article;
}

// Load posts when the page loads
document.addEventListener('DOMContentLoaded', loadBlogPosts);
