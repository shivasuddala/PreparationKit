import React, { useState, useEffect, useRef, useCallback } from 'react';
import { technologies, searchConcepts, getStats } from './data';
import './App.css';

// ─── PDF Generation (light-themed HTML) ───────────────
function generatePDFHTML(title, sections) {
  const styles = `
    <style>
      * { margin:0; padding:0; box-sizing:border-box; }
      body { font-family: 'Segoe UI', Arial, sans-serif; color: #1a1a2e; line-height:1.6; padding:20px; }
      .pdf-title { font-size:24px; font-weight:800; color:#4338ca; margin-bottom:6px; border-bottom:3px solid #4338ca; padding-bottom:8px; }
      .pdf-subtitle { font-size:13px; color:#6b7280; margin-bottom:20px; }
      .concept-block { margin-bottom:18px; border:1px solid #e5e7eb; border-radius:8px; padding:14px; page-break-inside:avoid; }
      .concept-num { display:inline-block; width:24px; height:24px; background:#4338ca; color:#fff; border-radius:50%; text-align:center; line-height:24px; font-size:12px; font-weight:700; margin-right:8px; }
      .concept-title { font-size:16px; font-weight:700; color:#1e1b4b; display:inline; }
      .level-badge { display:inline-block; padding:1px 8px; border-radius:10px; font-size:10px; font-weight:600; text-transform:uppercase; margin-left:8px; }
      .level-fresher { background:#dcfce7; color:#166534; }
      .level-junior { background:#dbeafe; color:#1e40af; }
      .level-mid { background:#fef3c7; color:#92400e; }
      .level-senior { background:#fee2e2; color:#991b1b; }
      .short-desc { background:#f0f0ff; border-left:3px solid #4338ca; padding:8px 12px; margin:8px 0; font-size:13px; color:#374151; border-radius:0 6px 6px 0; }
      .section-label { font-size:11px; font-weight:700; color:#4338ca; text-transform:uppercase; letter-spacing:1px; margin:10px 0 4px; }
      .key-point { font-size:12px; color:#374151; padding:2px 0 2px 16px; position:relative; }
      .key-point::before { content:'▸'; position:absolute; left:2px; color:#4338ca; }
      .detailed-text { font-size:12.5px; color:#4b5563; margin-top:6px; }
      .detailed-text p { margin-bottom:4px; }
      .detailed-text strong { color:#1e1b4b; }
      .code-box { background:#f8f9fa; border:1px solid #d1d5db; border-radius:6px; padding:10px; font-family:'Cascadia Code',Consolas,monospace; font-size:11px; color:#1f2937; overflow-x:auto; white-space:pre; margin:6px 0; line-height:1.5; }
      .topic-divider { border:none; border-top:2px solid #e5e7eb; margin:24px 0 16px; }
      .topic-heading { font-size:20px; font-weight:700; color:#4338ca; margin-bottom:12px; }
      h4 { font-size:13px; font-weight:700; color:#1e1b4b; margin:8px 0 3px; }
      li { font-size:12px; padding-left:14px; position:relative; margin-bottom:2px; }
      li::before { content:'•'; position:absolute; left:0; color:#4338ca; }
      .page-header { text-align:center; margin-bottom:30px; }
      .page-header h1 { font-size:28px; color:#4338ca; }
      .page-header p { color:#6b7280; font-size:14px; }
    </style>`;
  const body = sections.map(s => s).join('');
  return `<html><head>${styles}</head><body>${body}</body></html>`;
}

