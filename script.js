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
const JOURNEY_ORDER = ["connect", "understand", "dispatch", "approve"];
const DEMO_PAGE_ORDER = [
  "index",
  "dashboard",
  "demo",
  "app",
  "data-intake",
  "knowledge-feed",
  "client-intelligence",
  "task-center",
  "approval-center",
  "settings",
];
const PAGE_STAGE_MAP = {
  index: "connect",
  dashboard: "dispatch",
  demo: "connect",
  app: "dispatch",
  "data-intake": "connect",
  "client-intelligence": "understand",
  "knowledge-feed": "understand",
  "task-center": "dispatch",
  "approval-center": "approve",
  settings: "approve",
};

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
  dashboard: { label: "Dashboard", href: "dashboard.html" },
  demo: { label: "Demo Flow", href: "demo.html" },
  app: { label: "Workspace", href: "app.html" },
  "data-intake": { label: "Data Intake", href: "data-intake.html" },
  "knowledge-feed": { label: "Knowledge", href: "knowledge-feed.html" },
  "client-intelligence": { label: "Patient", href: "client-intelligence.html" },
  "task-center": { label: "Tasks", href: "task-center.html" },
  "approval-center": { label: "Approvals", href: "approval-center.html" },
  settings: { label: "Settings", href: "settings.html" },
};

const pageGuideMeta = {
  index: {
    eyebrow: "Pilot Guide",
    title: "Use this page to frame the week-one pilot story.",
    body: "This page should now position Synapse as a near-term pilot, not a concept. Start from Dashboard if the client wants to see outcomes first, or Demo Flow if they want the full product story.",
    clicks: [
      "Open Dashboard first when the client asks what they will actually see in the pilot.",
      "Use Demo Flow when they want to understand how data becomes execution.",
      "Use Workspace, Approvals, and Settings to show the pilot is operationally real.",
    ],
    next: { label: "Open Dashboard", href: "dashboard.html" },
  },
  dashboard: {
    eyebrow: "Pilot Dashboard Guide",
    title: "Lead with the clinic dashboard for the pilot.",
    body: "This page works best when the clinic wants to know what the owner, operator, or lead doctor sees before the first patient is called in. It summarizes chart pressure, report review load, active agents, and what the pilot should do next.",
    clicks: [
      "Use Refresh board to show the pilot starts from live patient and report data.",
      "Use Prepare doctor work to show the pilot can summarize charts before chair time.",
      "Use Escalate doctor review to show nothing writes back without sign-off.",
    ],
    next: { label: "Open Workspace", href: "app.html" },
  },
  demo: {
    eyebrow: "Narration Guide",
    title: "This is the best page to control the story.",
    body: "Use the stage buttons to move the audience from data, to context, to agent work, to approvals. The featured case highlight tells you which case to talk through right now.",
    clicks: [
      "Use Start Demo to reset the story to the first stage.",
      "Use Next when you want the page to drive the cadence for you.",
      "Open the linked product page once the audience asks how that stage works in detail.",
    ],
    next: { label: "Open Workspace", href: "app.html" },
  },
  app: {
    eyebrow: "Workspace Guide",
    title: "Show that the doctor can finish the work inside one workspace.",
    body: "This page works best after the dashboard. It proves the doctor can ask the AI to read the patient chart, summarize the report, draft the note, and prepare follow-up actions without leaving one thread.",
    clicks: [
      "Switch between Follow-up and Implant consult to show two common dental workflows.",
      "Run Load patient chart, then Draft note, then Doctor sign-off.",
      "Scroll to the doctor chat to show how the note gets completed inside one conversation.",
    ],
    next: { label: "Open Task Center", href: "task-center.html" },
  },
  "data-intake": {
    eyebrow: "Intake Guide",
    title: "Lead with how the system learns the clinic.",
    body: "This page helps answer the first trust question: what exactly does Synapse read before it drafts anything for the doctor? Use it when the audience asks about EMR sync, report ingestion, image notes, or template coverage.",
    clicks: [
      "Click Upload files to show historical reports and templates entering the system.",
      "Click CRM or Gmail to explain the broader feed model even if the clinic starts with uploads first.",
      "Use this page before Patient Intelligence if the audience needs proof of chart depth.",
    ],
    next: { label: "Open Patient Intelligence", href: "client-intelligence.html" },
  },
  "knowledge-feed": {
    eyebrow: "Knowledge Guide",
    title: "Show how teams feed rules and memory into the system.",
    body: "Use this page when the audience asks how the product gets smarter over time. The key point is that teams are not training a base model directly; they are feeding approved rules, drafts, and memory back into the operating layer.",
    clicks: [
      "Create draft to show the system can produce a new rule candidate.",
      "Publish to show approvals can promote drafts into the live knowledge base.",
      "Save to memory to explain how verified patterns become reusable company memory.",
    ],
    next: { label: "Open Settings", href: "settings.html" },
  },
  "client-intelligence": {
    eyebrow: "Patient Guide",
    title: "Prove the product understands the patient before drafting the note.",
    body: "This page is the bridge between raw reports and doctor action. It should answer why the AI is drafting a particular medical record, not just what it is doing.",
    clicks: [
      "Switch scenarios to show both a routine follow-up and a more complex consult.",
      "Refresh context first, then Dispatch agents so the audience sees the note flow clearly.",
      "Point out that complaint, history, report focus, and draft direction are visible before action.",
    ],
    next: { label: "Open Task Center", href: "task-center.html" },
  },
  "task-center": {
    eyebrow: "Task Guide",
    title: "Show that chat turns into managed execution.",
    body: "This page makes the product feel operational. It proves that agent work is not lost in chat bubbles and that people can still track, steer, and complete work.",
    clicks: [
      "Create agent task to show the board is not static.",
      "Move task forward to show work leaving the queue and entering live execution.",
      "Complete one task to prove results sync back into the system.",
    ],
    next: { label: "Open Approval Center", href: "approval-center.html" },
  },
  "approval-center": {
    eyebrow: "Approval Guide",
    title: "Close the story with control, not just automation.",
    body: "This page is where trust gets won. It proves that risky actions stay reviewable, auditable, and reversible instead of becoming a black box.",
    clicks: [
      "Approve an ad action to show speed with oversight.",
      "Request revision to prove humans can still correct the system before execution.",
      "Review or approve the FAQ draft to show publish flow and auditability.",
    ],
    next: { label: "Open Settings", href: "settings.html" },
  },
  settings: {
    eyebrow: "Governance Guide",
    title: "End with scope, budget, and policy control.",
    body: "This is the best final page because it answers the adoption questions: who can see what, how models are routed, and how spend stays visible.",
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
    summary: "Frame the pilot scope, delivery path, and what the client will see first.",
    previous: { label: "Stay on Showcase", href: "index.html" },
    next: { label: "Open Dashboard", href: "dashboard.html" },
  },
  dashboard: {
    stage: "Pilot Dashboard",
    summary: "Start with the executive board to show what the week-one pilot feels like in practice.",
    previous: { label: "Back to Showcase", href: "index.html" },
    next: { label: "Open Workspace", href: "app.html" },
  },
  demo: {
    stage: "Story",
    summary: "Move from connected data to client context, agent dispatch, and approvals.",
    previous: { label: "Back to Showcase", href: "index.html" },
    next: { label: "Open Workspace", href: "app.html" },
  },
  app: {
    stage: "Workspace",
    summary: "Prove the doctor can read the chart, chat with AI, and finish the note in one place.",
    previous: { label: "Back to Demo Flow", href: "demo.html" },
    next: { label: "Open Data Intake", href: "data-intake.html" },
  },
  "data-intake": {
    stage: "Intake",
    summary: "Show how reports, templates, charts, and clinic documents become usable context.",
    previous: { label: "Back to Workspace", href: "app.html" },
    next: { label: "Open Patient Intelligence", href: "client-intelligence.html" },
  },
  "knowledge-feed": {
    stage: "Knowledge",
    summary: "Show how SOPs, rules, approvals, and memory improve future agent work.",
    previous: { label: "Back to Data Intake", href: "data-intake.html" },
    next: { label: "Open Settings", href: "settings.html" },
  },
  "client-intelligence": {
    stage: "Understanding",
    summary: "Bridge raw reports and doctor action with a visible patient reasoning layer.",
    previous: { label: "Back to Data Intake", href: "data-intake.html" },
    next: { label: "Open Task Center", href: "task-center.html" },
  },
  "task-center": {
    stage: "Execution",
    summary: "Show work moving through queue, live execution, approvals, and completion.",
    previous: { label: "Back to Patient View", href: "client-intelligence.html" },
    next: { label: "Open Approval Center", href: "approval-center.html" },
  },
  "approval-center": {
    stage: "Control",
    summary: "Prove that risky actions stay reviewable, traceable, and safe to adopt.",
    previous: { label: "Back to Tasks", href: "task-center.html" },
    next: { label: "Open Settings", href: "settings.html" },
  },
  settings: {
    stage: "Governance",
    summary: "Close with roles, routing, budget visibility, and policy boundaries.",
    previous: { label: "Back to Approvals", href: "approval-center.html" },
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
  return value
    .replace(/[^\x00-\x7F]+/g, " -> ")
    .replace(/\s*->\s*/g, " -> ")
    .replace(/\s{2,}/g, " ")
    .trim();
}

function setTextByAttr(attr, field, value) {
  const element = document.querySelector(`[${attr}="${field}"]`);
  if (element) {
    element.textContent = sanitizeDisplayText(value);
  }
}

function setListByAttr(attr, field, items) {
  const list = document.querySelector(`[${attr}="${field}"]`);
  if (!list) return;
  list.innerHTML = "";
  items.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = sanitizeDisplayText(item);
    list.appendChild(li);
  });
}

