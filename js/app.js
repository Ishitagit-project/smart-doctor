/**
 * Smart Doctor - CarePoint Hospital Digital Platform
 * Application State, Routing & Interactive Controllers
 */

// Application Global State
const AppState = {
  currentUser: null, // null (guest), 'patient', or 'doctor'
  patientProfile: null,
  doctorProfile: null,
  appointments: [],
  currentAssessmentIndex: 0,
  assessmentAnswers: {},
  currentEvaluation: null,
  bookingFlow: {
    selectedDoctor: null,
    selectedDate: null,
    selectedSlot: null,
    priority: null
  },
  activeDocTab: 'dashboard'
};

// Initialize State from LocalStorage or Defaults
function initAppState() {
  const storedPatient = localStorage.getItem('carepoint_patient');
  AppState.patientProfile = storedPatient ? JSON.parse(storedPatient) : { ...INITIAL_PATIENT };

  const storedDoctor = localStorage.getItem('carepoint_doctor');
  AppState.doctorProfile = storedDoctor ? JSON.parse(storedDoctor) : { ...INITIAL_DOCTOR };

  const storedApts = localStorage.getItem('carepoint_appointments');
  AppState.appointments = storedApts ? JSON.parse(storedApts) : [ ...INITIAL_APPOINTMENTS ];

  const storedSession = localStorage.getItem('carepoint_session');
  if (storedSession === 'patient' || storedSession === 'doctor') {
    AppState.currentUser = storedSession;
  } else {
    AppState.currentUser = null;
  }
}

function saveAppointments() {
  localStorage.setItem('carepoint_appointments', JSON.stringify(AppState.appointments));
}

function savePatientProfile() {
  localStorage.setItem('carepoint_patient', JSON.stringify(AppState.patientProfile));
}

function saveDoctorProfile() {
  localStorage.setItem('carepoint_doctor', JSON.stringify(AppState.doctorProfile));
}

// Icon SVG helper
const Icons = {
  'heart-pulse': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/><path d="M3.22 12H9.5l.5-1 2 4.5 2-7 1.5 3.5h4.27"/></svg>`,
  'bone': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 10c.7-.7 1.69-1 2.5-1a2.5 2.5 0 1 1 0 5c-.28 0-.54-.04-.79-.11L7.1 21.7a2.5 2.5 0 1 1-3.8-3.8l7.8-11.61A2.5 2.5 0 0 1 11 5.5a2.5 2.5 0 1 1 5 0c0 .81-.3 1.8-1 2.5"/></svg>`,
  'brain': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 4.44-2.04Z"/><path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-4.44-2.04Z"/></svg>`,
  'sparkles': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/><path d="M5 3v4"/><path d="M19 17v4"/><path d="M3 5h4"/><path d="M17 19h4"/></svg>`,
  'stethoscope': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4.8 2.3A.3.3 0 1 0 5 2H4a2 2 0 0 0-2 2v5a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6V4a2 2 0 0 0-2-2h-1a.2.2 0 1 0 .3.3"/><path d="M8 15v1a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6v-4"/><circle cx="20" cy="10" r="2"/></svg>`,
  'lungs': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v20"/><path d="M12 8a5 5 0 0 0-5 5v5a3 3 0 0 0 3 3h2"/><path d="M12 8a5 5 0 0 1 5 5v5a3 3 0 0 1-3 3h-2"/></svg>`,
  'eye': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>`,
  'ear': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 8.5a6.5 6.5 0 1 1 13 0c0 6-6 6-6 10a3.5 3.5 0 1 1-7 0"/><path d="M15 8.5a2.5 2.5 0 0 0-5 0v1a2 2 0 1 1 0 4"/></svg>`,
  'pill': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m10.5 20.5 10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7Z"/><path d="m8.5 8.5 7 7"/></svg>`,
  'activity': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>`,
  'check': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>`,
  'calendar': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>`,
  'clock': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`,
  'user': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`,
  'arrow-right': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>`,
  'arrow-left': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>`,
  'shield-alert': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/></svg>`,
  'logout': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" x2="9" y1="12" y2="12"/></svg>`
};

// Toast notification helper
function showToast(message, type = 'info') {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `
    <span>${Icons['heart-pulse']}</span>
    <div>${message}</div>
  `;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

// Router & View Management
function navigateTo(viewId) {
  // Normalize viewId
  let cleanId = viewId.replace(/^#/, '') || 'home';

  // Protect Patient Views
  const patientProtectedViews = ['patient-dashboard', 'my-appointments', 'patient-profile', 'assessment', 'assessment-processing', 'assessment-result', 'doctor-select', 'appointment-datetime', 'confirmation'];
  if (patientProtectedViews.includes(cleanId) && AppState.currentUser !== 'patient') {
    // If not logged in as patient, default auto-sign-in as demo patient for a friction-free prototype experience!
    AppState.currentUser = 'patient';
    localStorage.setItem('carepoint_session', 'patient');
    showToast('Signed in as demo patient: John Doe');
  }

  // Protect Doctor Views
  const doctorProtectedViews = ['doctor-dashboard', 'doctor-appointments', 'doctor-availability', 'doctor-profile'];
  if (doctorProtectedViews.includes(cleanId) && AppState.currentUser !== 'doctor') {
    AppState.currentUser = 'doctor';
    localStorage.setItem('carepoint_session', 'doctor');
    showToast('Signed in as demo doctor: Dr. Rahul Sharma');
  }

  // Hide all views
  const views = document.querySelectorAll('.spa-view');
  views.forEach(v => v.classList.remove('active'));

  const targetView = document.getElementById(`view-${cleanId}`);
  if (targetView) {
    targetView.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  } else {
    // Fallback to home
    const homeView = document.getElementById('view-home');
    if (homeView) homeView.classList.add('active');
    cleanId = 'home';
  }

  // Update URL hash without causing recursive loop
  if (window.location.hash !== `#${cleanId}`) {
    window.history.pushState(null, '', `#${cleanId}`);
  }

  updateNavState(cleanId);
  updateDemoBarState(cleanId);

  // Trigger view-specific renderers
  handleViewMount(cleanId);
}

function updateNavState(currentView) {
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === `#${currentView}`) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });

  const patientBtn = document.getElementById('nav-patient-btn');
  const userGreeting = document.getElementById('nav-user-indicator');

  if (patientBtn && userGreeting) {
    if (AppState.currentUser === 'patient') {
      patientBtn.style.display = 'none';
      userGreeting.style.display = 'inline-flex';
      userGreeting.innerHTML = `<span>👤</span> ${AppState.patientProfile.name.split(' ')[0]}`;
    } else if (AppState.currentUser === 'doctor') {
      patientBtn.style.display = 'none';
      userGreeting.style.display = 'inline-flex';
      userGreeting.innerHTML = `<span>🩺</span> Dr. Sharma`;
    } else {
      patientBtn.style.display = 'inline-flex';
      userGreeting.style.display = 'none';
    }
  }

  // Hide main header and footer when in doctor portal for a dedicated full-portal feel
  const isDoctorPortal = currentView.startsWith('doctor-') && currentView !== 'doctor-login';
  const mainHeader = document.querySelector('.main-header');
  const mainFooter = document.querySelector('.main-footer');
  if (mainHeader) mainHeader.style.display = isDoctorPortal ? 'none' : 'block';
  if (mainFooter) mainFooter.style.display = isDoctorPortal ? 'none' : 'block';
}

