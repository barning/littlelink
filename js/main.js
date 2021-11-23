function initRSS() {
  const wrapper = document.querySelector('[data-rss]');
  const RSS_URL = wrapper.dataset.rss;
  const postsToDisplay = wrapper.dataset.postsToDisplay;

  fetch(RSS_URL)
    .then(response => response.text())
    .then(str => new window.DOMParser().parseFromString(str, "text/xml"))
    .then(data => {
      const items = data.querySelectorAll("item");
      let html = ``;
      for (let i = 0; i < postsToDisplay; i++) {
        const el = items[i];
        html += `
        <article>
          <h3>
            <a href="${el.querySelector("link").innerHTML}" target="_blank" rel="noopener">
              ${el.querySelector("title").innerHTML}
            </a>
          </h3>
        </article>
      `;
      }
      wrapper.insertAdjacentHTML("beforeend", html);
    });
}

initRSS();