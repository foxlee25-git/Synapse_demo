const revealTargets = document.querySelectorAll("[data-reveal]");

if ("IntersectionObserver" in window && revealTargets.length > 0) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.16, rootMargin: "0px 0px -6% 0px" }
  );

  revealTargets.forEach((element) => observer.observe(element));
} else {
  revealTargets.forEach((element) => element.classList.add("is-visible"));
}

const DEMO_CONTEXT_KEY = "synapse-demo-context";
const DEMO_VISITED_KEY = "synapse-demo-visited-pages";
const DEMO_LOCALE_KEY = "synapse-demo-locale";
const JOURNEY_ORDER = ["connect", "understand", "dispatch", "approve"];
const DEMO_PAGE_ORDER = [
  "index",
  "product-architecture",
  "dashboard",
  "app",
  "agents",
  "data-intake",
  "settings",
];
const PAGE_STAGE_MAP = {
  index: "connect",
  "product-architecture": "understand",
  dashboard: "dispatch",
  app: "dispatch",
  agents: "understand",
  "data-intake": "connect",
  settings: "approve",
};

const SUPPORTED_LOCALES = ["en", "zh"];

const zhTextMap = {
  "Showcase": "展示",
  "Architecture": "架构",
  "Page Architecture": "页面架构",
  "Dashboard": "看板",
  "Chat": "对话",
  "Agents": "Agents",
  "Data": "数据",
  "Workspace": "工作台",
  "Demo Flow": "演示流程",
  "Data Intake": "数据接入",
  "Knowledge": "知识",
  "Patient": "病人",
  "Tasks": "任务",
  "Approvals": "审批",
  "Settings": "设置",
  "Settings & Governance": "设置与治理",
  "Dental Clinic Pilot": "牙科诊所试点",
  "Dental Pilot Dashboard": "牙科试点看板",
  "Doctor Workspace": "医生工作台",
  "Open Dashboard": "打开看板",
  "Open Chat": "打开对话",
  "Open Agents": "打开 Agents",
  "See Architecture": "查看架构",
  "Open Doctor Workspace": "打开医生工作台",
  "Open Workspace": "打开工作台",
  "Open Pilot Dashboard": "打开试点看板",
  "Open Pilot Story": "打开试点演示",
  "Open Demo Flow": "打开演示流程",
  "Open Task Center": "打开任务中心",
  "Open Approval Center": "打开审批中心",
  "Open Patient View": "打开病人视图",
  "Open Patient Intelligence": "打开病人智能",
  "Open Approvals": "打开审批",
  "Open Settings": "打开设置",
  "Back to Demo Flow": "返回演示流程",
  "Back to Showcase": "返回展示",
  "Back to Data Intake": "返回数据接入",
  "Back to Workspace": "返回工作台",
  "Back to Patient View": "返回病人视图",
  "Back to Tasks": "返回任务",
  "Back to Approvals": "返回审批",
  "Review Approvals": "查看审批",
  "See Governance": "查看治理",
  "Reset Demo": "重置演示",
  "Live Demo Context": "实时演示上下文",
  "Current page:": "当前页面：",
  "What the client will actually see next week.": "下周客户实际会看到的内容。",
  "This version is packaged as a pilot walkthrough. It shows the executive dashboard, the workspace, and the execution flow we can put in front of a client next week.": "这一版已经打包成可演示的试点版本，展示管理看板、医生工作台，以及下周可以直接给客户看的执行流程。",
  "Synapse Pilot": "Synapse 试点",
  "Pilot Map": "试点地图",
  "A clickable pilot for next week's client conversation.": "一套可以直接用于下周客户沟通的可点击试点版本。",
  "Recommended Flow": "推荐路径",
  "Demo Runbook": "演示脚本",
  "Fastest path to show the product": "最快讲清产品的路径",
  "Scenario Switching": "场景切换",
  "One demo, two business narratives": "一套演示，两种业务叙事",
  "Presenter Tip": "演示提示",
  "Reset before each walkthrough": "每次演示前先重置",
  "Follow-up": "复诊随访",
  "Implant consult": "种植咨询",
  "Owner + Operator View": "老板与运营视图",
  "Refresh board": "刷新看板",
  "Prepare doctor work": "准备医生工作",
  "Escalate doctor review": "升级医生审核",
  "Pilot Controls": "试点控制",
  "Run the doctor workflow live.": "现场演示医生工作流。",
  "Case Type": "病例类型",
  "Load patient chart": "加载病人档案",
  "Draft note": "起草病历",
  "Doctor sign-off": "医生签字确认",
  "Open Doctor Chat": "打开医生对话",
  "See Draft Record": "查看病历草稿",
  "Patient Context": "病人上下文",
  "The doctor starts from one patient view.": "医生从统一病人视图开始。",
  "Current Patient": "当前病人",
  "Clinical Focus": "临床重点",
  "Report Summary": "报告摘要",
  "Patient Snapshot": "病人摘要",
  "What the AI already understands": "AI 已经理解的内容",
  "Draft Record": "病历草稿",
  "Doctor Chat + Agent": "医生对话 + AI Agent",
  "Let the doctor finish the work inside one conversation.": "让医生在一段对话里完成工作。",
  "Doctor Thread": "医生线程",
  "Draft Status": "草稿状态",
  "Pending doctor review": "待医生审核",
  "Pending doctor sign-off": "待医生签字",
  "Draft note is waiting for final confirmation.": "病历草稿正在等待最终确认。",
  "Patient Intelligence": "病人智能",
  "Understand the patient before drafting the record.": "在起草病历前先理解病人。",
  "Refresh context": "刷新上下文",
  "Dispatch agents": "派出 Agent",
  "Problem Map": "问题地图",
  "Suggested Dispatch": "建议派发",
  "Latest Update": "最新更新",
  "Context ready": "上下文已准备",
  "Ready for the next part of the demo?": "准备进入演示的下一部分了吗？",
  "Demo Map": "演示地图",
  "Track where you are in the product walkthrough.": "跟踪你在整套产品演示中的位置。",
  "What to Click": "建议点击",
  "Best Next Step": "最佳下一步",
  "Scenario:": "场景：",
  "Best next step:": "最佳下一步：",
  "Pilot Guide": "试点说明",
  "Pilot Dashboard Guide": "试点看板说明",
  "Dashboard Guide": "看板说明",
  "Chat Guide": "对话说明",
  "Agent Guide": "Agent 说明",
  "Workspace Guide": "工作台说明",
  "Patient Guide": "病人说明",
  "Knowledge Guide": "知识说明",
  "Intake Guide": "接入说明",
  "Task Guide": "任务说明",
  "Approval Guide": "审批说明",
  "Governance Guide": "治理说明",
  "Stage 1 / Connect": "阶段 1 / 接入",
  "Stage 2 / Understand": "阶段 2 / 理解",
  "Stage 3 / Dispatch": "阶段 3 / 执行",
  "Stage 4 / Approve": "阶段 4 / 审批",
  "Connect data": "接入数据",
  "Understand patient": "理解病人",
  "Approve actions": "审批动作",
  "Start Demo": "开始演示",
  "Next": "下一步",
  "Reset": "重置",
  "Collapse details": "收起详情",
  "Expand details": "展开详情",
  "Business Demos": "业务演示",
  "See Workspace": "查看工作台",
  "Live Walkthrough": "实时演示",
  "Stage": "阶段",
  "Flow Control": "流程控制",
  "Progress": "进度",
  "Current State": "当前状态",
  "What Happens": "系统在做什么",
  "What You Get": "你会得到什么",
  "Next Step": "下一步",
  "Narration": "讲解话术",
  "Audience": "适合谁看",
  "Objections": "常见疑问",
  "Close Line": "收尾一句话",
  "Featured Case": "推荐案例",
  "Jump to case": "跳到案例",
  "Proof": "可信度",
  "Follow-up clinic day": "复诊日",
  "Implant consult day": "种植咨询日",
  "Board synced": "看板已同步",
  "Pilot work live": "试点工作进行中",
  "Escalated": "已升级",
  "doctor agent active": "医生 Agent 在线",
  "doctor and record agents running": "医生 Agent 与病历 Agent 运行中",
  "doctor confirmed and synced": "医生已确认并同步",
  "Doctor Agent": "医生 Agent",
  "Record Agent": "病历 Agent",
  "Follow-up Agent": "随访 Agent",
  "Doctor Review": "医生审核",
  "Doctor Sign-off": "医生签字",
  "Doctor signed": "医生已签字",
  "Record written back": "病历已写回",
  "Medical record draft not started": "病历草稿尚未开始",
  "Medical record draft ready to start": "病历草稿可开始",
  "Medical record draft in review": "病历草稿审核中",
  "Medical record signed": "病历已签字",
  "Consult record draft not started": "咨询病历草稿尚未开始",
  "Implant consult draft ready to start": "种植咨询草稿可开始",
  "Implant consult draft in review": "种植咨询草稿审核中",
  "Consult record signed": "咨询病历已签字",
  "chart ready for review": "档案已可查看",
  "patient chart synced": "病人档案已同步",
  "consult chart synced": "咨询档案已同步",
  "Periapical review": "根尖片复查",
  "CBCT review": "CBCT 复查",
  "Approved": "已批准",
  "Published": "已发布",
  "Approve": "批准",
  "Request revision": "要求修改",
  "Review draft": "查看草稿",
  "Back to Approvals": "返回审批",
  "Governance Layer": "治理层",
  "Control roles, models, and budget.": "控制角色、模型和预算。",
  "Shift routing": "切换路由",
  "Trigger budget alert": "触发预算提醒",
  "Roles": "角色",
  "Who sees and approves what": "谁能看什么、批什么",
  "Scope": "范围",
  "Agent access boundaries": "Agent 访问边界",
  "Routing": "路由",
  "Model strategy": "模型策略",
  "Budget": "预算",
  "Usage control": "使用控制",
  "Governance Timeline": "治理时间线",
  "Current policy state": "当前治理状态",
  "Owner": "老板",
  "Operator": "运营",
  "Admin": "管理员",
  "Owner mode": "老板模式",
  "Operator mode": "运营模式",
  "Admin mode": "管理员模式",
  "Routing shifted": "路由已切换",
  "Budget alert": "预算提醒",
  "Owner: sees outcomes and approves high-risk actions": "老板：看结果并批准高风险动作",
  "Operator: runs daily tasks and reviews drafts": "运营：推进日常任务并审核草稿",
  "Sales: pushes client actions and follow-up": "销售：推进客户动作和后续跟进",
  "Admin: manages systems, permissions, and policies": "管理员：管理系统、权限和策略",
  "Owner sees the executive summary and approval queue.": "老板查看总览摘要和审批队列。",
  "Growth Agent can only read growth and ads data.": "增长 Agent 只能读取增长和广告数据。",
  "Sales Agent cannot change budget settings directly.": "销售 Agent 不能直接修改预算设置。",
  "Hybrid model route for balanced cost and quality": "混合模型路由，平衡成本和质量",
  "High-value approval notes can use a stronger model": "高价值审批内容可使用更强模型",
  "Simple summaries default to smaller models": "简单摘要默认使用小模型",
  "Monthly budget: $420": "月预算：$420",
  "Used: 61%": "已使用：61%",
  "On track this week": "本周使用正常",
  "Default routing is balanced for cost and quality.": "默认路由在成本和质量之间做平衡。",
  "High-risk actions must go through approval before execution.": "高风险动作必须先审批再执行。",
  "Owners only step in on budget, client-facing, or risk-heavy moves.": "老板只在预算、面向客户或高风险动作上介入。",
  "This page manages permissions, integration scope, routing strategy, budget pressure, and audit posture.": "这一页管理权限、接入范围、路由策略、预算压力和审计状态。",
  "Owner view focuses on results, budget, approvals, and which actions still need a human decision.": "老板视角重点看结果、预算、审批，以及哪些动作仍然需要人工决定。",
  "Operator view focuses on task visibility, knowledge maintenance, and keeping the approval lane moving.": "运营视角重点看任务可见性、知识维护，以及让审批流持续推进。",
  "Admin view manages permissions, integration scopes, model routing, and budget controls.": "管理员视角负责权限、接入范围、模型路由和预算控制。",
  "Operator: sees tasks, edits knowledge, and manages approvals": "运营：查看任务、编辑知识并管理审批",
  "Owner: approves high-risk actions": "老板：批准高风险动作",
  "Sales: sees client summary and follow-up items": "销售：查看客户摘要和后续跟进项",
  "Admin: manages integrations and policy controls": "管理员：管理接入和治理策略",
  "Operators can review agent output and knowledge drafts.": "运营可以审核 Agent 输出和知识草稿。",
  "Knowledge Agent can read SOP and FAQ content.": "知识 Agent 可以读取 SOP 和 FAQ 内容。",
  "Operators cannot change the global budget policy.": "运营不能修改全局预算策略。",
  "Reviews and recommendations prefer hybrid route": "复盘和建议默认走混合路由",
  "FAQ drafting and cleanup prefer smaller models": "FAQ 起草和清理优先使用小模型",
  "Complex explanations can escalate to stronger models": "复杂说明可以升级到更强模型",
  "Alert if review load spikes": "当审核负载升高时提醒",
  "Approval lane is healthy and one draft is waiting review.": "审批队列当前正常，仍有一份草稿等待审核。",
  "Operators can edit knowledge, but publishing still requires approval.": "运营可以编辑知识，但发布仍然需要审批。",
  "Task and knowledge changes are logged in the governance timeline.": "任务和知识变更都会记录在治理时间线里。",
  "Admin: manages integrations, models, budgets, and audits": "管理员：管理接入、模型、预算和审计",
  "Owner: sees outcomes and approvals": "老板：查看结果和审批",
  "Operator: runs tasks and maintains knowledge": "运营：推进任务并维护知识",
  "Sales: only sees client progression data": "销售：只查看客户推进数据",
  "Growth Agent only reads growth and ad sources.": "增长 Agent 只读取增长和广告来源。",
  "Sales Agent reads CRM and communication summaries.": "销售 Agent 读取 CRM 和沟通摘要。",
  "Knowledge Agent reads SOP and FAQ documents only.": "知识 Agent 只读取 SOP 和 FAQ 文档。",
  "Summaries and classification use smaller models": "摘要和分类任务使用小模型",
  "Business reviews use hybrid routing": "业务复盘使用混合路由",
  "High-value reasoning or approvals use stronger models": "高价值推理和审批使用更强模型",
  "Admin alert before overrun": "超支前向管理员提醒",
  "Admins can change agent scopes and integration grants any time.": "管理员可以随时调整 Agent 范围和接入授权。",
  "Model routing adapts to task complexity and budget pressure.": "模型路由会根据任务复杂度和预算压力自动调整。",
  "Every risky action leaves a visible audit trail.": "每个高风险动作都会留下可见的审计记录。",
  "Cost Saver route is active": "节省成本路由已启用",
  "More cleanup tasks now prefer smaller models": "更多清理类任务现在优先使用小模型",
  "Only high-value approvals and reasoning keep stronger models": "只有高价值审批和推理继续使用强模型",
  "Used: 89%": "已使用：89%",
  "Admin alert triggered": "已触发管理员提醒",
}

