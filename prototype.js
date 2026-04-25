const roleData = {
  ceo: {
    eyebrow: "CEO View",
    title: "Role-based Global Dashboard",
    copy: "不同岗位看到不同全局信息，但共享同一个公司状态网络。",
    kpis: [
      ["Revenue exposure", "12.4M"],
      ["Open risks", "18"],
      ["Decisions needed", "7"],
      ["System health", "99.94%"],
    ],
    primaryTitle: "Strategic priorities",
    priorities: [
      ["AI Agent Platform", "78"],
      ["International expansion", "45"],
      ["Enterprise motion", "62"],
      ["Operational excellence", "85"],
    ],
    signals: ["Enterprise deal slippage", "Security compliance gaps", "Cloud cost overrun"],
    decisions: ["Approve EU data residency", "Budget for AI infra expansion", "Q3 enterprise pricing strategy"],
    activity: [
      ["09:42", "PM Agent synced launch blocker from Linear."],
      ["09:44", "Sales Agent flagged deal risk from CRM."],
      ["09:47", "Synapse created owner decision packet."],
    ],
  },
  cto: {
    eyebrow: "CTO View",
    title: "Engineering Operating View",
    copy: "工程视角聚焦系统健康、部署、阻塞、事故与跨团队依赖。",
    kpis: [
      ["Deployments", "24"],
      ["Change failure rate", "2.1%"],
      ["MTTR", "38m"],
      ["Infra risk", "3"],
    ],
    primaryTitle: "Engineering progress",
    priorities: [
      ["Agent platform core", "81"],
      ["Workflow orchestrator", "42"],
      ["Context graph service", "67"],
      ["Integrations framework", "73"],
    ],
    signals: ["API rate limit with Slack", "Auth service flakiness", "Infra quota increase"],
    decisions: ["Approve staging freeze", "Escalate workflow timeout", "Review GitHub writeback policy"],
    activity: [
      ["10:02", "Dev Agent reported failing workflow timeout."],
      ["10:05", "Synapse correlated blocker with Slack rate limit."],
      ["10:07", "CTO decision packet queued for infra approval."],
    ],
  },
  pm: {
    eyebrow: "PM View",
    title: "Program Delivery View",
    copy: "PM 视角聚焦里程碑、依赖、延期任务与团队对齐状态。",
    kpis: [
      ["Milestones", "6"],
      ["Blocked deps", "4"],
      ["Overdue tasks", "5"],
      ["Launch confidence", "72%"],
    ],
    primaryTitle: "Launch milestones",
    priorities: [
      ["v2.0 QA launch", "72"],
      ["Enterprise SSO", "85"],
      ["Marketplace v1", "40"],
      ["Mobile beta", "25"],
    ],
    signals: ["Billing API waiting on platform", "Docs draft missing owner", "QA signoff delayed"],
    decisions: ["Move marketplace date", "Assign billing API owner", "Escalate QA coverage gap"],
    activity: [
      ["11:18", "PM Agent merged Jira, Docs, and GitHub state."],
      ["11:22", "Synapse detected two launch path blockers."],
      ["11:26", "Task handoff sent to Engineering and Docs owners."],
    ],
  },
  employee: {
    eyebrow: "Employee View",
    title: "My Work Coordination View",
    copy: "员工只看到自己的优先级、等待自己的人、依赖与下一步。",
    kpis: [
      ["My tasks", "6"],
      ["Waiting on me", "3"],
      ["High priority", "2"],
      ["Agents active", "12"],
    ],
    primaryTitle: "Today priorities",
    priorities: [
      ["Review PR #4821", "92"],
      ["Fix workflow timeout", "68"],
      ["Write integration tests", "55"],
      ["Prepare release note", "30"],
    ],
    signals: ["Mina waiting for PR review", "Alex needs API spec update", "Sara waiting for feedback"],
    decisions: ["Review code handoff", "Confirm API deadline", "Prepare launch note"],
    activity: [
      ["12:08", "My Agent summarized tasks across Slack and Linear."],
      ["12:11", "Synapse ranked today's priority list."],
      ["12:13", "Two cross-team dependencies surfaced."],
    ],
  },
};

const roleButtons = document.querySelectorAll("[data-role]");

function setText(id, value) {
  const element = document.getElementById(id);
  if (element) element.textContent = value;
}

function renderRole(roleKey) {
  const role = roleData[roleKey] || roleData.ceo;
  setText("role-eyebrow", role.eyebrow);
  setText("role-title", role.title);
  setText("role-copy", role.copy);
  setText("primary-panel-title", role.primaryTitle);

  role.kpis.forEach(([label, value], index) => {
    const number = index + 1;
    const ids = ["one", "two", "three", "four"];
    setText(`kpi-${ids[index]}-label`, label);
    setText(`kpi-${ids[index]}`, value);
  });

  document.getElementById("priority-list").innerHTML = role.priorities
    .map(
      ([label, value]) =>
        `<div><b>${label}</b><span>${value}%</span><i style="--w:${value}%"></i></div>`
    )
    .join("");

  const dotTypes = ["red", "amber", "blue"];
  document.getElementById("signal-list").innerHTML = role.signals
    .map((item, index) => `<li><span class="dot ${dotTypes[index] || "blue"}"></span>${item}</li>`)
    .join("");

  document.getElementById("decision-list").innerHTML = role.decisions
    .map((item) => `<li>${item}</li>`)
    .join("");

  document.getElementById("activity-stream").innerHTML = role.activity
    .map(([time, body]) => `<div><span>${time}</span><p>${body}</p></div>`)
    .join("");

  roleButtons.forEach((button) => {
    button.classList.toggle("is-active", button.dataset.role === roleKey);
  });
}

roleButtons.forEach((button) => {
  button.addEventListener("click", () => renderRole(button.dataset.role));
});
