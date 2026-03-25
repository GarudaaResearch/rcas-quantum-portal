/* ─── RCAS Quantum AI Zone – Portal Core ─── */
'use strict';

// ── Auth Guard ──
const role = sessionStorage.getItem('rcasRole') || '';
const uname = sessionStorage.getItem('rcasUser') || '';
if (!role) { window.location.href = 'index.html'; }
document.getElementById('userLabel').textContent = uname;
document.getElementById('userName').textContent = role === 'admin' ? 'Administrator' : 'Student';
document.getElementById('userRole').textContent  = role === 'admin' ? 'RCAS Admin'   : 'Learner';
document.getElementById('userAvatar').textContent = uname.charAt(0).toUpperCase();
if (role !== 'admin') {
  document.querySelectorAll('.admin-only').forEach(el => el.remove());
}
function logout() { sessionStorage.clear(); window.location.href = 'index.html'; }

// ── Clock ──
function tick() {
  const now = new Date();
  let h = now.getHours(), m = now.getMinutes();
  const ap = h >= 12 ? 'PM' : 'AM'; h = h % 12 || 12;
  const t = h + ':' + String(m).padStart(2,'0') + ' ' + ap;
  document.getElementById('tbClock').textContent = t;
  document.getElementById('osTime').textContent  = h + ':' + String(m).padStart(2,'0');
}
tick(); setInterval(tick, 30000);

// ── Navigation ──
function nav(el, id) {
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
  if (el) el.classList.add('active');
  document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
  const sec = document.getElementById('sec-' + id);
  if (sec) sec.classList.add('active');
  const titles = {
    dashboard:'Dashboard', beginner:'Beginner Track', intermediate:'Intermediate Track',
    advanced:'Advanced Track', gates:'Quantum Gates', codelab:'Code Lab',
    projects:'Future Projects', casestudies:'Case Studies', about:'About'
  };
  document.getElementById('tbBread').textContent = titles[id] || id;
  // Lazy render
  if (!sec.dataset.rendered) { renderSection(id); sec.dataset.rendered = '1'; }
}

// ── Start Menu toggle ──
let startOpen = false;
function toggleStart() {
  startOpen = !startOpen;
  document.getElementById('startMenu').style.display = startOpen ? 'block' : 'none';
}
document.addEventListener('click', e => {
  if (startOpen && !e.target.closest('.os-start') && !e.target.closest('.start-menu')) {
    startOpen = false; document.getElementById('startMenu').style.display = 'none';
  }
});

// ── Accordion ──
function acc(el) {
  const body = el.nextElementSibling;
  el.classList.toggle('open');
  body.classList.toggle('open');
}

// ── Render dispatcher ──
function renderSection(id) {
  const fns = {
    beginner: renderBeginner, intermediate: renderIntermediate,
    advanced: renderAdvanced, gates: renderGates,
    codelab: renderCodeLab, projects: renderProjects,
    casestudies: renderCaseStudies, about: renderAbout
  };
  if (fns[id]) fns[id]();
}

// ── Re-usable helpers ──
function lessonCard(color, badge, icon, title, desc, dur, topics) {
  return `<div class="lesson-card" onclick="nav(document.querySelector('[data-section=codelab]'), 'codelab')">
    <div class="lc-top ${color}"></div>
    <div class="lc-body">
      <span class="lc-badge ${color}">${badge}</span>
      <div class="lc-title">${icon} ${title}</div>
      <div class="lc-desc">${desc}</div>
    </div>
    <div class="lc-meta">
      <span class="dur"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>${dur}</span>
      <span>${topics} topics</span>
    </div>
  </div>`;
}

function accordionBlock(num, title, body) {
  return `<div class="accordion">
    <div class="acc-header" onclick="acc(this)">
      <span style="background:var(--blue-lt);color:var(--blue);border-radius:50%;width:24px;height:24px;
        display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;flex-shrink:0">${num}</span>
      ${title}
      <svg class="acc-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>
    </div>
    <div class="acc-body">${body}</div>
  </div>`;
}