const pageMetaZhMap = {
  index: {
    title: "Synapse 牙科诊所试点",
    description: "Synapse 牙科诊所试点，用于展示医生工作台、病人智能、AI 病历起草、审批和治理。",
  },
  dashboard: {
    title: "Synapse 牙科试点看板",
    description: "牙科试点看板，展示今日病人、报告压力、病历草稿和医生审核状态。",
  },
  demo: {
    title: "Synapse 牙科演示流程",
    description: "展示牙科诊所如何从病人资料接入、理解，到 AI 起草病历和医生签字确认。",
  },
  app: {
    title: "Synapse 医生工作台",
    description: "牙科医生工作台，用于展示病人上下文、AI 对话、病历草稿和医生确认。",
  },
  "data-intake": {
    title: "Synapse 数据接入",
    description: "展示牙科诊所如何接入病历、检查报告、模板和业务资料。",
  },
  "knowledge-feed": {
    title: "Synapse 知识喂养",
    description: "展示诊所如何把模板、规则、SOP 和长期记忆喂给系统。",
  },
  "client-intelligence": {
    title: "Synapse 病人智能",
    description: "展示系统如何在起草病历前先理解病人、病情重点和下一步建议。",
  },
  "task-center": {
    title: "Synapse 任务中心",
    description: "展示医生与 AI Agent 之间的任务流转、跟进和完成状态。",
  },
  "approval-center": {
    title: "Synapse 审批中心",
    description: "展示病历、外发内容和高风险动作的审批与追溯能力。",
  },
  settings: {
    title: "Synapse 设置与治理",
    description: "展示角色权限、模型路由、预算控制和治理策略。",
  },
}

function getLocale() {
  const urlLocale = new URLSearchParams(window.location.search).get("lang");
  if (SUPPORTED_LOCALES.includes(urlLocale)) {
    localStorage.setItem(DEMO_LOCALE_KEY, urlLocale);
    return urlLocale;
  }
  const stored = localStorage.getItem(DEMO_LOCALE_KEY);
  if (SUPPORTED_LOCALES.includes(stored)) return stored;
  return "en";
}

const currentLocale = getLocale();
document.documentElement.lang = currentLocale === "zh" ? "zh-CN" : "en";

const localeTextMap = currentLocale === "zh" ? zhTextMap : null;

const pageMetaTranslations = currentLocale === "zh" ? pageMetaZhMap : null;

function localizeString(value) {
  if (!localeTextMap || typeof value !== "string") return value;
  return localeTextMap[value] || value;
}

function withLocaleHref(href, locale = currentLocale) {
  if (!href || href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:")) {
    return href;
  }
  try {
    const url = new URL(href, window.location.href);
    if (url.origin !== window.location.origin || !url.pathname.endsWith(".html")) {
      return href;
    }
    if (locale === "zh") {
      url.searchParams.set("lang", "zh");
    } else {
      url.searchParams.delete("lang");
    }
    return `${url.pathname.split("/").pop()}${url.search}${url.hash}`;
  } catch (error) {
    return href;
  }
}

function rewriteInternalLinks(root = document) {
  root.querySelectorAll("a[href]").forEach((link) => {
    const nextHref = withLocaleHref(link.getAttribute("href"));
    if (nextHref) link.setAttribute("href", nextHref);
  });
}

function translateStaticContent(root = document) {
  if (!localeTextMap) return;
  root.querySelectorAll("a, button, p, h1, h2, h3, h4, li, span, strong").forEach((element) => {
    if (
      [
        "data-demo-field",
        "data-demo-list",
        "data-demo-journey-field",
        "data-demo-journey-link",
        "data-demo-guide",
        "data-demo-guide-list",
        "data-demo-guide-link",
        "data-page-journey",
        "data-page-journey-link",
        "data-dashboard-field",
        "data-dashboard-list",
        "data-intake-field",
        "data-intake-list",
        "data-approval-field",
        "data-approval-list",
        "data-client-field",
        "data-client-list",
        "data-task-list",
        "data-knowledge-field",
        "data-knowledge-list",
        "data-settings-field",
        "data-settings-list",
      ].some((attr) => element.hasAttribute(attr))
    ) {
      return;
    }
    if (element.children.length > 0 && !["A", "BUTTON"].includes(element.tagName)) return;
    const base = (element.dataset.i18nOrig || element.textContent || "").trim();
    if (!base) return;
    if (!element.dataset.i18nOrig) element.dataset.i18nOrig = base;
    element.textContent = localizeString(element.dataset.i18nOrig);
  });
}

function injectLanguageSwitcher() {
  const headerActions = document.querySelector(".header-actions");
  if (!headerActions || headerActions.querySelector("[data-language-switcher]")) return;
  const switcher = document.createElement("div");
  switcher.className = "demo-button-row";
  switcher.setAttribute("data-language-switcher", "true");
  switcher.innerHTML = `
    <a class="button ${currentLocale === "en" ? "button-primary" : "button-secondary"}" href="${withLocaleHref(window.location.href, "en")}">EN</a>
    <a class="button ${currentLocale === "zh" ? "button-primary" : "button-secondary"}" href="${withLocaleHref(window.location.href, "zh")}">中文</a>
  `;
  headerActions.prepend(switcher);
}

function localizePageMeta() {
  if (!pageMetaTranslations) return;
  const pageMeta = pageMetaTranslations[getCurrentPageKey()];
  if (!pageMeta) return;
  document.title = pageMeta.title;
  const description = document.querySelector('meta[name="description"]');
  if (description) description.setAttribute("content", pageMeta.description);
}

const scenarioMeta = {
  retail: {
    label: "Follow-up",
    summary: "return visit / prior treatment / note update",
  },
  agency: {
    label: "Implant consult",
    summary: "complex case / imaging review / treatment planning",
  },
};

const stageMeta = {
  connect: {
    label: "Stage 1 / Connect",
    summary: "Connect data",
    href: "data-intake.html",
    cta: "Open Data Intake",
  },
  understand: {
    label: "Stage 2 / Understand",
    summary: "Understand patient",
    href: "client-intelligence.html",
    cta: "Open Patient View",
  },
  dispatch: {
    label: "Stage 3 / Dispatch",
    summary: "Dispatch agents",
    href: "task-center.html",
    cta: "Open Task Center",
  },
  approve: {
    label: "Stage 4 / Approve",
    summary: "Approve actions",
    href: "approval-center.html",
    cta: "Open Approvals",
  },
};

const pageLabelMeta = {
  index: { label: "Showcase", href: "index.html" },
  "product-architecture": {
    label: "Architecture",
    href: "product-architecture.html",
  },
  dashboard: { label: "Dashboard", href: "dashboard.html" },
  app: { label: "Chat", href: "app.html" },
  agents: { label: "Agents", href: "agents.html" },
  "data-intake": { label: "Data", href: "data-intake.html" },
  settings: { label: "Settings", href: "settings.html" },
};

const pageGuideMeta = {
  index: {
    eyebrow: "Platform Guide",
    title: "Use this page to frame the four-page product story.",
    body: "This page should position Synapse as a simple small-business AI platform. Lead with Dashboard, then show Chat, Agents, and Data as one connected loop.",
    clicks: [
      "Open Dashboard first when the audience asks what the system looks like day to day.",
      "Open Chat when they ask how users actually work with the AI.",
      "Open Agents and Data to show the platform can be configured by role instead of acting like one generic bot.",
    ],
    next: { label: "Open Architecture", href: "product-architecture.html" },
  },
  "product-architecture": {
    eyebrow: "Architecture Guide",
    title: "Use this page to explain how the product surfaces fit together.",
    body: "This is the cleanest way to turn the product idea into a page map. Use it when the audience asks what belongs in V1, what comes later, and how the user actually moves through the system.",
    clicks: [
      "Use the main flow band to explain the core loop from Data to Agents to Chat to Dashboard.",
      "Use the page cards to define the role of each primary surface without going too deep into implementation.",
      "Use the recommended journey to show the order that makes the product easiest to demo and easiest to build.",
    ],
    next: { label: "Open Dashboard", href: "dashboard.html" },
  },
  dashboard: {
    eyebrow: "Dashboard Guide",
    title: "Lead with the operating view, not the AI story.",
    body: "This page works best when the audience wants to know what the team sees before opening any deeper module. It should feel like a real work surface, not a concept slide.",
    clicks: [
      "Point to the KPI cards first so the audience sees connected sources, outputs, and waiting tasks.",
      "Use Agent Status to show that different role assistants are already working in parallel.",
      "Use To Review to prove the platform still leaves clear human checkpoints.",
    ],
    next: { label: "Open Chat", href: "app.html" },
  },
  app: {
    eyebrow: "Chat Guide",
    title: "Show how one thread turns context into output.",
    body: "This page should make the product feel usable immediately. The point is not that users can chat, but that chat becomes structured, saveable business work.",
    clicks: [
      "Start with the agent list on the left to show the user can switch roles.",
      "Use the center conversation to show how an agent works against uploaded business context.",
      "Use the right rail to explain that outputs can be saved, edited, or converted into tasks.",
    ],
    next: { label: "Open Agents", href: "agents.html" },
  },
  agents: {
    eyebrow: "Agent Guide",
    title: "Prove each role has its own data, rules, and outputs.",
    body: "This is the page that makes Synapse feel like a platform. It should show that a Sales Agent, Assistant Agent, and Support Agent are not the same assistant with a different label.",
    clicks: [
      "Use the top cards to show the platform starts from role templates.",
      "Use the middle section to explain which tabs make an agent configurable.",
      "Use the Sales Agent detail block to show what good scope, outputs, and restrictions look like.",
    ],
    next: { label: "Open Data", href: "data-intake.html" },
  },
  "data-intake": {
    eyebrow: "Intake Guide",
    title: "Show how the platform gets useful without heavy setup.",
    body: "This page should answer the first trust question: what exactly is coming into the system, and which agent can use it? Keep the story simple and practical.",
    clicks: [
      "Use the upload area to show that files are still the fastest first step for many small teams.",
      "Use the source map to show how the same file can be visible to one role and hidden from another.",
      "Use the health section to prove the data layer is observable and not a black box.",
    ],
    next: { label: "Open Settings", href: "settings.html" },
  },
  settings: {
    eyebrow: "Governance Guide",
    title: "End with access, routing, and budget control.",
    body: "This should be the final proof page. It answers the adoption questions that small teams and buyers always ask: who can see what, how models are routed, and how cost stays visible.",
    clicks: [
      "Switch roles to show the product is role-aware, not one-size-fits-all.",
      "Shift routing to explain cost and quality tradeoffs.",
      "Trigger budget alert to show there is an operating boundary around usage.",
    ],
    next: { label: "Back to Showcase", href: "index.html" },
  },
};

const pageJourneyMeta = {
  index: {
    stage: "Showcase",
    summary: "Frame the platform story before opening the page map.",
    previous: { label: "Stay on Showcase", href: "index.html" },
    next: { label: "Open Architecture", href: "product-architecture.html" },
  },
  "product-architecture": {
    stage: "Architecture",
    summary: "Define the core pages, supporting surfaces, and recommended user path.",
    previous: { label: "Back to Showcase", href: "index.html" },
    next: { label: "Open Dashboard", href: "dashboard.html" },
  },
  dashboard: {
    stage: "Dashboard",
    summary: "Show the operating center before opening any working surface.",
    previous: { label: "Back to Showcase", href: "index.html" },
    next: { label: "Open Chat", href: "app.html" },
  },
  app: {
    stage: "Chat",
    summary: "Show how a user works with one role-based agent in a practical thread.",
    previous: { label: "Back to Dashboard", href: "dashboard.html" },
    next: { label: "Open Agents", href: "agents.html" },
  },
  agents: {
    stage: "Agents",
    summary: "Show how each role gets its own scope, data, and default outputs.",
    previous: { label: "Back to Chat", href: "app.html" },
    next: { label: "Open Data", href: "data-intake.html" },
  },
  "data-intake": {
    stage: "Data",
    summary: "Show how files and connected systems become usable context for each agent.",
    previous: { label: "Back to Agents", href: "agents.html" },
    next: { label: "Open Settings", href: "settings.html" },
  },
  settings: {
    stage: "Governance",
    summary: "Close with role boundaries, model routing, and budget visibility.",
    previous: { label: "Back to Data", href: "data-intake.html" },
    next: { label: "Back to Showcase", href: "index.html" },
  },
};

function getCurrentPageKey() {
  const filename = window.location.pathname.split("/").pop() || "index.html";
  return filename.replace(".html", "");
}

function loadDemoContext() {
  try {
    const parsed = JSON.parse(localStorage.getItem(DEMO_CONTEXT_KEY) || "{}");
    return {
      scenario: parsed.scenario || "retail",
      stage: parsed.stage || PAGE_STAGE_MAP[getCurrentPageKey()] || "connect",
      lastPage: parsed.lastPage || getCurrentPageKey(),
    };
  } catch (error) {
    return {
      scenario: "retail",
      stage: PAGE_STAGE_MAP[getCurrentPageKey()] || "connect",
      lastPage: getCurrentPageKey(),
    };
  }
}

const demoContext = loadDemoContext();

function loadVisitedPages() {
  try {
    const parsed = JSON.parse(localStorage.getItem(DEMO_VISITED_KEY) || "[]");
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    return [];
  }
}

let visitedPages = loadVisitedPages();

function saveDemoContext() {
  localStorage.setItem(DEMO_CONTEXT_KEY, JSON.stringify(demoContext));
}

function saveVisitedPages() {
  localStorage.setItem(DEMO_VISITED_KEY, JSON.stringify(visitedPages));
}

function trackVisitedPage() {
  const pageKey = getCurrentPageKey();
  if (!visitedPages.includes(pageKey)) {
    visitedPages = [...visitedPages, pageKey];
    saveVisitedPages();
  }
}

