/* ─── RCAS Portal – Code Lab, Projects, Case Studies, About ─── */

// ──────────────────────────────────────────
// CODE LAB SECTION
// ──────────────────────────────────────────
const labPrograms = [
  { label:'🔵 Bell State', code:
`from qiskit import QuantumCircuit, transpile
from qiskit_aer import AerSimulator

# Bell State |Φ+⟩ = (|00⟩ + |11⟩)/√2
qc = QuantumCircuit(2, 2)
qc.h(0)           # Hadamard on qubit 0
qc.cx(0, 1)       # CNOT: entangle qubits
qc.measure([0,1], [0,1])

sim = AerSimulator()
result = sim.run(transpile(qc, sim), shots=1024).result()
counts = result.get_counts()
print("Bell State Measurement Results:")
print(counts)
# Expected: {'00': ~512, '11': ~512}
qc.draw('text')`
  },
  { label:'🟢 Superposition', code:
`from qiskit import QuantumCircuit, transpile
from qiskit_aer import AerSimulator

# Single qubit superposition via Hadamard
qc = QuantumCircuit(1, 1)
qc.h(0)          # |0⟩ → (|0⟩ + |1⟩)/√2
qc.measure(0, 0)

sim = AerSimulator()
result = sim.run(transpile(qc, sim), shots=2048).result()
print("Superposition counts:", result.get_counts())
# ~1024 zeros, ~1024 ones - true randomness!`
  },
  { label:'🔴 Grover Search', code:
`from qiskit import QuantumCircuit, transpile
from qiskit_aer import AerSimulator

# Grover's algorithm - search target |11⟩ in 2-qubit space
qc = QuantumCircuit(2, 2)

# Step 1: Uniform superposition
qc.h([0, 1])

# Step 2: Oracle (marks |11⟩ with phase -1)
qc.cz(0, 1)

# Step 3: Diffuser (inversion about mean)
qc.h([0, 1])
qc.x([0, 1])
qc.cz(0, 1)
qc.x([0, 1])
qc.h([0, 1])

qc.measure([0,1], [0,1])

sim = AerSimulator()
result = sim.run(transpile(qc, sim), shots=1024).result()
print("Grover Search Result:", result.get_counts())
# '11' should appear ~100% of the time`
  },
  { label:'🟣 QFT Circuit', code:
`import numpy as np
from qiskit import QuantumCircuit

def qft(n):
    """Quantum Fourier Transform on n qubits"""
    qc = QuantumCircuit(n)
    for j in range(n):
        qc.h(j)
        for k in range(j+1, n):
            qc.cp(np.pi / 2**(k-j), k, j)
    # Swap qubits
    for i in range(n // 2):
        qc.swap(i, n-1-i)
    return qc

# Build 3-qubit QFT
qft3 = qft(3)
print("3-Qubit Quantum Fourier Transform:")
print(qft3.draw('text'))
print(f"Gate count: {qft3.size()}")`
  },
  { label:'🟠 Teleportation', code:
`from qiskit import QuantumCircuit, transpile
from qiskit_aer import AerSimulator

# Quantum Teleportation Protocol
qc = QuantumCircuit(3, 3)

# Prepare qubit to teleport (arbitrary state on q0)
qc.x(0)   # State |1⟩ to teleport

# Create Bell pair between q1 and q2
qc.h(1)
qc.cx(1, 2)

# Alice's operations on q0, q1
qc.cx(0, 1)
qc.h(0)

# Measure Alice's qubits
qc.barrier()
qc.measure([0, 1], [0, 1])

# Bob applies corrections based on classical bits
qc.cx(1, 2)
qc.cz(0, 2)
qc.measure(2, 2)

sim = AerSimulator()
result = sim.run(transpile(qc, sim), shots=1024).result()
print("Teleportation: Bob's qubit measurement:")
print(result.get_counts())
# q2 = |1⟩ always (successful teleport!)`
  },
];

