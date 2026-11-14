# Smart Doctor — CarePoint Hospital Appointment Platform

**Smart Doctor** (*by CarePoint Hospital*) is a modern, responsive digital healthcare web application designed to connect patients with appropriate hospital doctors through an intelligent health assessment.

> **Tagline:** *Smart Healthcare. Better Care. Right on Time.*

---

## 🏗️ Architecture Overview

The system brings together two core components:
1. **Frontend Platform (`index.html`, `css/`, `js/`):** Patient booking journey, 10-point clinical assessment questionnaire, AI triage result with slot selection (Tomorrow vs. Later), and downloadable official appointment slips.
2. **ML Urgency Classification (`app.py`, `src/`, `models/`, `data/`):** Machine Learning triage model trained on clinical symptom cases to predict urgency category (`Very Urgent`, `Moderate`, `Not Urgent`).

---

## 🎨 Design System & Color Palette

- **Primary Navy:** `#000080` (Trustworthy, deep hospital primary)
- **Slate / Steel Blue:** `#6D8196` (Muted labels, secondary borders, subtext)
- **Light Blue:** `#ADD8E6` (Clean healthcare accents, selection borders, active states)
- **Snow / Off-white:** `#FFFAFA` (Warm, sterile, welcoming surface background)
- **Clinical Urgency Accents:**
  - 🔴 **Red (`#DC2626`):** Very Urgent (Today / Tomorrow)
  - 🟠 **Orange / Amber (`#D97706`):** Moderate (Tomorrow / Later)
  - 🟢 **Green (`#059669`):** Not Urgent (Later this week)

---

## 🚀 How to Run the Frontend

Because the frontend is built with standard **HTML5 + CSS3 + Vanilla JavaScript (ES6+)**, no installation or build step is required:

1. Double click **`index.html`** or right-click and choose **"Open with Chrome / Edge / Firefox"**.
2. Alternatively, run any local web server:
   ```bash
   npx serve .
   # or
   python -m http.server 8000
   ```

---

## 🧠 Running the ML / Python Backend

To run Ishika's ML & scheduling backend:

```bash
# Install dependencies
pip install -r requirements.txt

# Start backend server
python app.py
```
Backend runs at `http://127.0.0.1:5000`.

---

## 🌟 Interactive Journeys Included

### 1. Patient Journey (Booking & Triage)
- **Home Page:** Hero section, CarePoint stats, hospital status preview, 4-step process, 10 clinical departments, specialist directory.
- **Patient Sign In / Sign Up:** Clean authentication forms with one-click demo login buttons.
- **Patient Dashboard:** Morning greeting, active appointment cards, quick navigation to booking or history.
- **Health Assessment (Clinical Questionnaire):**
  - Interactive questionnaire evaluating clinical symptoms, duration, pain intensity, pre-existing conditions.
  - Live progress indicator, interactive option cards, and smooth navigation.
- **Assessment Processing Screen:**
  - Animated heartbeat radar simulation ("Analysing your responses...").
- **Assessment Result Screen:**
  - Categorizes patient urgency (*Very Urgent*, *Moderate*, *Not Urgent*).
  - Slot choice selection (*Tomorrow* priority vs. *Day After Tomorrow*).
  - Downloadable official OPD Appointment Slip with token, barcode, and hospital letterhead.
- **My Appointments:** Filter by *All*, *Upcoming*, *Completed*, or *Cancelled* with detail inspection.
- **Patient Profile:** Editable patient demographics and contact details.

### 2. Doctor Portal (Physician Workstation)
- **Doctor Login:** Dedicated portal sign-in with quick one-click demo login for **Dr. Meera Iyer**.
- **Doctor Dashboard:** Key stats cards, live appointments table with priority badges.
- **Doctor Availability Manager:** Interactive interface to configure days, shift hours, and consultation availability.
- **Doctor Profile:** Manage doctor qualifications, department, and contact info.