function renderConceptForPDF(concept, idx, mode) {
  let content = '';
  if (mode === 'detailed') {
    const detailedHTML = (concept.detailed || '').split('\n').map(line => {
      if (line.startsWith('**') && line.endsWith('**')) return `<h4>${line.replace(/\*\*/g, '')}</h4>`;
      if (line.includes('**')) return `<p>${line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')}</p>`;
      if (line.startsWith('• ') || line.startsWith('- ')) return `<li>${line.substring(2)}</li>`;
      if (line.startsWith('|')) return `<p style="font-family:monospace;font-size:11px;color:#6b7280;">${line}</p>`;
      if (line.includes('`')) return `<p>${line.replace(/`([^`]+)`/g, '<code style="background:#e8e8f8;padding:1px 4px;border-radius:3px;font-size:11px;">$1</code>')}</p>`;
      if (!line.trim()) return '<br/>';
      return `<p>${line}</p>`;
    }).join('');

    const examplesHTML = (concept.examples || []).map((ex, i) => `
      <div style="margin-top:8px;">
        <div style="font-size:11px;font-weight:600;color:#166534;margin-bottom:4px;">💻 ${ex.title}</div>
        <div class="code-box">${ex.code.replace(/</g,'&lt;').replace(/>/g,'&gt;')}</div>
        ${ex.explanation ? `<div style="font-size:11px;color:#6b7280;font-style:italic;margin-top:4px;">💡 ${ex.explanation}</div>` : ''}
      </div>`).join('');

    content = `
      <div class="short-desc">${concept.shortDesc}</div>
      <div class="detailed-text">${detailedHTML}</div>
      ${examplesHTML ? `<div class="section-label">Examples</div>${examplesHTML}` : ''}`;
  } else {
    content = `
      <div class="short-desc">${concept.shortDesc}</div>
      <div class="section-label">Key Points</div>
      ${concept.keyPoints.map(kp => `<div class="key-point">${kp}</div>`).join('')}`;
  }

  return `<div class="concept-block">
    <span class="concept-num">${idx + 1}</span>
    <span class="concept-title">${concept.title}</span>
    <span class="level-badge level-${concept.level}">${concept.level}</span>
    ${content}
  </div>`;
}

function doExportPDF(html, filename) {
  import('html2pdf.js').then(({ default: html2pdf }) => {
    const container = document.createElement('div');
    container.style.position = 'fixed';
    container.style.left = '-9999px';
    container.style.top = '0';
    container.style.width = '210mm';
    container.style.background = 'white';
    container.innerHTML = html;
    document.body.appendChild(container);

    html2pdf().set({
      margin: [8, 8, 8, 8],
      filename: `${filename}.pdf`,
      image: { type: 'jpeg', quality: 0.95 },
      html2canvas: { scale: 2, useCORS: true, backgroundColor: '#ffffff' },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
      pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
    }).from(container).save().then(() => {
      document.body.removeChild(container);
    });
  });
}

function exportTopicPDF(tech, topic, mode) {
  const sections = [`
    <div class="pdf-title">${tech.icon} ${tech.name} — ${topic.name}</div>
    <div class="pdf-subtitle">${mode === 'detailed' ? '📖 Detailed Study Guide' : '⚡ Last Minute Preparation Guide'} • ${topic.concepts.length} concepts</div>
    ${topic.concepts.map((c, i) => renderConceptForPDF(c, i, mode)).join('')}
  `];
  const html = generatePDFHTML(`${tech.name} - ${topic.name}`, sections);
  doExportPDF(html, `${tech.name}-${topic.name}-${mode}`);
}

function exportConsolidatedPDF(tech, mode) {
  const sections = tech.topics.map((topic, tIdx) => `
    ${tIdx > 0 ? '<hr class="topic-divider"/>' : ''}
    <div class="topic-heading">${topic.icon} ${topic.name}</div>
    ${topic.concepts.map((c, i) => renderConceptForPDF(c, i, mode)).join('')}
  `);
  const header = `<div class="page-header">
    <h1>${tech.icon} ${tech.name}</h1>
    <p>${mode === 'detailed' ? '📖 Complete Detailed Study Guide' : '⚡ Complete Last Minute Preparation Guide'}</p>
    <p style="font-size:12px;color:#9ca3af;margin-top:4px;">${tech.topics.length} Topics • ${tech.topics.reduce((s,t)=>s+t.concepts.length,0)} Concepts</p>
  </div>`;
  const html = generatePDFHTML(`${tech.name} Complete`, [header, ...sections]);
  doExportPDF(html, `${tech.name}-Complete-${mode}`);
}

function exportAllPDF(mode) {
  const allSections = technologies.map((tech, techIdx) => {
    const topicSections = tech.topics.map((topic, tIdx) => `
      ${tIdx > 0 ? '<hr class="topic-divider"/>' : ''}
      <div class="topic-heading">${topic.icon} ${topic.name}</div>
      ${topic.concepts.map((c, i) => renderConceptForPDF(c, i, mode)).join('')}
    `).join('');
    return `${techIdx > 0 ? '<div style="page-break-before:always;"></div>' : ''}
      <div class="page-header"><h1>${tech.icon} ${tech.name}</h1></div>
      ${topicSections}`;
  });
  const header = `<div class="page-header" style="margin-bottom:40px;">
    <h1 style="font-size:32px;">📚 Interview Preparation Kit</h1>
    <p>${mode === 'detailed' ? '📖 Complete Detailed Study Guide' : '⚡ Complete Last Minute Preparation Guide'}</p>
    <p style="font-size:12px;color:#9ca3af;margin-top:8px;">Java • Spring Boot • CI/CD • Database & SQL</p>
  </div>`;
  const html = generatePDFHTML('Complete Interview Prep', [header, ...allSections]);
  doExportPDF(html, `InterviewPrepKit-Complete-${mode}`);
}

// ─── Code Execution via Piston API ────────────────────
const LANG_MAP = {
  java: { language: 'java', version: '15.0.2', template: `public class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello, Java!");\n    }\n}` },
  sql: { language: 'sqlite3', version: '3.36.0', template: `-- SQLite Example\nCREATE TABLE employees (id INTEGER PRIMARY KEY, name TEXT, salary REAL);\nINSERT INTO employees VALUES (1, 'Alice', 85000);\nINSERT INTO employees VALUES (2, 'Bob', 72000);\nSELECT * FROM employees WHERE salary > 70000;` },
  python: { language: 'python', version: '3.10.0', template: `# Python Example\nfor i in range(5):\n    print(f"Hello {i}")` },
  javascript: { language: 'javascript', version: '18.15.0', template: `// JavaScript Example\nconst greet = (name) => \`Hello, \${name}!\`;\nconsole.log(greet("World"));` },
};

async function executeCode(language, code) {
  const lang = LANG_MAP[language] || LANG_MAP.java;
  try {
    const res = await fetch('https://emkc.org/api/v2/piston/execute', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ language: lang.language, version: lang.version, files: [{ content: code }] })
    });
    const data = await res.json();
    return data.run?.output || data.run?.stderr || data.message || 'No output';
  } catch (e) {
    return 'Error: Could not connect to compiler service. Check your internet connection.';
  }
}

