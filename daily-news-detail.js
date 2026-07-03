function getDetailId() {
  const params = new URLSearchParams(window.location.search);
  return Number(params.get("id")) || 1;
}

function detailDate(date) {
  return new Intl.DateTimeFormat("zh-CN", {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long",
  }).format(date);
}

function buildArticle(item) {
  return `
    <p>${item.summary}</p>
    <h2>为什么值得关注</h2>
    <p>${item.title} 的核心不只是一条单点消息，而是它可能影响 ${item.label} 领域接下来几周的资金、政策、产品或供应链判断。Fox 私有新闻台把它标记为高优先级，是因为影响指数为 ${item.impact}，热度为 ${item.heat}。</p>
    <h2>观察线索</h2>
    <ul>
      <li>关注后续是否出现更多公司公告、监管表态、产业订单或价格变化。</li>
      <li>比较同类新闻的热度是否连续上升，避免只被单日情绪带动。</li>
      <li>如果涉及上市公司，继续看收入占比、利润率、现金流和订单能见度。</li>
    </ul>
    <h2>Fox 快评</h2>
    <p>这条新闻适合加入今日观察清单。短期看市场反应，中期看基本面验证，长期看它是否改变行业资源配置。</p>
  `;
}

function renderDetail() {
  const data = window.FOX_NEWS_DATA;
  const item = data.newsItems.find((news) => news.id === getDetailId()) || data.newsItems[0];
  const related = data.newsItems.filter((news) => news.category === item.category && news.id !== item.id).slice(0, 5);

  document.title = `${item.title} | Fox 私有新闻台`;
  document.querySelector("#detailHero").style.backgroundImage = `url('${item.image}')`;
  document.querySelector("#detailTitle").textContent = item.title;
  document.querySelector("#detailMeta").innerHTML = `
    <span class="badge ${item.category}">${item.label}</span>
    <span>${item.time}</span>
    <span>${item.source}</span>
    <span>${item.read}</span>
    <span>影响 ${item.impact}</span>
    <span>热度 ${item.heat}</span>
  `;
  document.querySelector("#detailArticle").innerHTML = buildArticle(item);
  document.querySelector("#relatedNews").innerHTML = related.length
    ? related.map((news) => `<a href="daily-news-detail.html?id=${news.id}">${news.title}</a>`).join("")
    : `<a href="daily-news.html#briefing">返回新闻格查看更多</a>`;
  document.querySelector("#detailFooterDate").textContent = detailDate(new Date());
}

function setupDetailTheme() {
  const button = document.querySelector("#detailThemeToggle");
  button.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    const isDark = document.body.classList.contains("dark");
    button.innerHTML = `<i data-lucide="${isDark ? "sun" : "moon"}"></i>`;
    if (window.lucide) window.lucide.createIcons();
  });
}

document.addEventListener("DOMContentLoaded", () => {
  renderDetail();
  setupDetailTheme();
  if (window.lucide) window.lucide.createIcons();
});
