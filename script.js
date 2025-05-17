const topics = ['html', 'css', 'js', 'ajax', 'xml'];

function showContent(topic) {
  fetch(`txt/${topic}.txt`)
    .then(response => response.text())
    .then(data => {
      document.getElementById('content').innerHTML = data;
    })
    .catch(error => {
      document.getElementById('content').innerHTML = `<p>Error loading ${topic} content.</p>`;
      console.error('Error loading content:', error);
    });
}

    function loadHome() {
      fetch('index.html')
        .then(response => response.text())
        .then(html => {
          const parser = new DOMParser();
          const doc = parser.parseFromString(html, 'text/html');
          const homeContent = doc.querySelector('#content');
          if (homeContent) {
            document.getElementById('content').innerHTML = homeContent.innerHTML;
          } else {
            document.getElementById('content').innerHTML = "<p>Home content not found.</p>";
          }
        })
        .catch(error => {
          document.getElementById('content').innerHTML = "<p>Error loading home content.</p>";
          console.error('Error fetching home content:', error);
        });
    }

function searchContent() {
  const query = document.getElementById('searchInput').value.toLowerCase();
  let found = false;

  Promise.all(
    topics.map(topic =>
      fetch(`txt/${topic}.txt`).then(res => res.text().then(text => ({ topic, text })))
    )
  ).then(results => {
    for (const { topic, text } of results) {
      if (text.toLowerCase().includes(query)) {
        const highlighted = text.replace(
          new RegExp(query, 'gi'),
          match => `<mark>${match}</mark>`
        );
        document.getElementById('content').innerHTML = highlighted;
        found = true;
        break;
      }
    }
    if (!found) {
      document.getElementById('content').innerHTML = `<p>No results found for "<strong>${query}</strong>".</p>`;
    }
  });
}