const scenarios = {
  base: {
    score: "2-0 / 3-0",
    confidence: "置信度：高",
    probs: [74, 17, 9],
    scriptTitle: "西班牙 2-0 / 3-0",
    scriptText:
      "基础盘下，西班牙更可能通过持续压迫和中场控球逐步建立优势。若上半场取得领先，比赛会快速向大比分方向移动。"
  },
  earlyGoal: {
    score: "3-0 / 4-0",
    confidence: "置信度：高",
    probs: [82, 12, 6],
    scriptTitle: "早进球后压制扩大",
    scriptText:
      "一旦西班牙先破门，佛得角被迫前压，边路和肋部空间会被放大。替补爆点登场后，比赛更容易进入连续冲击。"
  },
  lowBlock: {
    score: "1-0 / 2-0",
    confidence: "置信度：中",
    probs: [65, 24, 11],
    scriptTitle: "久攻不下时比分收窄",
    scriptText:
      "如果佛得角能把0-0守到半场，西班牙的胜面仍在，但比赛会更依赖定位球、远射和替补边锋的一对一。"
  },
  rotation: {
    score: "2-1 / 2-0",
    confidence: "置信度：中",
    probs: [68, 21, 11],
    scriptTitle: "轮换让控制力略降",
    scriptText:
      "若西班牙为后续对阵沙特和乌拉圭控制主力时间，前场默契和压迫强度会下降，佛得角获得反击窗口的概率上升。"
  }
};

const flowSteps = {
  intel: {
    kicker: "Step 1",
    title: "赛前情报",
    text:
      "西班牙以欧洲冠军底盘进入小组赛，阵容厚度和控球体系明显占优。赛前消息显示亚马尔和尼科-威廉姆斯更可能替补登场，西班牙开局仍会依赖中场控制与费兰一侧的穿插。",
    list: [
      "比赛：2026-06-15，世界杯H组，亚特兰大",
      "西班牙：无重大伤病消息，部分边路爆点控制出场时间",
      "佛得角：世界杯首秀，更可能先稳住阵型"
    ]
  },
  tactics: {
    kicker: "Step 2",
    title: "战术对位",
    text:
      "西班牙的4-3-3会把比赛压到佛得角半场，用中场三角和边后卫压上制造人数优势。佛得角的4-2-3-1重点在保护禁区前沿，抢到球后第一时间找中锋或边路纵深。",
    list: [
      "西班牙优势：控球、反抢、肋部渗透",
      "佛得角机会：边路身后、定位球、二点球",
      "核心区域：西班牙右肋与佛得角防线身后"
    ]
  },
  swing: {
    kicker: "Step 3",
    title: "胜负手",
    text:
      "最大胜负手是西班牙能否早破密防。若佩德里和罗德里能稳定把球送入两线之间，佛得角会被迫收缩，禁区前沿的二次进攻会持续累积压力。",
    list: [
      "西班牙早进球：比赛进入大比分脚本",
      "佛得角守住前45分钟：平局概率明显抬升",
      "替补爆点：亚马尔和尼科可能改变后半段节奏"
    ]
  },
  risk: {
    kicker: "Step 4",
    title: "爆冷风险",
    text:
      "爆冷风险不高，但并非没有。小组赛首战常见节奏偏谨慎，若西班牙效率低、佛得角门将状态好，再叠加定位球，比赛会进入更黏的状态。",
    list: [
      "风险等级：低到中低",
      "触发因素：久攻不下、定位球丢球、轮换偏多",
      "保守判断：西班牙不败概率显著高于取胜概率"
    ]
  }
};

const scoreline = document.querySelector("#scoreline");
const confidence = document.querySelector("#confidence");
const spainProb = document.querySelector("#spainProb");
const drawProb = document.querySelector("#drawProb");
const capeProb = document.querySelector("#capeProb");
const scriptTitle = document.querySelector("#scriptTitle");
const scriptText = document.querySelector("#scriptText");
const probRows = [...document.querySelectorAll(".prob-row")];

function setScenario(key) {
  const scenario = scenarios[key];
  scoreline.textContent = scenario.score;
  confidence.textContent = scenario.confidence;
  spainProb.textContent = `${scenario.probs[0]}%`;
  drawProb.textContent = `${scenario.probs[1]}%`;
  capeProb.textContent = `${scenario.probs[2]}%`;
  scriptTitle.textContent = scenario.scriptTitle;
  scriptText.textContent = scenario.scriptText;
  probRows.forEach((row, index) => row.style.setProperty("--value", scenario.probs[index]));
}

document.querySelectorAll(".scenario-btn").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".scenario-btn").forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    setScenario(button.dataset.scenario);
  });
});

const flowKicker = document.querySelector("#flowKicker");
const flowTitle = document.querySelector("#flowTitle");
const flowText = document.querySelector("#flowText");
const flowList = document.querySelector("#flowList");

function setFlowStep(key) {
  const step = flowSteps[key];
  flowKicker.textContent = step.kicker;
  flowTitle.textContent = step.title;
  flowText.textContent = step.text;
  flowList.innerHTML = step.list.map((item) => `<li>${item}</li>`).join("");
}

document.querySelectorAll(".flow-tab").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".flow-tab").forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    setFlowStep(button.dataset.step);
  });
});