function setDemoScenario(scenario) {
  demoContext.scenario = scenario;
  demoContext.lastPage = getCurrentPageKey();
  saveDemoContext();
  syncDemoContextBar();
}

function setDemoStage(stage) {
  demoContext.stage = stage;
  demoContext.lastPage = getCurrentPageKey();
  saveDemoContext();
  syncDemoContextBar();
}

function sanitizeDisplayText(value) {
  if (typeof value !== "string") return value;
  return value.replace(/\s{2,}/g, " ").trim();
}

function setTextByAttr(attr, field, value) {
  const element = document.querySelector(`[${attr}="${field}"]`);
  if (element) {
    element.textContent = sanitizeDisplayText(localizeString(value));
  }
}

function setListByAttr(attr, field, items) {
  const list = document.querySelector(`[${attr}="${field}"]`);
  if (!list) return;
  list.innerHTML = "";
  items.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = sanitizeDisplayText(localizeString(item));
    list.appendChild(li);
  });
}

function setLinkByAttr(attr, field, value) {
  const link = document.querySelector(`[${attr}="${field}"]`);
  if (!link || !value) return;
  link.textContent = sanitizeDisplayText(localizeString(value.label));
  link.setAttribute("href", withLocaleHref(value.href));
}

function setDemoField(field, value) {
  setTextByAttr("data-demo-field", field, value);
}

function setDemoList(field, value) {
  setListByAttr("data-demo-list", field, value);
}

function setJourneyField(field, value) {
  setTextByAttr("data-demo-journey-field", field, value);
}

function setJourneyList(field, value) {
  setListByAttr("data-demo-journey-list", field, value);
}

function setJourneyLink(field, value) {
  setLinkByAttr("data-demo-journey-link", field, value);
}

function renderDemoContextBar() {
  const header = document.querySelector(".site-header");
  if (!header || document.querySelector("[data-demo-context-bar]")) return;

  const bar = document.createElement("section");
  bar.className = "demo-context-bar";
  bar.setAttribute("data-demo-context-bar", "true");
  bar.innerHTML = `
    <div class="demo-context-copy">
      <p class="eyebrow">Live Demo Context</p>
      <div class="demo-context-head">
        <h2 data-demo-context="headline"></h2>
        <span class="status-badge live" data-demo-context="stageLabel"></span>
      </div>
      <p class="journey-note" data-demo-context="summary"></p>
    </div>
    <div class="demo-context-actions">
      <div class="segmented-control demo-context-toggle">
        <button class="segment-button" data-global-scenario="retail" type="button">Follow-up</button>
        <button class="segment-button" data-global-scenario="agency" type="button">Implant consult</button>
      </div>
      <div class="demo-context-links">
        <a class="mini-pill interactive-chip" href="demo.html">Back to Demo Flow</a>
        <a class="button button-primary" data-demo-context="stageLink" href="demo.html">Open Next</a>
        <button class="button button-secondary" data-demo-context-reset type="button">Reset Demo</button>
      </div>
      <p class="demo-context-page">
        ${localizeString("Current page:")}
        <strong>${getCurrentPageKey().replace(/-/g, " ")}</strong>
      </p>
    </div>
  `;

  header.insertAdjacentElement("afterend", bar);

  bar.querySelectorAll("[data-global-scenario]").forEach((button) => {
    button.addEventListener("click", () => {
      setDemoScenario(button.dataset.globalScenario);
      window.dispatchEvent(new CustomEvent("synapse:scenario-change"));
    });
  });

  const resetButton = bar.querySelector("[data-demo-context-reset]");
  if (resetButton) {
    resetButton.addEventListener("click", () => {
      demoContext.scenario = "retail";
      demoContext.stage = "connect";
      demoContext.lastPage = getCurrentPageKey();
      saveDemoContext();
      syncDemoContextBar();
      window.dispatchEvent(new CustomEvent("synapse:reset-demo"));
    });
  }
}

function syncDemoContextBar() {
  const scenario = scenarioMeta[demoContext.scenario];
  const stage = stageMeta[demoContext.stage];
  setTextByAttr("data-demo-context", "headline", `${scenario.label} -> ${stage.summary}`);
  setTextByAttr(
    "data-demo-context",
    "stageLabel",
    stage.label
  );
  setTextByAttr(
    "data-demo-context",
    "summary",
    `Scenario: ${scenario.label}. Best next step: ${stage.summary}. ${scenario.summary}.`
  );
  const link = document.querySelector('[data-demo-context="stageLink"]');
  if (link) {
    link.textContent = localizeString(stage.cta);
    link.setAttribute("href", withLocaleHref(stage.href));
  }
  document.querySelectorAll("[data-global-scenario]").forEach((button) => {
    button.classList.toggle(
      "is-active",
      button.dataset.globalScenario === demoContext.scenario
    );
  });
}

function renderDemoGuideBand() {
  const pageKey = getCurrentPageKey();
  const config = pageGuideMeta[pageKey];
  const anchor = document.querySelector("[data-demo-context-bar]") || document.querySelector(".site-header");
  if (!config || !anchor || document.querySelector("[data-demo-guide-band]")) return;

  const section = document.createElement("section");
  section.className = "demo-guide-band";
  section.setAttribute("data-demo-guide-band", "true");
  section.innerHTML = `
    <div class="demo-guide-copy">
      <p class="eyebrow" data-demo-guide="eyebrow"></p>
      <h2 data-demo-guide="title"></h2>
      <p class="journey-note" data-demo-guide="body"></p>
    </div>
    <div class="demo-guide-meta">
      <div class="demo-guide-block">
        <span class="demo-label">What to Click</span>
        <ul class="brief-list" data-demo-guide-list="clicks"></ul>
      </div>
      <div class="demo-guide-block">
        <span class="demo-label">Best Next Step</span>
        <div class="journey-links">
          <a class="button button-primary" data-demo-guide-link="next" href="index.html"></a>
        </div>
      </div>
    </div>
  `;

  anchor.insertAdjacentElement("afterend", section);
}

function syncDemoGuideBand() {
  const pageKey = getCurrentPageKey();
  const config = pageGuideMeta[pageKey];
  if (!config) return;

  setTextByAttr("data-demo-guide", "eyebrow", config.eyebrow);
  setTextByAttr("data-demo-guide", "title", config.title);
  setTextByAttr("data-demo-guide", "body", config.body);
  setListByAttr("data-demo-guide-list", "clicks", config.clicks);
  setLinkByAttr("data-demo-guide-link", "next", config.next);
}

function renderDemoMapBand() {
  const anchor =
    document.querySelector("[data-demo-guide-band]") ||
    document.querySelector("[data-demo-context-bar]") ||
    document.querySelector(".site-header");
  if (!anchor || document.querySelector("[data-demo-map-band]")) return;

  const section = document.createElement("section");
  section.className = "demo-map-band";
  section.setAttribute("data-demo-map-band", "true");
  section.innerHTML = `
    <div class="demo-map-head">
      <div>
        <p class="eyebrow">Demo Map</p>
        <h2>Track where you are in the product walkthrough.</h2>
      </div>
      <span class="mini-pill" data-demo-map="progress"></span>
    </div>
    <div class="demo-map-grid" data-demo-map-grid></div>
  `;

  anchor.insertAdjacentElement("afterend", section);
}

function syncDemoMapBand() {
  const grid = document.querySelector("[data-demo-map-grid]");
  if (!grid) return;

  const currentPage = getCurrentPageKey();
  grid.innerHTML = "";
  DEMO_PAGE_ORDER.forEach((pageKey) => {
    const meta = pageLabelMeta[pageKey];
    const link = document.createElement("a");
    link.className = "demo-map-item";
    link.href = withLocaleHref(meta.href);
    link.textContent = localizeString(meta.label);
    if (pageKey === currentPage) link.classList.add("is-current");
    if (visitedPages.includes(pageKey)) link.classList.add("is-visited");
    grid.appendChild(link);
  });

  const progress = document.querySelector('[data-demo-map="progress"]');
  if (progress) {
    progress.textContent =
      currentLocale === "zh"
        ? `已访问 ${visitedPages.length} / ${DEMO_PAGE_ORDER.length}`
        : `${visitedPages.length} / ${DEMO_PAGE_ORDER.length} visited`;
  }
}

function renderPageJourneyBand() {
  const pageKey = getCurrentPageKey();
  const config = pageJourneyMeta[pageKey];
  const main = document.querySelector("main");
  if (!config || !main || document.querySelector("[data-page-journey-band]")) return;

  const section = document.createElement("section");
  section.className = "section-block";
  section.setAttribute("data-page-journey-band", "true");
  section.innerHTML = `
    <div class="page-journey-band">
      <div class="page-journey-copy">
        <p class="eyebrow" data-page-journey="stage"></p>
        <h2>Ready for the next part of the demo?</h2>
        <p class="journey-note" data-page-journey="summary"></p>
      </div>
      <div class="page-journey-actions">
        <a class="button button-secondary" data-page-journey-link="previous" href="index.html"></a>
        <a class="button button-primary" data-page-journey-link="next" href="demo.html"></a>
      </div>
    </div>
  `;

  main.insertAdjacentElement("beforeend", section);
}

function syncPageJourneyBand() {
  const pageKey = getCurrentPageKey();
  const config = pageJourneyMeta[pageKey];
  if (!config) return;

  setTextByAttr("data-page-journey", "stage", `${config.stage} Step`);
  setTextByAttr("data-page-journey", "summary", config.summary);
  setLinkByAttr("data-page-journey-link", "previous", config.previous);
  setLinkByAttr("data-page-journey-link", "next", config.next);
}

function renderGlobalProductFooter() {
  const shell = document.querySelector(".page-shell");
  if (!shell || document.querySelector("[data-global-product-footer]")) return;

  const footer = document.createElement("footer");
  footer.className = "site-footer product-footer";
  footer.setAttribute("data-global-product-footer", "true");
  footer.innerHTML = `
    <div>
      <p class="brand-name">Synapse</p>
      <p class="footer-copy">Pilot demo for client intelligence, agents, approvals, and governance.</p>
    </div>
    <div class="footer-links">
      <a href="index.html">Showcase</a>
      <a href="dashboard.html">Dashboard</a>
      <a href="demo.html">Demo Flow</a>
      <a href="app.html">Workspace</a>
      <a href="settings.html">Settings</a>
    </div>
  `;

  shell.appendChild(footer);
}

renderDemoContextBar();
syncDemoContextBar();
trackVisitedPage();
renderDemoGuideBand();
syncDemoGuideBand();
renderDemoMapBand();
syncDemoMapBand();
renderPageJourneyBand();
syncPageJourneyBand();
renderGlobalProductFooter();
injectLanguageSwitcher();
localizePageMeta();
rewriteInternalLinks();
translateStaticContent();
saveDemoContext();

const workspaceScenarioContent = {
  retail: {
    fields: {
      patientName: "Lina Chen / follow-up visit",
      patientMeta: "Seen 3 times before. Root canal history on tooth 36.",
      intakeStep: "Load prior chart, imaging note, treatment history, and clinic template into one view.",
      understandStep: "Summarize complaint, prior treatment, report focus, and what the doctor should check first.",
      agentSplitStep: "Wake the doctor agent, record agent, and follow-up agent for this patient visit.",
      executionStep: "Summarize the report, draft the note, and prepare revisit actions with doctor sign-off.",
      contextStatus: "patient chart synced",
      connectedSystems: "EMR, imaging notes, appointment record, treatment history",
      reportTitle: "Periapical review",
      reportSummary: "Possible recurrent inflammation around tooth 36. Sensitivity reported on chewing.",
      growthStatus: "Chart read -> summary ready",
      salesStatus: "Draft queued -> medical record note",
      knowledgeStatus: "Template ready -> clinic note format",
      growthTagPrimary: "Follow-up",
      growthTagSecondary: "Tooth 36",
      growthMeta: "Doctor agent live",
      salesMeta: "Waiting for doctor edit",
      draftTitle: "Medical record draft not started",
      draftSummary: "Load the patient chart first, then ask the doctor agent to draft the note.",
      approvalSecondaryStatus: "Pending doctor review",
      knowledgeSecondary: "Draft note is waiting for final confirmation.",
      threadTitle: "# dr-li / patient-2026-04-22-1030",
      threadStatus: "doctor agent active",
      chatActorOne: "Dr. Li",
      chatLineOne: "Summarize this patient's history and today's imaging note before I see her.",
      chatActorTwo: "Doctor Agent",
      chatLineTwo: "I have reviewed the chart, prior treatment, and imaging note. Tooth 36 is still the main concern.",
      chatActorThree: "Doctor Agent",
      chatLineThree: "I can now draft the medical record with chief complaint, findings, and plan in the clinic template.",
      chatActorFour: "Doctor Review",
      chatLineFour: "The note will wait for doctor confirmation before writeback.",
    },
    lists: {
      chatOutcomeList: [
        "The chat can summarize the patient report.",
        "The chat can produce a clinic-format medical record draft.",
        "Only confirmed content writes back to the patient record.",
      ],
      patientContextList: [
        "Chief complaint: chewing discomfort on lower left side.",
        "History: prior root canal and crown placement on tooth 36.",
        "Watch item: confirm whether periapical inflammation has progressed.",
      ],
      draftChecklistList: [
        "Chief complaint",
        "Exam findings",
        "Assessment and plan",
      ],
    },
  },
  agency: {
    fields: {
      patientName: "David Wu / implant consult",
      patientMeta: "New consult. CBCT uploaded. Bone loss and sinus proximity need review.",
      intakeStep: "Load consult form, CBCT interpretation, prior imaging notes, and treatment planning template.",
      understandStep: "Summarize missing teeth, implant planning risks, and what the doctor should confirm chairside.",
      agentSplitStep: "Wake the doctor agent, record agent, and treatment-plan agent for this consult.",
      executionStep: "Read the report, prepare a structured consult note, and draft post-visit next steps for staff.",
      contextStatus: "consult chart synced",
      connectedSystems: "EMR, CBCT note, consult form, treatment plan template",
      reportTitle: "CBCT review",
      reportSummary: "Reduced bone height in the posterior maxilla. Sinus lift may need discussion before implant planning.",
      growthStatus: "Chart read -> consult summary ready",
      salesStatus: "Draft queued -> consult note",
      knowledgeStatus: "Template ready -> implant consult format",
      growthTagPrimary: "Complex case",
      growthTagSecondary: "CBCT review",
      growthMeta: "Doctor agent live",
      salesMeta: "Waiting for doctor edit",
      draftTitle: "Consult record draft not started",
      draftSummary: "Load the consult chart first, then ask the doctor agent to structure the record.",
      approvalSecondaryStatus: "Pending doctor sign-off",
      knowledgeSecondary: "Consult draft is waiting for final confirmation.",
      threadTitle: "# dr-li / implant-consult-2026-04-22-1130",
      threadStatus: "doctor agent active",
      chatActorOne: "Dr. Li",
      chatLineOne: "Read the CBCT summary and tell me the main planning risks before I start the consult.",
      chatActorTwo: "Doctor Agent",
      chatLineTwo: "I reviewed the CBCT note and prior intake. Bone height and sinus proximity are the main watch items.",
      chatActorThree: "Doctor Agent",
      chatLineThree: "I can draft the consult note with chief concern, imaging findings, assessment, and planning discussion.",
      chatActorFour: "Doctor Review",
      chatLineFour: "The consult note will wait for doctor confirmation before writeback.",
    },
    lists: {
      chatOutcomeList: [
        "The chat can summarize the CBCT note and planning risks.",
        "The chat can prepare a structured implant consult record.",
        "Only confirmed content writes back to the patient chart.",
      ],
      patientContextList: [
        "Chief concern: implant options for missing posterior teeth.",
        "History: new consult with uploaded CBCT and intake form.",
        "Watch item: review bone height and sinus risk before planning.",
      ],
      draftChecklistList: [
        "Chief concern",
        "Imaging findings",
        "Treatment discussion and plan",
      ],
    },
  },
};