function updateDemoBarState(currentView) {
  // Prototype demo bar removed per user customization
}

function handleViewMount(viewId) {
  switch (viewId) {
    case 'home':
      renderDepartments();
      renderHomeDoctors();
      break;
    case 'departments':
      renderDepartments();
      break;
    case 'doctors':
      renderHomeDoctors();
      break;
    case 'patient-dashboard':
      renderPatientDashboard();
      break;
    case 'assessment':
      renderAssessmentQuestion();
      break;
    case 'assessment-processing':
      startAssessmentProcessing();
      break;
    case 'assessment-result':
      renderAssessmentResult();
      break;

    case 'my-appointments':
      renderMyAppointmentsView();
      break;
    case 'patient-profile':
      renderPatientProfileView();
      break;
    case 'doctor-dashboard':
      renderDoctorDashboard();
      break;
    case 'doctor-appointments':
      renderDoctorAppointmentsView();
      break;
    case 'doctor-availability':
      renderDoctorAvailabilityView();
      break;
    case 'doctor-profile':
      renderDoctorProfileView();
      break;
  }
}

// -------------------------------------------------------------
// Component Renderers
// -------------------------------------------------------------

// Departments
function renderDepartments() {
  const container = document.getElementById('departments-list');
  if (!container) return;

  container.innerHTML = DEPARTMENTS.map(dept => `
    <div class="dept-card">
      <div>
        <div class="dept-icon-box">
          ${Icons[dept.icon] || Icons['stethoscope']}
        </div>
        <h3>${dept.name}</h3>
        <p>${dept.description}</p>
      </div>
      <div>
        <div class="dept-meta">
          <span>${dept.specialistsCount} Specialists</span>
          <span>${dept.floor}</span>
        </div>
        <a href="#doctors" onclick="navigateTo('doctors')" class="dept-link">
          View Specialists <span>→</span>
        </a>
      </div>
    </div>
  `).join('');
}

// Home Doctors Grid
function renderHomeDoctors() {
  const container = document.getElementById('doctors-list');
  if (!container) return;

  const displayDoctors = DOCTORS.slice(0, 6);
  container.innerHTML = displayDoctors.map(doc => `
    <div class="doc-card">
      <div class="doc-card-top">
        <span class="doc-avail-badge">
          <span class="badge-dot" style="background-color: #059669"></span>
          ${doc.availableStatus}
        </span>
        <img src="${doc.avatar}" alt="${doc.name}" loading="lazy" onerror="this.onerror=null; this.src='https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=400&q=80';">
      </div>
      <div class="doc-card-body">
        <h3 class="doc-name">${doc.name}</h3>
        <p class="doc-specialty">${doc.specialisation}</p>
        <div class="doc-qual-exp">
          <span>🎓 ${doc.qualification}</span>
          <span>⏳ ${doc.experienceYears} yrs exp</span>
        </div>
        <p class="doc-bio">${doc.bio}</p>
        <div class="doc-card-footer">
          <button class="btn btn-secondary btn-sm btn-block" onclick="openDoctorModal('${doc.id}')">
            View Profile
          </button>
        </div>
      </div>
    </div>
  `).join('');
}

// Patient Dashboard Renderer
function renderPatientDashboard() {
  const greetingEl = document.getElementById('patient-greeting-name');
  if (greetingEl) {
    greetingEl.textContent = AppState.patientProfile.name.split(' ')[0] || 'Patient';
  }

  // Find latest upcoming appointment
  const upcomingApt = AppState.appointments.find(a => a.status === 'Confirmed' || a.status === 'Upcoming');
  const container = document.getElementById('dash-upcoming-slot');

  if (container) {
    if (upcomingApt) {
      container.innerHTML = `
        <div class="apt-highlight-box">
          <div class="apt-highlight-doc">
            <img src="${getDoctorAvatar(upcomingApt.doctorId)}" alt="${upcomingApt.doctorName}" class="apt-doc-img">
            <div class="apt-doc-details">
              <h4>${upcomingApt.doctorName}</h4>
              <p>${upcomingApt.doctorSpecialisation} • ${upcomingApt.department}</p>
              <div style="margin-top: 0.35rem;">
                <span class="badge ${upcomingApt.priorityColor}">
                  <span class="badge-dot"></span>
                  ${upcomingApt.priority}
                </span>
                <span class="badge ice" style="margin-left: 0.35rem;">Confirmed</span>
              </div>
            </div>
          </div>
          <div class="apt-time-badge">
            <div class="date">${upcomingApt.date}</div>
            <div class="time">${upcomingApt.time}</div>
            <button class="btn btn-secondary btn-sm" style="margin-top: 0.5rem;" onclick="viewAppointmentDetail('${upcomingApt.id}')">
              View Details
            </button>
          </div>
        </div>
      `;
    } else {
      container.innerHTML = `
        <div style="text-align: center; padding: 2rem; background: var(--c-snow); border-radius: var(--radius-md);">
          <p style="color: var(--text-muted); margin-bottom: 1rem;">You have no upcoming appointments scheduled.</p>
          <button class="btn btn-primary btn-sm" onclick="navigateTo('assessment')">
            Book an Appointment Now
          </button>
        </div>
      `;
    }
  }
}

