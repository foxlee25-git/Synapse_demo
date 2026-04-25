const screenTitles = {
  overview: "Synapse Prototype",
  demo: "Investor Demo Script",
  setup: "Setup & Permissions",
  dashboard: "Role-based Company Dashboard",
  actions: "Governed Action Queue",
  workflow: "How Synapse Works",
  architecture: "System Architecture",
  governance: "Governance & Audit",
};

const roles = {
  ceo: {
    label: "CEO View",
    title: "Global Company Dashboard",
    description: "领导层看到公司全局状态、风险、优先级、资源压力和待决策事项。",
    kpis: [["Revenue exposure", "$12.4M"], ["Open risks", "18"], ["Decisions", "7"], ["Health", "99.94%"]],
    priorityTitle: "Strategic priorities",
    priorities: [["AI Agent Platform", 78], ["International Expansion", 45], ["Enterprise Motion", 62], ["Operational Excellence", 85]],
    risks: ["Enterprise deal slippage", "Security compliance gap", "Cloud cost overrun"],
    decisions: ["Approve EU data residency", "Budget for AI infra expansion", "Q3 pricing strategy"],
    activity: ["PM Agent synced launch blocker.", "Sales Agent flagged deal risk.", "Synapse created owner decision packet."],
    access: "Full detail",
    networkNote: "Executive visibility: full cross-company context, risks, dependencies and routed actions.",
  },
  cto: {
    label: "CTO View",
    title: "Engineering Operating View",
    description: "工程视角聚焦系统健康、部署、阻塞、事故和跨团队依赖。",
    kpis: [["Deployments", "24"], ["Change failure", "2.1%"], ["MTTR", "38m"], ["Infra risks", "3"]],
    priorityTitle: "Engineering progress",
    priorities: [["Agent Platform Core", 81], ["Workflow Orchestrator", 42], ["Context Graph Service", 67], ["Integrations Framework", 73]],
    risks: ["API rate limit with Slack", "Auth service flakiness", "Infra quota increase"],
    decisions: ["Approve staging freeze", "Escalate workflow timeout", "Review GitHub writeback policy"],
    activity: ["Dev Agent reported timeout.", "Synapse correlated Slack limit.", "CTO decision packet queued."],
    access: "Engineering detail",
    networkNote: "CTO visibility: engineering nodes show blockers, systems and owners; non-engineering nodes remain summarized.",
  },
  pm: {
    label: "PM View",
    title: "Program Delivery View",
    description: "PM 视角聚焦里程碑、依赖、延期任务和团队对齐状态。",
    kpis: [["Milestones", "6"], ["Blocked deps", "4"], ["Overdue", "5"], ["Confidence", "72%"]],
    priorityTitle: "Launch milestones",
    priorities: [["v2.0 QA Launch", 72], ["Enterprise SSO", 85], ["Marketplace v1", 40], ["Mobile Beta", 25]],
    risks: ["Billing API waiting on platform", "Docs draft missing owner", "QA signoff delayed"],
    decisions: ["Move marketplace date", "Assign billing API owner", "Escalate QA coverage gap"],
    activity: ["PM Agent merged Jira and Docs.", "Synapse found two blockers.", "Task handoff sent to owners."],
    access: "Delivery detail",
    networkNote: "PM visibility: delivery, customer impact, launch dependencies and owners are expanded; unrelated work stays light.",
  },
  employee: {
    label: "Employee View",
    title: "My Work Coordination View",
    description: "员工只看到自己的优先级、等待自己的事项、直接依赖和下一步。",
    kpis: [["My tasks", "6"], ["Waiting on me", "3"], ["High priority", "2"], ["Agents active", "15"]],
    priorityTitle: "Today priorities",
    priorities: [["Review PR #4821", 92], ["Fix workflow timeout", 68], ["Write integration tests", 55], ["Prepare release notes", 30]],
    risks: ["Mina waiting for PR review", "Alex needs API spec update", "Sara waiting for feedback"],
    decisions: ["Review code handoff", "Confirm API deadline", "Prepare launch note"],
    activity: ["My Agent summarized tasks.", "Synapse ranked priorities.", "Two dependencies surfaced."],
    access: "Presence only",
    networkNote: "Employee visibility: all 15 Agents stay visible, but most nodes expose only online status and broad role context.",
  },
};