function codeBlock(lang, code) {
  return `<div class="code-block"><span class="cb-header">${lang}</span><pre>${code}</pre></div>`;
}

// ──────────────────────────────────────────
// BEGINNER SECTION
// ──────────────────────────────────────────
function renderBeginner() {
  const el = document.getElementById('beginnerContent');
  el.innerHTML = `
  <div class="lesson-grid">
    ${lessonCard('green','MODULE 1','⚛','What is Quantum Computing?','Discover how quantum computers differ from classical machines using qubits, superposition and entanglement.','45 min',6)}
    ${lessonCard('green','MODULE 2','🌀','Qubits & Superposition','Understand the quantum bit, Bloch sphere representation, probability amplitudes and measurement collapse.','50 min',5)}
    ${lessonCard('green','MODULE 3','🔗','Quantum Entanglement','Explore non-local correlations, Bell states, EPR paradox and the power of multi-qubit systems.','40 min',4)}
    ${lessonCard('green','MODULE 4','📐','Dirac Notation (Bra-Ket)','Learn the mathematical language of quantum mechanics: ket vectors, inner products and operators.','60 min',7)}
    ${lessonCard('green','MODULE 5','🔬','Quantum Measurement','Understand measurement postulates, Born rule, projection operators and decoherence.','35 min',5)}
    ${lessonCard('green','MODULE 6','💻','Your First Quantum Circuit','Run your first quantum program using Qiskit on IBM Quantum — step-by-step guided lab.','90 min',8)}
  </div>
  <div class="win-panel">
    <div class="win-panel-title">📖 Detailed Lesson Content</div>
    ${accordionBlock(1,'What is Quantum Computing?', `
      <p>Quantum computing harnesses quantum mechanical phenomena to process information in fundamentally new ways.</p>
      <p style="margin-top:10px"><strong>Classical vs Quantum:</strong></p>
      <ul style="margin:8px 0 0 20px;line-height:2">
        <li>Classical bit: strictly 0 or 1</li>
        <li>Qubit: 0, 1, or <strong>both simultaneously</strong> (superposition)</li>
        <li>n qubits represent 2ⁿ states simultaneously</li>
      </ul>
      ${codeBlock('Qiskit (Python)', `<span class="kw">from</span> qiskit <span class="kw">import</span> QuantumCircuit, transpile
<span class="kw">from</span> qiskit_aer <span class="kw">import</span> AerSimulator

<span class="cm"># Create a simple 1-qubit circuit</span>
qc = QuantumCircuit(<span class="num">1</span>, <span class="num">1</span>)
qc.h(<span class="num">0</span>)          <span class="cm"># Hadamard → superposition</span>
qc.measure(<span class="num">0</span>, <span class="num">0</span>) <span class="cm"># Measure qubit</span>

sim = AerSimulator()
result = sim.run(transpile(qc, sim), shots=<span class="num">1024</span>).result()
<span class="fn">print</span>(result.get_counts())  <span class="cm"># {'0': ~512, '1': ~512}</span>`)}
    `)}
    ${accordionBlock(2,'Superposition & Bloch Sphere', `
      <p>A qubit's state is described as: <strong>|ψ⟩ = α|0⟩ + β|1⟩</strong> where |α|² + |β|² = 1</p>
      <p style="margin-top:8px">The <strong>Bloch Sphere</strong> is a geometrical representation where every point on the unit sphere corresponds to a valid qubit state.</p>
      <ul style="margin:8px 0 0 20px;line-height:2">
        <li>North Pole: |0⟩</li><li>South Pole: |1⟩</li>
        <li>Equator: Equal superposition states</li>
      </ul>
      ${codeBlock('Python – Bloch Vector', `<span class="kw">from</span> qiskit.visualization <span class="kw">import</span> plot_bloch_vector
<span class="kw">import</span> numpy <span class="kw">as</span> np

<span class="cm"># State |+⟩ = (|0⟩ + |1⟩)/√2  on Bloch sphere</span>
plot_bloch_vector([<span class="num">1</span>, <span class="num">0</span>, <span class="num">0</span>])  <span class="cm"># X-axis: |+⟩</span>
plot_bloch_vector([<span class="num">0</span>, <span class="num">0</span>, <span class="num">1</span>])  <span class="cm"># Z-axis: |0⟩</span>`)}
    `)}
    ${accordionBlock(3,'Quantum Entanglement', `
      <p>Entanglement creates correlations between qubits that have no classical analogue. The Bell state |Φ⁺⟩ = (|00⟩+|11⟩)/√2 is the canonical entangled pair.</p>
      ${codeBlock('Qiskit – Bell State', `qc = QuantumCircuit(<span class="num">2</span>, <span class="num">2</span>)
qc.h(<span class="num">0</span>)           <span class="cm"># Superpose qubit 0</span>
qc.cx(<span class="num">0</span>, <span class="num">1</span>)       <span class="cm"># CNOT entangles qubit 1</span>
qc.measure([<span class="num">0</span>,<span class="num">1</span>], [<span class="num">0</span>,<span class="num">1</span>])
<span class="cm"># Result: {'00': ~512, '11': ~512}  — always correlated!</span>`)}
    `)}
  </div>`;
}