function getDoctorAvatar(docId) {
  const doc = DOCTORS.find(d => d.id === docId);
  return doc ? doc.avatar : 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=400&q=80';
}

// -------------------------------------------------------------
// Health Assessment Questionnaire Flow
// -------------------------------------------------------------
function renderAssessmentQuestion() {
  const qIndex = AppState.currentAssessmentIndex;
  const question = ASSESSMENT_QUESTIONS[qIndex];
  if (!question) return;

  const total = ASSESSMENT_QUESTIONS.length;
  const currentStep = qIndex + 1;
  const progressPercent = Math.round((currentStep / total) * 100);

  // Update progress headers
  const stepText = document.getElementById('assessment-step-display');
  if (stepText) stepText.textContent = `Question ${currentStep} of ${total}`;

  const progressFill = document.getElementById('assessment-progress-bar');
  if (progressFill) progressFill.style.width = `${progressPercent}%`;

  const questionTitle = document.getElementById('assessment-question-title');
  if (questionTitle) questionTitle.textContent = question.title;

  const questionSubtext = document.getElementById('assessment-question-subtext');
  if (questionSubtext) questionSubtext.textContent = question.subtitle;

  // Options / Input Container
  const optionsContainer = document.getElementById('assessment-options-list');
  if (optionsContainer) {
    if (question.type === 'number') {
      const currentVal = AppState.assessmentAnswers[question.id]?.value !== undefined
        ? AppState.assessmentAnswers[question.id].value
        : (AppState.patientProfile?.age || '');

      // Ensure initial answer is pre-populated if patient profile has age
      if (currentVal && !AppState.assessmentAnswers[question.id]) {
        AppState.assessmentAnswers[question.id] = {
          id: `num-${currentVal}`,
          value: parseInt(currentVal, 10),
          label: `${currentVal} years old`
        };
      }

      optionsContainer.innerHTML = `
        <div style="background: #ffffff; border: 2px solid var(--c-light-blue); border-radius: var(--radius-md); padding: 2rem; max-width: 460px; margin: 0 auto; text-align: center;">
          <label for="assessment-age-input" style="display: block; font-weight: 700; color: var(--c-navy); margin-bottom: 0.75rem; font-size: 1.125rem;">
            Enter Patient Age
          </label>
          <div style="display: flex; gap: 0.75rem; align-items: center; justify-content: center; margin-bottom: 1.25rem;">
            <input
              type="number"
              id="assessment-age-input"
              class="form-control"
              style="font-size: 1.75rem; font-weight: 700; text-align: center; width: 120px; height: 3.5rem; color: var(--c-navy); border: 2px solid var(--c-light-blue); border-radius: var(--radius-md);"
              placeholder="45"
              min="1"
              max="120"
              value="${currentVal}"
              oninput="handleAssessmentNumberInput(${question.id}, this.value)"
              autofocus
            />
            <span style="font-weight: 700; color: var(--c-steel); font-size: 1.125rem;">Years Old</span>
          </div>
          <div style="border-top: 1px solid var(--surface-border-subtle); padding-top: 1rem;">
            <div style="font-size: 0.8125rem; color: var(--text-muted); margin-bottom: 0.5rem; font-weight: 600;">Quick Select Bracket:</div>
            <div style="display: flex; gap: 0.5rem; justify-content: center; flex-wrap: wrap;">
              ${[18, 28, 42, 58, 68].map(a => `
                <button type="button" class="btn btn-secondary btn-sm" onclick="setQuickAge(${question.id}, ${a})">${a} yrs</button>
              `).join('')}
            </div>
          </div>
        </div>
      `;
    } else if (question.options) {
      const selectedAnswerId = AppState.assessmentAnswers[question.id]?.id;

      optionsContainer.innerHTML = question.options.map(opt => `
        <div class="option-card ${selectedAnswerId === opt.id ? 'selected' : ''}" onclick="selectAssessmentOption(${question.id}, '${opt.id}')">
          <div class="option-radio"></div>
          <div class="option-content">
            <div class="option-label">
              ${opt.label}
              ${opt.badge ? `<span class="badge urgent" style="margin-left: 0.5rem; font-size: 0.6875rem;">${opt.badge}</span>` : ''}
            </div>
            ${opt.description ? `<div class="option-description">${opt.description}</div>` : ''}
          </div>
        </div>
      `).join('');
    }
  }

  // Update navigation buttons
  const prevBtn = document.getElementById('assessment-prev-btn');
  if (prevBtn) {
    prevBtn.style.visibility = qIndex === 0 ? 'hidden' : 'visible';
  }

  const nextBtn = document.getElementById('assessment-next-btn');
  if (nextBtn) {
    if (currentStep === total) {
      nextBtn.innerHTML = `Submit for AI Triage ${Icons['arrow-right']}`;
      nextBtn.className = 'btn btn-primary';
    } else {
      nextBtn.innerHTML = `Next ${Icons['arrow-right']}`;
      nextBtn.className = 'btn btn-primary';
    }
  }
}

// =========================================================================
// M1 (ML Dept) & M3 (Backend Dept) Service Adapters
// =========================================================================

const CONFIG = {
  USE_LIVE_BACKEND: false,
  M3_API_BASE: 'http://localhost:5000/api',
  M1_ML_ENDPOINT: 'http://localhost:5000/api/triage/evaluate'
};