const employees = [
  { id: "ava", name: "Ava Chen", role: "Dev Agent", team: "Platform", status: "blocked", detail: "Billing API blocked PR #4821", tags: ["GitHub", "Linear"], x: 50, y: 12 },
  { id: "noah", name: "Noah Kim", role: "Dev Agent", team: "Infra", status: "busy", detail: "Auth latency regression", tags: ["Incident", "MTTR"], x: 74, y: 18 },
  { id: "mia", name: "Mia Patel", role: "QA Agent", team: "Quality", status: "online", detail: "Regression queue ready", tags: ["QA", "Release"], x: 88, y: 36 },
  { id: "liam", name: "Liam Stone", role: "PM Agent", team: "Delivery", status: "online", detail: "Marketplace date at risk", tags: ["Launch", "Deps"], x: 86, y: 62 },
  { id: "sara", name: "Sara Lee", role: "Design Agent", team: "Product", status: "online", detail: "Empty-state review pending", tags: ["Figma", "Spec"], x: 70, y: 82 },
  { id: "alex", name: "Alex Rivera", role: "Docs Agent", team: "Knowledge", status: "busy", detail: "API docs need owner", tags: ["Docs", "Spec"], x: 50, y: 88 },
  { id: "zoe", name: "Zoe Brooks", role: "Support Agent", team: "Customer", status: "online", detail: "FAQ drift from 18 tickets", tags: ["Tickets", "FAQ"], x: 30, y: 82 },
  { id: "ethan", name: "Ethan Wong", role: "Sales Agent", team: "Revenue", status: "busy", detail: "Acme renewal risk", tags: ["CRM", "$2.1M"], x: 14, y: 63 },
  { id: "nina", name: "Nina Park", role: "CS Agent", team: "Customer", status: "online", detail: "Enterprise rollout ask", tags: ["QBR", "CRM"], x: 12, y: 38 },
  { id: "omar", name: "Omar Hassan", role: "Ops Agent", team: "Operations", status: "online", detail: "SOP update approved", tags: ["SOP", "Vendor"], x: 27, y: 18 },
  { id: "grace", name: "Grace Miller", role: "Legal Agent", team: "GRC", status: "busy", detail: "EU data terms review", tags: ["Policy", "EU"], x: 39, y: 31 },
  { id: "ben", name: "Ben Carter", role: "Finance Agent", team: "Finance", status: "online", detail: "AI infra budget model", tags: ["Budget", "Q3"], x: 62, y: 31 },
  { id: "iris", name: "Iris Wang", role: "People Agent", team: "People", status: "online", detail: "Platform load hotspot", tags: ["Load", "Hiring"], x: 63, y: 66 },
  { id: "marco", name: "Marco Rossi", role: "Data Agent", team: "Analytics", status: "online", detail: "Coverage score 86%", tags: ["Warehouse", "Metrics"], x: 38, y: 66 },
  { id: "emma", name: "Emma Davis", role: "Exec Agent", team: "Leadership", status: "online", detail: "Decision packet queued", tags: ["Board", "Approval"], x: 50, y: 50 },
];

const links = [
  ["ava", "emma"], ["noah", "emma"], ["mia", "emma"], ["liam", "emma"], ["sara", "emma"],
  ["alex", "emma"], ["zoe", "emma"], ["ethan", "emma"], ["nina", "emma"], ["omar", "emma"],
  ["grace", "emma"], ["ben", "emma"], ["iris", "emma"], ["marco", "emma"],
  ["ava", "noah"], ["ava", "mia"], ["ava", "liam"], ["liam", "sara"], ["liam", "alex"],
  ["ethan", "nina"], ["ethan", "zoe"], ["zoe", "alex"], ["omar", "grace"], ["ben", "emma"],
  ["marco", "liam"], ["iris", "ava"],
];