// ──────────────────────────────────────────
// INTERMEDIATE SECTION
// ──────────────────────────────────────────
function renderIntermediate() {
  const el = document.getElementById('intermediateContent');
  el.innerHTML = `
  <div class="lesson-grid">
    ${lessonCard('blue','MODULE 1','🔀','Quantum Gates & Matrices','Master single and multi-qubit gates: X, Y, Z, H, S, T, CNOT, SWAP, Toffoli.','60 min',8)}
    ${lessonCard('blue','MODULE 2','⚙️','Quantum Circuits Design','Build complex circuits: teleportation, superdense coding and error detection.','75 min',7)}
    ${lessonCard('blue','MODULE 3','\ud83d\udd0d','Grover\u2019s Search Algorithm','Quadratic speedup for unstructured search \u2014 oracle, diffuser and amplitude amplification.','80 min',6)}
    ${lessonCard('blue','MODULE 4','\ud83d\udce1','Quantum Fourier Transform','The quantum analogue of DFT \u2014 backbone of Shor\u2019s algorithm and QPE.','70 min',6)}
    ${lessonCard('blue','MODULE 5','🔐','Quantum Cryptography','BB84 protocol, quantum key distribution, no-cloning theorem.','65 min',5)}
    ${lessonCard('blue','MODULE 6','🖥️','Qiskit Programming Deep Dive','Circuits, backends, noise models, Qiskit Aer simulation and real hardware.','120 min',10)}
    ${lessonCard('blue','MODULE 7','📊','Quantum Phase Estimation','QPE algorithm — phase kickback, controlled-U gates, inverse QFT and precision.','85 min',7)}
    ${lessonCard('blue','MODULE 8','💡','Deutsch & Simon Algorithms','Exponential speedup with Deutsch-Jozsa and Simon\u2019s period-finding problems.','55 min',5)}
  </div>
  <div class="win-panel">
    <div class="win-panel-title">🔬 Lab Exercises</div>
    ${accordionBlock(1,"Grover's Search – Step by Step", `
      <p>Grover's algorithm searches N items in O(√N) queries vs classical O(N).</p>
      <p style="margin-top:8px"><strong>Steps:</strong> Initialize → Oracle marks target → Diffuser amplifies → Measure</p>
      ${codeBlock('Qiskit – Grover 2-qubit', `<span class="kw">from</span> qiskit <span class="kw">import</span> QuantumCircuit
<span class="kw">from</span> qiskit_aer <span class="kw">import</span> AerSimulator

<span class="kw">def</span> <span class="fn">grover_circuit</span>():
    qc = QuantumCircuit(<span class="num">2</span>, <span class="num">2</span>)
    qc.h([<span class="num">0</span>, <span class="num">1</span>])          <span class="cm"># Hadamard – uniform superposition</span>
    <span class="cm"># Oracle: marks |11⟩</span>
    qc.cz(<span class="num">0</span>, <span class="num">1</span>)
    <span class="cm"># Diffuser: inversion about average</span>
    qc.h([<span class="num">0</span>, <span class="num">1</span>]); qc.x([<span class="num">0</span>, <span class="num">1</span>])
    qc.cz(<span class="num">0</span>, <span class="num">1</span>)
    qc.x([<span class="num">0</span>, <span class="num">1</span>]); qc.h([<span class="num">0</span>, <span class="num">1</span>])
    qc.measure([<span class="num">0</span>,<span class="num">1</span>], [<span class="num">0</span>,<span class="num">1</span>])
    <span class="kw">return</span> qc

result = AerSimulator().run(grover_circuit(), shots=<span class="num">1024</span>).result()
<span class="fn">print</span>(result.get_counts())  <span class="cm"># '11' dominates ≈ 100%</span>`)}
    `)}
    ${accordionBlock(2,'Quantum Fourier Transform Implementation', `
      <p>The QFT maps |j⟩ → (1/√N) Σₖ e^(2πijk/N)|k⟩</p>
      ${codeBlock('Qiskit – QFT', `<span class="kw">import</span> numpy <span class="kw">as</span> np
<span class="kw">from</span> qiskit <span class="kw">import</span> QuantumCircuit

<span class="kw">def</span> <span class="fn">qft</span>(n):
    qc = QuantumCircuit(n)
    <span class="kw">for</span> j <span class="kw">in</span> <span class="fn">range</span>(n):
        qc.h(j)
        <span class="kw">for</span> k <span class="kw">in</span> <span class="fn">range</span>(j+<span class="num">1</span>, n):
            qc.cp(np.pi / <span class="num">2</span>**(k-j), k, j)
    <span class="kw">for</span> i <span class="kw">in</span> <span class="fn">range</span>(n//<span class="num">2</span>):
        qc.swap(i, n-<span class="num">1</span>-i)
    <span class="kw">return</span> qc

<span class="fn">print</span>(qft(<span class="num">4</span>).draw())`)}
    `)}
  </div>`;
}