/**
 * M1 - Machine Learning Department Adapter
 * Handles clinical triage prediction based on M1's trained classification model.
 * Input features strictly matching M1 dataset: age, gender, comorbidities, symptom_1, symptom_2, symptom_3.
 */
const M1_ML_Service = {
  buildPayload(answersList, patientProfile) {
    const payload = {
      age: patientProfile?.age || 35,
      gender: patientProfile?.gender || 'Male',
      comorbidities: 'None',
      symptom_1: 'fever',
      symptom_2: 'fatigue',
      symptom_3: 'weakness'
    };

    answersList.forEach(item => {
      const q = (typeof ASSESSMENT_QUESTIONS !== 'undefined' ? ASSESSMENT_QUESTIONS : []).find(question => question.id === item.questionId);
      if (q && q.fieldName) {
        if (q.fieldName === 'age') {
          payload.age = parseInt(item.option?.value !== undefined ? item.option.value : item.option, 10) || payload.age;
        } else {
          payload[q.fieldName] = item.option?.value || item.option?.label || item.option;
        }
      }
    });

    return payload;
  },

  async evaluateTriage(answersList, patientProfile) {
    const payload = this.buildPayload(answersList, patientProfile);

    if (CONFIG.USE_LIVE_BACKEND) {
      try {
        const response = await fetch(CONFIG.M1_ML_ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        if (response.ok) {
          const result = await response.json();
          return this.formatM1Output(result, payload);
        }
      } catch (err) {
        console.warn('Live ML triage endpoint unreachable, falling back to local model:', err);
      }
    }
    // Fallback: Local simulated clinical triage evaluator (js/data.js)
    return evaluateAssessmentPriority(payload);
  },

  formatM1Output(m1Response, payload) {
    const rawPriority = m1Response.urgency || m1Response.priority || m1Response.prediction || 'Moderate';
    if (rawPriority === 'High' || rawPriority === 'Very Urgent') {
      return {
        level: 'Very Urgent',
        badgeClass: 'urgent',
        color: '#DC2626',
        bgTint: '#FEE2E2',
        headline: 'High-priority appointment',
        recommendedWindow: 'Today or Tomorrow',
        description: 'Your responses indicate symptoms that require prompt clinical review. We strongly advise securing a consultation within 24 hours.',
        urgencyCode: 'High',
        features: payload
      };
    } else if (rawPriority === 'Medium' || rawPriority === 'Moderate') {
      return {
        level: 'Moderate',
        badgeClass: 'moderate',
        color: '#D97706',
        bgTint: '#FEF3C7',
        headline: 'Medium-priority appointment',
        recommendedWindow: 'Tomorrow or Later',
        description: 'Your assessment highlights noticeable symptoms that should be examined by a specialist within 1 to 2 days.',
        urgencyCode: 'Medium',
        features: payload
      };
    } else {
      return {
        level: 'Not Urgent',
        badgeClass: 'not-urgent',
        color: '#059669',
        bgTint: '#D1FAE5',
        headline: 'Lower-priority appointment',
        recommendedWindow: 'Later this week',
        description: 'Your responses do not indicate an acute emergency. You can comfortably schedule a routine or follow-up slot anytime this week.',
        urgencyCode: 'Low',
        features: payload
      };
    }
  }
};

/**
 * M3 - Backend Department Adapter
 * Handles database persistence and REST API operations.
 */
const M3_Backend_Service = {
  async saveAppointment(newAppointment) {
    if (CONFIG.USE_LIVE_BACKEND) {
      try {
        const response = await fetch(`${CONFIG.M3_API_BASE}/appointments`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newAppointment)
        });
        if (response.ok) {
          return await response.json();
        }
      } catch (err) {
        console.warn('Backend database unreachable, falling back to localStorage:', err);
      }
    }
    // Fallback: Browser LocalStorage database
    AppState.appointments.unshift(newAppointment);
    saveAppointments();
    return newAppointment;
  }
};

function selectAssessmentOption(questionId, optionId) {
  const question = ASSESSMENT_QUESTIONS.find(q => q.id === questionId);
  if (!question || !question.options) return;
  const option = question.options.find(o => o.id === optionId);
  AppState.assessmentAnswers[questionId] = option;
  renderAssessmentQuestion();
}

function handleAssessmentNumberInput(questionId, val) {
  const num = parseInt(val, 10);
  if (!isNaN(num) && num > 0) {
    AppState.assessmentAnswers[questionId] = {
      id: `num-${num}`,
      value: num,
      label: `${num} years old`
    };
  } else {
    delete AppState.assessmentAnswers[questionId];
  }
}

function setQuickAge(questionId, val) {
  AppState.assessmentAnswers[questionId] = {
    id: `num-${val}`,
    value: val,
    label: `${val} years old`
  };
  renderAssessmentQuestion();
}

function assessmentNext() {
  const currentQ = ASSESSMENT_QUESTIONS[AppState.currentAssessmentIndex];
  if (!AppState.assessmentAnswers[currentQ.id]) {
    showToast(currentQ.type === 'number' ? 'Please enter a valid age before continuing.' : 'Please select an option before continuing.');
    return;
  }

  if (AppState.currentAssessmentIndex < ASSESSMENT_QUESTIONS.length - 1) {
    AppState.currentAssessmentIndex++;
    renderAssessmentQuestion();
  } else {
    // Submit Assessment -> Route to processing
    navigateTo('assessment-processing');
  }
}

function assessmentPrev() {
  if (AppState.currentAssessmentIndex > 0) {
    AppState.currentAssessmentIndex--;
    renderAssessmentQuestion();
  }
}