const demoRuntimeState = {
  scenario: demoContext.scenario,
  connected: false,
  dispatched: false,
  approved: false,
};

function renderWorkspaceDemo() {
  const content = workspaceScenarioContent[demoRuntimeState.scenario];
  Object.entries(content.fields).forEach(([key, value]) => setDemoField(key, value));
  if (content.lists) {
    Object.entries(content.lists).forEach(([key, value]) => setDemoList(key, value));
  }

  if (demoRuntimeState.connected) {
    setDemoField(
      "contextStatus",
      demoRuntimeState.scenario === "retail" ? "patient chart synced" : "consult chart synced"
    );
    if (demoRuntimeState.scenario === "retail") {
      setDemoField("draftTitle", "Medical record draft ready to start");
      setDemoField(
        "draftSummary",
        "The chart is loaded. Ask the doctor agent to draft the note in the clinic template."
      );
      setDemoField(
        "chatLineTwo",
        "I have connected the prior chart, imaging note, and treatment history. Tooth 36 is the main issue today."
      );
    } else {
      setDemoField("draftTitle", "Implant consult draft ready to start");
      setDemoField(
        "draftSummary",
        "The consult chart is loaded. Ask the doctor agent to prepare the consult note in clinic format."
      );
      setDemoField(
        "chatLineTwo",
        "I have connected the consult form, CBCT summary, and planning template. Bone height and sinus risk are the main issues today."
      );
    }
  }
  if (demoRuntimeState.dispatched) {
    setDemoField("growthStatus", "Working live -> chart summarized");
    setDemoField("salesStatus", "In progress -> note draft prepared");
    setDemoField("knowledgeStatus", "Waiting approval -> clinic format ready");
    setDemoField("threadStatus", "doctor and record agents running");
    if (demoRuntimeState.scenario === "retail") {
      setDemoField("draftTitle", "Medical record draft in review");
      setDemoField(
        "draftSummary",
        "Chief complaint, findings, assessment, and plan are drafted in the clinic template and waiting for the doctor."
      );
      setDemoField("chatActorThree", "Record Agent");
      setDemoField(
        "chatLineThree",
        "I drafted the follow-up note with chief complaint, exam finding, assessment, and today's plan."
      );
      setDemoField("chatActorFour", "Follow-up Agent");
      setDemoField(
        "chatLineFour",
        "Post-visit instructions and revisit reminders are ready after doctor sign-off."
      );
      setDemoList("chatOutcomeList", [
        "The report summary is now attached to the doctor thread.",
        "The draft medical record is ready for doctor edit and sign-off.",
        "Follow-up instructions are prepared but still locked behind doctor review.",
      ]);
      setDemoList("draftChecklistList", [
        "Chief complaint completed",
        "Exam findings completed",
        "Assessment and plan waiting for sign-off",
      ]);
    } else {
      setDemoField("draftTitle", "Implant consult draft in review");
      setDemoField(
        "draftSummary",
        "Imaging findings, planning risks, and treatment discussion are drafted in the consult format and waiting for the doctor."
      );
      setDemoField("chatActorThree", "Record Agent");
      setDemoField(
        "chatLineThree",
        "I drafted the consult record with imaging findings, planning risks, and treatment discussion."
      );
      setDemoField("chatActorFour", "Follow-up Agent");
      setDemoField(
        "chatLineFour",
        "The consult summary and next-step checklist are ready after doctor confirmation."
      );
      setDemoList("chatOutcomeList", [
        "The CBCT summary is now attached to the doctor thread.",
        "The consult note draft is ready for doctor review.",
        "Next-step treatment planning instructions are prepared but not yet written back.",
      ]);
      setDemoList("draftChecklistList", [
        "Chief concern completed",
        "Imaging findings completed",
        "Treatment discussion waiting for sign-off",
      ]);
    }
  }
  if (demoRuntimeState.approved) {
    setDemoField("approvalSecondaryStatus", "Doctor signed");
    setDemoField("knowledgeSecondary", "Record written back");
    setDemoField("threadStatus", "doctor confirmed and synced");
    if (demoRuntimeState.scenario === "retail") {
      setDemoField("draftTitle", "Medical record signed");
      setDemoField(
        "draftSummary",
        "The doctor signed the record. The chart, follow-up task, and revisit reminder are now synced."
      );
      setDemoField("chatActorFour", "Doctor Sign-off");
      setDemoField(
        "chatLineFour",
        "The signed note was written back to the patient chart and the follow-up instructions are now ready."
      );
      setDemoList("chatOutcomeList", [
        "The signed medical record is back in the patient chart.",
        "Revisit and patient communication tasks are now ready for staff.",
        "The workspace, patient page, and task board now show the updated clinic state.",
      ]);
      setDemoList("draftChecklistList", [
        "Chief complaint signed",
        "Exam findings signed",
        "Assessment and plan signed",
      ]);
    } else {
      setDemoField("draftTitle", "Consult record signed");
      setDemoField(
        "draftSummary",
        "The doctor signed the consult record. The chart, treatment plan note, and next-step instructions are now synced."
      );
      setDemoField("chatActorFour", "Doctor Sign-off");
      setDemoField(
        "chatLineFour",
        "The signed consult note was written back and the treatment planning checklist is now ready for staff."
      );
      setDemoList("chatOutcomeList", [
        "The signed consult record is back in the patient chart.",
        "The treatment plan summary is now ready for staff follow-up.",
        "The workspace, patient page, and task board now show the updated clinic state.",
      ]);
      setDemoList("draftChecklistList", [
        "Chief concern signed",
        "Imaging findings signed",
        "Treatment discussion and plan signed",
      ]);
    }
  }

  document.querySelectorAll("[data-scenario]").forEach((button) => {
    button.classList.toggle(
      "is-active",
      button.dataset.scenario === demoRuntimeState.scenario
    );
  });

  document.querySelectorAll('[data-demo-action="approve"]').forEach((button) => {
    button.disabled = demoRuntimeState.approved;
  button.textContent = demoRuntimeState.approved
    ? localizeString("Doctor signed")
    : localizeString("Doctor sign-off");
  });
}

document.querySelectorAll("[data-scenario]").forEach((button) => {
  button.addEventListener("click", () => {
    demoRuntimeState.scenario = button.dataset.scenario;
    demoRuntimeState.connected = true;
    demoRuntimeState.dispatched = false;
    demoRuntimeState.approved = false;
    setDemoScenario(demoRuntimeState.scenario);
    renderWorkspaceDemo();
  });
});

document.querySelectorAll("[data-demo-action]").forEach((button) => {
  button.addEventListener("click", () => {
    const action = button.dataset.demoAction;
    if (action === "connect") {
      demoRuntimeState.connected = true;
      setDemoStage("connect");
    }
    if (action === "dispatch") {
      demoRuntimeState.connected = true;
      demoRuntimeState.dispatched = true;
      setDemoStage("dispatch");
    }
    if (action === "approve") {
      demoRuntimeState.connected = true;
      demoRuntimeState.dispatched = true;
      demoRuntimeState.approved = true;
      setDemoStage("approve");
    }
    renderWorkspaceDemo();
  });
});

const caseScenarios = {
  retail: {
    heroLead: "Show how Synapse takes one retail request and turns it into real operating work.",
    case1Label: "Retail 01",
    case1Title: "Weekly business brief",
    case1Role: "Owner / operator",
    case1Prompt: "Summarize revenue, paid media, leads, refunds, and service issues into one weekly brief.",
    case1Systems: "CRM, spreadsheets, ad accounts, support logs, order data",
    case1Automation: "Pull metrics, spot anomalies, draft an executive summary, and propose next actions.",
    case1Deliverable: "A ready-to-read weekly brief for the owner.",
    case1Result: "Less manual reporting and faster weekly decisions.",
    case2Label: "Retail 02",
    case2Title: "Paid media review and budget advice",
    case2Role: "Growth / marketing lead",
    case2Prompt: "Find low-efficiency ad groups and suggest what to pause or refresh this week.",
    case2Systems: "Meta Ads, Google Ads, landing pages, creative library",
    case2Automation: "Compare spend, conversion, CTR, and creative fatigue to recommend budget moves.",
    case2Deliverable: "A short review with budget and creative next steps.",
    case2Result: "Move from reading numbers to acting on them.",
    case3Label: "Retail 03",
    case3Title: "Lead prioritization and follow-up",
    case3Role: "Sales / client success",
    case3Prompt: "Rank silent high-intent leads and draft the next follow-up move for sales.",
    case3Systems: "CRM, forms, email, chat history, meeting notes",
    case3Automation: "Score leads, fill in context gaps, and prepare next-step prompts.",
    case3Deliverable: "A prioritized list and ready follow-up plan.",
    case3Result: "Recover opportunities before they go cold.",
    case4Label: "Retail 04",
    case4Title: "Support, SOP, and order knowledge sync",
    case4Role: "Support / operations lead",
    case4Prompt: "Turn frequent after-sales questions and order rules into a new FAQ and SOP update list.",
    case4Systems: "Tickets, after-sales notes, order rules, SOP docs, knowledge base",
    case4Automation: "Merge recurring issues, find rule gaps, and draft FAQ plus SOP updates.",
    case4Deliverable: "A publish-ready FAQ and SOP change list.",
    case4Result: "Less repeated support work and cleaner team execution.",
  },
  agency: {
    heroLead: "Show how Synapse helps an agency read multiple clients, rank risks, and coordinate delivery.",
    case1Label: "Agency 01",
    case1Title: "Client weekly brief",
    case1Role: "Account director / operator",
    case1Prompt: "Turn campaign, lead, risk, and client status into one account brief.",
    case1Systems: "Client accounts, ad platforms, CRM, notes, client chat",
    case1Automation: "Merge account data, flag at-risk clients, and draft internal and client-facing summaries.",
    case1Deliverable: "A client-ready and internal weekly brief.",
    case1Result: "Spot issues earlier across the portfolio.",
    case2Label: "Agency 02",
    case2Title: "Account anomaly review",
    case2Role: "Growth lead / account manager",
    case2Prompt: "Explain why this client account got more expensive and what we should tell the client next.",
    case2Systems: "Meta Ads, Google Ads, creative library, email threads",
    case2Automation: "Read fatigue, budget shifts, and audience overlap, then draft a client-safe explanation.",
    case2Deliverable: "An internal review plus client-ready explanation.",
    case2Result: "Faster, calmer client communication.",
    case3Label: "Agency 03",
    case3Title: "Renewal ranking and follow-up",
    case3Role: "Account lead / sales lead",
    case3Prompt: "Rank renewal risk and identify which clients need follow-up or leadership attention.",
    case3Systems: "CRM, renewal sheet, meeting notes, client success history",
    case3Automation: "Score retention signals and create action tiers for account managers.",
    case3Deliverable: "A ranked renewal list and follow-up plan.",
    case3Result: "Retention becomes operational, not reactive.",
    case4Label: "Agency 04",
    case4Title: "Template, SOP, and FAQ refresh",
    case4Role: "Delivery ops / team lead",
    case4Prompt: "Turn repeated client questions into template updates, SOP changes, and training notes.",
    case4Systems: "Review docs, SOPs, FAQs, client Q&A",
    case4Automation: "Extract repeat explanations and suggest template plus workflow updates.",
    case4Deliverable: "A refreshed template pack and SOP update list.",
    case4Result: "More consistent delivery across the team.",
  },
};

function renderCaseScenario(name) {
  const scenario = caseScenarios[name];
  if (!scenario) return;
  Object.entries(scenario).forEach(([field, value]) => {
    setTextByAttr("data-demo-case-field", field, value);
  });
  document.querySelectorAll("[data-case-scenario]").forEach((button) => {
    button.classList.toggle("is-active", button.dataset.caseScenario === name);
  });
}

