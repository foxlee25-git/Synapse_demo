const viewTitles = {
  command: ["Live Operating Layer", "Command Center"],
  graph: ["Company State Graph", "Work Graph"],
  agents: ["Agent Coordination", "Agent Registry"],
  automation: ["Workflow Orchestration", "Automation Queue"],
  integrations: ["SaaS Control Layer", "Integrations"],
  memory: ["Enterprise Context", "Enterprise Memory"],
  governance: ["Policy & Audit", "Governance"],
};

const roleData = {
  ceo: {
    title: "CEO View",
    copy: "公司级风险、战略优先级、资源压力和待决策事项。",
    kpis: [["Revenue exposure", "$12.4M"], ["Open risks", "18"], ["Decisions", "7"], ["Health", "99.94%"]],
    priorities: [["AI Agent Platform", 78], ["International Expansion", 45], ["Enterprise Motion", 62], ["Operational Excellence", 85]],
  },
  cto: {
    title: "CTO View",
    copy: "工程健康、部署质量、系统风险和跨团队依赖。",
    kpis: [["Deployments", "24"], ["Change failure", "2.1%"], ["MTTR", "38m"], ["Infra risks", "3"]],
    priorities: [["Agent Platform Core", 81], ["Workflow Orchestrator", 42], ["Context Graph Service", 67], ["Integrations Framework", 73]],
  },
  pm: {
    title: "PM View",
    copy: "里程碑、延期任务、依赖关系和发布信心。",
    kpis: [["Milestones", "6"], ["Blocked deps", "4"], ["Overdue", "5"], ["Confidence", "72%"]],
    priorities: [["v2.0 QA Launch", 72], ["Enterprise SSO", 85], ["Marketplace v1", 40], ["Mobile Beta", 25]],
  },
  employee: {
    title: "Employee View",
    copy: "个人优先级、等待自己的事项、直接依赖和下一步。",
    kpis: [["My tasks", "6"], ["Waiting on me", "3"], ["High priority", "2"], ["Agents active", "12"]],
    priorities: [["Review PR #4821", 92], ["Fix workflow timeout", 68], ["Write integration tests", 55], ["Prepare release notes", 30]],
  },
};

const roleToNetwork = {
  ceo: "ceo",
  cto: "dev",
  pm: "pm",
  employee: "dev",
};

const networkLensData = {
  dev: {
    title: "Developer network",
    copy: "Only engineering-adjacent people, systems, blockers and next actions are visible.",
  },
  pm: {
    title: "PM network",
    copy: "Shows launch owners, delivery dependencies, customer impact and routed next actions.",
  },
  sales: {
    title: "Sales network",
    copy: "Shows account risk, PM dependencies, support signals and approved customer follow-up paths.",
  },
  ops: {
    title: "Ops network",
    copy: "Shows SOP owners, support drift, operational actions and the shared launch state.",
  },
  ceo: {
    title: "Executive network",
    copy: "Shows company-level risks, revenue impact, operating hot spots and decision-ready actions.",
  },
};

const risks = [
  "Enterprise deal slippage detected from CRM and sales notes",
  "Billing API blocks marketplace launch path",
  "Security compliance gap impacts EU expansion",
];

const decisions = [
  "Approve EU data residency plan",
  "Allocate AI infra budget for Q3",
  "Confirm enterprise pricing exception",
];

const agents = [
  ["Dev Agent", "Engineering", "Reads GitHub, Linear and incidents to expose blockers and deployment risk.", ["GitHub", "Linear", "Incidents"]],
  ["PM Agent", "Delivery", "Combines specs, roadmap, docs and tasks into milestone health.", ["Jira", "Docs", "Roadmap"]],
  ["Sales Agent", "Revenue", "Reads CRM, email notes and call summaries to surface deal risk.", ["CRM", "Email", "Calls"]],
  ["Ops Agent", "Operations", "Maintains SOP updates, vendor actions and internal operating routines.", ["SOP", "Vendors", "Finance"]],
  ["Support Agent", "Customer", "Finds customer issues, FAQ drift and escalation patterns.", ["Tickets", "FAQ", "Docs"]],
  ["Exec Agent", "Leadership", "Turns cross-company state into decisions, priorities and review packets.", ["Board", "Metrics", "Approvals"]],
];

const integrations = [
  ["Slack", "Connected", "Send notifications, unblock messages and owner pings."],
  ["Linear / Jira", "Connected", "Create issues, update status and sync dependency state."],
  ["GitHub", "Connected", "Read PR status, review queues and deployment activity."],
  ["Notion / Docs", "Connected", "Read specs, update docs and store approved context."],
  ["CRM", "Connected", "Update account state, risks and follow-up tasks."],
  ["Email", "Ready", "Draft responses and queue client-facing sends for approval."],
  ["Calendar", "Ready", "Read meetings and convert commitments into work state."],
  ["Internal Systems", "Planned", "Connect finance, HRIS, data warehouse and audit systems."],
];

const queueColumns = [
  ["Suggested", [["Create billing API owner task", "Detected from launch dependency map."], ["Draft Acme follow-up", "Sales Agent found late-stage deal risk."]]],
  ["Needs Review", [["Approve EU data plan", "High-trust compliance action."], ["Publish FAQ patch", "Support Agent detected pricing drift."]]],
  ["Running", [["Notify PM about launch risk", "Slack message prepared and routed."], ["Update CRM risk field", "Waiting for Sales Ops policy check."]]],
  ["Completed", [["Weekly status packet", "Shared with leadership view."], ["Engineering incident summary", "Stored in Enterprise Memory."]]],
];