async function startAssessmentProcessing() {
  const answersList = Object.entries(AppState.assessmentAnswers).map(([qId, option]) => ({
    questionId: parseInt(qId),
    option
  }));

  // M1 ML Department: Predicts appointment priority ONLY (Patient Assessment -> Priority)
  const evaluation = await M1_ML_Service.evaluateTriage(answersList, AppState.patientProfile);

  AppState.currentEvaluation = evaluation;
  AppState.bookingFlow.priority = evaluation;

  // Smooth 2.2s transition for the UI processing radar animation
  setTimeout(() => {
    navigateTo('assessment-result');
  }, 2200);
}

function renderAssessmentResult() {
  const evalResult = AppState.currentEvaluation || evaluateAssessmentPriority([]);
  const resultCard = document.getElementById('assessment-result-card');
  if (!resultCard) return;

  const headerClass = evalResult.badgeClass;

  resultCard.innerHTML = `
    <div class="result-header ${headerClass}">
      <div class="result-pill-large badge ${evalResult.badgeClass}">
        <span class="badge-dot"></span>
        ${evalResult.level} Priority
      </div>
      <h2 class="result-headline">${evalResult.headline}</h2>
      <p class="result-recommendation">Recommended consultation window: <strong>${evalResult.recommendedWindow}</strong></p>
    </div>
    <div class="result-body">
      <div class="recommend-window-box">
        <h4>Target Appointment Window</h4>
        <div class="timeframe">${evalResult.recommendedWindow}</div>
        <p style="font-size: 0.8125rem; color: var(--text-muted); margin-top: 0.5rem;">
          ${evalResult.description}
        </p>
      </div>

      <div class="triage-disclaimer-note">
        <span style="color: var(--c-navy);">${Icons['shield-alert']}</span>
        <div>
          <strong>CarePoint Clinical Triage Note:</strong>
          Priority triage helps ensure patients with time-sensitive symptoms receive timely care. If you experience severe chest pain, sudden paralysis, or loss of consciousness, please call emergency services immediately.
        </div>
      </div>

      ${evalResult.features ? `
        <div style="background: var(--surface-bg-card); border: 1px solid var(--surface-border); border-radius: var(--radius-md); padding: 1rem 1.25rem; margin-bottom: 1.5rem; text-align: left;">
          <div style="font-size: 0.75rem; font-weight: 700; color: var(--c-steel); text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 0.75rem;">
            🧬 Evaluated Clinical Profile (ML Model Features)
          </div>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(130px, 1fr)); gap: 0.75rem; font-size: 0.8125rem;">
            <div><span style="color: var(--text-muted);">Age & Sex:</span> <strong style="color: var(--c-navy); display: block;">${evalResult.features.age || '—'} yrs, ${evalResult.features.gender || '—'}</strong></div>
            <div><span style="color: var(--text-muted);">Condition:</span> <strong style="color: var(--c-navy); display: block;">${evalResult.features.comorbidities || 'None'}</strong></div>
            <div><span style="color: var(--text-muted);">Primary:</span> <strong style="color: var(--c-navy); display: block;">${evalResult.features.symptom_1 || '—'}</strong></div>
            <div><span style="color: var(--text-muted);">Secondary:</span> <strong style="color: var(--c-navy); display: block;">${evalResult.features.symptom_2 || '—'}</strong></div>
            <div><span style="color: var(--text-muted);">Additional:</span> <strong style="color: var(--c-navy); display: block;">${evalResult.features.symptom_3 || '—'}</strong></div>
          </div>
        </div>
      ` : ''}

      <div class="result-actions">
        <div style="background: var(--c-snow); border: 2px solid var(--c-light-blue); border-radius: var(--radius-md); padding: 1.25rem; text-align: center; margin-bottom: 1rem;">
          <span style="font-size: 1.5rem;">🤖</span>
          <h4 style="color: var(--c-navy); margin: 0.5rem 0 0.25rem;">Priority Recorded Successfully</h4>
          <p style="font-size: 0.875rem; color: var(--c-steel); margin: 0;">Our intelligent system will now match you with the best available doctor based on your priority level and schedule your appointment automatically.</p>
        </div>
        <button class="btn btn-primary btn-block btn-lg" onclick="navigateTo('patient-dashboard')">
          Return to Dashboard
        </button>
        <button class="btn btn-secondary btn-block" onclick="restartAssessment()">
          Retake Assessment
        </button>
      </div>
    </div>
  `;
}

function restartAssessment() {
  AppState.currentAssessmentIndex = 0;
  AppState.assessmentAnswers = {};
  AppState.currentEvaluation = null;
  navigateTo('assessment');
}

// -------------------------------------------------------------
// Doctor Selection & Booking Flow
// -------------------------------------------------------------
// -------------------------------------------------------------
// My Appointments Screen
// -------------------------------------------------------------
let myAppointmentsFilter = 'all';

function renderMyAppointmentsView() {
  const listContainer = document.getElementById('my-appointments-list');
  if (!listContainer) return;

  let filtered = AppState.appointments;
  if (myAppointmentsFilter !== 'all') {
    filtered = AppState.appointments.filter(a => a.status.toLowerCase() === myAppointmentsFilter.toLowerCase());
  }

  if (filtered.length === 0) {
    listContainer.innerHTML = `
      <div style="text-align: center; padding: 3.5rem; background: #fff; border-radius: var(--radius-lg); border: 1px solid var(--surface-border);">
        <p style="color: var(--text-muted); margin-bottom: 1.25rem;">No appointments found in this category.</p>
        <button class="btn btn-primary" onclick="navigateTo('assessment')">Book an Appointment</button>
      </div>
    `;
    return;
  }

  listContainer.innerHTML = filtered.map(apt => `
    <div class="apt-card-item">
      <div class="apt-info-block">
        <img src="${getDoctorAvatar(apt.doctorId)}" alt="${apt.doctorName}" style="width: 3.5rem; height: 3.5rem; border-radius: var(--radius-md); object-fit: cover; border: 2px solid var(--c-ice);">
        <div>
          <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.25rem;">
            <h4 style="font-weight: 700; color: var(--c-navy);">${apt.doctorName}</h4>
            <span style="font-size: 0.75rem; color: var(--c-steel);">#${apt.id}</span>
          </div>
          <p style="font-size: 0.8125rem; color: var(--c-steel); margin-bottom: 0.35rem;">${apt.doctorSpecialisation} • ${apt.department}</p>
          <div style="display: flex; align-items: center; gap: 0.5rem;">
            <span class="badge ${apt.priorityColor}"><span class="badge-dot"></span>${apt.priority}</span>
            <span class="badge ${apt.status === 'Confirmed' ? 'ice' : 'neutral'}">${apt.status}</span>
          </div>
        </div>
      </div>
      <div style="text-align: right;">
        <div style="font-weight: 700; color: var(--c-navy);">${apt.date}</div>
        <div style="font-size: 0.8125rem; color: var(--c-steel); margin-bottom: 0.75rem;">${apt.time}</div>
        <div style="display: flex; gap: 0.5rem; justify-content: flex-end;">
          <button class="btn btn-secondary btn-sm" onclick="viewAppointmentDetail('${apt.id}')">Details</button>
          ${apt.status === 'Confirmed' ? `<button class="btn btn-danger btn-sm" onclick="cancelAppointment('${apt.id}')">Cancel</button>` : ''}
        </div>
      </div>
    </div>
  `).join('');
}