// ──────────────────────────────────────────
// ADVANCED SECTION
// ──────────────────────────────────────────
function renderAdvanced() {
  const el = document.getElementById('advancedContent');
  el.innerHTML = `
  <div class="lesson-grid">
    ${lessonCard('purple','MODULE 1','🤖','Quantum Machine Learning (QML)','Variational circuits, data encoding strategies, kernel methods and quantum advantage.','120 min',10)}
    ${lessonCard('purple','MODULE 2','⚡','VQE – Variational Quantum Eigensolver','Find ground-state energies of molecules — hybrid quantum-classical optimization.','90 min',8)}
    ${lessonCard('purple','MODULE 3','🎯','QAOA – Quantum Approx Optimization','Solve combinatorial optimization with quantum circuits — Max-Cut, TSP.','100 min',7)}
    ${lessonCard('purple','MODULE 4','🧠','Quantum Neural Networks','Parameterized quantum circuits as trainable models — PennyLane and Qiskit ML.','110 min',9)}
    ${lessonCard('purple','MODULE 5','🔒','Post-Quantum Cryptography','Lattice-based, hash-based and code-based algorithms resilient to quantum attacks.','80 min',7)}
    ${lessonCard('purple','MODULE 6','🧬','Quantum Chemistry Simulation','Simulating molecular Hamiltonians — Jordan-Wigner, Bravyi-Kitaev transforms.','95 min',8)}
  </div>
  <div class="win-panel">
    <div class="win-panel-title">🧠 Advanced Labs</div>
    ${accordionBlock(1,'Variational Quantum Eigensolver (VQE)', `
      <p>VQE finds the minimum eigenvalue of a Hamiltonian using a classical optimizer with a quantum cost function:</p>
      <p style="margin:8px 0"><strong>E(θ) = ⟨ψ(θ)|H|ψ(θ)⟩</strong></p>
      ${codeBlock('PennyLane – VQE H₂ molecule', `<span class="kw">import</span> pennylane <span class="kw">as</span> qml
<span class="kw">import</span> numpy <span class="kw">as</span> np

<span class="cm"># Define device and circuit</span>
dev = qml.device(<span class="st">"default.qubit"</span>, wires=<span class="num">4</span>)

@qml.qnode(dev)
<span class="kw">def</span> <span class="fn">circuit</span>(params):
    qml.BasisState(np.array([<span class="num">1</span>,<span class="num">1</span>,<span class="num">0</span>,<span class="num">0</span>]), wires=[<span class="num">0</span>,<span class="num">1</span>,<span class="num">2</span>,<span class="num">3</span>])
    qml.DoubleExcitation(params[<span class="num">0</span>], wires=[<span class="num">0</span>,<span class="num">1</span>,<span class="num">2</span>,<span class="num">3</span>])
    <span class="kw">return</span> qml.expval(H)  <span class="cm"># H = molecular Hamiltonian</span>

opt = qml.GradientDescentOptimizer(stepsize=<span class="num">0.4</span>)
theta = np.array([<span class="num">0.0</span>], requires_grad=<span class="kw">True</span>)
<span class="kw">for</span> i <span class="kw">in</span> <span class="fn">range</span>(<span class="num">100</span>):
    theta = opt.step(circuit, theta)
<span class="fn">print</span>(<span class="st">f"Ground state energy: {circuit(theta):.4f} Ha"</span>)`)}
    `)}
    ${accordionBlock(2,'Quantum Neural Network (QNN)', `
      <p>A QNN replaces classical neuron layers with parameterized quantum circuits (PQC). Data is encoded via angle-encoding and optimized via gradient descent.</p>
      ${codeBlock('Qiskit ML – QNN Classifier', `<span class="kw">from</span> qiskit_machine_learning.neural_networks <span class="kw">import</span> SamplerQNN
<span class="kw">from</span> qiskit_machine_learning.algorithms <span class="kw">import</span> NeuralNetworkClassifier
<span class="kw">from</span> qiskit.circuit.library <span class="kw">import</span> ZZFeatureMap, RealAmplitudes

feature_map = ZZFeatureMap(feature_dimension=<span class="num">2</span>, reps=<span class="num">2</span>)
ansatz     = RealAmplitudes(num_qubits=<span class="num">2</span>, reps=<span class="num">2</span>)
qnn = SamplerQNN(circuit=feature_map.compose(ansatz), ...)
classifier = NeuralNetworkClassifier(qnn, optimizer=<span class="st">"COBYLA"</span>)
classifier.fit(X_train, y_train)
<span class="fn">print</span>(<span class="st">f"Accuracy: {classifier.score(X_test, y_test):.2%}"</span>)`)}
    `)}
  </div>`;
}