const roleFocus = {
  ceo: new Set(employees.map((employee) => employee.id)),
  cto: new Set(["ava", "noah", "mia", "liam", "alex", "marco", "iris", "emma"]),
  pm: new Set(["liam", "ava", "mia", "sara", "alex", "zoe", "ethan", "marco", "emma"]),
  employee: new Set(["ava", "noah", "mia", "liam", "alex", "emma"]),
};

const accessCopy = {
  ceo: ["Full detail access", "This role can inspect cross-company risks, owners, systems and routed actions."],
  cto: ["Engineering scoped access", "Engineering context is expanded. Revenue, legal and people signals are summarized unless they affect delivery risk."],
  pm: ["Delivery scoped access", "Launch dependencies, owners, customer impact and next actions are expanded. Sensitive functional details stay summarized."],
  employee: ["Presence-only access", "This role sees whether others are online, busy or blocked, but sensitive work details and source traces are hidden."],
};

const actionByTeam = {
  Platform: "Create owner task and notify PM",
  Infra: "Open incident follow-up",
  Quality: "Request QA signoff",
  Delivery: "Escalate launch dependency",
  Product: "Send design review reminder",
  Knowledge: "Assign docs owner",
  Customer: "Route support summary",
  Revenue: "Draft account risk update",
  Operations: "Publish SOP change",
  GRC: "Queue policy review",
  Finance: "Attach budget model",
  People: "Flag load hotspot",
  Analytics: "Refresh coverage metrics",
  Leadership: "Review decision packet",
};

const actionColumns = [
  ["Suggested", [
    ["Create Billing API owner task", "Source: GitHub PR #4821 + Linear API-482", "Platform Core", "High"],
    ["Draft Acme renewal risk update", "Source: CRM stage drift + Sales Agent notes", "Sales Ops", "Medium"],
  ]],
  ["Needs Approval", [
    ["Approve EU data residency packet", "Source: Legal Agent + Docs decision record", "Grace Miller", "High"],
    ["Publish pricing FAQ patch", "Source: Support tickets + Docs diff", "Zoe Brooks", "Medium"],
  ]],
  ["Running", [
    ["Notify PM about launch risk", "Writing Slack message and Linear comment", "Liam Stone", "Low"],
    ["Attach AI infra budget model", "Finance Agent preparing context bundle", "Ben Carter", "Medium"],
  ]],
  ["Done", [
    ["Weekly status packet archived", "Saved to Enterprise Memory", "Emma Davis", "Low"],
    ["Regression queue synced", "QA state written back to release board", "Mia Patel", "Low"],
  ]],
];

const auditEvents = [
  ["10:42", "Linear issue API-482 marked blocked by Dev Agent.", "Source trace retained"],
  ["10:44", "GitHub PR #4821 linked to Marketplace launch dependency.", "Context Graph"],
  ["10:46", "Employee view policy hid source details from non-owners.", "Permission policy"],
  ["10:48", "PM Agent received launch risk notification draft.", "Approval queued"],
  ["10:51", "Decision packet stored in Enterprise Memory.", "Audit complete"],
];

let currentRole = "ceo";
let selectedAgentId = "emma";

function setText(selector, text) {
  const element = document.querySelector(selector);
  if (element) element.textContent = text;
}

function statusLabel(status) {
  if (status === "blocked") return "Blocked";
  if (status === "busy") return "Busy";
  return "Online";
}

function getNodeBody(employee, roleKey, isFocused) {
  if (roleKey === "employee") return `<p>${statusLabel(employee.status)}</p>`;
  if (roleKey === "ceo" || isFocused) {
    return `<p>${employee.detail}</p><div class="node-meta">${employee.tags.map((tag) => `<span>${tag}</span>`).join("")}</div>`;
  }
  return `<p>${employee.team} context available</p>`;
}

function canSeeDetail(employee, roleKey) {
  return roleKey === "ceo" || (roleFocus[roleKey] && roleFocus[roleKey].has(employee.id));
}

