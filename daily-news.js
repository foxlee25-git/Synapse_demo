const categories = [
  { id: "all", label: "全部", icon: "layout-grid" },
  { id: "world", label: "国际", icon: "globe-2" },
  { id: "tech", label: "科技", icon: "cpu" },
  { id: "ai", label: "AI", icon: "bot" },
  { id: "finance", label: "金融", icon: "line-chart" },
  { id: "web3", label: "Web3", icon: "coins" },
  { id: "company", label: "上市公司", icon: "building-2" },
  { id: "sports", label: "体育", icon: "trophy" },
  { id: "hot", label: "热门", icon: "flame" },
];

const newsItems = [
  {
    id: 1,
    category: "world",
    label: "国际",
    time: "07:20",
    source: "Global Desk",
    title: "多方围绕关键航道安全展开新一轮协调",
    summary:
      "能源运输、保险费率和区域外交成为焦点，市场正在评估供应链延迟与原材料价格的连锁反应。",
    impact: 92,
    heat: 86,
    read: "3 分钟",
    image:
      "https://images.unsplash.com/photo-1521295121783-8a321d551ad2?auto=format&fit=crop&w=1100&q=82",
  },
  {
    id: 2,
    category: "ai",
    label: "AI",
    time: "08:10",
    source: "AI Watch",
    title: "企业级智能体进入工作流落地阶段",
    summary:
      "从单点问答转向任务编排、权限治理和审计记录，AI 产品竞争重心正在从模型能力转向组织级交付。",
    impact: 90,
    heat: 94,
    read: "4 分钟",
    image:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1100&q=82",
    featured: true,
  },
  {
    id: 3,
    category: "finance",
    label: "金融",
    time: "09:35",
    source: "Market Pulse",
    title: "主要资产等待利率路径信号",
    summary:
      "长端收益率、美元指数和科技股估值同步受到关注，投资者在财报季前降低高波动敞口。",
    impact: 88,
    heat: 77,
    read: "3 分钟",
    image:
      "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=1100&q=82",
  },
  {
    id: 4,
    category: "tech",
    label: "科技",
    time: "10:05",
    source: "Tech Wire",
    title: "先进封装和高带宽内存继续成为算力瓶颈",
    summary:
      "云厂商扩容节奏带动上游供应链重新排产，晶圆、封装、散热与电力交付成为观察重点。",
    impact: 84,
    heat: 82,
    read: "4 分钟",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1100&q=82",
  },
  {
    id: 5,
    category: "hot",
    label: "热门",
    time: "11:30",
    source: "Trend Lab",
    title: "短视频平台热议城市消费复苏",
    summary:
      "餐饮、演出、夜间经济和本地生活服务热度上升，品牌投放开始从全国流量转向区域密度。",
    impact: 72,
    heat: 97,
    read: "2 分钟",
    image:
      "https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=1100&q=82",
  },
  {
    id: 6,
    category: "world",
    label: "国际",
    time: "12:15",
    source: "Policy Room",
    title: "主要经济体加强关键矿产供应协作",
    summary:
      "电池、半导体和国防工业的上游资源安全被重新定价，长期采购协议和本土冶炼产能受到重视。",
    impact: 80,
    heat: 71,
    read: "3 分钟",
    image:
      "https://images.unsplash.com/photo-1518640467707-6811f4a6ab73?auto=format&fit=crop&w=1100&q=82",
  },
  {
    id: 7,
    category: "tech",
    label: "科技",
    time: "13:40",
    source: "Product Signal",
    title: "消费电子新品转向端侧 AI 与续航体验",
    summary:
      "芯片能效、隐私计算和跨设备协同成为发布会高频关键词，硬件厂商试图重新定义换机理由。",
    impact: 75,
    heat: 83,
    read: "3 分钟",
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1100&q=82",
  },
  {
    id: 8,
    category: "finance",
    label: "金融",
    time: "14:20",
    source: "Capital Note",
    title: "黄金和避险资产关注地缘风险溢价",
    summary:
      "交易员正在比较通胀预期、美元流动性与突发事件风险，贵金属波动率明显高于月初水平。",
    impact: 78,
    heat: 76,
    read: "2 分钟",
    image:
      "https://images.unsplash.com/photo-1610375461246-83df859d849d?auto=format&fit=crop&w=1100&q=82",
  },
  {
    id: 9,
    category: "ai",
    label: "AI",
    time: "15:05",
    source: "Model Brief",
    title: "多模态模型竞争转向视频理解和实时交互",
    summary:
      "开发者关注低延迟、长上下文和工具调用稳定性，应用层正在测试从内容生成到业务执行的闭环。",
    impact: 82,
    heat: 89,
    read: "3 分钟",
    image:
      "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=1100&q=82",
  },
  {
    id: 10,
    category: "world",
    label: "国际",
    time: "16:10",
    source: "Europe Note",
    title: "欧洲多国推进能源基础设施韧性计划",
    summary:
      "电网升级、储能项目和跨境输电成为政策重点，冬季供需预期仍是市场关注变量。",
    impact: 74,
    heat: 66,
    read: "2 分钟",
    image:
      "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=1100&q=82",
  },
  {
    id: 11,
    category: "tech",
    label: "科技",
    time: "17:25",
    source: "Cloud Radar",
    title: "云厂商加速建设 AI 专用数据中心",
    summary:
      "液冷、电力调度、网络互联和算力租赁价格成为新一轮基础设施竞争的关键指标。",
    impact: 86,
    heat: 84,
    read: "4 分钟",
    image:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1100&q=82",
  },
  {
    id: 12,
    category: "hot",
    label: "热门",
    time: "18:40",
    source: "Social Scan",
    title: "暑期出行和演出经济带动本地服务热度",
    summary:
      "机票、酒店、音乐节和城市周边游搜索量走高，消费平台加大即时折扣和会员权益投放。",
    impact: 70,
    heat: 92,
    read: "2 分钟",
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1100&q=82",
  },
  {
    id: 13,
    category: "web3",
    label: "Web3",
    time: "19:05",
    source: "Chain Signal",
    title: "稳定币支付和链上结算继续吸引传统金融机构试点",
    summary:
      "银行、支付公司和交易平台把重点放在合规托管、实时清算和跨境资金效率，Web3 从叙事转向基础设施。",
    impact: 81,
    heat: 88,
    read: "3 分钟",
    image:
      "https://images.unsplash.com/photo-1639322537228-f710d846310a?auto=format&fit=crop&w=1100&q=82",
  },
  {
    id: 14,
    category: "web3",
    label: "Web3",
    time: "19:35",
    source: "Token Desk",
    title: "RWA 与代币化基金成为机构链上资产配置焦点",
    summary:
      "国债、货币基金和私募信贷的链上映射扩大，投资者更关注发行方信用、赎回机制和审计透明度。",
    impact: 77,
    heat: 80,
    read: "3 分钟",
    image:
      "https://images.unsplash.com/photo-1642104704074-907c0698cbd9?auto=format&fit=crop&w=1100&q=82",
  },
  {
    id: 15,
    category: "company",
    label: "上市公司",
    time: "20:10",
    source: "Equity Focus",
    title: "AI 算力链上市公司值得关注订单能见度和毛利变化",
    summary:
      "投资者正在跟踪服务器、光模块、液冷、电源和封装环节，判断需求扩张能否转化为持续利润。",
    impact: 89,
    heat: 85,
    read: "4 分钟",
    image:
      "https://images.unsplash.com/photo-1591696205602-2f950c417cb9?auto=format&fit=crop&w=1100&q=82",
  },
  {
    id: 16,
    category: "company",
    label: "上市公司",
    time: "20:45",
    source: "Earnings Radar",
    title: "消费电子龙头财报前关注端侧 AI 新品拉动",
    summary:
      "市场会重点看新品节奏、渠道库存、零部件成本和海外收入占比，验证端侧 AI 是否带来换机弹性。",
    impact: 76,
    heat: 78,
    read: "3 分钟",
    image:
      "https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&w=1100&q=82",
  },
  {
    id: 17,
    category: "company",
    label: "上市公司",
    time: "21:15",
    source: "Watchlist",
    title: "新能源产业链公司重点观察海外订单和库存拐点",
    summary:
      "储能、电池材料和逆变器公司分化加剧，现金流质量、价格压力和新市场认证进度成为关键变量。",
    impact: 73,
    heat: 72,
    read: "3 分钟",
    image:
      "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=1100&q=82",
  },
  {
    id: 18,
    category: "sports",
    label: "体育",
    time: "21:40",
    source: "World Cup Desk",
    title: "世界杯淘汰赛进入关键窗口，32 强赛收官战牵动晋级图谱",
    summary:
      "世界杯 32 强淘汰赛在 7 月 3 日进入收官节点，阿根廷、哥伦比亚、澳大利亚等队的比赛将决定下一轮对阵形势。",
    impact: 87,
    heat: 96,
    read: "3 分钟",
    image:
      "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?auto=format&fit=crop&w=1100&q=82",
  },
  {
    id: 19,
    category: "sports",
    label: "体育",
    time: "22:05",
    source: "Football Intel",
    title: "英格兰备战墨西哥更谨慎，高原、噪音和安保成为赛前变量",
    summary:
      "围绕墨西哥城客场环境的适应策略升温，球队行程、训练安全和反干扰措施成为世界杯淘汰赛前的重要情报。",
    impact: 78,
    heat: 84,
    read: "3 分钟",
    image:
      "https://images.unsplash.com/photo-1522778119026-d647f0596c20?auto=format&fit=crop&w=1100&q=82",
  },
  {
    id: 20,
    category: "sports",
    label: "体育",
    time: "22:30",
    source: "Tennis Watch",
    title: "温网进入密集赛程，强种子晋级与英国本土希望成为焦点",
    summary:
      "温网第二周门票争夺升温，斯瓦泰克、兹维列夫等高排位球员推进签表，本土球员表现继续影响英国舆论热度。",
    impact: 69,
    heat: 76,
    read: "2 分钟",
    image:
      "https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?auto=format&fit=crop&w=1100&q=82",
  },
  {
    id: 21,
    category: "sports",
    label: "体育",
    time: "23:00",
    source: "Sports Calendar",
    title: "环法、F1 英国站和 MLB 全明星前周期接力体育流量",
    summary:
      "7 月体育内容密度上升，环法自行车赛、F1 英国大奖赛和北美棒球赛程将与世界杯淘汰赛共同争夺观众注意力。",
    impact: 71,
    heat: 73,
    read: "2 分钟",
    image:
      "https://images.unsplash.com/photo-1541625602330-2277a4c46182?auto=format&fit=crop&w=1100&q=82",
  },
];