// ──────────────────────────────────────────
// QUANTUM GATES SECTION
// ──────────────────────────────────────────
function renderGates() {
  const el = document.getElementById('gatesContent');

  const gates = [
    {name:'Hadamard (H)', desc:'Creates equal superposition. Maps |0⟩→|+⟩ and |1⟩→|−⟩',
     matrix:'H = (1/√2) [ 1  1 ]\n              [ 1 -1 ]',
     svg: hadamardSVG()},
    {name:'Pauli-X (NOT)', desc:'Quantum bit-flip gate. Maps |0⟩↔|1⟩ — analogous to classical NOT.',
     matrix:'X = [ 0  1 ]\n    [ 1  0 ]', svg: pauliXSVG()},
    {name:'Pauli-Z (Phase)', desc:'Flips the phase of |1⟩. Maps |0⟩→|0⟩ and |1⟩→−|1⟩',
     matrix:'Z = [ 1  0 ]\n    [ 0 -1 ]', svg: pauliZSVG()},
    {name:'CNOT (CX)', desc:'Two-qubit controlled-NOT. Flips target qubit if control is |1⟩.',
     matrix:'CX = [ 1 0 0 0 ]\n     [ 0 1 0 0 ]\n     [ 0 0 0 1 ]\n     [ 0 0 1 0 ]', svg: cnotSVG()},
    {name:'Toffoli (CCX)', desc:'Three-qubit gate. Flips target if BOTH control qubits are |1⟩. Universal gate.',
     matrix:'CCX = 8×8 permutation\n(flips |111⟩ → |110⟩)', svg: toffoliSVG()},
    {name:'S Gate (Phase √Z)', desc:'Quarter-turn phase gate. S = Z^(1/2). Used in QFT.',
     matrix:'S = [ 1  0 ]\n    [ 0  i ]', svg: sGateSVG()},
    {name:'T Gate (π/8)', desc:'Eighth-turn phase gate. T = Z^(1/4). Critical for universal computation.',
     matrix:'T = [ 1    0   ]\n    [ 0  e^iπ/4 ]', svg: tGateSVG()},
    {name:'SWAP Gate', desc:'Swaps state of two qubits. Can be decomposed into 3 CNOT gates.',
     matrix:'SWAP = [ 1 0 0 0 ]\n       [ 0 0 1 0 ]\n       [ 0 1 0 0 ]\n       [ 0 0 0 1 ]', svg: swapSVG()},
  ];

  // Full circuit example
  const circuitExample = `
  <div class="win-panel" style="margin-bottom:16px">
    <div class="win-panel-title">🔬 Bell State Circuit — Visual Diagram</div>
    <div style="padding:20px;overflow-x:auto">${bellCircuitSVG()}</div>
    <div style="padding:12px 18px;font-size:12.5px;color:var(--muted);border-top:1px solid var(--border)">
      <strong>Bell State |Φ⁺⟩ = (|00⟩ + |11⟩)/√2</strong> — Created by H gate on q₀ followed by CNOT(q₀→q₁). Measuring always gives correlated outcomes: both 0 or both 1.
    </div>
  </div>`;

  el.innerHTML = circuitExample + `<div class="gates-grid">` +
    gates.map(g => `
    <div class="gate-card">
      <div class="gate-name">${g.name}</div>
      <div class="gate-desc">${g.desc}</div>
      <div class="gate-svg-wrap">${g.svg}</div>
      <div class="gate-matrix">${g.matrix}</div>
    </div>`).join('') + `</div>`;
}