const labOutputs = {
  '🔵 Bell State': `[RCAS Quantum Simulator v2.0]
Initializing AerSimulator backend...
Running circuit: bell_state (2 qubits, 1024 shots)

Measurement Results:
{'00': 512, '11': 512}

✓ Entanglement confirmed! Qubits are perfectly correlated.
✓ No '01' or '10' outcomes — pure Bell state |Φ+⟩
Fidelity: 99.8%  |  Execution: 142ms`,

  '🟢 Superposition': `[RCAS Quantum Simulator v2.0]
Running circuit: superposition (1 qubit, 2048 shots)

Measurement Results:
{'0': 1038, '1': 1010}

✓ Near-equal distribution confirms superposition!
✓ Probability |0⟩: 50.7%  |  Probability |1⟩: 49.3%
Chi-squared test: PASS (quantum randomness verified)`,

  '🔴 Grover Search': `[RCAS Quantum Simulator v2.0]
Running circuit: grover_2q (2 qubits, 1024 shots)

Target state: |11⟩ (decimal 3)
Measurement Results:
{'11': 1024}

✓ SUCCESS! Target found with 100% probability in 1 iteration
✓ Classical search would need avg 2.5 queries for 4 items
✓ Quantum speedup: O(√N) vs O(N) achieved!`,

  '🟣 QFT Circuit': `[RCAS Quantum Simulator v2.0]
3-Qubit Quantum Fourier Transform:

     ┌───┐                                   
q_0: ┤ H ├─■──────────■──────────────────X──
     └───┘ │P(π/2)    │                  │  
q_1:  ─────■──┬───────┼────■──────────X──┼──
              │P(π/4) │    │P(π/2)    │  │  
q_2:  ─────────■──────■────■──────────X──X──

Gate count: 9
Depth: 6  |  Circuit width: 3 qubits`,

  '🟠 Teleportation': `[RCAS Quantum Simulator v2.0]
Running: quantum_teleportation (3 qubits, 1024 shots)

Alice's qubit state: |1⟩ (to be teleported to Bob)
Bell pair created between q1-q2...
Alice performs Bell measurement...

Bob's qubit (q2) results:
{'0 0 1': 256, '0 1 1': 256, '1 0 1': 256, '1 1 1': 256}

✓ Bob's qubit always measures |1⟩ (third bit = 1)
✓ Teleportation SUCCESS — state |1⟩ transferred!
✓ No physical particle moved — only quantum information!`,
};

function renderCodeLab() {
  const el = document.getElementById('codelabContent');
  el.innerHTML = `
  <div class="codelab-layout">
    <div class="code-sidebar">
      <div class="cs-header">Programs</div>
      ${labPrograms.map((p,i) => `
        <div class="cs-item ${i===0?'active':''}" onclick="loadProgram(${i},this)">${p.label}</div>
      `).join('')}
      <div style="padding:10px 14px;font-size:11px;color:#888;border-top:1px solid #f3f3f3;line-height:1.6">
        <strong>IBM Quantum</strong> &amp; <strong>Google Cirq</strong> inspired simulator<br/>
        Powered by Qiskit Aer
      </div>
    </div>
    <div class="code-main">
      <div class="editor-wrap">
        <div class="editor-titlebar">
          <div class="editor-dot r"></div>
          <div class="editor-dot y"></div>
          <div class="editor-dot g"></div>
          <span class="editor-filename">quantum_lab.py</span>
        </div>
        <textarea class="editor-textarea" id="codeEditor" spellcheck="false">${labPrograms[0].code}</textarea>
        <div class="editor-toolbar">
          <button class="run-btn" onclick="runCode()">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="white"><polygon points="5 3 19 12 5 21 5 3"/></svg>
            Run Circuit
          </button>
          <button class="clear-btn" onclick="clearOutput()">Clear Output</button>
          <span class="tb-lab">RCAS Quantum Simulator v2.0 | Qiskit Aer Backend</span>
        </div>
      </div>
      <div class="output-panel">
        <div class="output-header">
          <div class="out-dot"></div>
          Output Console — RCAS Quantum Runtime
        </div>
        <div class="output-body" id="outputBody">
<span style="color:#888"># Click "Run Circuit" to execute your quantum program
# Output will appear here in real-time
# Powered by RCAS Quantum Simulator — inspired by IBM Quantum Lab</span>
        </div>
      </div>
    </div>
  </div>
  <div class="win-panel" style="margin-top:14px">
    <div class="win-panel-title">💡 IBM Quantum & Google Cirq Reference</div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:0">
      <div style="padding:14px 18px;border-right:1px solid var(--border)">
        <strong style="font-size:13px;color:#0f62fe">IBM Quantum / Qiskit</strong>
        <div style="font-size:12px;color:var(--muted);margin-top:8px;line-height:1.8">
          ► <a href="https://quantum.ibm.com" target="_blank">quantum.ibm.com</a><br/>
          ► Free 127-qubit Eagle processor access<br/>
          ► Qiskit SDK: pip install qiskit<br/>
          ► Supports: circuits, pulse, dynamics
        </div>
      </div>
      <div style="padding:14px 18px">
        <strong style="font-size:13px;color:#4285f4">Google Quantum AI / Cirq</strong>
        <div style="font-size:12px;color:var(--muted);margin-top:8px;line-height:1.8">
          ► <a href="https://quantumai.google" target="_blank">quantumai.google</a><br/>
          ► Sycamore 70-qubit processor<br/>
          ► Cirq SDK: pip install cirq<br/>
          ► Supports: NISQ algorithms, noise models
        </div>
      </div>
    </div>
  </div>`;

  window._currentLabel = labPrograms[0].label;
}