const markets = [
  { name: "Nasdaq 100", value: "22,140", change: "+0.62%" },
  { name: "USD/CNH", value: "7.18", change: "-0.08%", down: true },
  { name: "Gold", value: "$2,354", change: "+0.41%" },
  { name: "Bitcoin", value: "$64,820", change: "+1.25%" },
];

const trends = [
  ["智能体工作流", "AI", 98],
  ["高带宽内存", "科技", 91],
  ["稳定币支付", "Web3", 90],
  ["算力链公司", "上市公司", 88],
  ["世界杯淘汰赛", "体育", 91],
  ["利率路径", "金融", 87],
  ["关键矿产", "国际", 83],
  ["城市消费", "热门", 79],
];

const worldcupRanking = [
  { team: "法国", status: "已进八强", note: "1-0 淘汰巴拉圭" },
  { team: "摩洛哥", status: "已进八强", note: "3-0 淘汰加拿大" },
  { team: "西班牙", status: "战力榜前列", note: "16 强待赛" },
  { team: "阿根廷", status: "战力榜前列", note: "16 强待赛" },
  { team: "巴西", status: "焦点候选", note: "对阵挪威" },
  { team: "英格兰", status: "高关注", note: "对阵墨西哥" },
];

const worldcupFixtures = [
  { date: "7月5日", time: "10:00 PT", match: "巴西 vs 挪威", stage: "16 强" },
  { date: "7月5日", time: "13:00 PT", match: "墨西哥 vs 英格兰", stage: "16 强" },
  { date: "7月6日", time: "12:00 PT", match: "美国 vs 比利时", stage: "16 强" },
  { date: "7月6日", time: "15:00 PT", match: "葡萄牙 vs 西班牙", stage: "16 强" },
  { date: "7月7日", time: "12:00 PT", match: "阿根廷 vs 埃及", stage: "16 强" },
  { date: "7月7日", time: "15:00 PT", match: "瑞士 vs 哥伦比亚", stage: "16 强" },
];

