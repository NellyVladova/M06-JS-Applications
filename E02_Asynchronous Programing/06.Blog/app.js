function attachEvents() {
    const loadPostsBtn = document.getElementById('btnLoadPosts');
    const viewPostsBtn = document.getElementById('btnViewPost');
    const posts = document.getElementById('posts');
    const postTitle = document.getElementById('post-title');
    const postBody = document.getElementById('post-body');
    const postComments = document.getElementById('post-comments');
    let loaded = false;

    const postsUrl = 'http://localhost:3030/jsonstore/blog/posts';
    const commentsUrl = 'http://localhost:3030/jsonstore/blog/comments';

    loadPostsBtn.addEventListener('click', async () => {
        if (loaded) {
            return;
        }

        const postResponse = await fetch(postsUrl);
        const postData = await postResponse.json();
        
        Object.keys(postData).forEach(key => {
            const option = createNewElement(postData, key);
            posts.appendChild(option);
        });
        
        loaded = true;
    });

    viewPostsBtn.addEventListener('click', async () => {
        const selected = Array.from(posts.querySelectorAll('option')).find(el => el.selected);

        const response = await fetch(postsUrl + `/${selected.value}`);
        const data = await response.json();

        postTitle.textContent = data.title;
        postBody.textContent = data.body;

        const commentsResponse = await fetch(commentsUrl);
        const commentsData = await commentsResponse.json();

        Object.keys(commentsData).forEach(el => {
            if (el == selected.value) {
                const li = document.createElement('li');
                li.id = commentsData[el].id;
                li.textContent = commentsData[el].text;
                postComments.appendChild(li);
            }
        });
    });

    function createNewElement(data, key) {
        const element = document.createElement('option');
        element.setAttribute('value', key);
        element.setAttribute('id', data[key].id);
        element.textContent = data[key].title.toUpperCase();

        return element;
    }
}

attachEvents();