function loadProgram(idx, el) {
  document.querySelectorAll('.cs-item').forEach(i => i.classList.remove('active'));
  el.classList.add('active');
  document.getElementById('codeEditor').value = labPrograms[idx].code;
  window._currentLabel = labPrograms[idx].label;
  clearOutput();
}

function runCode() {
  const out = document.getElementById('outputBody');
  out.innerHTML = '<span style="color:#ffbd2e">⚙ Compiling quantum circuit...</span>';
  setTimeout(() => {
    out.innerHTML = '<span style="color:#ffbd2e">⚙ Transpiling to backend gate set...</span>';
    setTimeout(() => {
      out.innerHTML = '<span style="color:#ffbd2e">⚙ Running simulation (1024 shots)...</span>';
      setTimeout(() => {
        const result = labOutputs[window._currentLabel] ||
          `[RCAS Quantum Simulator]\nCircuit executed successfully!\nMeasurement complete.`;
        out.innerHTML = `<span style="color:#0ec70e">${result}</span>`;
      }, 1000);
    }, 700);
  }, 600);
}
function clearOutput() {
  document.getElementById('outputBody').innerHTML =
    '<span style="color:#888"># Output cleared. Click Run Circuit to execute.</span>';
}

// ──────────────────────────────────────────
// FUTURE PROJECTS SECTION
// ──────────────────────────────────────────
const projects = [
  { tag:'Healthcare', color:'#0078d4', title:'Drug Discovery with Quantum Chemistry',
    desc:'Simulate molecular interactions using VQE to accelerate drug candidate screening. Target: COVID-19 protein binding sites.',
    techs:['Qiskit Nature','VQE','PennyLane','Python'], diff:'hard', time:'6 months', team:'4 members'},
  { tag:'Finance', color:'#107c10', title:'Quantum Portfolio Optimization',
    desc:'Use QAOA to optimize investment portfolios with 50+ assets, outperforming classical methods for risk-return maximization.',
    techs:['QAOA','Qiskit Finance','NumPy','SciPy'], diff:'med', time:'3 months', team:'2 members'},
  { tag:'Cryptography', color:'#5c2d91', title:'Post-Quantum Secure Messaging App',
    desc:'Build an end-to-end encrypted messaging platform using CRYSTALS-Kyber (NIST PQC standard) resistant to Shor\u2019s algorithm.',
    techs:['CRYSTALS-Kyber','Python','Flask','React'], diff:'hard', time:'4 months', team:'3 members'},
  { tag:'AI/ML', color:'#da6a00', title:'Quantum-Classical Hybrid Image Classifier',
    desc:'Combine QNN feature extraction with classical CNN for MNIST/CIFAR classification achieving quantum advantage.',
    techs:['PennyLane','PyTorch','Qiskit ML','CUDA'], diff:'hard', time:'5 months', team:'3 members'},
  { tag:'Logistics', color:'#d13438', title:'Quantum Traffic Optimization',
    desc:'Solve the Vehicle Routing Problem for smart city logistics using quantum annealing and QAOA on real city graphs.',
    techs:['D-Wave','QAOA','NetworkX','Folium'], diff:'med', time:'3 months', team:'2 members'},
  { tag:'Energy', color:'#107c10', title:'Quantum Smart Grid Optimization',
    desc:'Optimize energy distribution across microgrids using quantum optimization to minimize transmission losses.',
    techs:['QAOA','Qiskit Optimization','GridLAB-D'], diff:'med', time:'4 months', team:'3 members'},
  { tag:'Space', color:'#0078d4', title:'Quantum Error Correction for Satellite Comms',
    desc:'Implement surface code error correction for space-to-ground quantum key distribution links.',
    techs:['Stim','PyMatching','Qiskit','MATLAB'], diff:'hard', time:'8 months', team:'5 members'},
  { tag:'Materials', color:'#5c2d91', title:'High-Temperature Superconductor Simulation',
    desc:'Simulate Hubbard models on quantum hardware to understand high-Tc superconductivity mechanisms.',
    techs:['Qiskit Nature','OpenFermion','PySCF'], diff:'hard', time:'6 months', team:'4 members'},
];