window.FOX_NEWS_DATA = { categories, newsItems, markets, trends, worldcupRanking, worldcupFixtures };

let activeCategory = "all";
let searchTerm = "";
const saved = new Set(JSON.parse(localStorage.getItem("dailyBriefSaved") || "[]"));

function formatDate(date) {
  return new Intl.DateTimeFormat("zh-CN", {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long",
  }).format(date);
}

function renderTabs() {
  const tabRoot = document.querySelector("#categoryTabs");
  tabRoot.innerHTML = categories
    .map(
      (category) => `
        <button class="tab-button ${category.id === activeCategory ? "active" : ""}" data-category="${category.id}" type="button">
          <i data-lucide="${category.icon}"></i>
          ${category.label}
        </button>
      `
    )
    .join("");

  tabRoot.querySelectorAll("button").forEach((button) => {
    button.addEventListener("click", () => {
      activeCategory = button.dataset.category;
      render();
    });
  });
}

function getFilteredNews() {
  return newsItems.filter((item) => {
    const inCategory = activeCategory === "all" || item.category === activeCategory;
    const text = `${item.label} ${item.source} ${item.title} ${item.summary}`.toLowerCase();
    return inCategory && text.includes(searchTerm.trim().toLowerCase());
  });
}

function renderNews() {
  const grid = document.querySelector("#newsGrid");
  const items = getFilteredNews();

  if (!items.length) {
    grid.innerHTML = `<div class="empty-state">没有匹配的新闻，换个关键词试试。</div>`;
    return;
  }

  grid.innerHTML = items
    .map(
      (item) => `
        <article class="news-card ${item.featured ? "featured" : ""}" data-detail-id="${item.id}" tabindex="0" aria-label="查看详情：${item.title}">
          <div class="card-image" style="background-image: url('${item.image}')"></div>
          <div class="card-body">
            <div class="meta-row">
              <span class="badge ${item.category}">${item.label}</span>
              <span>${item.time}</span>
              <span>${item.source}</span>
            </div>
            <h3>${item.title}</h3>
            <p>${item.summary}</p>
            <div class="article-footer">
              <small>${item.read} · 影响 ${item.impact}</small>
              <button class="article-action ${saved.has(item.id) ? "saved" : ""}" type="button" data-save="${item.id}" aria-label="收藏 ${item.title}">
                <i data-lucide="bookmark"></i>
              </button>
            </div>
          </div>
        </article>
      `
    )
    .join("");

  grid.querySelectorAll("[data-save]").forEach((button) => {
    button.addEventListener("click", () => {
      const id = Number(button.dataset.save);
      if (saved.has(id)) saved.delete(id);
      else saved.add(id);
      localStorage.setItem("dailyBriefSaved", JSON.stringify([...saved]));
      renderNews();
      refreshIcons();
    });
  });

  grid.querySelectorAll("[data-detail-id]").forEach((card) => {
    const openDetail = () => {
      window.location.href = `daily-news-detail.html?id=${card.dataset.detailId}`;
    };
    card.addEventListener("click", (event) => {
      if (event.target.closest("[data-save]")) return;
      openDetail();
    });
    card.addEventListener("keydown", (event) => {
      if (event.key === "Enter") openDetail();
    });
  });
}