function filterMyAppointments(filterType) {
  myAppointmentsFilter = filterType;
  const tabBtns = document.querySelectorAll('.apt-tab-btn');
  tabBtns.forEach(btn => {
    if (btn.dataset.filter === filterType) {
      btn.className = 'btn btn-primary btn-sm apt-tab-btn';
    } else {
      btn.className = 'btn btn-secondary btn-sm apt-tab-btn';
    }
  });
  renderMyAppointmentsView();
}

function cancelAppointment(aptId) {
  if (confirm(`Are you sure you want to cancel appointment #${aptId}?`)) {
    const apt = AppState.appointments.find(a => a.id === aptId);
    if (apt) {
      apt.status = 'Cancelled';
      saveAppointments();
      renderMyAppointmentsView();
      showToast(`Appointment #${aptId} was cancelled.`);
    }
  }
}

// -------------------------------------------------------------
// Patient Profile
// -------------------------------------------------------------
function renderPatientProfileView() {
  const p = AppState.patientProfile;
  document.getElementById('prof-name').value = p.name || '';
  document.getElementById('prof-email').value = p.email || '';
  document.getElementById('prof-phone').value = p.phone || '';
  document.getElementById('prof-age').value = p.age || '';
  document.getElementById('prof-gender').value = p.gender || 'Male';

  const avatarText = document.getElementById('prof-avatar-letter');
  if (avatarText) {
    avatarText.textContent = (p.name || 'J')[0].toUpperCase();
  }
}

function savePatientProfileForm(e) {
  if (e) e.preventDefault();
  AppState.patientProfile.name = document.getElementById('prof-name').value;
  AppState.patientProfile.email = document.getElementById('prof-email').value;
  AppState.patientProfile.phone = document.getElementById('prof-phone').value;
  AppState.patientProfile.age = parseInt(document.getElementById('prof-age').value) || 30;
  AppState.patientProfile.gender = document.getElementById('prof-gender').value;

  savePatientProfile();
  showToast('Patient profile updated successfully!');
}

// -------------------------------------------------------------
// Doctor Portal Views
// -------------------------------------------------------------
function switchDoctorTab(tabName) {
  AppState.activeDocTab = tabName;
  const tabs = ['dashboard', 'appointments', 'availability', 'profile'];
  tabs.forEach(t => {
    const view = document.getElementById(`doc-view-${t}`);
    const navItem = document.getElementById(`doc-nav-${t}`);
    if (t === tabName) {
      if (view) view.style.display = 'block';
      if (navItem) navItem.classList.add('active');
    } else {
      if (view) view.style.display = 'none';
      if (navItem) navItem.classList.remove('active');
    }
  });

  if (tabName === 'dashboard') renderDoctorDashboard();
  if (tabName === 'appointments') renderDoctorAppointmentsView();
  if (tabName === 'availability') renderDoctorAvailabilityView();
  if (tabName === 'profile') renderDoctorProfileView();
}

function renderDoctorDashboard() {
  const tableBody = document.getElementById('doc-today-table-body');
  if (!tableBody) return;

  // Render stats
  const todayCount = AppState.appointments.length;
  const statToday = document.getElementById('doc-stat-today');
  if (statToday) statToday.textContent = todayCount;

  tableBody.innerHTML = AppState.appointments.map(apt => `
    <tr>
      <td><strong style="color: var(--c-navy);">${apt.time}</strong></td>
      <td>
        <strong>${apt.patientName}</strong>
        <div style="font-size: 0.75rem; color: var(--c-steel);">${apt.patientAge} yrs • ${apt.patientGender}</div>
      </td>
      <td>
        <span class="badge ${apt.priorityColor}">
          <span class="badge-dot"></span>
          ${apt.priority}
        </span>
      </td>
      <td>
        <span class="badge ${apt.status === 'Confirmed' ? 'ice' : 'neutral'}">${apt.status}</span>
      </td>
      <td>
        <button class="btn btn-secondary btn-sm" onclick="openDoctorAppointmentDetails('${apt.id}')">
          View Details
        </button>
      </td>
    </tr>
  `).join('');
}

