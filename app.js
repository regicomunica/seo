const form = document.querySelector("#audit-form");
const siteUrlInput = document.querySelector("#site-url");
const feedback = document.querySelector("#form-feedback");
const dashboard = document.querySelector("#dashboard");
const auditedDomain = document.querySelector("#audited-domain");
const overallScore = document.querySelector("#overall-score");
const metricsGrid = document.querySelector("#metrics-grid");
const recommendationsNode = document.querySelector("#recommendations");
const priorityFilters = document.querySelector("#priority-filters");
const aiSearchesNode = document.querySelector("#ai-searches");

const reportTemplate = {
  metrics: [
    { label: "Técnico", score: 74 },
    { label: "Conteúdo", score: 63 },
    { label: "Autoridade", score: 58 },
    { label: "Performance", score: 81 },
  ],
  recommendations: [
    {
      title: "Corrigir Core Web Vitals em páginas de produto",
      category: "Técnico",
      priority: "critical",
      summary: "Reduza LCP para menos de 2,5s com compressão de imagens e cache.",
    },
    {
      title: "Criar cluster semântico para termos transacionais",
      category: "Conteúdo",
      priority: "high",
      summary: "Mapeie intenção de busca e publique 5 páginas de apoio conectadas.",
    },
    {
      title: "Aumentar citações e backlinks de domínio relevante",
      category: "Autoridade",
      priority: "high",
      summary: "Conquiste links em portais do nicho com DR acima de 40.",
    },
    {
      title: "Adicionar FAQ estruturado em páginas estratégicas",
      category: "Conteúdo",
      priority: "medium",
      summary: "Aumenta chance de aparecer em respostas gerativas e snippets.",
    },
  ],
  aiSearches: [
    {
      engine: "ChatGPT Search",
      visibility: "Média",
      note: "Marca citada, porém sem profundidade de páginas internas.",
    },
    {
      engine: "Perplexity",
      visibility: "Baixa",
      note: "Poucas fontes confiáveis apontando para seu domínio.",
    },
    {
      engine: "Gemini",
      visibility: "Média",
      note: "Boa cobertura de conteúdo institucional, faltam casos práticos.",
    },
  ],
};

let activePriority = "all";

function parseDomain(input) {
  try {
    const url = new URL(input);
    return url.hostname.replace("www.", "");
  } catch {
    return null;
  }
}

function computeScore(metrics) {
  const total = metrics.reduce((sum, metric) => sum + metric.score, 0);
  return Math.round(total / metrics.length);
}

function createMetricCard(metric) {
  return `<article class="metric">
      <p>${metric.label}</p>
      <strong>${metric.score}/100</strong>
      <div class="progress-track"><div class="progress-fill" style="width:${metric.score}%"></div></div>
    </article>`;
}

function renderRecommendations(list) {
  const filtered = activePriority === "all"
    ? list
    : list.filter((item) => item.priority === activePriority);

  if (!filtered.length) {
    recommendationsNode.innerHTML = "<p>Nenhuma recomendação para o filtro selecionado.</p>";
    return;
  }

  recommendationsNode.innerHTML = filtered
    .map(
      (item) => `<article class="rec">
        <div class="tags">
          <span class="tag ${item.priority}">${item.priority.toUpperCase()}</span>
          <span class="tag">${item.category}</span>
        </div>
        <h4>${item.title}</h4>
        <p>${item.summary}</p>
      </article>`
    )
    .join("");
}

function renderPriorityFilters() {
  const priorities = ["all", "critical", "high", "medium"];
  priorityFilters.innerHTML = priorities
    .map(
      (priority) => `<button type="button" class="${priority === activePriority ? "active" : ""}" data-priority="${priority}">
        ${priority === "all" ? "Todas" : priority.toUpperCase()}
      </button>`
    )
    .join("");

  priorityFilters.querySelectorAll("button").forEach((button) => {
    button.addEventListener("click", () => {
      activePriority = button.dataset.priority;
      renderPriorityFilters();
      renderRecommendations(reportTemplate.recommendations);
    });
  });
}

function renderAISearches(aiSearches) {
  aiSearchesNode.innerHTML = aiSearches
    .map(
      (item) => `<article class="ai-card">
        <strong>${item.engine}</strong>
        <p><b>Visibilidade:</b> ${item.visibility}</p>
        <p>${item.note}</p>
      </article>`
    )
    .join("");
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const domain = parseDomain(siteUrlInput.value.trim());

  if (!domain) {
    feedback.textContent = "Insira uma URL válida (ex: https://seusite.com).";
    dashboard.classList.add("hidden");
    return;
  }

  feedback.textContent = "";
  auditedDomain.textContent = domain;
  metricsGrid.innerHTML = reportTemplate.metrics.map(createMetricCard).join("");
  overallScore.textContent = computeScore(reportTemplate.metrics);
  activePriority = "all";
  renderPriorityFilters();
  renderRecommendations(reportTemplate.recommendations);
  renderAISearches(reportTemplate.aiSearches);
  dashboard.classList.remove("hidden");
});