function renderHero() {
  const topStory = [...newsItems].sort((a, b) => b.impact + b.heat - (a.impact + a.heat))[0];
  document.querySelector("#heroHeadline").textContent = topStory.title;
  document.querySelector("#heroSummary").textContent = topStory.summary;
  document.querySelector("#impactScore").textContent = topStory.impact;
  document.querySelector("#heatScore").textContent = topStory.heat;
}

function renderMarkets() {
  document.querySelector("#marketCards").innerHTML = markets
    .map(
      (market) => `
        <div class="market-card">
          <span>${market.name}</span>
          <strong>${market.value}</strong>
          <small class="${market.down ? "down" : ""}">${market.change}</small>
        </div>
      `
    )
    .join("");
}

function renderTrends() {
  document.querySelector("#trendList").innerHTML = trends
    .map(
      ([title, label, heat]) => `
        <li>
          <span>
            <strong>${title}</strong>
            <small>${label}</small>
          </span>
          <span class="trend-heat">${heat}</span>
        </li>
      `
    )
    .join("");
}

function renderWorldCup() {
  const rankingRoot = document.querySelector("#worldcupRanking");
  const fixturesRoot = document.querySelector("#worldcupFixtures");
  if (!rankingRoot || !fixturesRoot) return;

  rankingRoot.innerHTML = worldcupRanking
    .map(
      (item) => `
        <li>
          <span>
            <strong>${item.team}</strong>
            <small>${item.note}</small>
          </span>
          <em>${item.status}</em>
        </li>
      `
    )
    .join("");

  fixturesRoot.innerHTML = worldcupFixtures
    .map(
      (item) => `
        <div class="fixture-row">
          <div>
            <strong>${item.match}</strong>
            <small>${item.stage} · ${item.date}</small>
          </div>
          <time>${item.time}</time>
        </div>
      `
    )
    .join("");
}