function renderDoctorAppointmentsView() {
  const container = document.getElementById('doc-all-appointments-list');
  if (!container) return;

  container.innerHTML = AppState.appointments.map(apt => `
    <div class="apt-card-item">
      <div class="apt-info-block">
        <div style="width: 3rem; height: 3rem; border-radius: var(--radius-md); background: var(--c-ice-soft); display: flex; align-items: center; justify-content: center; color: var(--c-navy); font-weight: 800;">
          ${apt.patientName[0]}
        </div>
        <div>
          <h4 style="font-weight: 700; color: var(--c-navy);">${apt.patientName}</h4>
          <p style="font-size: 0.8125rem; color: var(--c-steel);">${apt.patientAge} years, ${apt.patientGender} • Phone: ${apt.patientPhone || '+91 98765 43210'}</p>
          <div style="margin-top: 0.25rem;">
            <span class="badge ${apt.priorityColor}"><span class="badge-dot"></span>${apt.priority}</span>
          </div>
        </div>
      </div>
      <div style="text-align: right;">
        <div style="font-weight: 700; color: var(--c-navy);">${apt.date} • ${apt.time}</div>
        <div style="font-size: 0.8125rem; color: var(--c-steel); margin-bottom: 0.5rem;">${apt.concern || 'Consultation'}</div>
        <button class="btn btn-secondary btn-sm" onclick="openDoctorAppointmentDetails('${apt.id}')">
          Patient Clinical Details
        </button>
      </div>
    </div>
  `).join('');
}

function renderDoctorAvailabilityView() {
  const daysContainer = document.getElementById('doc-availability-days');
  if (!daysContainer) return;

  const weekDays = [
    { day: 'Monday', active: true, slots: '09:00 AM – 05:00 PM', count: 8 },
    { day: 'Tuesday', active: true, slots: '09:00 AM – 05:00 PM', count: 8 },
    { day: 'Wednesday', active: true, slots: '09:00 AM – 05:00 PM', count: 8 },
    { day: 'Thursday', active: true, slots: '09:00 AM – 05:00 PM', count: 8 },
    { day: 'Friday', active: true, slots: '09:00 AM – 05:00 PM', count: 8 },
    { day: 'Saturday', active: false, slots: 'Off Duty', count: 0 },
    { day: 'Sunday', active: false, slots: 'Off Duty', count: 0 }
  ];

  daysContainer.innerHTML = weekDays.map((d, index) => `
    <div style="display: flex; align-items: center; justify-content: space-between; padding: 1rem 1.25rem; background: var(--c-snow); border-radius: var(--radius-md); margin-bottom: 0.75rem; border: 1px solid var(--surface-border);">
      <div>
        <strong style="color: var(--c-navy); font-size: 1rem;">${d.day}</strong>
        <div style="font-size: 0.8125rem; color: var(--c-steel);">${d.slots}</div>
      </div>
      <div style="display: flex; align-items: center; gap: 1rem;">
        <span class="badge ${d.active ? 'not-urgent' : 'neutral'}">${d.active ? 'Available' : 'Unavailable'}</span>
        <button class="btn btn-secondary btn-sm" onclick="toggleDoctorDay(${index})">Toggle</button>
      </div>
    </div>
  `).join('');
}

function toggleDoctorDay(index) {
  showToast('Availability schedule updated.');
}

function renderDoctorProfileView() {
  const d = AppState.doctorProfile;
  document.getElementById('doc-prof-name').value = d.name || '';
  document.getElementById('doc-prof-spec').value = d.specialisation || '';
  document.getElementById('doc-prof-qual').value = d.qualification || '';
  document.getElementById('doc-prof-dept').value = d.department || '';
  document.getElementById('doc-prof-phone').value = d.phone || '';
  document.getElementById('doc-prof-exp').value = d.experienceYears || 10;
}

function saveDoctorProfileForm(e) {
  if (e) e.preventDefault();
  AppState.doctorProfile.name = document.getElementById('doc-prof-name').value;
  AppState.doctorProfile.specialisation = document.getElementById('doc-prof-spec').value;
  AppState.doctorProfile.qualification = document.getElementById('doc-prof-qual').value;
  AppState.doctorProfile.department = document.getElementById('doc-prof-dept').value;
  AppState.doctorProfile.phone = document.getElementById('doc-prof-phone').value;
  AppState.doctorProfile.experienceYears = parseInt(document.getElementById('doc-prof-exp').value) || 12;

  saveDoctorProfile();
  showToast('Doctor profile settings updated!');
}

// -------------------------------------------------------------
// Modals & Details Drawers
// -------------------------------------------------------------
function openDoctorAppointmentDetails(aptId) {
  const apt = AppState.appointments.find(a => a.id === aptId);
  if (!apt) return;

  const modal = document.getElementById('details-modal');
  const modalContent = document.getElementById('details-modal-content');
  if (!modal || !modalContent) return;

  modalContent.innerHTML = `
    <div style="margin-bottom: 1.5rem; display: flex; justify-content: space-between; align-items: flex-start;">
      <div>
        <h4 style="font-size: 1.35rem; font-weight: 800; color: var(--c-navy);">${apt.patientName}</h4>
        <p style="font-size: 0.875rem; color: var(--c-steel);">${apt.patientAge} Years Old • ${apt.patientGender}</p>
        <p style="font-size: 0.8125rem; color: var(--text-muted); margin-top: 0.25rem;">Appointment ID: #${apt.id}</p>
      </div>
      <div style="text-align: right;">
        <span class="badge ${apt.priorityColor}" style="font-size: 0.875rem;">
          <span class="badge-dot"></span>
          ${apt.priority}
        </span>
      </div>
    </div>

    <div style="background: var(--c-snow); border: 1px solid var(--surface-border); border-radius: var(--radius-md); padding: 1.25rem; margin-bottom: 1.5rem;">
      <h5 style="font-size: 0.8125rem; text-transform: uppercase; color: var(--c-steel); margin-bottom: 0.5rem; letter-spacing: 0.04em;">Schedule Information</h5>
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem; font-size: 0.875rem;">
        <div><strong>Date:</strong> ${apt.date}</div>
        <div><strong>Time:</strong> ${apt.time}</div>
        <div><strong>Doctor:</strong> ${apt.doctorName}</div>
        <div><strong>Status:</strong> ${apt.status}</div>
      </div>
    </div>

    <div style="margin-bottom: 1.5rem;">
      <h5 style="font-size: 0.8125rem; text-transform: uppercase; color: var(--c-steel); margin-bottom: 0.5rem; letter-spacing: 0.04em;">Clinical Assessment Summary</h5>
      <div style="background: #fff; border-left: 3px solid var(--c-navy); padding: 0.85rem 1rem; border-radius: 0 var(--radius-sm) var(--radius-sm) 0; box-shadow: var(--shadow-sm);">
        <p style="font-weight: 600; color: var(--c-navy); margin-bottom: 0.35rem;">Primary Concern:</p>
        <p style="font-size: 0.875rem; color: var(--text-muted);">${apt.concern || 'Acute consultation requested'}</p>
        <p style="font-weight: 600; color: var(--c-navy); margin-top: 0.75rem; margin-bottom: 0.25rem;">Triage Rationale:</p>
        <p style="font-size: 0.875rem; color: var(--text-muted);">${apt.urgencyReason || 'Determined by clinical triage screening'}</p>
      </div>
    </div>

    <div style="display: flex; gap: 0.75rem; justify-content: flex-end;">
      <button class="btn btn-secondary" onclick="closeModal()">Close</button>
      <button class="btn btn-primary" onclick="markAppointmentDone('${apt.id}')">Mark Consultation Completed</button>
    </div>
  `;

  modal.classList.add('active');
}