function renderSelectedAgent(employee, roleKey) {
  const fullDetail = canSeeDetail(employee, roleKey);
  const employeeView = roleKey === "employee";
  const [accessTitle, accessBody] = accessCopy[roleKey] || accessCopy.ceo;
  const summary = employeeView
    ? `${statusLabel(employee.status)}. Work details are hidden by policy.`
    : fullDetail
      ? employee.detail
      : `${employee.team} context is summarized for this role.`;
  const trace = employeeView
    ? "Trace hidden. Synapse only exposes presence and direct work dependency state."
    : fullDetail
      ? `Trace: ${employee.tags.join(", ")} sources, work ledger, context graph and approval policy.`
      : "Trace partially hidden. Ask owner or request elevated context.";
  const meta = employeeView
    ? [employee.role, employee.team, statusLabel(employee.status)]
    : fullDetail
      ? [employee.role, employee.team, statusLabel(employee.status), ...employee.tags]
      : [employee.role, employee.team, "Limited detail"];

  setText("#selected-agent-name", employee.name);
  setText("#selected-agent-summary", summary);
  setText("#access-model-title", accessTitle);
  setText("#access-model-copy", accessBody);
  setText("#selected-agent-action", employeeView ? "No cross-agent action available" : actionByTeam[employee.team] || "Review routed action");
  setText("#selected-agent-trace", trace);
  document.querySelector("#selected-agent-meta").innerHTML = meta.map((item) => `<span>${item}</span>`).join("");
}

function selectAgent(agentId) {
  selectedAgentId = agentId;
  const selected = employees.find((employee) => employee.id === selectedAgentId) || employees[0];
  document.querySelectorAll(".employee-node").forEach((node) => {
    node.classList.toggle("is-selected", node.dataset.agentId === selectedAgentId);
  });
  renderSelectedAgent(selected, currentRole);
}

function renderEmployeeNetwork(roleKey) {
  const network = document.querySelector("#employee-network");
  if (!network) return;

  const focused = roleFocus[roleKey] || roleFocus.ceo;
  const lineMarkup = links
    .map(([fromId, toId]) => {
      const from = employees.find((employee) => employee.id === fromId);
      const to = employees.find((employee) => employee.id === toId);
      const strong = focused.has(fromId) && focused.has(toId);
      const limited = roleKey === "employee" && !strong;
      const selected = fromId === selectedAgentId || toId === selectedAgentId;
      return `<line x1="${from.x}" y1="${from.y}" x2="${to.x}" y2="${to.y}" class="${strong ? "is-strong" : ""} ${limited ? "is-limited" : ""} ${selected ? "is-selected-line" : ""}" />`;
    })
    .join("");

  const nodeMarkup = employees
    .map((employee) => {
      const isFocused = focused.has(employee.id);
      const lowDetail = roleKey === "employee";
      return `
        <article class="employee-node ${employee.id === selectedAgentId ? "is-selected" : ""} ${isFocused ? "" : "is-muted"} ${lowDetail ? "is-low-detail" : ""}" data-agent-id="${employee.id}" tabindex="0" role="button" aria-label="Inspect ${employee.name}" style="left:${employee.x}%; top:${employee.y}%">
          <div class="node-top">
            <div>
              <strong>${employee.name}</strong>
              <small>${lowDetail ? employee.role : `${employee.role} / ${employee.team}`}</small>
            </div>
            <i class="status-dot ${employee.status}" title="${statusLabel(employee.status)}"></i>
          </div>
          ${getNodeBody(employee, roleKey, isFocused)}
        </article>
      `;
    })
    .join("");

  network.innerHTML = `
    <svg class="network-lines" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">${lineMarkup}</svg>
    <div class="synapse-node"><strong>Synapse</strong><span>Shadow OS</span></div>
    ${nodeMarkup}
  `;
  selectAgent(selectedAgentId);
}