// ─── Main App ─────────────────────────────────────────
function App() {
  const [view, setView] = useState('home');
  const [selectedTech, setSelectedTech] = useState(null);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [activeTab, setActiveTab] = useState('detailed');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [expandedExamples, setExpandedExamples] = useState({});
  const [levelFilter, setLevelFilter] = useState('all');
  const [showCompiler, setShowCompiler] = useState(false);
  const contentRef = useRef(null);

  useEffect(() => {
    if (searchQuery.length >= 2) {
      setSearchResults(searchConcepts(searchQuery));
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

  useEffect(() => {
    if (contentRef.current) contentRef.current.scrollTo(0, 0);
  }, [selectedTopic, activeTab]);

  const selectTech = useCallback((tech) => {
    setSelectedTech(tech);
    setSelectedTopic(tech.topics[0]);
    setView('study');
    setSidebarOpen(false);
    setSearchQuery('');
    setExpandedExamples({});
  }, []);

  const goHome = useCallback(() => {
    setView('home');
    setSelectedTech(null);
    setSelectedTopic(null);
    setSearchQuery('');
    setSidebarOpen(false);
    setExpandedExamples({});
    setShowCompiler(false);
  }, []);

  const selectTopic = useCallback((topic) => {
    setSelectedTopic(topic);
    setSidebarOpen(false);
    setExpandedExamples({});
  }, []);

  const navigateTopic = useCallback((direction) => {
    if (!selectedTech || !selectedTopic) return;
    const idx = selectedTech.topics.findIndex(t => t.id === selectedTopic.id);
    const nextIdx = idx + direction;
    if (nextIdx >= 0 && nextIdx < selectedTech.topics.length) {
      setSelectedTopic(selectedTech.topics[nextIdx]);
      setExpandedExamples({});
      if (contentRef.current) contentRef.current.scrollTo(0, 0);
    }
  }, [selectedTech, selectedTopic]);

  const toggleExample = useCallback((id) => {
    setExpandedExamples(prev => ({ ...prev, [id]: !prev[id] }));
  }, []);

  const filteredConcepts = selectedTopic
    ? selectedTopic.concepts.filter(c => levelFilter === 'all' || c.level === levelFilter)
    : [];

  const currentTopicIndex = selectedTech?.topics.findIndex(t => t.id === selectedTopic?.id) ?? -1;
  const hasPrev = currentTopicIndex > 0;
  const hasNext = currentTopicIndex < (selectedTech?.topics.length || 0) - 1;
  const stats = getStats();

  return (
    <div className="app">
      {/* Header */}
      <header className="header">
        <div className="header-inner">
          <div className="header-left">
            {view === 'study' && (
              <button className="icon-btn sidebar-toggle" onClick={() => setSidebarOpen(!sidebarOpen)}>☰</button>
            )}
            <div className="logo" onClick={goHome}>
              <span className="logo-icon">📚</span>
              <span className="logo-text">InterviewPrep<span className="logo-accent">Kit</span></span>
            </div>
          </div>

          {view === 'study' && selectedTech && (
            <div className="header-breadcrumb">
              <span className="crumb" onClick={goHome}>Home</span>
              <span className="crumb-sep">›</span>
              <span className="crumb">{selectedTech.icon} {selectedTech.name}</span>
              {selectedTopic && (<><span className="crumb-sep">›</span><span className="crumb active">{selectedTopic.icon} {selectedTopic.name}</span></>)}
            </div>
          )}

          <div className="header-right">
            {view === 'study' && (
              <button className={`compiler-toggle-btn ${showCompiler ? 'active' : ''}`} onClick={() => setShowCompiler(!showCompiler)}>
                {showCompiler ? '✕ Close' : '▶ Compiler'}
              </button>
            )}
            <div className="search-box">
              <span className="search-icon">🔍</span>
              <input type="text" placeholder="Search topics..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
              {searchQuery && <button className="search-clear" onClick={() => setSearchQuery('')}>✕</button>}
            </div>
          </div>
        </div>
      </header>

      {/* Search Overlay */}
      {searchQuery.length >= 2 && (
        <div className="search-overlay">
          <div className="search-results-panel">
            <div className="search-results-header">
              <h3>🔍 {searchResults.length} results for "{searchQuery}"</h3>
              <button onClick={() => setSearchQuery('')}>✕</button>
            </div>
            {searchResults.length === 0 ? (
              <div className="no-results">No results found. Try different keywords.</div>
            ) : (
              <div className="search-results-list">
                {searchResults.map(r => (
                  <div key={r.id} className="search-result-item" onClick={() => {
                    const tech = technologies.find(t => t.name === r.techName);
                    if (tech) {
                      const topic = tech.topics.find(tp => tp.concepts.some(c => c.id === r.id));
                      selectTech(tech);
                      if (topic) selectTopic(topic);
                    }
                    setSearchQuery('');
                  }}>
                    <div className="sr-badge">{r.techIcon} {r.techName} › {r.topicName}</div>
                    <h4>{r.title}</h4>
                    <p>{r.shortDesc}</p>
                    <span className={`level-pill ${r.level}`}>{r.level}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      <main className="main">
        {view === 'home' && <HomeView technologies={technologies} stats={stats} onSelectTech={selectTech} />}

        {view === 'study' && selectedTech && (
          <div className="study-layout">
            <aside className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
              <div className="sidebar-header" style={{ background: selectedTech.gradient }}>
                <span className="sidebar-tech-icon">{selectedTech.icon}</span>
                <h2>{selectedTech.name}</h2>
                <button className="sidebar-close" onClick={() => setSidebarOpen(false)}>✕</button>
              </div>
              <nav className="sidebar-nav">
                {selectedTech.topics.map((topic, idx) => (
                  <button key={topic.id} className={`sidebar-item ${selectedTopic?.id === topic.id ? 'active' : ''}`} onClick={() => selectTopic(topic)}>
                    <span className="sidebar-item-num">{idx + 1}</span>
                    <span className="sidebar-item-icon">{topic.icon}</span>
                    <span className="sidebar-item-name">{topic.name}</span>
                    <span className="sidebar-item-count">{topic.concepts.length}</span>
                  </button>
                ))}
              </nav>
              <div className="sidebar-footer">
                <button className="back-home-btn" onClick={goHome}>← Back to Technologies</button>
              </div>
            </aside>

            {sidebarOpen && <div className="sidebar-overlay" onClick={() => setSidebarOpen(false)} />}

            <div className="content-area" ref={contentRef}>
              {/* Compiler Panel */}
              {showCompiler && <CodePlayground />}

              {selectedTopic && (
                <>
                  <div className="tab-bar">
                    <div className="tab-buttons">
                      <button className={`tab-btn ${activeTab === 'detailed' ? 'active' : ''}`} onClick={() => setActiveTab('detailed')}>📖 Detailed Study</button>
                      <button className={`tab-btn ${activeTab === 'quickprep' ? 'active' : ''}`} onClick={() => setActiveTab('quickprep')}>⚡ Last Minute Prep</button>
                    </div>
                    <div className="tab-actions">
                      <div className="level-filter">
                        {['all', 'fresher', 'junior', 'mid', 'senior'].map(level => (
                          <button key={level} className={`filter-btn ${levelFilter === level ? 'active' : ''}`} onClick={() => setLevelFilter(level)}>
                            {level === 'all' ? 'All' : level.charAt(0).toUpperCase() + level.slice(1)}
                          </button>
                        ))}
                      </div>
                      <button className="pdf-btn" onClick={() => exportTopicPDF(selectedTech, selectedTopic, activeTab === 'detailed' ? 'detailed' : 'quickprep')}>
                        📥 PDF
                      </button>
                    </div>
                  </div>

                  <div className="tab-content">
                    {activeTab === 'detailed' ? (
                      <DetailedTab topic={selectedTopic} concepts={filteredConcepts} expandedExamples={expandedExamples} toggleExample={toggleExample} />
                    ) : (
                      <QuickPrepTab topic={selectedTopic} concepts={filteredConcepts} techName={selectedTech.name} />
                    )}

                    {/* Next / Previous Topic Navigation */}
                    <div className="topic-nav">
                      {hasPrev && (
                        <button className="topic-nav-btn prev" onClick={() => navigateTopic(-1)}>
                          <span className="nav-arrow">←</span>
                          <div className="nav-info">
                            <span className="nav-label">Previous</span>
                            <span className="nav-topic">{selectedTech.topics[currentTopicIndex - 1]?.icon} {selectedTech.topics[currentTopicIndex - 1]?.name}</span>
                          </div>
                        </button>
                      )}
                      {hasNext && (
                        <button className="topic-nav-btn next" onClick={() => navigateTopic(1)}>
                          <div className="nav-info">
                            <span className="nav-label">Next Topic</span>
                            <span className="nav-topic">{selectedTech.topics[currentTopicIndex + 1]?.icon} {selectedTech.topics[currentTopicIndex + 1]?.name}</span>
                          </div>
                          <span className="nav-arrow">→</span>
                        </button>
                      )}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </main>

      <footer className="footer">
        <p>📚 InterviewPrepKit — Your Complete Interview Preparation Companion</p>
        <p className="footer-sub">Java • Spring Boot • CI/CD • Database & SQL</p>
      </footer>
    </div>
  );
}

// ─── Home View ────────────────────────────────────────
function HomeView({ technologies, stats, onSelectTech }) {
  const [pdfLoading, setPdfLoading] = useState(null);

  const handleConsolidatedPDF = (mode) => {
    setPdfLoading(mode);
    setTimeout(() => {
      exportAllPDF(mode);
      setTimeout(() => setPdfLoading(null), 3000);
    }, 100);
  };

  return (
    <div className="home-view">
      <div className="hero">
        <h1 className="hero-title">Interview <span className="gradient-text">Preparation Kit</span></h1>
        <p className="hero-subtitle">Master Java, Spring Boot, CI/CD & SQL — from fundamentals to advanced concepts. Detailed explanations, code examples, and last-minute revision guides.</p>
        <div className="hero-stats">
          <div className="stat-item"><span className="stat-num">{stats.totalTechnologies}</span><span className="stat-label">Technologies</span></div>
          <div className="stat-item"><span className="stat-num">{stats.totalTopics}</span><span className="stat-label">Topics</span></div>
          <div className="stat-item"><span className="stat-num">{stats.totalConcepts}</span><span className="stat-label">Concepts</span></div>
          <div className="stat-item"><span className="stat-num">{stats.totalExamples}</span><span className="stat-label">Examples</span></div>
        </div>
        <div className="hero-pdf-buttons">
          <button className="hero-pdf-btn detailed" onClick={() => handleConsolidatedPDF('detailed')} disabled={!!pdfLoading}>
            {pdfLoading === 'detailed' ? '⏳ Generating...' : '📥 Download Complete Study Guide (PDF)'}
          </button>
          <button className="hero-pdf-btn quickprep" onClick={() => handleConsolidatedPDF('quickprep')} disabled={!!pdfLoading}>
            {pdfLoading === 'quickprep' ? '⏳ Generating...' : '📥 Download Last Minute Prep (PDF)'}
          </button>
        </div>
      </div>

      <div className="tech-grid">
        {technologies.map(tech => (
          <div key={tech.id} className="tech-card" style={{ '--card-gradient': tech.gradient, '--card-color': tech.color }} onClick={() => onSelectTech(tech)}>
            <div className="tech-card-glow" />
            <div className="tech-card-content">
              <span className="tech-card-icon">{tech.icon}</span>
              <h2>{tech.name}</h2>
              <p>{tech.description}</p>
              <div className="tech-card-meta">
                <span>{tech.topics.length} Topics</span>
                <span>{tech.topics.reduce((sum, t) => sum + t.concepts.length, 0)} Concepts</span>
              </div>
              <div className="tech-card-actions">
                <button className="tech-card-btn">Start Learning →</button>
                <div className="tech-card-pdf-row">
                  <button className="tech-pdf-sm" onClick={(e) => { e.stopPropagation(); exportConsolidatedPDF(tech, 'detailed'); }}>📖 PDF</button>
                  <button className="tech-pdf-sm" onClick={(e) => { e.stopPropagation(); exportConsolidatedPDF(tech, 'quickprep'); }}>⚡ PDF</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="features-section">
        <h2>📋 What's Inside?</h2>
        <div className="features-grid">
          <div className="feature-item"><span>📖</span><h3>Detailed Explanations</h3><p>In-depth coverage with real-world context</p></div>
          <div className="feature-item"><span>💻</span><h3>Code Examples</h3><p>Multiple example types — code, comparisons, scenarios</p></div>
          <div className="feature-item"><span>⚡</span><h3>Last Minute Prep</h3><p>Quick bullet-point summaries for rapid revision</p></div>
          <div className="feature-item"><span>📥</span><h3>PDF Download</h3><p>Export topics or everything as professional PDF</p></div>
          <div className="feature-item"><span>▶</span><h3>Code Compiler</h3><p>Run Java, SQL, Python code directly in browser</p></div>
          <div className="feature-item"><span>🎯</span><h3>Experience Levels</h3><p>Fresher, Junior, Mid-level, and Senior topics</p></div>
        </div>
      </div>
    </div>
  );
}

// ─── Code Playground ──────────────────────────────────
function CodePlayground() {
  const [lang, setLang] = useState('java');
  const [code, setCode] = useState(LANG_MAP.java.template);
  const [output, setOutput] = useState('');
  const [running, setRunning] = useState(false);

  const handleLangChange = (newLang) => {
    setLang(newLang);
    setCode(LANG_MAP[newLang]?.template || '');
    setOutput('');
  };

  const handleRun = async () => {
    setRunning(true);
    setOutput('⏳ Compiling & running...');
    const result = await executeCode(lang, code);
    setOutput(result);
    setRunning(false);
  };

  return (
    <div className="compiler-panel">
      <div className="compiler-header">
        <div className="compiler-title">▶ Code Playground</div>
        <div className="compiler-langs">
          {Object.keys(LANG_MAP).map(l => (
            <button key={l} className={`compiler-lang-btn ${lang === l ? 'active' : ''}`} onClick={() => handleLangChange(l)}>
              {l === 'java' ? '☕' : l === 'sql' ? '🗃️' : l === 'python' ? '🐍' : '📜'} {l.charAt(0).toUpperCase() + l.slice(1)}
            </button>
          ))}
        </div>
        <button className="run-btn" onClick={handleRun} disabled={running}>{running ? '⏳ Running...' : '▶ Run Code'}</button>
      </div>
      <div className="compiler-body">
        <div className="compiler-editor">
          <textarea value={code} onChange={(e) => setCode(e.target.value)} spellCheck={false} placeholder="Write your code here..." />
        </div>
        <div className="compiler-output">
          <div className="output-label">Output:</div>
          <pre className="output-content">{output || 'Click "Run Code" to see output here...'}</pre>
        </div>
      </div>
    </div>
  );
}

// ─── Detailed Study Tab ───────────────────────────────
function DetailedTab({ topic, concepts, expandedExamples, toggleExample }) {
  if (concepts.length === 0) return <div className="empty-state">No concepts match the selected level filter. Try selecting "All" levels.</div>;

  return (
    <div className="detailed-tab">
      <div className="topic-banner">
        <span className="topic-banner-icon">{topic.icon}</span>
        <div><h2>{topic.name}</h2><p>{concepts.length} concepts</p></div>
      </div>

      {concepts.map((concept, idx) => (
        <div key={concept.id} className="concept-card">
          <div className="concept-header">
            <div className="concept-num">{idx + 1}</div>
            <div className="concept-info">
              <h3>{concept.title}</h3>
              <span className={`level-pill ${concept.level}`}>{concept.level}</span>
            </div>
          </div>
          <div className="concept-short">{concept.shortDesc}</div>
          <div className="concept-detailed"><FormattedText text={concept.detailed} /></div>

          {concept.examples && concept.examples.length > 0 && (
            <div className="examples-section">
              <h4 className="examples-title">💻 Examples ({concept.examples.length})</h4>
              {concept.examples.map((example, eIdx) => {
                const exId = `${concept.id}-ex-${eIdx}`;
                const isOpen = expandedExamples[exId];
                return (
                  <div key={eIdx} className={`example-block ${isOpen ? 'open' : ''}`}>
                    <button className="example-toggle" onClick={() => toggleExample(exId)}>
                      <span className={`example-type-badge ${example.type}`}>
                        {example.type === 'code' ? '💻' : example.type === 'comparison' ? '⚖️' : '🎯'} {example.type}
                      </span>
                      <span className="example-title-text">{example.title}</span>
                      <span className="toggle-arrow">{isOpen ? '▲' : '▼'}</span>
                    </button>
                    {isOpen && (
                      <div className="example-content">
                        <pre className="code-block"><span className="code-lang">{example.language}</span><code>{example.code}</code></pre>
                        {example.explanation && <div className="example-explanation"><strong>💡 Explanation:</strong> {example.explanation}</div>}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

// ─── Quick Prep Tab ───────────────────────────────────
function QuickPrepTab({ topic, concepts, techName }) {
  if (concepts.length === 0) return <div className="empty-state">No concepts match the selected level filter. Try selecting "All" levels.</div>;

  return (
    <div className="quick-prep-tab">
      <div className="quick-prep-header">
        <h2>⚡ Last Minute Preparation Guide</h2>
        <p>{techName} → {topic.name} — Quick bullet-point revision</p>
      </div>
      {concepts.map((concept, idx) => (
        <div key={concept.id} className="quick-card">
          <div className="quick-card-header">
            <span className="quick-num">{idx + 1}</span>
            <h3>{concept.title}</h3>
            <span className={`level-pill small ${concept.level}`}>{concept.level}</span>
          </div>
          <p className="quick-summary">{concept.shortDesc}</p>
          <ul className="key-points">
            {concept.keyPoints.map((point, pIdx) => <li key={pIdx}>{point}</li>)}
          </ul>
        </div>
      ))}
    </div>
  );
}

// ─── Formatted Text ───────────────────────────────────
function FormattedText({ text }) {
  if (!text) return null;
  const parts = text.split(/(```[\s\S]*?```)/g);
  return (
    <div className="formatted-text">
      {parts.map((part, index) => {
        if (part.startsWith('```')) {
          const match = part.match(/```(\w*)\n?([\s\S]*?)```/);
          if (match) return <pre key={index} className="code-block inline-code-block">{match[1] && <span className="code-lang">{match[1]}</span>}<code>{match[2].trim()}</code></pre>;
        }
        return <div key={index}>{part.split('\n').map((line, lIdx) => {
          const k = `${index}-${lIdx}`;
          if (line.startsWith('**') && line.endsWith('**')) return <h4 key={k} className="text-heading">{line.replace(/\*\*/g, '')}</h4>;
          if (line.includes('**')) { const f = line.split(/(\*\*.*?\*\*)/g).map((s,i) => s.startsWith('**') ? <strong key={i}>{s.replace(/\*\*/g,'')}</strong> : s); return <p key={k}>{f}</p>; }
          if (line.startsWith('• ') || line.startsWith('- ')) return <li key={k}>{line.substring(2)}</li>;
          if (line.startsWith('|')) return <p key={k} className="table-line">{line}</p>;
          if (line.includes('`')) { const f = line.split(/(`[^`]+`)/g).map((s,i) => s.startsWith('`') ? <code key={i} className="inline-code">{s.replace(/`/g,'')}</code> : s); return <p key={k}>{f}</p>; }
          if (!line.trim()) return <br key={k} />;
          return <p key={k}>{line}</p>;
        })}</div>;
      })}
    </div>
  );
}


export default App;