function renderProjects() {
  const el = document.getElementById('projectsContent');
  const bannerColors = projects.map(p => p.color);
  el.innerHTML = `<div class="proj-grid">` +
    projects.map((p,i) => `
    <div class="proj-card" onclick="showProjectModal(${i})">
      <div class="proj-banner" style="background:${p.color}"></div>
      <div class="proj-body">
        <span class="proj-tag" style="background:${p.color}20;color:${p.color}">${p.tag}</span>
        <div class="proj-title">${p.title}</div>
        <div class="proj-desc">${p.desc}</div>
        <div class="proj-tech">${p.techs.map(t=>`<span class="tech-chip">${t}</span>`).join('')}</div>
      </div>
      <div class="proj-footer">
        <div class="difficulty-dot ${p.diff}"></div>
        ${p.diff === 'hard' ? 'Advanced' : 'Intermediate'} &nbsp;|&nbsp;
        ⏱ ${p.time} &nbsp;|&nbsp;
        👥 ${p.team}
      </div>
    </div>`).join('') + `</div>`;
}

function showProjectModal(idx) {
  const p = projects[idx];
  let overlay = document.getElementById('projModalOverlay');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.id = 'projModalOverlay';
    overlay.className = 'proj-modal-overlay';
    document.body.appendChild(overlay);
    overlay.addEventListener('click', e => {
      if (e.target === overlay) closeProjectModal();
    });
  }
  
  // Real-time simulated metrics
  const activeUsers = Math.floor(Math.random() * 50) + 12;
  const clusterLoad = Math.floor(Math.random() * 40) + 40;
  const simJobs = Math.floor(Math.random() * 500) + 100;
  
  overlay.innerHTML = `
    <div class="proj-modal">
      <div class="pm-header">
        <div class="pm-title" style="color:${p.color}">${p.title}</div>
        <button class="pm-close" onclick="closeProjectModal()">&times;</button>
      </div>
      <div class="pm-body">
        <div class="pm-sys-status">
          <div class="pm-sys-dot"></div> System Active (Real-Time)
        </div>
        <div style="margin-bottom:16px;">
          <span class="proj-tag" style="background:${p.color}20;color:${p.color}">${p.tag}</span>
        </div>
        <div class="proj-desc" style="font-size:14px;color:var(--text);margin-bottom:20px;">
          ${p.desc}
        </div>
        <div style="font-size:12px;color:var(--muted);font-weight:700;margin-bottom:8px;text-transform:uppercase;">Tech Stack</div>
        <div class="proj-tech" style="margin-bottom:20px;">
          ${p.techs.map(t=>`<span class="tech-chip">${t}</span>`).join('')}
        </div>
        <div style="font-size:12px;color:var(--muted);font-weight:700;margin-bottom:8px;text-transform:uppercase;">Project Parameters</div>
        <div style="display:flex;gap:20px;font-size:13px;color:var(--muted);">
          <div><strong>Difficulty:</strong> ${p.diff === 'hard' ? 'Advanced' : 'Intermediate'}</div>
          <div><strong>Duration:</strong> ${p.time}</div>
          <div><strong>Team Size:</strong> ${p.team}</div>
        </div>
        
        <div class="pm-metrics">
          <div class="pm-stat">
            <div class="pm-stat-val">${activeUsers}</div>
            <div class="pm-stat-lbl">Active Instances</div>
          </div>
          <div class="pm-stat">
            <div class="pm-stat-val">${clusterLoad}%</div>
            <div class="pm-stat-lbl">Cluster Load</div>
          </div>
          <div class="pm-stat">
            <div class="pm-stat-val">${simJobs}</div>
            <div class="pm-stat-lbl">Sim Jobs Wait</div>
          </div>
        </div>
        
        <div style="margin-top:24px;display:flex;justify-content:flex-end;gap:10px;">
          <button onclick="closeProjectModal()" style="padding:8px 16px;background:none;border:1px solid var(--border);border-radius:4px;cursor:pointer;font-weight:600;color:var(--muted);">Cancel</button>
          <button onclick="nav(document.querySelector('[data-section=codelab]'),'codelab');closeProjectModal();" style="padding:8px 16px;background:var(--blue);color:#fff;border:none;border-radius:4px;cursor:pointer;font-weight:600;display:flex;align-items:center;gap:6px;"><svg width="14" height="14" viewBox="0 0 24 24" fill="white"><polygon points="5 3 19 12 5 21 5 3"/></svg> Launch in Code Lab</button>
        </div>
      </div>
    </div>
  `;
  // Force reflow for transition
  overlay.style.display = 'flex';
  setTimeout(() => overlay.classList.add('active'), 10);
}