// Gate SVGs
function hadamardSVG() {
  return `<svg width="120" height="60" viewBox="0 0 120 60">
    <line x1="0" y1="30" x2="30" y2="30" stroke="#ccc" stroke-width="2"/>
    <rect x="30" y="15" width="60" height="30" rx="4" fill="white" stroke="#0078d4" stroke-width="2"/>
    <text x="60" y="35" text-anchor="middle" font-size="18" font-weight="700" fill="#0078d4" font-family="JetBrains Mono">H</text>
    <line x1="90" y1="30" x2="120" y2="30" stroke="#ccc" stroke-width="2"/>
  </svg>`;
}
function pauliXSVG() {
  return `<svg width="120" height="60" viewBox="0 0 120 60">
    <line x1="0" y1="30" x2="30" y2="30" stroke="#ccc" stroke-width="2"/>
    <rect x="30" y="15" width="60" height="30" rx="4" fill="white" stroke="#107c10" stroke-width="2"/>
    <text x="60" y="35" text-anchor="middle" font-size="18" font-weight="700" fill="#107c10" font-family="JetBrains Mono">X</text>
    <line x1="90" y1="30" x2="120" y2="30" stroke="#ccc" stroke-width="2"/>
  </svg>`;
}
function pauliZSVG() {
  return `<svg width="120" height="60" viewBox="0 0 120 60">
    <line x1="0" y1="30" x2="30" y2="30" stroke="#ccc" stroke-width="2"/>
    <rect x="30" y="15" width="60" height="30" rx="4" fill="white" stroke="#5c2d91" stroke-width="2"/>
    <text x="60" y="35" text-anchor="middle" font-size="18" font-weight="700" fill="#5c2d91" font-family="JetBrains Mono">Z</text>
    <line x1="90" y1="30" x2="120" y2="30" stroke="#ccc" stroke-width="2"/>
  </svg>`;
}
function cnotSVG() {
  return `<svg width="140" height="100" viewBox="0 0 140 100">
    <line x1="0" y1="30" x2="140" y2="30" stroke="#ccc" stroke-width="2"/>
    <line x1="0" y1="75" x2="140" y2="75" stroke="#ccc" stroke-width="2"/>
    <line x1="70" y1="30" x2="70" y2="58" stroke="#0078d4" stroke-width="2"/>
    <circle cx="70" cy="30" r="6" fill="#0078d4"/>
    <circle cx="70" cy="75" r="14" fill="white" stroke="#0078d4" stroke-width="2"/>
    <line x1="56" y1="75" x2="84" y2="75" stroke="#0078d4" stroke-width="2"/>
    <line x1="70" y1="61" x2="70" y2="89" stroke="#0078d4" stroke-width="2"/>
  </svg>`;
}
function toffoliSVG() {
  return `<svg width="140" height="140" viewBox="0 0 140 140">
    <line x1="0" y1="25" x2="140" y2="25" stroke="#ccc" stroke-width="2"/>
    <line x1="0" y1="70" x2="140" y2="70" stroke="#ccc" stroke-width="2"/>
    <line x1="0" y1="115" x2="140" y2="115" stroke="#ccc" stroke-width="2"/>
    <line x1="70" y1="25" x2="70" y2="101" stroke="#0078d4" stroke-width="2"/>
    <circle cx="70" cy="25" r="6" fill="#0078d4"/>
    <circle cx="70" cy="70" r="6" fill="#0078d4"/>
    <circle cx="70" cy="115" r="14" fill="white" stroke="#0078d4" stroke-width="2"/>
    <line x1="56" y1="115" x2="84" y2="115" stroke="#0078d4" stroke-width="2"/>
    <line x1="70" y1="101" x2="70" y2="129" stroke="#0078d4" stroke-width="2"/>
  </svg>`;
}
function sGateSVG() {
  return `<svg width="120" height="60" viewBox="0 0 120 60">
    <line x1="0" y1="30" x2="30" y2="30" stroke="#ccc" stroke-width="2"/>
    <rect x="30" y="15" width="60" height="30" rx="4" fill="white" stroke="#da6a00" stroke-width="2"/>
    <text x="60" y="35" text-anchor="middle" font-size="18" font-weight="700" fill="#da6a00" font-family="JetBrains Mono">S</text>
    <line x1="90" y1="30" x2="120" y2="30" stroke="#ccc" stroke-width="2"/>
  </svg>`;
}
function tGateSVG() {
  return `<svg width="120" height="60" viewBox="0 0 120 60">
    <line x1="0" y1="30" x2="30" y2="30" stroke="#ccc" stroke-width="2"/>
    <rect x="30" y="15" width="60" height="30" rx="4" fill="white" stroke="#d13438" stroke-width="2"/>
    <text x="60" y="35" text-anchor="middle" font-size="18" font-weight="700" fill="#d13438" font-family="JetBrains Mono">T</text>
    <line x1="90" y1="30" x2="120" y2="30" stroke="#ccc" stroke-width="2"/>
  </svg>`;
}
function swapSVG() {
  return `<svg width="140" height="100" viewBox="0 0 140 100">
    <line x1="0" y1="30" x2="140" y2="30" stroke="#ccc" stroke-width="2"/>
    <line x1="0" y1="75" x2="140" y2="75" stroke="#ccc" stroke-width="2"/>
    <line x1="70" y1="30" x2="70" y2="75" stroke="#5c2d91" stroke-width="2"/>
    <line x1="62" y1="22" x2="78" y2="38" stroke="#5c2d91" stroke-width="2.5"/>
    <line x1="78" y1="22" x2="62" y2="38" stroke="#5c2d91" stroke-width="2.5"/>
    <line x1="62" y1="67" x2="78" y2="83" stroke="#5c2d91" stroke-width="2.5"/>
    <line x1="78" y1="67" x2="62" y2="83" stroke="#5c2d91" stroke-width="2.5"/>
  </svg>`;
}
function bellCircuitSVG() {
  return `<svg width="500" height="120" viewBox="0 0 500 120" style="max-width:100%">
    <!-- Qubit labels -->
    <text x="10" y="45" font-size="13" font-weight="600" fill="#333" font-family="JetBrains Mono">q₀</text>
    <text x="10" y="90" font-size="13" font-weight="600" fill="#333" font-family="JetBrains Mono">q₁</text>
    <!-- Wires -->
    <line x1="35" y1="38" x2="480" y2="38" stroke="#999" stroke-width="1.5"/>
    <line x1="35" y1="83" x2="480" y2="83" stroke="#999" stroke-width="1.5"/>
    <!-- H Gate -->
    <rect x="60" y="22" width="50" height="32" rx="4" fill="white" stroke="#0078d4" stroke-width="2"/>
    <text x="85" y="44" text-anchor="middle" font-size="16" font-weight="700" fill="#0078d4" font-family="JetBrains Mono">H</text>
    <!-- CNOT -->
    <line x1="175" y1="38" x2="175" y2="68" stroke="#0078d4" stroke-width="2"/>
    <circle cx="175" cy="38" r="7" fill="#0078d4"/>
    <circle cx="175" cy="83" r="15" fill="white" stroke="#0078d4" stroke-width="2"/>
    <line x1="160" y1="83" x2="190" y2="83" stroke="#0078d4" stroke-width="2"/>
    <line x1="175" y1="68" x2="175" y2="98" stroke="#0078d4" stroke-width="2"/>
    <!-- Measure q0 -->
    <rect x="240" y="22" width="50" height="32" rx="4" fill="#f0f6ff" stroke="#0078d4" stroke-width="2"/>
    <text x="265" y="37" text-anchor="middle" font-size="9" fill="#666" font-family="Inter">MEASURE</text>
    <path d="M252 45 Q265 33 278 45" fill="none" stroke="#0078d4" stroke-width="1.5"/>
    <line x1="265" y1="45" x2="272" y2="36" stroke="#0078d4" stroke-width="1.5"/>
    <!-- Measure q1 -->
    <rect x="240" y="67" width="50" height="32" rx="4" fill="#f0f6ff" stroke="#0078d4" stroke-width="2"/>
    <text x="265" y="82" text-anchor="middle" font-size="9" fill="#666" font-family="Inter">MEASURE</text>
    <path d="M252 90 Q265 78 278 90" fill="none" stroke="#0078d4" stroke-width="1.5"/>
    <line x1="265" y1="90" x2="272" y2="81" stroke="#0078d4" stroke-width="1.5"/>
    <!-- Output label -->
    <text x="320" y="45" font-size="12" fill="#555" font-family="Inter">|Φ⁺⟩ =</text>
    <text x="320" y="63" font-size="12" fill="#0078d4" font-family="JetBrains Mono">(|00⟩+|11⟩)/√2</text>
  </svg>`;
}