const journeyScenarios = {
  retail: {
    connect: {
      stageBadge: "Stage 1 / Intake",
      stageTitle: "Connect live business data",
      stageSummary: "Bring CRM, ads, support, orders, and SOP content into one operating layer.",
      stageResult: "6 data sources ready",
      progressNote: "Start from the data layer",
      talkTrack: "We do not start with a blank chat box. We start with real business context.",
      audience: "Owners care about visibility. Operators care about whether the system actually reads the business.",
      closeLine: "First we connect the business, then we let AI act.",
      featuredTitle: "Best case to tell now: weekly business brief",
      featuredSummary: "It proves raw data can become an owner-ready result immediately.",
      nextNote: "After data intake, show how Synapse forms a real client understanding layer.",
      stageList: [
        "Connect CRM, ads, support, orders, and documents.",
        "Normalize context into one shared operating layer.",
        "Prepare a client understanding snapshot.",
      ],
      outcomeList: [
        "Connected systems list",
        "Fresh client context",
        "Suggested agent lineup",
      ],
      objectionList: [
        "Do we need a heavy setup first?",
        "Will the sync become hard to maintain?",
        "Is this just another analytics screen?",
      ],
      primary: { label: "Open Data Intake", href: "data-intake.html" },
      secondary: { label: "Open Client Intelligence", href: "client-intelligence.html" },
      featuredPrimary: { label: "Jump to Case 01", href: "#case-1" },
      featuredSecondary: { label: "Open Workspace", href: "app.html" },
    },
    understand: {
      stageBadge: "Stage 2 / Understand",
      stageTitle: "Build client understanding first",
      stageSummary: "Generate a live picture of risks, goals, priorities, and what matters most right now.",
      stageResult: "3 key issues detected",
      progressNote: "Move from raw inputs to client context",
      talkTrack: "The system should understand the client before it dispatches any agent.",
      audience: "Leads care about prioritization. Teams care about whether the summary feels correct.",
      closeLine: "Only a clear client picture can produce the right next move.",
      featuredTitle: "Best case to tell now: lead prioritization",
      featuredSummary: "This makes the value of understanding very concrete: who should we act on first and why?",
      nextNote: "Now show how the system turns understanding into agent assignments.",
      stageList: [
        "Score health, risk, and opportunity.",
        "Summarize the main issues across growth, service, and sales.",
        "Recommend the right mix of agents.",
      ],
      outcomeList: [
        "Client problem map",
        "Priority list",
        "Suggested agent split",
      ],
      objectionList: [
        "How do we trust the priority ranking?",
        "Can different roles see the same truth?",
        "Does the system understand our business language?",
      ],
      primary: { label: "Open Client Intelligence", href: "client-intelligence.html" },
      secondary: { label: "Open Workspace", href: "app.html#intake" },
      featuredPrimary: { label: "Jump to Case 03", href: "#case-3" },
      featuredSecondary: { label: "Open Client Intelligence", href: "client-intelligence.html" },
    },
    dispatch: {
      stageBadge: "Stage 3 / Dispatch",
      stageTitle: "Dispatch the right agents",
      stageSummary: "Wake growth, sales, and knowledge agents in parallel, each with a clear job to do.",
      stageResult: "3 agents in progress",
      progressNote: "Agents are now driving work",
      talkTrack: "This is not one assistant. It is a coordinated group of agents with different jobs.",
      audience: "Managers care about coordination. Team members care about whether they can still review and steer.",
      closeLine: "At this stage AI stops being analysis and becomes execution support.",
      featuredTitle: "Best case to tell now: paid media review",
      featuredSummary: "It shows analysis, task creation, and follow-up action all at once.",
      nextNote: "From here, it is best to jump into the workspace chat or task board.",
      stageList: [
        "Growth agent reviews campaigns and budgets.",
        "Sales agent ranks leads and drafts follow-ups.",
        "Knowledge agent updates FAQ and SOP drafts.",
      ],
      outcomeList: [
        "Agent replies in group chat",
        "Tasks created in the board",
        "High-risk actions sent to approval",
      ],
      objectionList: [
        "What if agents conflict with each other?",
        "How does the team know what is running?",
        "Can people take over when needed?",
      ],
      primary: { label: "Open Workspace", href: "app.html#chat" },
      secondary: { label: "Open Task Center", href: "task-center.html" },
      featuredPrimary: { label: "Jump to Case 02", href: "#case-2" },
      featuredSecondary: { label: "Open Task Center", href: "task-center.html" },
    },
    approve: {
      stageBadge: "Stage 4 / Approve",
      stageTitle: "Approve before high-risk actions go out",
      stageSummary: "Anything risky goes through a visible approval layer before it changes the business.",
      stageResult: "2 actions waiting review",
      progressNote: "Close with control and governance",
      talkTrack: "The system is fast, but it stays controllable. That is what makes it usable inside a company.",
      audience: "Owners and admins care most about this layer because it makes rollout realistic.",
      closeLine: "The final result is not black-box automation. It is controlled execution.",
      featuredTitle: "Best case to tell now: support knowledge sync",
      featuredSummary: "This demonstrates draft, review, approval, and rollout in one story.",
      nextNote: "End on approvals and governance to show the system is safe to adopt.",
      stageList: [
        "Budget changes wait for approval.",
        "FAQ and SOP updates are reviewed before publish.",
        "Results sync back to the client page and workspace.",
      ],
      outcomeList: [
        "Approval record",
        "Ready-to-publish draft",
        "Auditable action trail",
      ],
      objectionList: [
        "Will AI send things out without review?",
        "Can we trace who approved what?",
        "Can we roll back bad changes?",
      ],
      primary: { label: "Open Approval Center", href: "approval-center.html" },
      secondary: { label: "Open Settings", href: "settings.html" },
      featuredPrimary: { label: "Jump to Case 04", href: "#case-4" },
      featuredSecondary: { label: "Open Approval Center", href: "approval-center.html" },
    },
  },
  agency: {
    connect: {
      stageBadge: "Stage 1 / Intake",
      stageTitle: "Connect account portfolio data",
      stageSummary: "Pull in client accounts, ads, renewal sheets, notes, and delivery docs into one layer.",
      stageResult: "9 sources ready",
      progressNote: "Start with the portfolio data layer",
      talkTrack: "In the agency story, the first value is reading many clients at once, not just one.",
      audience: "Directors care about portfolio visibility. Account leads care about less manual stitching.",
      closeLine: "You cannot rank client risk until the data is in one place.",
      featuredTitle: "Best case to tell now: client weekly brief",
      featuredSummary: "It proves the platform can read multiple accounts and output something useful fast.",
      nextNote: "Then show how Synapse spots which client needs attention first.",
      stageList: [
        "Connect account, ads, renewal, and client communication data.",
        "Normalize multiple client contexts into one layer.",
        "Prepare portfolio risk scoring.",
      ],
      outcomeList: [
        "Connected account list",
        "Portfolio context snapshot",
        "Renewal candidate list",
      ],
      objectionList: [
        "Will client data get mixed together?",
        "Can account leads still own their accounts?",
        "Will adding new clients feel heavy?",
      ],
      primary: { label: "Open Data Intake", href: "data-intake.html" },
      secondary: { label: "Open Client Intelligence", href: "client-intelligence.html" },
      featuredPrimary: { label: "Jump to Case 01", href: "#case-1" },
      featuredSecondary: { label: "Open Data Intake", href: "data-intake.html" },
    },
    understand: {
      stageBadge: "Stage 2 / Understand",
      stageTitle: "Rank which clients need attention",
      stageSummary: "Score account risk, renewal likelihood, and where leadership should step in.",
      stageResult: "2 high-risk clients flagged",
      progressNote: "Move from portfolio data to judgment",
      talkTrack: "This is where Synapse helps the agency decide what matters before the team gets pulled everywhere.",
      audience: "Leadership cares about risk ranking. Account leads care about clearer priorities.",
      closeLine: "The value is not more reports. It is better account judgment.",
      featuredTitle: "Best case to tell now: renewal ranking",
      featuredSummary: "It makes the agency value story concrete and commercial.",
      nextNote: "Next, show how Synapse splits work across agents and teams.",
      stageList: [
        "Output a portfolio risk map.",
        "Identify renewal upside and churn risk.",
        "Recommend where account managers should act first.",
      ],
      outcomeList: [
        "Client risk ranking",
        "Renewal score list",
        "Leadership intervention suggestions",
      ],
      objectionList: [
        "Can the platform really judge account risk?",
        "How does it know which client is worth attention?",
        "Will this override the account lead?",
      ],
      primary: { label: "Open Client Intelligence", href: "client-intelligence.html" },
      secondary: { label: "Open Workspace", href: "app.html#intake" },
      featuredPrimary: { label: "Jump to Case 03", href: "#case-3" },
      featuredSecondary: { label: "Open Client Intelligence", href: "client-intelligence.html" },
    },
    dispatch: {
      stageBadge: "Stage 3 / Dispatch",
      stageTitle: "Split work across growth, account, and knowledge agents",
      stageSummary: "Run account review, client communication, and template updates in parallel.",
      stageResult: "3 execution tracks running",
      progressNote: "Agents are now coordinating delivery",
      talkTrack: "Instead of one account manager carrying everything, the platform spreads the load correctly.",
      audience: "Delivery leads care about cleaner delegation. Account leads care about less admin work.",
      closeLine: "The system helps the team scale judgment, not just write drafts.",
      featuredTitle: "Best case to tell now: account anomaly review",
      featuredSummary: "It shows diagnosis, explanation, and client-safe communication together.",
      nextNote: "This is a strong point to jump into the workspace or task board.",
      stageList: [
        "Growth agent diagnoses account risk.",
        "Sales/account agent prepares renewal and client follow-up.",
        "Knowledge agent updates templates and talk tracks.",
      ],
      outcomeList: [
        "Client-safe explanation draft",
        "Internal task assignments",
        "Updated delivery materials",
      ],
      objectionList: [
        "Does the account lead lose control?",
        "Is the client-facing draft reliable?",
        "Will the knowledge layer become messy?",
      ],
      primary: { label: "Open Workspace", href: "app.html#chat" },
      secondary: { label: "Open Task Center", href: "task-center.html" },
      featuredPrimary: { label: "Jump to Case 02", href: "#case-2" },
      featuredSecondary: { label: "Open Task Center", href: "task-center.html" },
    },
    approve: {
      stageBadge: "Stage 4 / Approve",
      stageTitle: "Review before anything client-facing goes out",
      stageSummary: "Client explanations, budget moves, and published templates all go through visible approvals.",
      stageResult: "Client-ready drafts waiting approval",
      progressNote: "Close on control and trust",
      talkTrack: "This proves the platform can support execution without making the agency reckless.",
      audience: "Leadership cares about risk. Account leads care about staying in control of the client relationship.",
      closeLine: "Speed matters, but controlled delivery is what gets adopted.",
      featuredTitle: "Best case to tell now: template and SOP refresh",
      featuredSummary: "It shows draft, review, publish, and memory-building in one flow.",
      nextNote: "Finish on approvals and governance to make the demo feel real and deployable.",
      stageList: [
        "Client-facing summaries wait for review.",
        "Budget recommendations include explanation and approval steps.",
        "Published updates sync back into team memory.",
      ],
      outcomeList: [
        "Approval trail",
        "Client-facing draft",
        "Governed rollout",
      ],
      objectionList: [
        "Will this slow the team down too much?",
        "Can we trace every important action?",
        "Can we roll back bad changes?",
      ],
      primary: { label: "Open Approval Center", href: "approval-center.html" },
      secondary: { label: "Open Settings", href: "settings.html" },
      featuredPrimary: { label: "Jump to Case 04", href: "#case-4" },
      featuredSecondary: { label: "Open Approval Center", href: "approval-center.html" },
    },
  },
};

const demoJourneyState = {
  scenario: demoContext.scenario,
  stage: demoContext.stage,
};

function setJourneyProgress() {
  const index = Math.max(JOURNEY_ORDER.indexOf(demoJourneyState.stage), 0);
  const fill = document.querySelector("[data-demo-journey-progress]");
  if (fill) {
    fill.style.width = `${((index + 1) / JOURNEY_ORDER.length) * 100}%`;
  }
  setJourneyField("progressLabel", `${index + 1} / ${JOURNEY_ORDER.length}`);
}

function setFeaturedCaseHighlight(href) {
  const target = href && href.startsWith("#") ? href.slice(1) : "";
  document.querySelectorAll("[data-demo-case-card]").forEach((card) => {
    card.classList.toggle("is-featured", card.dataset.demoCaseCard === target);
  });
}

function renderDemoJourney() {
  const scenario = journeyScenarios[demoJourneyState.scenario];
  if (!scenario) return;
  const stage = scenario[demoJourneyState.stage];
  if (!stage) return;

  Object.entries(stage).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      setJourneyList(key, value);
    }
  });

  setJourneyField("stageBadge", stage.stageBadge);
  setJourneyField("stageTitle", stage.stageTitle);
  setJourneyField("stageSummary", stage.stageSummary);
  setJourneyField("stageResult", stage.stageResult);
  setJourneyField("progressNote", stage.progressNote);
  setJourneyField("talkTrack", stage.talkTrack);
  setJourneyField("audience", stage.audience);
  setJourneyField("closeLine", stage.closeLine);
  setJourneyField("featuredTitle", stage.featuredTitle);
  setJourneyField("featuredSummary", stage.featuredSummary);
  setJourneyField("nextNote", stage.nextNote);
  setJourneyLink("primary", stage.primary);
  setJourneyLink("secondary", stage.secondary);
  setJourneyLink("featuredPrimary", stage.featuredPrimary);
  setJourneyLink("featuredSecondary", stage.featuredSecondary);
  setFeaturedCaseHighlight(stage.featuredPrimary.href);
  setJourneyProgress();

  document.querySelectorAll("[data-demo-journey-action]").forEach((button) => {
    const active = button.dataset.demoJourneyAction === demoJourneyState.stage;
    button.classList.toggle("button-primary", active);
    button.classList.toggle("button-secondary", !active);
  });

  setDemoScenario(demoJourneyState.scenario);
  setDemoStage(demoJourneyState.stage);
}

document.querySelectorAll("[data-case-scenario]").forEach((button) => {
  button.addEventListener("click", () => {
    demoJourneyState.scenario = button.dataset.caseScenario;
    demoJourneyState.stage = "connect";
    setDemoScenario(demoJourneyState.scenario);
    renderCaseScenario(demoJourneyState.scenario);
    renderDemoJourney();
  });
});

document.querySelectorAll("[data-demo-journey-action]").forEach((button) => {
  button.addEventListener("click", () => {
    demoJourneyState.stage = button.dataset.demoJourneyAction;
    renderDemoJourney();
  });
});