function viewAppointmentDetail(aptId) {
  openDoctorAppointmentDetails(aptId);
}

function markAppointmentDone(aptId) {
  const apt = AppState.appointments.find(a => a.id === aptId);
  if (apt) {
    apt.status = 'Completed';
    saveAppointments();
    closeModal();
    showToast(`Appointment #${aptId} marked as Completed.`);
    if (AppState.currentUser === 'doctor') {
      renderDoctorDashboard();
    } else {
      renderMyAppointmentsView();
    }
  }
}

function openDoctorModal(docId) {
  const doc = DOCTORS.find(d => d.id === docId);
  if (!doc) return;

  const modal = document.getElementById('details-modal');
  const modalContent = document.getElementById('details-modal-content');
  if (!modal || !modalContent) return;

  modalContent.innerHTML = `
    <div style="display: flex; gap: 1.5rem; align-items: center; margin-bottom: 1.5rem;">
      <img src="${doc.avatar}" alt="${doc.name}" style="width: 5.5rem; height: 5.5rem; border-radius: var(--radius-md); object-fit: cover; border: 2px solid var(--c-ice);" onerror="this.onerror=null; this.src='https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=400&q=80';">
      <div>
        <h4 style="font-size: 1.4rem; font-weight: 800; color: var(--c-navy);">${doc.name}</h4>
        <p style="font-weight: 600; color: var(--c-steel);">${doc.specialisation}</p>
        <p style="font-size: 0.8125rem; color: var(--text-muted);">${doc.qualification}</p>
      </div>
    </div>
    <div style="margin-bottom: 1.25rem;">
      <h5 style="font-size: 0.8125rem; text-transform: uppercase; color: var(--c-steel); margin-bottom: 0.35rem;">About Doctor</h5>
      <p style="font-size: 0.9375rem; color: var(--text-muted); line-height: 1.6;">${doc.bio}</p>
    </div>
    <div style="background: var(--c-snow); padding: 1rem; border-radius: var(--radius-md); margin-bottom: 1.5rem;">
      <div style="display: flex; justify-content: space-between; font-size: 0.875rem;">
        <span><strong>Experience:</strong> ${doc.experienceYears} Years</span>
        <span><strong>Rating:</strong> ★ ${doc.rating} / 5.0</span>
        <span><strong>Available:</strong> ${doc.availableStatus}</span>
      </div>
    </div>
    <div style="display: flex; gap: 0.75rem; justify-content: flex-end;">
      <button class="btn btn-secondary" onclick="closeModal()">Close</button>
    </div>
  `;

  modal.classList.add('active');
}

function closeModal() {
  const modal = document.getElementById('details-modal');
  if (modal) modal.classList.remove('active');
}

// -------------------------------------------------------------
// Authentication Simulations
// -------------------------------------------------------------
function handlePatientLogin(e) {
  if (e) e.preventDefault();
  AppState.currentUser = 'patient';
  localStorage.setItem('carepoint_session', 'patient');
  showToast(`Welcome back, ${AppState.patientProfile.name}!`);
  navigateTo('patient-dashboard');
}

function handlePatientSignup(e) {
  if (e) e.preventDefault();
  const name = document.getElementById('signup-name').value || 'New Patient';
  const email = document.getElementById('signup-email').value || 'patient@example.com';
  const phone = document.getElementById('signup-phone').value || '+91 98765 00000';
  const age = parseInt(document.getElementById('signup-age').value) || 28;
  const gender = document.getElementById('signup-gender').value || 'Other';

  AppState.patientProfile = {
    ...AppState.patientProfile,
    name, email, phone, age, gender
  };
  savePatientProfile();

  AppState.currentUser = 'patient';
  localStorage.setItem('carepoint_session', 'patient');
  showToast(`Account created for ${name}!`);
  navigateTo('patient-dashboard');
}

function handleDoctorLogin(e) {
  if (e) e.preventDefault();
  AppState.currentUser = 'doctor';
  localStorage.setItem('carepoint_session', 'doctor');
  showToast(`Welcome, ${AppState.doctorProfile.name}!`);
  navigateTo('doctor-dashboard');
}

function handleLogout() {
  AppState.currentUser = null;
  localStorage.removeItem('carepoint_session');
  showToast('You have been logged out.');
  navigateTo('home');
}

function resetDemoData() {
  localStorage.clear();
  initAppState();
  showToast('Demo data reset to factory state.');
  navigateTo('home');
}

// -------------------------------------------------------------
// App Initialization
// -------------------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
  initAppState();

  // Handle browser back/forward buttons & initial hash
  window.addEventListener('hashchange', () => {
    const hash = window.location.hash || '#home';
    navigateTo(hash);
  });

  const initialHash = window.location.hash || '#home';
  navigateTo(initialHash);

  // Close modal when clicking on overlay background
  const modal = document.getElementById('details-modal');
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
  }
});