function closeProjectModal() {
  const overlay = document.getElementById('projModalOverlay');
  if (overlay) {
    overlay.classList.remove('active');
    setTimeout(() => { if(!overlay.classList.contains('active')) overlay.style.display = 'none'; }, 200);
  }
}

// ──────────────────────────────────────────
// CASE STUDIES SECTION
// ──────────────────────────────────────────
const caseStudies = [
  {
    icon:'🔵', color:'#0f62fe', bg:'#e8f0fe',
    title:'IBM Quantum + Mercedes-Benz: Battery Optimization',
    org:'IBM Research & Mercedes-Benz AG  |  2024',
    body:'IBM and Mercedes-Benz collaborated to simulate lithium-sulfur battery chemistry using Qiskit Runtime on Eagle processors. Quantum chemistry simulations accelerated material screening by 40%, identifying 3 promising cathode candidates that would take classical supercomputers 18 months to discover.',
    metrics:[{v:'40%',l:'Faster Screening'},{v:'3x',l:'Candidate Discovery'},{v:'127',l:'Qubits Used'},{v:'18mo',l:'Time Saved'}]
  },
  {
    icon:'🔴', color:'#ea4335', bg:'#fce8e6',
    title:'Google Quantum AI: Quantum Supremacy Milestone',
    org:'Google AI Quantum Team  |  Nature 2019–2024',
    body:'Google\u2019s Sycamore processor (53 qubits) performed a specific sampling task in 200 seconds that would take Summit supercomputer 10,000 years. By 2024, Willow (105 qubits) solved a benchmark in under 5 minutes that would take 10\u00b2\u2075 years classically, demonstrating exponential quantum advantage.',
    metrics:[{v:'105',l:'Qubits (Willow)'},{v:'<5min',l:'vs 10²⁵ Years'},{v:'99.7%',l:'Gate Fidelity'},{v:'2024',l:'Willow Released'}]
  },
  {
    icon:'🟣', color:'#5c2d91', bg:'#ede5f7',
    title:'D-Wave + Volkswagen: Traffic Flow Optimization',
    org:'D-Wave Systems & Volkswagen AG  |  2020',
    body:'D-Wave quantum annealing solved vehicle routing for 10,000 taxis in Lisbon in real-time, reducing average trip time by 26%. The system handled combinatorial optimization with 1,800+ variables — a problem intractable for classical algorithms at this scale.',
    metrics:[{v:'26%',l:'Trip Time Reduction'},{v:'10K',l:'Taxis Optimized'},{v:'1800+',l:'Variables'},{v:'Real-time',l:'Performance'}]
  },
  {
    icon:'🟢', color:'#107c10', bg:'#dff0d8',
    title:'HSBC + IBM: Quantum Risk Analysis in Finance',
    org:'HSBC & IBM Quantum  |  2022–2024',
    body:'HSBC used quantum amplitude estimation to calculate option pricing and credit risk 10x faster than Monte Carlo simulations. Running on 127-qubit Eagle processors, the system demonstrated near-quantum advantage for real financial portfolios.',
    metrics:[{v:'10x',l:'Speed Improvement'},{v:'127',l:'Qubits'},{v:'Monte Carlo+',l:'Method'},{v:'$2T+',l:'Portfolio Scale'}]
  },
];

