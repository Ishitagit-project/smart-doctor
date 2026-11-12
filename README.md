# Smart Doctor — CarePoint Hospital Appointment Platform

**Smart Doctor** (*by CarePoint Hospital*) is a modern, responsive digital healthcare web application designed to connect patients with appropriate hospital doctors through an intelligent health assessment.

> **Tagline:** *Smart Healthcare. Better Care. Right on Time.*

---

## 🎨 Design System & Color Palette

As requested, the color palette strictly follows:
- **Primary Navy:** `#000080` (Trustworthy, deep hospital primary)
- **Slate / Steel Blue:** `#6D8196` (Muted labels, secondary borders, subtext)
- **Light Blue:** `#ADD8E6` (Clean healthcare accents, selection borders, active states)
- **Snow / Off-white:** `#FFFAFA` (Warm, sterile, welcoming surface background)
- **Clinical Urgency Accents:**
  - 🔴 **Red (`#DC2626`):** Very Urgent (Today / Tomorrow)
  - 🟠 **Orange / Amber (`#D97706`):** Moderate (Tomorrow / Later)
  - 🟢 **Green (`#059669`):** Not Urgent (Later this week)

---

## 🚀 How to Run

Because this project is built cleanly with standard **HTML5 + CSS3 + Vanilla JavaScript (ES6+)**, no installation or build step is required:

1. Double click **`index.html`** or right-click and choose **"Open with Chrome / Edge / Firefox"**.
2. Alternatively, run any local web server in this directory:
   ```bash
   npx serve .
   # or
   python -m http.server 8000
   ```

---

## 🌟 Interactive Journeys Included

### 1. Patient Journey (Booking & Triage)
- **Home Page:** Hero section, CarePoint stats, hospital status preview, 4-step process, 10 clinical departments, specialist directory.
- **Patient Sign In / Sign Up:** Clean authentication forms with one-click demo login buttons.
- **Patient Dashboard:** Morning greeting, active appointment cards, quick navigation to booking or history.
- **Health Assessment (M1 Clinical Questionnaire):**
  - Interactive questionnaire aligned with M1's triage classification dataset (`m1-model/data/medical_symptom_triage.csv`).
  - Collects 6 core clinical features: Patient Age, Biological Sex, Pre-existing Conditions, Primary Symptom, Secondary Symptom, Additional Signs.
  - Live progress indicator (`Question X of 6`), interactive option cards and numeric age input with quick brackets.
- **Assessment Processing Screen:**
  - Animated heartbeat radar simulation ("Analysing your responses...").
- **Assessment Result Screen:**
  - Categorizes patient into one of M1's three clinical urgency levels:
    - 🔴 **Very Urgent** (Red) → *Recommended: Today or Tomorrow*
    - 🟠 **Moderate** (Orange) → *Recommended: Tomorrow or Later*
    - 🟢 **Not Urgent** (Green) → *Recommended: Later this week*
  - Displays assessed clinical profile breakdown.
  - Automatically submits priority to the scheduling engine for intelligent doctor assignment (patients do not manually pick slots).
- **My Appointments:** Filter by *All*, *Upcoming*, *Completed*, or *Cancelled* with detail inspection.
- **Patient Profile:** Editable patient demographics and contact details.

### 2. Doctor Portal (Physician Workstation)
- **Doctor Login:** Dedicated portal sign-in with quick one-click demo login for **Dr. Rahul Sharma**.
- **Doctor Dashboard:**
  - Key stats cards (*Today's Appointments: 8*, *Upcoming: 14*, *Completed: 26*).
  - Live appointments table with priority badges (*Very Urgent*, *Moderate*, *Not Urgent*).
- **Patient Clinical Details Modal:** Inspects patient triage concerns, urgency reasons, and schedule details with the ability to mark consultations as completed.
- **Doctor Availability Manager:** Interactive interface to configure days, shift hours, and consultation availability.
- **Doctor Profile:** Manage doctor qualifications, department, and contact info.

---

## 📁 File Structure

```text
smart doctor/
├── index.html          # Semantic HTML structuring all SPA views & modals
├── css/
│   └── styles.css      # Design system, CSS variables, typography & responsive styles
├── js/
│   ├── data.js         # Mock data for departments, doctors, M1 assessment questions & triage logic
│   └── app.js          # SPA hash routing, state management, M1/M3 adapters & controllers
├── assets/             # Consultation hero imagery & graphics
├── m1-model/           # M1 Machine Learning Department repository (Ishika Singh)
│   ├── data/           # medical_symptom_triage.csv
│   ├── src/            # config.py, data_preprocessing.py, train.py, eda.py
│   └── requirements.txt
├── INTEGRATION_SPEC.md # Full technical specification for M1 & M3 contracts
└── README.md
└── README.md           # Documentation
```