function setLinkByAttr(attr, field, value) {
  const link = document.querySelector(`[${attr}="${field}"]`);
  if (!link || !value) return;
  link.textContent = sanitizeDisplayText(value.label);
  link.setAttribute("href", value.href);
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
        Current page:
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
    link.textContent = stage.cta;
    link.setAttribute("href", stage.href);
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
    link.href = meta.href;
    link.textContent = meta.label;
    if (pageKey === currentPage) link.classList.add("is-current");
    if (visitedPages.includes(pageKey)) link.classList.add("is-visited");
    grid.appendChild(link);
  });

  const progress = document.querySelector('[data-demo-map="progress"]');
  if (progress) {
    progress.textContent = `${visitedPages.length} / ${DEMO_PAGE_ORDER.length} visited`;
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
    button.textContent = demoRuntimeState.approved ? "Doctor signed" : "Doctor sign-off";
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
    button.textContent = expanded ? "Collapse details" : "Expand details";
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
      button.textContent = "Approved";
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
      button.textContent = "Published";
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
    strong.textContent = sanitizeDisplayText(item.title);
    p.textContent = sanitizeDisplayText(item.note);
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
    if (button.dataset.approvalAction === "approve-ad") button.textContent = "Approve";
    if (button.dataset.approvalAction === "revise-ad") button.textContent = "Request revision";
    if (button.dataset.approvalAction === "approve-faq") button.textContent = "Approve";
    if (button.dataset.approvalAction === "review-faq") button.textContent = "Review draft";
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
    button.textContent = "Expand details";
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