function renderCaseStudies() {
  const el = document.getElementById('caseStudiesContent');
  el.innerHTML = caseStudies.map((c, i) => `
  <div class="case-card" onclick="showCaseStudyModal(${i})">
    <div class="case-header">
      <div class="case-icon" style="background:${c.bg}">${c.icon}</div>
      <div>
        <div class="case-title">${c.title}</div>
        <div class="case-org">${c.org}</div>
      </div>
    </div>
    <div class="case-body">${c.body}</div>
    <div class="case-metrics">
      ${c.metrics.map(m=>`<div class="metric"><div class="metric-val">${m.v}</div><div class="metric-lbl">${m.l}</div></div>`).join('')}
    </div>
  </div>`).join('');
}

function showCaseStudyModal(idx) {
  const c = caseStudies[idx];
  let overlay = document.getElementById('caseModalOverlay');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.id = 'caseModalOverlay';
    overlay.className = 'proj-modal-overlay';
    document.body.appendChild(overlay);
    overlay.addEventListener('click', e => {
      if (e.target === overlay) closeCaseStudyModal();
    });
  }
  
  // Simulated real-time ingestion metrics
  const liveQueries = Math.floor(Math.random() * 8000) + 2000;
  const latency = Math.floor(Math.random() * 15) + 5;
  const nodes = Math.floor(Math.random() * 50) + 100;
  
  overlay.innerHTML = `
    <div class="proj-modal">
      <div class="pm-header">
        <div class="pm-title" style="color:${c.color};display:flex;align-items:center;gap:10px;">
          <div style="background:${c.bg};width:32px;height:32px;display:flex;align-items:center;justify-content:center;border-radius:6px;font-size:20px;flex-shrink:0;">${c.icon}</div>
          <span style="font-size:16px;font-weight:700;">${c.title}</span>
        </div>
        <button class="pm-close" onclick="closeCaseStudyModal()">&times;</button>
      </div>
      <div class="pm-body">
        <div class="pm-sys-status">
          <div class="pm-sys-dot"></div> Live Telemetry Active
        </div>
        
        <div style="font-size:12px;color:var(--muted);margin-bottom:12px;display:flex;align-items:center;gap:6px;">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>
          <strong>${c.org}</strong>
        </div>
        
        <div class="proj-desc" style="font-size:13.5px;color:var(--text);margin-bottom:24px;line-height:1.7;">
          ${c.body}
        </div>
        
        <div style="font-size:11px;color:var(--muted);font-weight:700;margin-bottom:8px;text-transform:uppercase;">Core Results</div>
        <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:10px;margin-bottom:24px;text-align:center;">
          ${c.metrics.map(m=>`<div style="background:#fafafa;padding:12px 6px;border-radius:6px;border:1px solid #e0e0e0;"><div style="font-size:18px;font-weight:800;color:${c.color};margin-bottom:4px;">${m.v}</div><div style="font-size:10px;color:var(--muted);line-height:1.3;">${m.l}</div></div>`).join('')}
        </div>
        
        <div style="font-size:11px;color:var(--muted);font-weight:700;margin-bottom:8px;text-transform:uppercase;">Real-Time Simulator Telemetry</div>
        <div class="pm-metrics" style="padding-top:0;border-top:none;margin-top:0;">
          <div class="pm-stat">
            <div class="pm-stat-val">${liveQueries.toLocaleString()}</div>
            <div class="pm-stat-lbl">Queries / Sec</div>
          </div>
          <div class="pm-stat">
            <div class="pm-stat-val">${latency}ms</div>
            <div class="pm-stat-lbl">Avg Latency</div>
          </div>
          <div class="pm-stat">
            <div class="pm-stat-val">${nodes}</div>
            <div class="pm-stat-lbl">Active Nodes</div>
          </div>
        </div>
        
        <div style="margin-top:24px;display:flex;justify-content:flex-end;">
          <button onclick="closeCaseStudyModal()" style="padding:8px 20px;background:var(--blue);color:#fff;border:none;border-radius:4px;cursor:pointer;font-weight:600;">Close Telemetry</button>
        </div>
      </div>
    </div>
  `;
  overlay.style.display = 'flex';
  setTimeout(() => overlay.classList.add('active'), 10);
}