const memories = [
  ["Approved pricing exception playbook", "Used by Sales Agent when late-stage enterprise accounts request non-standard terms."],
  ["Launch blocker escalation path", "PM and Dev Agents should notify platform owner when dependency risk exceeds 48 hours."],
  ["EU residency decision record", "Leadership approved a separate data residency workstream for EU expansion."],
  ["Support FAQ update history", "Pricing-related support answers require approval before publication."],
];

function setText(selector, text) {
  const element = document.querySelector(selector);
  if (element) element.textContent = text;
}

function isVisibleToRole(element, roleKey) {
  const visibleTo = (element.dataset.visibleTo || "")
    .split(/\s+/)
    .map((item) => item.trim())
    .filter(Boolean);
  return visibleTo.includes(roleKey) || visibleTo.includes("all");
}

function applyNetworkRole(roleKey) {
  const lens = networkLensData[roleKey] || networkLensData.dev;
  setText("#network-lens-title", lens.title);
  setText("#network-lens-copy", lens.copy);

  document.querySelectorAll("[data-network-role]").forEach((button) => {
    button.classList.toggle("is-active", button.dataset.networkRole === roleKey);
  });

  document.querySelectorAll("[data-network-node], [data-network-line]").forEach((element) => {
    element.classList.toggle("network-hidden", !isVisibleToRole(element, roleKey));
  });
}

function renderRole(roleKey) {
  const role = roleData[roleKey] || roleData.ceo;
  setText("#role-title", role.title);
  setText("#role-copy", role.copy);
  document.querySelector("#role-kpis").innerHTML = role.kpis
    .map(([label, value]) => `<div><span>${label}</span><strong>${value}</strong></div>`)
    .join("");
  document.querySelector("#role-priorities").innerHTML = role.priorities
    .map(([label, value]) => `<div><b>${label}</b><span>${value}%</span><i style="--w:${value}%"></i></div>`)
    .join("");
  document.querySelectorAll("[data-role]").forEach((button) => {
    button.classList.toggle("is-active", button.dataset.role === roleKey);
  });
  applyNetworkRole(roleToNetwork[roleKey] || "ceo");
}

function renderStaticLists() {
  document.querySelector("#risk-feed").innerHTML = risks.map((item) => `<li>${item}</li>`).join("");
  document.querySelector("#decision-feed").innerHTML = decisions.map((item) => `<li>${item}</li>`).join("");
  document.querySelector("#agent-grid").innerHTML = agents
    .map(([name, group, body, tags]) => `
      <article class="agent-card">
        <header><h3>${name}</h3><span class="badge">${group}</span></header>
        <p>${body}</p>
        <div class="tag-row">${tags.map((tag) => `<span>${tag}</span>`).join("")}</div>
      </article>
    `)
    .join("");
  document.querySelector("#integration-grid").innerHTML = integrations
    .map(([name, status, body]) => `
      <article class="integration-card">
        <header><h3>${name}</h3><span class="badge">${status}</span></header>
        <p>${body}</p>
      </article>
    `)
    .join("");
  document.querySelector("#queue-board").innerHTML = queueColumns
    .map(([title, cards]) => `
      <section class="queue-column">
        <h3>${title}</h3>
        ${cards.map(([cardTitle, body]) => `<article class="queue-card"><strong>${cardTitle}</strong><p>${body}</p><button data-queue-action>Route action</button></article>`).join("")}
      </section>
    `)
    .join("");
  document.querySelector("#memory-list").innerHTML = memories
    .map(([title, body]) => `<article class="memory-item"><h3>${title}</h3><p>${body}</p></article>`)
    .join("");
}

function showView(viewKey) {
  document.querySelectorAll("[data-view-panel]").forEach((panel) => {
    panel.classList.toggle("is-active", panel.dataset.viewPanel === viewKey);
  });
  document.querySelectorAll("[data-view]").forEach((button) => {
    button.classList.toggle("is-active", button.dataset.view === viewKey);
  });
  const [eyebrow, title] = viewTitles[viewKey] || viewTitles.command;
  setText("#view-eyebrow", eyebrow);
  setText("#view-title", title);
}

document.querySelectorAll("[data-view]").forEach((button) => {
  button.addEventListener("click", () => showView(button.dataset.view));
});

document.querySelectorAll("[data-role]").forEach((button) => {
  button.addEventListener("click", () => renderRole(button.dataset.role));
});

document.querySelectorAll("[data-network-role]").forEach((button) => {
  button.addEventListener("click", () => applyNetworkRole(button.dataset.networkRole));
});

document.querySelector("[data-simulate-sync]").addEventListener("click", () => {
  setText("#rail-state", "Syncing");
  setText("#rail-sync", "now");
  setText("#metric-risks", "21");
  setText("#metric-actions", "47");
  window.setTimeout(() => {
    setText("#rail-state", "Attention");
    showView("automation");
  }, 450);
});

document.querySelector("[data-open-action]").addEventListener("click", () => {
  showView("automation");
});

window.addEventListener("hashchange", () => {
  const hashView = window.location.hash.replace("#", "");
  if (viewTitles[hashView]) showView(hashView);
});

document.addEventListener("click", (event) => {
  if (event.target.matches("[data-queue-action]")) {
    event.target.textContent = "Routed";
    event.target.disabled = true;
    setText("#rail-state", "Action routed");
  }
});

renderStaticLists();
renderRole("ceo");

const initialLens = new URLSearchParams(window.location.search).get("lens");
if (networkLensData[initialLens]) applyNetworkRole(initialLens);

const initialView = window.location.hash.replace("#", "");
if (viewTitles[initialView]) showView(initialView);