document.querySelectorAll("[data-demo-flow-action]").forEach((button) => {
  button.addEventListener("click", () => {
    const action = button.dataset.demoFlowAction;
    if (action === "start" || action === "reset") {
      demoJourneyState.stage = "connect";
      renderDemoJourney();
      if (action === "reset") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }
    if (action === "next") {
      const index = JOURNEY_ORDER.indexOf(demoJourneyState.stage);
      demoJourneyState.stage = JOURNEY_ORDER[Math.min(index + 1, JOURNEY_ORDER.length - 1)];
      renderDemoJourney();
      const featured = document.querySelector('[data-demo-journey-link="featuredPrimary"]');
      const href = featured?.getAttribute("href");
      if (href && href.startsWith("#")) {
        document.querySelector(href)?.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
  });
});

document.querySelectorAll("[data-case-toggle]").forEach((button) => {
  button.addEventListener("click", () => {
    const card = document.querySelector(
      `[data-demo-case-card="${button.dataset.caseToggle}"]`
    );
    if (!card) return;
    const expanded = card.classList.toggle("is-expanded");
    button.textContent = expanded
      ? localizeString("Collapse details")
      : localizeString("Expand details");
  });
});

const intakeState = {
  connectedSources: [
    "HubSpot CRM",
    "Gmail Sales Inbox",
    "Meta Ads",
    "Google Sheets report",
    "Notion SOP docs",
  ],
  feedModel: [
    "Knowledge Feed: SOP, FAQ, product docs, brand rules",
    "Business Feed: CRM, orders, campaigns, support logs",
    "Feedback Feed: approvals, edits, rejected actions",
    "Memory Feed: verified playbooks and client history",
  ],
};

function renderIntakeState() {
  setListByAttr("data-intake-list", "connectedSources", intakeState.connectedSources);
  setListByAttr("data-intake-list", "feedModel", intakeState.feedModel);
}

document.querySelectorAll("[data-intake-action]").forEach((button) => {
  button.addEventListener("click", () => {
    setDemoStage("connect");
    const action = button.dataset.intakeAction;
    if (action === "upload") {
      setTextByAttr("data-intake-field", "hubStatus", "Files uploaded");
      setTextByAttr("data-intake-field", "dropzoneTitle", "18 files uploaded");
      setTextByAttr(
        "data-intake-field",
        "dropzoneText",
        "System is parsing SOPs, FAQs, sales talk tracks, and historical client docs."
      );
      intakeState.connectedSources = [
        "18 uploaded files",
        ...intakeState.connectedSources.filter((item) => item !== "18 uploaded files"),
      ];
    }
    if (action === "drive") {
      setTextByAttr("data-intake-field", "hubStatus", "Drive connected");
      setTextByAttr(
        "data-intake-field",
        "sourceDocs",
        "Drive and Notion content are now syncing into the knowledge layer."
      );
    }
    if (action === "crm") {
      setTextByAttr("data-intake-field", "hubStatus", "CRM connected");
      setTextByAttr(
        "data-intake-field",
        "sourceCustomer",
        "CRM, orders, leads, meeting notes, and chat history are now streaming in."
      );
    }
    if (action === "gmail") {
      setTextByAttr(
        "data-intake-field",
        "emailAccess",
        "Gmail authorized. Synapse can now read client email threads and sales follow-up context."
      );
      intakeState.connectedSources = [
        "Gmail Sales Inbox",
        ...intakeState.connectedSources.filter((item) => item !== "Gmail Sales Inbox"),
      ];
    }
    if (action === "outlook") {
      setTextByAttr(
        "data-intake-field",
        "emailAccess",
        "Microsoft 365 authorized. Email and meeting context are now available to agents."
      );
      intakeState.connectedSources = [
        "Microsoft 365 Inbox",
        ...intakeState.connectedSources.filter((item) => item !== "Microsoft 365 Inbox"),
      ];
    }
    renderIntakeState();
  });
});

const approvalState = {
  urgentCount: "2 urgent",
  approvalRowOne:
    "Growth Agent suggests pausing two ad groups with rising CPA and weak creative support.",
  approvalRowTwo:
    "Knowledge Agent prepared a new FAQ draft that will replace the old support version after review.",
  rulesList: [
    "External email or client communication",
    "Budget changes and ad pauses",
    "Publishing new FAQ or SOP content",
    "Direct CRM or order-system writebacks",
  ],
  auditList: [
    "Who requested it",
    "Who approved or rejected it",
    "What changed",
    "How to roll back if needed",
  ],
};

function renderApprovalState() {
  setTextByAttr("data-approval-field", "urgentCount", approvalState.urgentCount);
  setTextByAttr("data-approval-field", "approvalRowOne", approvalState.approvalRowOne);
  setTextByAttr("data-approval-field", "approvalRowTwo", approvalState.approvalRowTwo);
  setListByAttr("data-approval-list", "rulesList", approvalState.rulesList);
  setListByAttr("data-approval-list", "auditList", approvalState.auditList);
}

document.querySelectorAll("[data-approval-action]").forEach((button) => {
  button.addEventListener("click", () => {
    setDemoStage("approve");
    const action = button.dataset.approvalAction;
    if (action === "approve-ad") {
      approvalState.urgentCount = "1 urgent";
      approvalState.approvalRowOne =
        "Ad pause approved. Growth Agent will write the budget impact back into the workspace.";
      button.textContent = localizeString("Approved");
      button.disabled = true;
    }
    if (action === "revise-ad") {
      approvalState.approvalRowOne =
        "Revision requested. Growth Agent must add rollback conditions and client impact notes.";
      approvalState.auditList = [
        "Revision requested on ad pause",
        "Rollback condition requested",
        "Client impact note required",
        "New submission will reopen approval",
      ];
    }
    if (action === "approve-faq") {
      approvalState.urgentCount = "0 urgent";
      approvalState.approvalRowTwo =
        "FAQ approved. Knowledge Agent is publishing the new version and syncing team memory.";
      button.textContent = localizeString("Published");
      button.disabled = true;
    }
    if (action === "review-faq") {
      approvalState.approvalRowTwo =
        "Draft opened for review. Ops can now check tone, forbidden phrasing, and policy edge cases.";
    }
    renderApprovalState();
  });
});

const clientScenarios = {
  retail: {
    heroLead:
      "AI builds a client intelligence layer first: state, problems, opportunities, and suggested agent actions.",
    clientName: "Retail Growth Co.",
    healthBadge: "Health 74 / 100",
    kpi1Label: "Revenue trend",
    kpi1Value: "+12.4%",
    kpi1Note: "High-ticket products are growing well.",
    kpi2Label: "Ad risk",
    kpi2Value: "CPA +19%",
    kpi2Note: "Two ad groups need review.",
    kpi3Label: "Support pressure",
    kpi3Value: "Refund issues up",
    kpi3Note: "Old FAQ causes repeated support work.",
    kpi4Label: "Sales upside",
    kpi4Value: "4 high-intent",
    kpi4Note: "No follow-up in 48 hours.",
    updateStatus: "Context ready",
    problemList: [
      "Growth issue: paid media cost is climbing even though creative still has room.",
      "Support issue: refund FAQ is outdated and inconsistent.",
      "Sales issue: new high-intent leads are moving too slowly.",
    ],
    agentList: [
      "Growth Agent: diagnose ad cost spike and budget moves.",
      "Knowledge Agent: refresh FAQ and SOP draft.",
      "Sales Agent: rank silent leads and prepare next follow-up.",
    ],
    updateList: [
      "Problem map is ready and waiting for dispatch.",
      "Highest priorities are paid media cost and the refund FAQ gap.",
      "If dispatched, tasks sync into chat, tasks, and approvals automatically.",
    ],
  },
  agency: {
    heroLead:
      "AI reads one client account in context: risk, renewal upside, delivery issues, and recommended dispatch.",
    clientName: "Alpha Performance Account",
    healthBadge: "Health 81 / 100",
    kpi1Label: "Renewal trend",
    kpi1Value: "+18% probability",
    kpi1Note: "Renewal intent is strong but the review story must be clearer.",
    kpi2Label: "Account risk",
    kpi2Value: "CPA +23%",
    kpi2Note: "This client is sensitive to budget volatility.",
    kpi3Label: "Delivery pressure",
    kpi3Value: "Review gap",
    kpi3Note: "Current template does not explain budget changes well.",
    kpi4Label: "Leadership upside",
    kpi4Value: "Owner can step in",
    kpi4Note: "Good candidate for a high-value renewal conversation.",
    updateStatus: "Context ready",
    problemList: [
      "Client issue: the cause of rising cost is not yet explained clearly.",
      "Delivery issue: the team template is weak on budget-change narratives.",
      "Commercial issue: this is both a risk account and a renewal opportunity.",
    ],
    agentList: [
      "Growth Agent: prepare anomaly diagnosis and client-safe explanation.",
      "Knowledge Agent: update the review template and budget explanation section.",
      "Sales Agent: rank renewal actions and suggest leadership involvement.",
    ],
    updateList: [
      "The account is marked as high-risk but high-value.",
      "Best next move: draft a clear client explanation before changing budget.",
      "If dispatched, review, renewal, and template updates will move in parallel.",
    ],
  },
};

const clientState = {
  scenario: demoContext.scenario,
  dispatched: false,
};

function renderClientState() {
  const scenario = clientScenarios[clientState.scenario];
  if (!scenario) return;
  Object.entries(scenario).forEach(([field, value]) => {
    if (Array.isArray(value)) {
      setListByAttr("data-client-list", field, value);
    } else {
      setTextByAttr("data-client-field", field, value);
    }
  });

  if (clientState.dispatched) {
    setTextByAttr("data-client-field", "updateStatus", "Agents dispatched");
    setListByAttr("data-client-list", "updateList", [
      ...scenario.updateList,
      "Three agents are now active and their tasks have synced to task and approval centers.",
    ]);
  }

  document.querySelectorAll("[data-client-scenario]").forEach((button) => {
    button.classList.toggle(
      "is-active",
      button.dataset.clientScenario === clientState.scenario
    );
  });
}

document.querySelectorAll("[data-client-scenario]").forEach((button) => {
  button.addEventListener("click", () => {
    clientState.scenario = button.dataset.clientScenario;
    clientState.dispatched = false;
    setDemoScenario(clientState.scenario);
    renderClientState();
  });
});

document.querySelectorAll("[data-client-action]").forEach((button) => {
  button.addEventListener("click", () => {
    const action = button.dataset.clientAction;
    if (action === "refresh") {
      clientState.dispatched = false;
      setDemoStage("understand");
    }
    if (action === "dispatch") {
      clientState.dispatched = true;
      setDemoStage("dispatch");
    }
    renderClientState();
  });
});

const taskBoardState = {
  queued: [
    { title: "Refresh refund FAQ", note: "Knowledge Agent -> High", style: "" },
    { title: "Pull latest ad creative report", note: "Growth Agent -> Medium", style: "" },
  ],
  running: [
    { title: "Rank high-intent leads", note: "Sales Agent is drafting owner follow-up.", style: "live-ticket" },
    { title: "Analyze campaign anomaly", note: "Growth Agent is comparing Meta and Google changes.", style: "live-ticket" },
  ],
  waiting: [
    { title: "Publish FAQ update", note: "Waiting for ops approval.", style: "warn-ticket" },
    { title: "Pause low-efficiency ad group", note: "Waiting for owner approval.", style: "warn-ticket" },
  ],
  done: [
    { title: "Weekly brief generated", note: "Already synced back into workspace.", style: "" },
    { title: "Client summary synced to CRM", note: "Sales Agent completed writeback.", style: "" },
  ],
  timelineList: [
    "Tasks created in chat sync back into the task center.",
    "High-risk tasks are automatically routed into approvals.",
    "Completed results sync back into workspace and client context.",
  ],
};

const dashboardScenarios = {
  retail: {
    heroLead:
      "This pilot dashboard gives the clinic owner and operator one place to see today's patients, draft-note pressure, report review load, and what should happen next.",
    sidebarTitle: "Follow-up clinic day",
    sidebarText:
      "Week one should focus on faster report reading, note drafting, and doctor confirmation.",
    boardTitle: "Dr. Li / today's clinic dashboard",
    boardSummary:
      "Three charts need review, two draft notes are waiting for sign-off, and one report needs fast interpretation before the patient enters.",
    priorityPatient: "Lina Chen / 10:30 follow-up",
    prioritySummary:
      "Chewing pain around tooth 36. Imaging note should be summarized before chair time.",
    healthBadge: "6 patients / 2 urgent",
    alertBadge: "2 notes waiting",
    kpi1Label: "Patients today",
    kpi1Value: "12 booked",
    kpi1Note: "6 morning, 6 afternoon.",
    kpi2Label: "Reports pending",
    kpi2Value: "3 unread",
    kpi2Note: "AI can summarize before consult.",
    kpi3Label: "Draft notes",
    kpi3Value: "2 waiting",
    kpi3Note: "Doctor sign-off still needed.",
    kpi4Label: "Follow-up load",
    kpi4Value: "4 due",
    kpi4Note: "Call-back and revisit reminders today.",
    agentBadge: "3 agents active",
    timelineBadge: "Board synced",
    signalList: [
      "Patient Lina Chen has new chewing pain around tooth 36 and needs report review before chair time.",
      "One implant consult has CT findings that still need structured interpretation.",
      "Two follow-up cases still do not have final signed records.",
    ],
    actionList: [
      "Prepare patient summaries before the doctor opens each chart.",
      "Draft notes immediately after chairside findings are entered.",
      "Route final note approval back to the doctor before writeback.",
    ],
    agentList: [
      "Doctor Agent: reading chart history and current complaint.",
      "Record Agent: preparing a structured draft note in clinic format.",
      "Follow-up Agent: preparing revisit and post-visit next steps.",
    ],
    timelineList: [
      "Today's patient list, prior records, and imaging notes were refreshed from the clinic system.",
      "Three patient charts are ready for AI summary before doctor review.",
      "Two signed-note actions are still waiting for the doctor.",
    ],
  },
  agency: {
    heroLead:
      "This pilot dashboard gives the clinic one place to see consult complexity, draft-note pressure, imaging review load, and what the doctor should review first.",
    sidebarTitle: "Implant consult day",
    sidebarText:
      "Week one should focus on CBCT interpretation, consult-note drafting, and doctor sign-off.",
    boardTitle: "Dr. Li / implant consult dashboard",
    boardSummary:
      "Two consults need imaging review, one implant patient needs a signed consult record, and one treatment discussion is waiting for final confirmation.",
    priorityPatient: "David Wu / 11:30 implant consult",
    prioritySummary:
      "CBCT note and intake form should be summarized before the consult starts.",
    healthBadge: "4 consults / 1 urgent",
    alertBadge: "1 consult note waiting",
    kpi1Label: "Consults today",
    kpi1Value: "4 booked",
    kpi1Note: "Two implant consults this afternoon.",
    kpi2Label: "Imaging pending",
    kpi2Value: "2 CBCT notes",
    kpi2Note: "AI can summarize risks before chair time.",
    kpi3Label: "Draft consults",
    kpi3Value: "1 waiting",
    kpi3Note: "Doctor sign-off still needed.",
    kpi4Label: "Treatment plans",
    kpi4Value: "3 next steps",
    kpi4Note: "Post-visit planning needs staff handoff.",
    agentBadge: "3 agents active",
    timelineBadge: "Board synced",
    signalList: [
      "One implant consult still needs a structured CBCT summary before the doctor enters.",
      "One signed consult note is missing from yesterday's case.",
      "Treatment-planning follow-up is not yet ready for staff handoff.",
    ],
    actionList: [
      "Prepare imaging summaries before the doctor opens each consult.",
      "Draft consult notes in the clinic template after findings are entered.",
      "Route treatment-planning approval back to the doctor before writeback.",
    ],
    agentList: [
      "Doctor Agent: reviewing consult history and imaging notes.",
      "Record Agent: preparing an implant consult draft in clinic format.",
      "Follow-up Agent: preparing treatment-planning next steps for staff.",
    ],
    timelineList: [
      "Today's consult list, prior records, and CBCT notes were refreshed from the clinic system.",
      "Two consult charts are ready for AI summary before doctor review.",
      "One signed consult-note action is still waiting for the doctor.",
    ],
  },
};

const dashboardState = {
  scenario: demoContext.scenario,
  dispatched: false,
  escalated: false,
};

function renderDashboardState() {
  const scenario = dashboardScenarios[dashboardState.scenario];
  if (!scenario) return;

  Object.entries(scenario).forEach(([field, value]) => {
    if (Array.isArray(value)) {
      setListByAttr("data-dashboard-list", field, value);
    } else {
      setTextByAttr("data-dashboard-field", field, value);
    }
  });

  if (dashboardState.dispatched) {
    setTextByAttr("data-dashboard-field", "agentBadge", "3 doctor agents dispatched");
    setTextByAttr("data-dashboard-field", "timelineBadge", "Pilot work live");
    setListByAttr("data-dashboard-list", "timelineList", [
      "Priority clinic work was dispatched directly from the dashboard.",
      "AI preparation is now syncing into workspace, tasks, and approvals.",
      dashboardState.scenario === "retail"
        ? "The pilot is now focused on chart summary, note drafting, and follow-up instructions."
        : "The pilot is now focused on CBCT summary, consult-note drafting, and treatment-plan handoff.",
    ]);
  }

  if (dashboardState.escalated) {
    setTextByAttr(
      "data-dashboard-field",
      "alertBadge",
      "Doctor review requested"
    );
    setTextByAttr("data-dashboard-field", "timelineBadge", "Escalated");
    setListByAttr("data-dashboard-list", "timelineList", [
      dashboardState.scenario === "retail"
        ? "Two draft-note actions were escalated to the doctor for sign-off."
        : "One consult-note action was escalated to the doctor for sign-off.",
      "Nothing writes back into the chart until the doctor confirms it.",
      "The board, task center, and approval center stay aligned.",
    ]);
  }
}

document.querySelectorAll("[data-dashboard-action]").forEach((button) => {
  button.addEventListener("click", () => {
    setDemoStage("dispatch");
    const action = button.dataset.dashboardAction;
    if (action === "refresh") {
      dashboardState.dispatched = false;
      dashboardState.escalated = false;
    }
    if (action === "dispatch") {
      dashboardState.dispatched = true;
      dashboardState.escalated = false;
    }
    if (action === "escalate") {
      dashboardState.dispatched = true;
      dashboardState.escalated = true;
      setDemoStage("approve");
    }
    renderDashboardState();
  });
});

function renderTaskColumn(slot, items) {
  const container = document.querySelector(`[data-task-slot="${slot}"]`);
  if (!container) return;
  container.innerHTML = "";
  items.forEach((item) => {
    const card = document.createElement("div");
    card.className = `task-ticket ${item.style}`.trim();
    const strong = document.createElement("strong");
    const p = document.createElement("p");
    strong.textContent = sanitizeDisplayText(localizeString(item.title));
    p.textContent = sanitizeDisplayText(localizeString(item.note));
    card.appendChild(strong);
    card.appendChild(p);
    container.appendChild(card);
  });
}

function renderTaskBoard() {
  renderTaskColumn("queued", taskBoardState.queued);
  renderTaskColumn("running", taskBoardState.running);
  renderTaskColumn("waiting", taskBoardState.waiting);
  renderTaskColumn("done", taskBoardState.done);
  setTextByAttr("data-task-field", "queuedCount", String(taskBoardState.queued.length));
  setTextByAttr("data-task-field", "runningCount", String(taskBoardState.running.length));
  setTextByAttr("data-task-field", "waitingCount", String(taskBoardState.waiting.length));
  setTextByAttr("data-task-field", "doneCount", String(taskBoardState.done.length));
  setListByAttr("data-task-list", "timelineList", taskBoardState.timelineList);
}

document.querySelectorAll("[data-task-action]").forEach((button) => {
  button.addEventListener("click", () => {
    setDemoStage("dispatch");
    const action = button.dataset.taskAction;
    if (action === "dispatch") {
      taskBoardState.queued.unshift({
        title: "Generate new client problem map",
        note: "Client Intelligence Agent -> High",
        style: "",
      });
      setTextByAttr("data-task-field", "timelineStatus", "New task created");
      taskBoardState.timelineList = [
        "A new agent task was created from chat and moved into the queued lane.",
        ...taskBoardState.timelineList,
      ].slice(0, 4);
    }
    if (action === "progress") {
      const moved = taskBoardState.queued.shift();
      if (moved) {
        moved.note = "Agent is now running and syncing context live.";
        moved.style = "live-ticket";
        taskBoardState.running.unshift(moved);
      }
      setTextByAttr("data-task-field", "timelineStatus", "Task progressed");
      taskBoardState.timelineList = [
        "A queued task has moved into live execution.",
        ...taskBoardState.timelineList,
      ].slice(0, 4);
    }
    if (action === "complete") {
      const moved = taskBoardState.waiting.shift() || taskBoardState.running.shift();
      if (moved) {
        moved.note = "Completed and synced back into workspace and client context.";
        moved.style = "";
        taskBoardState.done.unshift(moved);
      }
      setTextByAttr("data-task-field", "timelineStatus", "Task completed");
      taskBoardState.timelineList = [
        "One key task completed and synced back into the rest of the product.",
        ...taskBoardState.timelineList,
      ].slice(0, 4);
    }
    renderTaskBoard();
  });
});

const knowledgeState = {
  docs: 124,
  timelineStatus: "Stable",
  versionList: [
    "Version history",
    "Who changed the rule",
    "Pending review drafts",
    "Expired content alerts",
  ],
  memoryList: [
    "Which talk tracks work",
    "Which actions were approved",
    "Which clients need owner involvement",
    "Which strategies were marked ineffective",
  ],
  timelineList: [
    "The current library covers FAQ, sales talk tracks, brand rules, and SOPs.",
    "Approved actions and effective strategies are added into company memory.",
    "New rules automatically flow into agent behavior after publish.",
  ],
};

function renderKnowledgeState() {
  setTextByAttr("data-knowledge-field", "libraryStatus", `${knowledgeState.docs} docs`);
  setTextByAttr("data-knowledge-field", "timelineStatus", knowledgeState.timelineStatus);
  setListByAttr("data-knowledge-list", "versionList", knowledgeState.versionList);
  setListByAttr("data-knowledge-list", "memoryList", knowledgeState.memoryList);
  setListByAttr("data-knowledge-list", "timelineList", knowledgeState.timelineList);
}

document.querySelectorAll("[data-knowledge-action]").forEach((button) => {
  button.addEventListener("click", () => {
    setDemoStage("understand");
    const action = button.dataset.knowledgeAction;
    if (action === "draft") {
      knowledgeState.docs += 1;
      knowledgeState.timelineStatus = "Draft ready";
      knowledgeState.versionList = [
        "New FAQ / SOP draft created",
        "Waiting for owner review",
        "Version history",
        "Expired content alerts",
      ];
      knowledgeState.timelineList = [
        "The system generated a fresh draft from recent support and operations activity.",
        "Agents still use the old rules until the new draft is approved.",
        "After publish, this draft can become company memory.",
      ];
    }
    if (action === "publish") {
      knowledgeState.timelineStatus = "Published";
      knowledgeState.versionList = [
        "Latest FAQ published",
        "Publisher: operations lead",
        "Old version archived",
        "Expired content alerts",
      ];
      knowledgeState.timelineList = [
        "The latest knowledge draft is now live in the official library.",
        "Knowledge Agent will inherit the new rules in future runs.",
        "Support and FAQ outputs are now aligned with the updated version.",
      ];
    }
    if (action === "memory") {
      knowledgeState.timelineStatus = "Memory updated";
      knowledgeState.memoryList = [
        "Latest support FAQ became company memory",
        "Approved growth talk track saved as a playbook",
        "Owner-involvement rule stored",
        "Invalid strategies marked as blocked",
      ];
      knowledgeState.timelineList = [
        "Recent approvals and working strategies were stored as company memory.",
        "Future agent output will prioritize proven rules and patterns.",
        "The system is turning team experience into reusable operating memory.",
      ];
    }
    renderKnowledgeState();
  });
});

const settingsRoles = {
  owner: {
    heroLead:
      "Owner view focuses on results, budget, approvals, and which actions still need a human decision.",
    governanceStatus: "Owner mode",
    rolesList: [
      "Owner: sees outcomes and approves high-risk actions",
      "Operator: runs daily tasks and reviews drafts",
      "Sales: pushes client actions and follow-up",
      "Admin: manages systems, permissions, and policies",
    ],
    scopeList: [
      "Owner sees the executive summary and approval queue.",
      "Growth Agent can only read growth and ads data.",
      "Sales Agent cannot change budget settings directly.",
    ],
    routingList: [
      "Hybrid model route for balanced cost and quality",
      "High-value approval notes can use a stronger model",
      "Simple summaries default to smaller models",
    ],
    budgetList: [
      "Monthly budget: $420",
      "Used: 61%",
      "On track this week",
    ],
    timelineList: [
      "Default routing is balanced for cost and quality.",
      "High-risk actions must go through approval before execution.",
      "Owners only step in on budget, client-facing, or risk-heavy moves.",
    ],
  },
  operator: {
    heroLead:
      "Operator view focuses on task visibility, knowledge maintenance, and keeping the approval lane moving.",
    governanceStatus: "Operator mode",
    rolesList: [
      "Operator: sees tasks, edits knowledge, and manages approvals",
      "Owner: approves high-risk actions",
      "Sales: sees client summary and follow-up items",
      "Admin: manages integrations and policy controls",
    ],
    scopeList: [
      "Operators can review agent output and knowledge drafts.",
      "Knowledge Agent can read SOP and FAQ content.",
      "Operators cannot change the global budget policy.",
    ],
    routingList: [
      "Reviews and recommendations prefer hybrid route",
      "FAQ drafting and cleanup prefer smaller models",
      "Complex explanations can escalate to stronger models",
    ],
    budgetList: [
      "Monthly budget: $420",
      "Used: 61%",
      "Alert if review load spikes",
    ],
    timelineList: [
      "Approval lane is healthy and one draft is waiting review.",
      "Operators can edit knowledge, but publishing still requires approval.",
      "Task and knowledge changes are logged in the governance timeline.",
    ],
  },
  admin: {
    heroLead:
      "Admin view manages permissions, integration scopes, model routing, and budget controls.",
    governanceStatus: "Admin mode",
    rolesList: [
      "Admin: manages integrations, models, budgets, and audits",
      "Owner: sees outcomes and approvals",
      "Operator: runs tasks and maintains knowledge",
      "Sales: only sees client progression data",
    ],
    scopeList: [
      "Growth Agent only reads growth and ad sources.",
      "Sales Agent reads CRM and communication summaries.",
      "Knowledge Agent reads SOP and FAQ documents only.",
    ],
    routingList: [
      "Summaries and classification use smaller models",
      "Business reviews use hybrid routing",
      "High-value reasoning or approvals use stronger models",
    ],
    budgetList: [
      "Monthly budget: $420",
      "Used: 61%",
      "Admin alert before overrun",
    ],
    timelineList: [
      "Admins can change agent scopes and integration grants any time.",
      "Model routing adapts to task complexity and budget pressure.",
      "Every risky action leaves a visible audit trail.",
    ],
  },
};

let currentSettingsRole = "owner";
let budgetAlert = false;
let routeShifted = false;

function renderSettingsState() {
  const role = settingsRoles[currentSettingsRole];
  setTextByAttr("data-settings-field", "heroLead", role.heroLead);
  setTextByAttr(
    "data-settings-field",
    "governanceStatus",
    budgetAlert ? "Budget alert" : routeShifted ? "Routing shifted" : role.governanceStatus
  );
  setListByAttr("data-settings-list", "rolesList", role.rolesList);
  setListByAttr("data-settings-list", "scopeList", role.scopeList);
  setListByAttr(
    "data-settings-list",
    "routingList",
    routeShifted
      ? [
          "Cost Saver route is active",
          "More cleanup tasks now prefer smaller models",
          "Only high-value approvals and reasoning keep stronger models",
        ]
      : role.routingList
  );
  setListByAttr(
    "data-settings-list",
    "budgetList",
    budgetAlert
      ? ["Monthly budget: $420", "Used: 89%", "Admin alert triggered"]
      : role.budgetList
  );
  setListByAttr("data-settings-list", "timelineList", role.timelineList);

  document.querySelectorAll("[data-settings-role]").forEach((button) => {
    button.classList.toggle(
      "is-active",
      button.dataset.settingsRole === currentSettingsRole
    );
  });
}

const shadowNetworkScenarios = {
  focus: {
    runTitle: "Shadow Network is coordinating sales, assistant, and support context.",
    runStatus: "Company context loaded",
    packetStatus: "Alignment packet ready",
    contextTitle: "CRM export, meeting notes, support issues, pricing FAQ",
    contextNote: "The network reads shared company context and routes each piece to the right shadow.",
    askTitle: "Prioritize work, flag decisions, create team handoff",
    askNote: "The employee asks once; the network decides which shadows need to contribute.",
    outputTitle: "Friday focus packet",
    outputNote: "The result is ready to save, review, or convert into team actions.",
    activeShadow: "Shadow Network",
    activeSource: "4 sources linked",
    activeOutput: "Packet ready",
    userMessage: "Look across CRM, meeting notes, and support issues. What should the team focus on before Friday?",
    networkMessageOne: "I pulled Sales, Assistant, and Support shadows into this request. The company context points to three priorities and two unresolved review items.",
    networkMessageTwo: "I prepared a Friday focus brief, owner decisions, team tasks, and a follow-up draft for the highest-value account.",
    composerHint: "Ask for a focus brief, an email draft, a ranked list, or a team handoff.",
    sources: [
      "`crm-week-18.csv` was used to score lead health and last touch recency.",
      "`founder-meeting-notes.docx` was used to extract commitments and blockers.",
      "`support-issues.csv` was used to flag customer-facing friction.",
    ],
    actions: [
      ["Save focus brief", "Store the Friday priority packet so the whole team can align around it."],
      ["Create team tasks", "Turn the top five recommendations into a tracked action list."],
      ["Review decisions", "Send two owner-level decisions into the review queue."],
    ],
    assetType: "Alignment Packet",
    assetTitle: "Friday focus brief + tasks",
    assetNote: "The network returned one brief, three decisions, five tasks, and two review items.",
  },
  sales: {
    runTitle: "Sales Shadow is recovering stalled opportunities with company context.",
    runStatus: "Sales context active",
    packetStatus: "Follow-up draft ready",
    contextTitle: "CRM export, last-touch notes, pricing FAQ, product sheet",
    contextNote: "Sales Shadow can reference sales context without touching support-only or payroll data.",
    askTitle: "Rank leads, draft follow-up, explain stalled deals",
    askNote: "The system converts scattered sales context into a clear next-action plan.",
    outputTitle: "Pipeline recovery pack",
    outputNote: "The output includes lead priority, stalled-deal explanation, and a ready-to-edit follow-up.",
    activeShadow: "Sales Shadow",
    activeSource: "CRM linked",
    activeOutput: "Email draft ready",
    userMessage: "Rank this week's top leads and tell me which deals need follow-up before Friday.",
    networkMessageOne: "Sales Shadow reviewed CRM recency, meeting notes, and known objections. Three leads show strong buying intent.",
    networkMessageTwo: "I created a ranked lead list, one owner follow-up task, and a concise email draft for Acme.",
    composerHint: "Ask Sales Shadow to rank leads, draft follow-ups, or explain pipeline risk.",
    sources: [
      "`crm-week-18.csv` was used to rank lead health.",
      "`sales-notes.docx` was used to identify objections and next-step cues.",
      "`pricing-sheet.pdf` was used to avoid unsupported pricing claims.",
    ],
    actions: [
      ["Save lead summary", "Store the ranked lead list in outputs for the rest of the team."],
      ["Create follow-up tasks", "Assign the top three accounts to the right owner."],
      ["Edit email", "Open the follow-up draft and prepare it for review."],
    ],
    assetType: "Lead Review",
    assetTitle: "Priority list + email draft",
    assetNote: "Sales Shadow identified three high-intent leads and prepared one ready-to-edit follow-up draft.",
  },
  support: {
    runTitle: "Support Shadow is finding knowledge drift that affects customers and sales.",
    runStatus: "Support context active",
    packetStatus: "FAQ patch ready",
    contextTitle: "Support tickets, FAQ doc, SOP, newest pricing notes",
    contextNote: "Support Shadow compares customer questions against the latest company rules and docs.",
    askTitle: "Find repeat issues, update FAQ, flag customer risk",
    askNote: "The network turns support noise into reusable knowledge and visible risk signals.",
    outputTitle: "FAQ drift report",
    outputNote: "The output includes a mismatch summary, recommended FAQ edits, and review items.",
    activeShadow: "Support Shadow",
    activeSource: "Tickets linked",
    activeOutput: "FAQ draft ready",
    userMessage: "Check support tickets and tell me what customers keep asking that our FAQ does not answer well.",
    networkMessageOne: "Support Shadow found two repeated refund questions and one pricing mismatch between FAQ and the newest product doc.",
    networkMessageTwo: "I drafted a cleaner FAQ block, flagged the risk to Sales Shadow, and prepared it for review.",
    composerHint: "Ask Support Shadow to find repeat questions, draft replies, or update FAQ blocks.",
    sources: [
      "`support-tickets-april.csv` was used to identify repeated questions.",
      "`support-faq.docx` was compared against current customer language.",
      "`pricing-update.pdf` was used to catch the outdated FAQ answer.",
    ],
    actions: [
      ["Review FAQ patch", "Open the recommended FAQ update before publishing."],
      ["Notify Sales Shadow", "Sync the customer objection to sales follow-up context."],
      ["Save support signal", "Add the repeated issue into the company memory layer."],
    ],
    assetType: "Support Drift",
    assetTitle: "FAQ patch + sales signal",
    assetNote: "Support Shadow found one outdated article and prepared a customer-safe replacement.",
  },
  meeting: {
    runTitle: "Assistant Shadow is turning team discussion into aligned execution.",
    runStatus: "Meeting context active",
    packetStatus: "Task handoff ready",
    contextTitle: "Meeting notes, calendar, founder decisions, open tasks",
    contextNote: "Assistant Shadow keeps decisions and follow-ups from being trapped inside meeting notes.",
    askTitle: "Summarize decisions, assign owners, prepare reminders",
    askNote: "The network converts discussion into accountable next steps.",
    outputTitle: "Meeting execution packet",
    outputNote: "The output includes decisions, owner tasks, reminders, and items needing confirmation.",
    activeShadow: "Assistant Shadow",
    activeSource: "Notes linked",
    activeOutput: "Tasks ready",
    userMessage: "Turn Monday's founder meeting notes into owner tasks and tell me what still needs a decision.",
    networkMessageOne: "Assistant Shadow extracted four decisions, five action items, and two unresolved points from the meeting notes.",
    networkMessageTwo: "I created a clean task handoff and queued two decision items for owner review.",
    composerHint: "Ask Assistant Shadow to summarize meetings, assign owners, or create reminders.",
    sources: [
      "`monday-founder-notes.docx` was used to extract decisions and blockers.",
      "`team-calendar.ics` was used to suggest realistic due dates.",
      "`open-tasks.xlsx` was used to avoid duplicate assignments.",
    ],
    actions: [
      ["Create task handoff", "Send five action items to the task queue with suggested owners."],
      ["Queue decisions", "Place two unresolved decisions into the review queue."],
      ["Save meeting digest", "Store the summary as a reusable company record."],
    ],
    assetType: "Meeting Handoff",
    assetTitle: "Decisions + task list",
    assetNote: "Assistant Shadow converted meeting notes into owners, due dates, reminders, and review items.",
  },
};

function setShadowField(name, value) {
  document.querySelectorAll(`[data-shadow-field="${name}"]`).forEach((element) => {
    element.textContent = value;
  });
}

function setShadowList(name, items, renderer) {
  document.querySelectorAll(`[data-shadow-list="${name}"]`).forEach((list) => {
    list.innerHTML = "";
    items.forEach((item) => {
      list.insertAdjacentHTML("beforeend", renderer(item));
    });
  });
}

function renderShadowNetworkScenario(key = "focus") {
  const scenario = shadowNetworkScenarios[key] || shadowNetworkScenarios.focus;
  Object.entries(scenario).forEach(([field, value]) => {
    if (typeof value === "string") setShadowField(field, value);
  });
  setShadowList("sources", scenario.sources, (item) => `<li>${item}</li>`);
  setShadowList(
    "actions",
    scenario.actions,
    ([title, body]) => `<div><strong>${title}</strong><p>${body}</p></div>`
  );
  document.querySelectorAll("[data-shadow-action]").forEach((button) => {
    button.classList.toggle("is-active", button.dataset.shadowAction === key);
  });
}

document.querySelectorAll("[data-shadow-action]").forEach((button) => {
  button.addEventListener("click", () => {
    renderShadowNetworkScenario(button.dataset.shadowAction);
  });
});

document.querySelectorAll("[data-settings-role]").forEach((button) => {
  button.addEventListener("click", () => {
    currentSettingsRole = button.dataset.settingsRole;
    budgetAlert = false;
    routeShifted = false;
    setDemoStage("approve");
    renderSettingsState();
  });
});

document.querySelectorAll("[data-settings-action]").forEach((button) => {
  button.addEventListener("click", () => {
    setDemoStage("approve");
    if (button.dataset.settingsAction === "route") {
      routeShifted = true;
    }
    if (button.dataset.settingsAction === "budget") {
      budgetAlert = true;
    }
    renderSettingsState();
  });
});

window.addEventListener("synapse:scenario-change", () => {
  dashboardState.scenario = demoContext.scenario;
  dashboardState.dispatched = false;
  dashboardState.escalated = false;
  demoRuntimeState.scenario = demoContext.scenario;
  clientState.scenario = demoContext.scenario;
  clientState.dispatched = false;
  demoJourneyState.scenario = demoContext.scenario;
  renderDashboardState();
  renderWorkspaceDemo();
  renderCaseScenario(demoContext.scenario);
  renderDemoJourney();
  renderClientState();
});

window.addEventListener("synapse:reset-demo", () => {
  dashboardState.scenario = "retail";
  dashboardState.dispatched = false;
  dashboardState.escalated = false;
  demoRuntimeState.scenario = "retail";
  demoRuntimeState.connected = false;
  demoRuntimeState.dispatched = false;
  demoRuntimeState.approved = false;

  demoJourneyState.scenario = "retail";
  demoJourneyState.stage = "connect";

  intakeState.connectedSources = [
    "HubSpot CRM",
    "Gmail Sales Inbox",
    "Meta Ads",
    "Google Sheets report",
    "Notion SOP docs",
  ];
  intakeState.feedModel = [
    "Knowledge Feed: SOP, FAQ, product docs, brand rules",
    "Business Feed: CRM, orders, campaigns, support logs",
    "Feedback Feed: approvals, edits, rejected actions",
    "Memory Feed: verified playbooks and client history",
  ];
  setTextByAttr("data-intake-field", "hubStatus", "Ready");
  setTextByAttr("data-intake-field", "dropzoneTitle", "Drop PDF, Excel, Word, CSV, or image files here");
  setTextByAttr(
    "data-intake-field",
    "dropzoneText",
    "You can also connect cloud docs and structured systems."
  );
  setTextByAttr(
    "data-intake-field",
    "sourceDocs",
    "Product docs, FAQ, SOP, sales talk tracks, and training materials."
  );
  setTextByAttr(
    "data-intake-field",
    "sourceCustomer",
    "CRM, orders, leads, meeting notes, and communication history."
  );
  setTextByAttr(
    "data-intake-field",
    "sourceOps",
    "Campaign accounts, service tickets, refunds, and reporting feeds."
  );
  setTextByAttr(
    "data-intake-field",
    "emailAccess",
    "Support Gmail, Outlook, and connected business inboxes."
  );

  approvalState.urgentCount = "2 urgent";
  approvalState.approvalRowOne =
    "Growth Agent suggests pausing two ad groups with rising CPA and weak creative support.";
  approvalState.approvalRowTwo =
    "Knowledge Agent prepared a new FAQ draft that will replace the old support version after review.";
  approvalState.rulesList = [
    "External email or client communication",
    "Budget changes and ad pauses",
    "Publishing new FAQ or SOP content",
    "Direct CRM or order-system writebacks",
  ];
  approvalState.auditList = [
    "Who requested it",
    "Who approved or rejected it",
    "What changed",
    "How to roll back if needed",
  ];
  document.querySelectorAll("[data-approval-action]").forEach((button) => {
    button.disabled = false;
    if (button.dataset.approvalAction === "approve-ad") button.textContent = localizeString("Approve");
    if (button.dataset.approvalAction === "revise-ad") button.textContent = localizeString("Request revision");
    if (button.dataset.approvalAction === "approve-faq") button.textContent = localizeString("Approve");
    if (button.dataset.approvalAction === "review-faq") button.textContent = localizeString("Review draft");
  });

  clientState.scenario = "retail";
  clientState.dispatched = false;
  taskBoardState.queued = [
    { title: "Refresh refund FAQ", note: "Knowledge Agent -> High", style: "" },
    { title: "Pull latest ad creative report", note: "Growth Agent -> Medium", style: "" },
  ];
  taskBoardState.running = [
    { title: "Rank high-intent leads", note: "Sales Agent is drafting owner follow-up.", style: "live-ticket" },
    { title: "Analyze campaign anomaly", note: "Growth Agent is comparing Meta and Google changes.", style: "live-ticket" },
  ];
  taskBoardState.waiting = [
    { title: "Publish FAQ update", note: "Waiting for ops approval.", style: "warn-ticket" },
    { title: "Pause low-efficiency ad group", note: "Waiting for owner approval.", style: "warn-ticket" },
  ];
  taskBoardState.done = [
    { title: "Weekly brief generated", note: "Already synced back into workspace.", style: "" },
    { title: "Client summary synced to CRM", note: "Sales Agent completed writeback.", style: "" },
  ];
  taskBoardState.timelineList = [
    "Tasks created in chat sync back into the task center.",
    "High-risk tasks are automatically routed into approvals.",
    "Completed results sync back into workspace and client context.",
  ];

  knowledgeState.docs = 124;
  knowledgeState.timelineStatus = "Stable";
  knowledgeState.versionList = [
    "Version history",
    "Who changed the rule",
    "Pending review drafts",
    "Expired content alerts",
  ];
  knowledgeState.memoryList = [
    "Which talk tracks work",
    "Which actions were approved",
    "Which clients need owner involvement",
    "Which strategies were marked ineffective",
  ];
  knowledgeState.timelineList = [
    "The current library covers FAQ, sales talk tracks, brand rules, and SOPs.",
    "Approved actions and effective strategies are added into company memory.",
    "New rules automatically flow into agent behavior after publish.",
  ];
  currentSettingsRole = "owner";
  budgetAlert = false;
  routeShifted = false;
  document.querySelectorAll("[data-case-toggle]").forEach((button) => {
    button.textContent = localizeString("Expand details");
  });
  document.querySelectorAll("[data-demo-case-card]").forEach((card) => {
    card.classList.remove("is-expanded");
  });

  renderDashboardState();
  renderWorkspaceDemo();
  renderCaseScenario("retail");
  renderDemoJourney();
  renderIntakeState();
  renderApprovalState();
  renderClientState();
  renderTaskBoard();
  renderKnowledgeState();
  renderSettingsState();
});

renderDashboardState();
renderWorkspaceDemo();
renderCaseScenario(demoContext.scenario);
renderDemoJourney();
renderIntakeState();
renderApprovalState();
renderClientState();
renderTaskBoard();
renderKnowledgeState();
renderSettingsState();
renderShadowNetworkScenario();