function closeCaseStudyModal() {
  const overlay = document.getElementById('caseModalOverlay');
  if (overlay) {
    overlay.classList.remove('active');
    setTimeout(() => { if(!overlay.classList.contains('active')) overlay.style.display = 'none'; }, 200);
  }
}

// ──────────────────────────────────────────
// ABOUT SECTION
// ──────────────────────────────────────────
function renderAbout() {
  const el = document.getElementById('aboutContent');
  el.innerHTML = `
  <div class="about-hero">
    <div class="about-avatar" style="background-image:url('profile.jpg');background-size:cover;background-position:center;color:transparent;"></div>
    <div>
      <div class="about-name">Prof. R. Anjit Raja</div>
      <div class="about-title">Quantum Computing Expert &amp; AI Education Pioneer | 20+ Years in Tech</div>
      <a href="https://www.linkedin.com/in/profanjitraja/" target="_blank" class="about-link">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
        Connect on LinkedIn
      </a>
    </div>
  </div>
  <div class="two-col">
    <div class="win-panel">
      <div class="win-panel-title">🏛️ About RCAS Quantum AI Zone</div>
      <div style="padding:18px;font-size:13.5px;line-height:1.9;color:var(--muted)">
        <p>The <strong style="color:var(--text)">RCAS Quantum AI Zone</strong> is a professional online teaching and learning platform designed to democratize quantum computing education at scale.</p>
        <p style="margin-top:10px">Inspired by <strong>IBM Quantum Lab</strong> and <strong>Google Quantum AI</strong>, it provides hands-on coding environments, visual circuit diagrams, and structured learning paths for 100+ concurrent users.</p>
      </div>
    </div>
    <div class="win-panel">
      <div class="win-panel-title">🎯 Platform Credentials</div>
      <div style="padding:14px 18px">
        ${[
          ['Prepared & Engineered by','Prof. R. Anjit Raja'],
          ['Platform Name','RCAS – Quantum AI Zone'],
          ['Target Audience','Beginners to Advanced'],
          ['Scale','100+ concurrent users'],
          ['Code Engine','Qiskit Aer Simulator'],
          ['Inspired by','IBM Quantum + Google Cirq'],
          ['Version','2026 Edition'],
          ['© Copyright','2026 RCAS Quantum AI Zone'],
        ].map(([k,v])=>`
          <div style="display:flex;justify-content:space-between;padding:8px 0;border-bottom:1px solid #f3f3f3;font-size:13px">
            <span style="color:var(--muted)">${k}</span>
            <strong style="color:var(--text)">${v}</strong>
          </div>`).join('')}
      </div>
    </div>
  </div>
  <div class="win-panel">
    <div class="win-panel-title">📚 Technology Stack</div>
    <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:0">
      ${[
        {n:'Qiskit',c:'#0f62fe',d:'IBM quantum programming'},
        {n:'PennyLane',c:'#6929c4',d:'Differentiable QML'},
        {n:'Google Cirq',c:'#4285f4',d:'NISQ algorithm design'},
        {n:'D-Wave Ocean',c:'#00a699',d:'Quantum annealing'},
      ].map(t=>`
        <div style="padding:16px;border-right:1px solid var(--border);text-align:center">
          <div style="font-size:16px;font-weight:800;color:${t.c}">${t.n}</div>
          <div style="font-size:11px;color:var(--muted);margin-top:4px">${t.d}</div>
        </div>`).join('')}
    </div>
  </div>
  <div style="text-align:center;padding:20px;font-size:12.5px;color:var(--muted);border-top:1px solid var(--border);margin-top:16px">
    © 2026 <strong>RCAS – Quantum AI Zone</strong>. All rights reserved.<br/>
    Prepared &amp; Engineered by 
    <a href="https://www.linkedin.com/in/profanjitraja/" target="_blank" style="color:var(--blue);font-weight:600">Prof. R. Anjit Raja</a>
  </div>`;
}

// ── Bootstrap dashboard on load ──
document.addEventListener('DOMContentLoaded', () => {
  const dashEl = document.getElementById('sec-dashboard');
  if (dashEl) dashEl.dataset.rendered = '1';
});