function renderRole(roleKey) {
  const role = roles[roleKey] || roles.ceo;
  currentRole = roleKey;
  setText("#role-label", role.label);
  setText("#role-title", role.title);
  setText("#role-description", role.description);
  setText("#priority-title", role.priorityTitle);
  setText("#network-visibility-note", role.networkNote);
  setText("#network-access-level", role.access);

  document.querySelector("#kpi-grid").innerHTML = role.kpis
    .map(([label, value]) => `<article class="kpi-card"><span>${label}</span><strong>${value}</strong></article>`)
    .join("");

  document.querySelector("#priority-list").innerHTML = role.priorities
    .map(([label, value]) => `<div><b>${label}</b><span>${value}%</span><i style="--w:${value}%"></i></div>`)
    .join("");

  document.querySelector("#risk-list").innerHTML = role.risks.map((item) => `<li>${item}</li>`).join("");
  document.querySelector("#decision-list").innerHTML = role.decisions.map((item) => `<li>${item}</li>`).join("");
  document.querySelector("#activity-list").innerHTML = role.activity.map((item) => `<p>${item}</p>`).join("");

  document.querySelectorAll("[data-role]").forEach((button) => {
    button.classList.toggle("is-active", button.dataset.role === roleKey);
  });

  renderEmployeeNetwork(roleKey);
}

function renderActionBoard() {
  const board = document.querySelector("#action-board");
  if (!board) return;
  board.innerHTML = actionColumns
    .map(([title, cards]) => `
      <section class="action-column">
        <h3>${title}</h3>
        ${cards.map(([name, source, owner, risk]) => `
          <article class="action-item">
            <strong>${name}</strong>
            <p>${source}</p>
            <div><span>${owner}</span><b>${risk}</b></div>
          </article>
        `).join("")}
      </section>
    `)
    .join("");
}

function renderAuditTrail() {
  const list = document.querySelector("#audit-list");
  if (!list) return;
  list.innerHTML = auditEvents
    .map(([time, body, label]) => `<div><span>${time}</span><p>${body}</p><b>${label}</b></div>`)
    .join("");
}

function showScreen(screenKey) {
  document.querySelectorAll("[data-screen-panel]").forEach((panel) => {
    panel.classList.toggle("is-active", panel.dataset.screenPanel === screenKey);
  });
  document.querySelectorAll("[data-screen]").forEach((button) => {
    button.classList.toggle("is-active", button.dataset.screen === screenKey);
  });
  setText("#screen-title", screenTitles[screenKey] || screenTitles.overview);
}

document.querySelectorAll("[data-screen]").forEach((button) => {
  button.addEventListener("click", () => showScreen(button.dataset.screen));
});

document.querySelectorAll("[data-demo-jump]").forEach((button) => {
  button.addEventListener("click", () => {
    const [screen, role] = button.dataset.demoJump.split(":");
    if (role && roles[role]) renderRole(role);
    showScreen(screen);
    window.location.hash = screen;
  });
});

document.querySelectorAll("[data-role]").forEach((button) => {
  button.addEventListener("click", () => renderRole(button.dataset.role));
});

document.querySelector("#employee-network").addEventListener("click", (event) => {
  const node = event.target.closest("[data-agent-id]");
  if (node) selectAgent(node.dataset.agentId);
});

document.querySelector("#employee-network").addEventListener("keydown", (event) => {
  if (event.key !== "Enter" && event.key !== " ") return;
  const node = event.target.closest("[data-agent-id]");
  if (!node) return;
  event.preventDefault();
  selectAgent(node.dataset.agentId);
});

document.querySelector("[data-run-demo]").addEventListener("click", () => {
  const status = document.querySelector("#sync-status");
  status.textContent = "Syncing...";
  window.setTimeout(() => {
    status.textContent = "Synced now";
    showScreen("dashboard");
    renderRole("cto");
  }, 450);
});

const initialRole = new URLSearchParams(window.location.search).get("role");
renderRole(roles[initialRole] ? initialRole : "ceo");
renderActionBoard();
renderAuditTrail();

window.addEventListener("hashchange", () => {
  const hashScreen = window.location.hash.replace("#", "");
  if (screenTitles[hashScreen]) showScreen(hashScreen);
});

const initialScreen = window.location.hash.replace("#", "");
if (screenTitles[initialScreen]) showScreen(initialScreen);
