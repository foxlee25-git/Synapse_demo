const boardEvents = [
  {
    title: "Mia updated Acme deal risk",
    meta: "Sales Agent -> CRM -> CEO View",
    event: "Acme renewal risk turned green after owner reply",
  },
  {
    title: "Kai resolved workflow timeout",
    meta: "Dev Agent -> GitHub -> CTO View",
    event: "Workflow timeout fix linked to PR #4821",
  },
  {
    title: "Zoe routed pricing approval",
    meta: "RevOps Agent -> Approval Queue -> Sales",
    event: "Enterprise discount exception queued for approval",
  },
  {
    title: "Ray confirmed budget guardrail",
    meta: "Finance Agent -> Governance -> Audit Log",
    event: "AI infra spend guardrail updated for Q3",
  },
  {
    title: "Ava synced launch dependency",
    meta: "PM Agent -> Linear -> Work Graph",
    event: "Marketplace launch dependency connected to Billing API",
  },
];

const networkNodes = Array.from(document.querySelectorAll("[data-agent-node]"));
const statusTitle = document.querySelector("#network-status-title");
const statusMeta = document.querySelector("#network-status-meta");
const eventList = document.querySelector("#network-event-list");
let eventIndex = 0;

function pulseNetworkEvent() {
  if (!networkNodes.length || !statusTitle || !statusMeta || !eventList) return;
  networkNodes.forEach((node) => node.classList.remove("just-updated"));
  const node = networkNodes[(eventIndex * 3 + 2) % networkNodes.length];
  const item = boardEvents[eventIndex % boardEvents.length];
  node.classList.add("just-updated");
  statusTitle.textContent = item.title;
  statusMeta.textContent = item.meta;
  const now = new Date();
  const time = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;
  eventList.insertAdjacentHTML("afterbegin", `<li><b>${time}</b> ${item.event}</li>`);
  while (eventList.children.length > 4) {
    eventList.lastElementChild.remove();
  }
  eventIndex += 1;
}

networkNodes.forEach((node, index) => {
  node.addEventListener("click", () => {
    networkNodes.forEach((item) => item.classList.remove("just-updated"));
    node.classList.add("just-updated");
    statusTitle.textContent = `${node.childNodes[0].textContent.trim()} Agent status updated`;
    statusMeta.textContent = `Employee Agent ${index + 1} -> Synapse Context Graph`;
  });
});

setInterval(pulseNetworkEvent, 2600);
