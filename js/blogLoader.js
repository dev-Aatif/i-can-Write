// Function to fetch and parse markdown files
async function loadBlogPosts() {
    try {
        const blogContainer = document.querySelector('.blog-grid');
        blogContainer.innerHTML = ''; // Clear existing posts

        // Fetch the list of blog posts from your blogs directory
        const response = await fetch('/blogs/posts.json');
        const posts = await response.json();
        const posts = data.posts;


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
        <img src="${post.image}" alt="${post.title}">
        <div class="post-content">
            <h2>${post.title}</h2>
            <div class="post-meta">
                <span><i class="far fa-calendar"></i> ${new Date(post.date).toLocaleDateString()}</span>
                <span><i class="far fa-folder"></i> ${post.tags[0]}</span>
                <span><i class="far fa-user"></i> ${post.author}</span>
            </div>
            <p>${post.description}</p>
            <a href="/blogs/${post.path}" class="read-more">Read More</a>
        </div>
    `;
    
    return article;
}

function showErrorMessage() {
    const blogContainer = document.querySelector('.blog-grid');
    blogContainer.innerHTML = `
        <div class="error-message">
            <p>Sorry, we couldn't load the blog posts at this time. Please try again later.</p>
        </div>
    `;
}

// Load posts when the page loads
document.addEventListener('DOMContentLoaded', loadBlogPosts);