function renderTimeline() {
  document.querySelector("#timelineList").innerHTML = [...newsItems]
    .sort((a, b) => a.time.localeCompare(b.time))
    .slice(0, 6)
    .map(
      (item) => `
        <div class="timeline-item">
          <div class="timeline-time">${item.time}</div>
          <div>
            <strong>${item.title}</strong>
            <p>${item.summary}</p>
          </div>
        </div>
      `
    )
    .join("");
}

function refreshIcons() {
  if (window.lucide) {
    window.lucide.createIcons();
  }
}

function render() {
  renderTabs();
  renderNews();
  renderHero();
  renderMarkets();
  renderTrends();
  renderWorldCup();
  renderTimeline();
  refreshIcons();
}

function tickClock() {
  const now = new Date();
  document.querySelector("#liveClock").textContent = new Intl.DateTimeFormat("zh-CN", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(now);
}

function copyDigest() {
  const lines = newsItems
    .slice(0, 5)
    .map((item, index) => `${index + 1}. [${item.label}] ${item.title} - ${item.summary}`)
    .join("\n");
  navigator.clipboard?.writeText(`Fox 私有新闻台 ${formatDate(new Date())}\n${lines}`);
  const button = document.querySelector("#copyDigest");
  const original = button.innerHTML;
  button.innerHTML = `<i data-lucide="check"></i> 已复制`;
  refreshIcons();
  setTimeout(() => {
    button.innerHTML = original;
    refreshIcons();
  }, 1400);
}

document.addEventListener("DOMContentLoaded", () => {
  if (!document.querySelector("#newsGrid")) return;
  const today = formatDate(new Date());
  document.querySelector("#todayLabel").textContent = `${today} · 今日简报`;
  document.querySelector("#footerDate").textContent = today;
  document.querySelector("#newsSearch").addEventListener("input", (event) => {
    searchTerm = event.target.value;
    renderNews();
    refreshIcons();
  });
  document.querySelector("#themeToggle").addEventListener("click", () => {
    document.body.classList.toggle("dark");
    const isDark = document.body.classList.contains("dark");
    document.querySelector("#themeToggle").innerHTML = `<i data-lucide="${isDark ? "sun" : "moon"}"></i>`;
    refreshIcons();
  });
  document.querySelector("#copyDigest").addEventListener("click", copyDigest);
  tickClock();
  setInterval(tickClock, 15000);
  render();
});
