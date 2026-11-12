/**
 * Smart Doctor - CarePoint Hospital Mock Database & Clinical Triage Data
 */

const DEPARTMENTS = [
  {
    id: 'cardiology',
    name: 'Cardiology',
    icon: 'heart-pulse',
    description: 'Comprehensive cardiovascular care, ECG, echocardiography, and hypertension management.',
    specialistsCount: 4,
    floor: 'Wing B, 3rd Floor'
  },
  {
    id: 'orthopaedics',
    name: 'Orthopaedics',
    icon: 'bone',
    description: 'Advanced joint replacement, sports injury treatment, fracture care, and spine surgery.',
    specialistsCount: 3,
    floor: 'Wing A, 1st Floor'
  },
  {
    id: 'neurology',
    name: 'Neurology',
    icon: 'brain',
    description: 'Diagnostic and therapeutic care for migraine, stroke recovery, epilepsy, and neuropathy.',
    specialistsCount: 3,
    floor: 'Wing C, 4th Floor'
  },
  {
    id: 'dermatology',
    name: 'Dermatology',
    icon: 'sparkles',
    description: 'Clinical skincare, acne treatments, allergy patch tests, and minor cutaneous surgeries.',
    specialistsCount: 2,
    floor: 'Wing D, 2nd Floor'
  },
  {
    id: 'general-medicine',
    name: 'General Medicine',
    icon: 'stethoscope',
    description: 'Primary care, acute viral illnesses, preventative wellness, and lifestyle disease management.',
    specialistsCount: 5,
    floor: 'Main Atrium, Ground Floor'
  },
  {
    id: 'pulmonology',
    name: 'Pulmonology',
    icon: 'lungs',
    description: 'Respiratory therapy, asthma and COPD management, allergy screenings, and lung function tests.',
    specialistsCount: 3,
    floor: 'Wing B, 2nd Floor'
  },
  {
    id: 'ophthalmology',
    name: 'Ophthalmology',
    icon: 'eye',
    description: 'Vision assessments, glaucoma screening, cataract evaluations, and retinal examinations.',
    specialistsCount: 2,
    floor: 'Wing E, 1st Floor'
  },
  {
    id: 'ent',
    name: 'ENT (Ear, Nose & Throat)',
    icon: 'ear',
    description: 'Sinus conditions, hearing loss diagnostics, throat infections, and allergy treatment.',
    specialistsCount: 3,
    floor: 'Wing D, 3rd Floor'
  },
  {
    id: 'gastroenterology',
    name: 'Gastroenterology',
    icon: 'pill',
    description: 'Digestive tract health, acid reflux treatment, liver screenings, and endoscopic consultations.',
    specialistsCount: 2,
    floor: 'Wing C, 2nd Floor'
  },
  {
    id: 'physiotherapy',
    name: 'Physiotherapy & Rehab',
    icon: 'activity',
    description: 'Post-operative rehabilitation, ergonomic physical therapy, mobility training, and pain relief.',
    specialistsCount: 4,
    floor: 'Wellness Center, Ground Floor'
  }
];

const DOCTORS = [
  {
    id: 'doc-1',
    name: 'Dr. Rahul Sharma',
    avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=400&q=80',
    specialisation: 'Cardiologist',
    departmentId: 'cardiology',
    qualification: 'MD (Cardiology), FACC',
    experienceYears: 14,
    rating: 4.9,
    reviewsCount: 142,
    availableStatus: 'Available Today',
    availableToday: true,
    bio: 'Lead Cardiologist at CarePoint Hospital specializing in preventative cardiology, coronary interventions, and rhythm disorders.',
    availableDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    slots: ['09:30 AM', '10:00 AM', '11:30 AM', '02:00 PM', '04:30 PM']
  },
  {
    id: 'doc-2',
    name: 'Dr. Elena Rostova',
    avatar: 'https://images.unsplash.com/photo-1594824813583-ce80ab78f7e2?auto=format&fit=crop&w=400&q=80',
    specialisation: 'Neurologist',
    departmentId: 'neurology',
    qualification: 'MD, PhD in Clinical Neurology',
    experienceYears: 11,
    rating: 4.8,
    reviewsCount: 98,
    availableStatus: 'Available Tomorrow',
    availableToday: false,
    bio: 'Specialist in neuropathic pain syndromes, chronic migraine therapeutics, and neurodegenerative disorders.',
    availableDays: ['Tuesday', 'Wednesday', 'Thursday', 'Saturday'],
    slots: ['10:00 AM', '11:00 AM', '02:30 PM', '04:00 PM']
  },
  {
    id: 'doc-3',
    name: 'Dr. Marcus Vance',
    avatar: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=400&q=80',
    specialisation: 'Orthopaedic Surgeon',
    departmentId: 'orthopaedics',
    qualification: 'MS (Ortho), FRCS',
    experienceYears: 16,
    rating: 4.9,
    reviewsCount: 215,
    availableStatus: 'Available Today',
    availableToday: true,
    bio: 'Expert in minimally invasive joint arthroscopy, ligament reconstruction, and sports traumatology.',
    availableDays: ['Monday', 'Wednesday', 'Friday'],
    slots: ['09:00 AM', '11:30 AM', '01:30 PM', '03:30 PM']
  },
  {
    id: 'doc-4',
    name: 'Dr. Ananya Iyer',
    avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=400&q=80',
    specialisation: 'General Physician',
    departmentId: 'general-medicine',
    qualification: 'MBBS, MD (Internal Medicine)',
    experienceYears: 9,
    rating: 4.7,
    reviewsCount: 164,
    availableStatus: 'Available Today',
    availableToday: true,
    bio: 'Dedicated primary care consultant focused on comprehensive health assessments, metabolic health, and acute illnesses.',
    availableDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    slots: ['09:00 AM', '10:30 AM', '11:45 AM', '03:00 PM', '05:00 PM']
  },
  {
    id: 'doc-5',
    name: 'Dr. David Chen',
    avatar: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=400&q=80',
    specialisation: 'Pulmonologist',
    departmentId: 'pulmonology',
    qualification: 'MD (Chest Medicine), FCCP',
    experienceYears: 13,
    rating: 4.9,
    reviewsCount: 110,
    availableStatus: 'Available Today',
    availableToday: true,
    bio: 'Senior chest specialist dealing with acute respiratory conditions, sleep apnea, severe bronchitis, and post-viral recovery.',
    availableDays: ['Monday', 'Tuesday', 'Thursday', 'Friday'],
    slots: ['10:00 AM', '12:00 PM', '02:00 PM', '04:00 PM']
  },
  {
    id: 'doc-6',
    name: 'Dr. Sophia Bennett',
    avatar: 'https://images.unsplash.com/photo-1651008376811-b90baee60c1f?auto=format&fit=crop&w=400&q=80',
    specialisation: 'Dermatologist',
    departmentId: 'dermatology',
    qualification: 'MD (Dermatology & Venereology)',
    experienceYears: 8,
    rating: 4.8,
    reviewsCount: 88,
    availableStatus: 'Available Tomorrow',
    availableToday: false,
    bio: 'Expert in clinical dermatology, inflammatory skin conditions, allergic eczema, and diagnostic dermatoscopy.',
    availableDays: ['Tuesday', 'Wednesday', 'Friday', 'Saturday'],
    slots: ['11:00 AM', '01:00 PM', '03:30 PM', '05:30 PM']
  },
  {
    id: 'doc-7',
    name: 'Dr. Farhan Akhtar',
    avatar: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&w=400&q=80',
    specialisation: 'ENT Specialist',
    departmentId: 'ent',
    qualification: 'MS (ENT), DLO',
    experienceYears: 12,
    rating: 4.7,
    reviewsCount: 79,
    availableStatus: 'Available Today',
    availableToday: true,
    bio: 'Specialized in endoscopic sinus care, vertigo management, middle ear pathology, and voice disorders.',
    availableDays: ['Monday', 'Tuesday', 'Wednesday', 'Friday'],
    slots: ['09:30 AM', '11:00 AM', '02:30 PM', '04:15 PM']
  },
  {
    id: 'doc-8',
    name: 'Dr. Rachel Green',
    avatar: 'https://images.unsplash.com/photo-1527613426441-4da17471b66d?auto=format&fit=crop&w=400&q=80',
    specialisation: 'Ophthalmologist',
    departmentId: 'ophthalmology',
    qualification: 'MS (Ophthalmology), FICO',
    experienceYears: 10,
    rating: 4.9,
    reviewsCount: 130,
    availableStatus: 'Available Today',
    availableToday: true,
    bio: 'Comprehensive eye surgeon treating ocular surface disorders, diabetic retinopathy, and refractive errors.',
    availableDays: ['Monday', 'Wednesday', 'Thursday', 'Saturday'],
    slots: ['10:00 AM', '11:30 AM', '01:30 PM', '03:00 PM']
  },
  {
    id: 'doc-9',
    name: 'Dr. Michael Chang',
    avatar: 'https://images.unsplash.com/photo-1622902046580-2b47f47f5471?auto=format&fit=crop&w=400&q=80',
    specialisation: 'Gastroenterologist',
    departmentId: 'gastroenterology',
    qualification: 'MD, DM (Gastroenterology)',
    experienceYears: 15,
    rating: 4.8,
    reviewsCount: 145,
    availableStatus: 'Available Tomorrow',
    availableToday: false,
    bio: 'Consultant gastroenterologist specializing in inflammatory bowel disease, hepatology, and diagnostic endoscopies.',
    availableDays: ['Tuesday', 'Thursday', 'Friday'],
    slots: ['10:30 AM', '01:00 PM', '03:00 PM', '04:30 PM']
  },
  {
    id: 'doc-10',
    name: 'Dr. Priya Patel',
    avatar: 'https://images.unsplash.com/photo-1584467735815-f778f274e296?auto=format&fit=crop&w=400&q=80',
    specialisation: 'Chief Physiotherapist',
    departmentId: 'physiotherapy',
    qualification: 'MPT (Musculoskeletal & Sports)',
    experienceYears: 7,
    rating: 4.9,
    reviewsCount: 102,
    availableStatus: 'Available Today',
    availableToday: true,
    bio: 'Specialist in biomechanics, rehabilitation from orthopaedic surgeries, ergonomic spine care, and active kinetic recovery.',
    availableDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    slots: ['09:00 AM', '10:30 AM', '02:00 PM', '03:30 PM', '05:00 PM']
  }
];

const ASSESSMENT_QUESTIONS = [
  {
    id: 1,
    title: 'Patient Age',
    subtitle: "Please enter the patient's age in years.",
    type: 'number',
    placeholder: 'e.g. 45',
    min: 1,
    max: 120,
    fieldName: 'age'
  },
  {
    id: 2,
    title: 'Gender',
    subtitle: "What is the patient's biological sex?",
    type: 'options',
    fieldName: 'gender',
    options: [
      { id: 'q2-female', label: 'Female', value: 'Female' },
      { id: 'q2-male', label: 'Male', value: 'Male' }
    ]
  },
  {
    id: 3,
    title: 'Pre-existing Conditions',
    subtitle: 'Does the patient have any of the following diagnosed conditions?',
    type: 'options',
    fieldName: 'comorbidities',
    options: [
      { id: 'q3-none', label: 'No pre-existing conditions', value: 'None', description: 'No diagnosed chronic illness.' },
      { id: 'q3-hypertension', label: 'Hypertension', value: 'Hypertension', description: 'High blood pressure requiring medication or monitoring.' },
      { id: 'q3-diabetes', label: 'Diabetes', value: 'Diabetes', description: 'Type 1 or Type 2 diabetes mellitus.' },
      { id: 'q3-both', label: 'Diabetes & Hypertension', value: 'Diabetes, Hypertension', description: 'Both conditions diagnosed.', badge: 'Multiple' },
      { id: 'q3-heart', label: 'Heart Disease', value: 'Heart Disease', description: 'Any cardiac condition (CHD, valve disease, arrhythmia, etc.).', badge: 'High Risk' },
      { id: 'q3-asthma', label: 'Asthma', value: 'Asthma', description: 'Chronic respiratory condition with airway inflammation.' }
    ]
  },
  {
    id: 4,
    title: 'Primary Symptom',
    subtitle: 'What is the main symptom the patient is experiencing right now?',
    type: 'options',
    fieldName: 'symptom_1',
    options: [
      { id: 'q4-fever', label: 'Fever', value: 'fever', description: 'Elevated body temperature above 99°F / 37.2°C.' },
      { id: 'q4-high-fever', label: 'High Fever', value: 'high fever', description: 'Temperature exceeding 102°F / 39°C with chills or rigors.', badge: 'Severe' },
      { id: 'q4-cough', label: 'Cough', value: 'cough', description: 'Persistent coughing, productive or dry.' },
      { id: 'q4-headache', label: 'Headache', value: 'headache', description: 'Persistent or severe head pain.' },
      { id: 'q4-breathing', label: 'Breathing Difficulty', value: 'breathing difficulty', description: 'Shortness of breath or laboured breathing.', badge: 'High Attention' },
      { id: 'q4-thirst', label: 'Excessive Thirst', value: 'thirst', description: 'Unusual and persistent thirst (polydipsia).' }
    ]
  },
  {
    id: 5,
    title: 'Secondary Symptom',
    subtitle: 'What other symptom is the patient also experiencing alongside the primary one?',
    type: 'options',
    fieldName: 'symptom_2',
    options: [
      { id: 'q5-chills', label: 'Chills', value: 'chills', description: 'Shivering, cold sensations, or rigors.' },
      { id: 'q5-fatigue', label: 'Fatigue', value: 'fatigue', description: 'Persistent tiredness or exhaustion.' },
      { id: 'q5-body-pain', label: 'Body Pain', value: 'body pain', description: 'Generalised aches throughout the body.' },
      { id: 'q5-nausea', label: 'Nausea', value: 'nausea', description: 'Feeling of sickness or urge to vomit.' },
      { id: 'q5-dizziness', label: 'Dizziness', value: 'dizziness', description: 'Lightheadedness or sense of imbalance.' },
      { id: 'q5-dry-cough', label: 'Dry Cough', value: 'dry cough', description: 'Non-productive cough without mucus.' },
      { id: 'q5-joint-pain', label: 'Joint Pain', value: 'joint pain', description: 'Stiffness or pain in one or more joints.' },
      { id: 'q5-runny-nose', label: 'Runny Nose', value: 'runny nose', description: 'Nasal congestion with discharge.' },
      { id: 'q5-stomach-pain', label: 'Stomach Pain', value: 'stomach pain', description: 'Abdominal discomfort or cramping.' },
      { id: 'q5-wheezing', label: 'Wheezing', value: 'wheezing', description: 'Whistling sound during breathing.', badge: 'Respiratory' }
    ]
  },
  {
    id: 6,
    title: 'Additional Symptom',
    subtitle: 'Is the patient experiencing any of these additional signs?',
    type: 'options',
    fieldName: 'symptom_3',
    options: [
      { id: 'q6-sweating', label: 'Sweating', value: 'sweating', description: 'Excessive or unusual perspiration.' },
      { id: 'q6-weakness', label: 'Weakness', value: 'weakness', description: 'General lack of strength or muscle fatigue.' },
      { id: 'q6-headache', label: 'Headache', value: 'headache', description: 'Head pain accompanying other symptoms.' },
      { id: 'q6-cough', label: 'Cough', value: 'cough', description: 'Coughing alongside other symptoms.' },
      { id: 'q6-sneezing', label: 'Sneezing', value: 'sneezing', description: 'Frequent involuntary sneezing.' },
      { id: 'q6-chest-tightness', label: 'Chest Tightness', value: 'chest tightness', description: 'Sensation of pressure or constriction in the chest.', badge: 'High Attention' },
      { id: 'q6-blurred-vision', label: 'Blurred Vision', value: 'blurred vision', description: 'Reduced visual clarity or double vision.' },
      { id: 'q6-light-sensitivity', label: 'Light Sensitivity', value: 'light sensitivity', description: 'Eyes hurt or strain in bright light.' },
      { id: 'q6-loss-of-taste', label: 'Loss of Taste', value: 'loss of taste', description: 'Reduced or absent ability to taste food.' },
      { id: 'q6-frequent-urination', label: 'Frequent Urination', value: 'frequent urination', description: 'Needing to urinate more often than usual.' }
    ]
  }
];

const INITIAL_PATIENT = {
  name: 'John Doe',
  email: 'john.doe@example.com',
  phone: '+91 98765 43210',
  age: 38,
  dob: '1988-06-14',
  gender: 'Male',
  bloodGroup: 'O+',
  emergencyContact: 'Sarah Doe (+91 98765 43211)'
};

const INITIAL_DOCTOR = {
  id: 'doc-1',
  name: 'Dr. Rahul Sharma',
  email: 'dr.sharma@carepoint.hospital',
  doctorCode: 'DOC-CPH-104',
  specialisation: 'Cardiologist',
  department: 'Cardiology',
  qualification: 'MD (Cardiology), FACC',
  experienceYears: 14,
  phone: '+91 98111 22334',
  avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=400&q=80',
  stats: {
    todayAppointments: 8,
    upcoming: 14,
    completed: 26,
    avgWaitMin: 12
  }
};

const INITIAL_APPOINTMENTS = [
  {
    id: 'APT10293',
    patientName: 'John Doe',
    patientAge: 38,
    patientGender: 'Male',
    patientPhone: '+91 98765 43210',
    doctorId: 'doc-1',
    doctorName: 'Dr. Rahul Sharma',
    doctorSpecialisation: 'Cardiologist',
    department: 'Cardiology',
    date: '10 November 2026',
    rawDate: '2026-11-10',
    time: '10:00 AM',
    priority: 'Very Urgent',
    priorityColor: 'urgent',
    status: 'Confirmed',
    concern: 'Chest tightness after exertion, sudden onset',
    urgencyReason: 'High priority recommended: Today / Tomorrow'
  },
  {
    id: 'APT10294',
    patientName: 'Sarah Lee',
    patientAge: 45,
    patientGender: 'Female',
    patientPhone: '+91 98222 33445',
    doctorId: 'doc-1',
    doctorName: 'Dr. Rahul Sharma',
    doctorSpecialisation: 'Cardiologist',
    department: 'Cardiology',
    date: '10 November 2026',
    rawDate: '2026-11-10',
    time: '11:30 AM',
    priority: 'Moderate',
    priorityColor: 'moderate',
    status: 'Confirmed',
    concern: 'Intermittent palpitations during office work',
    urgencyReason: 'Medium priority recommended: Tomorrow / Later'
  },
  {
    id: 'APT10295',
    patientName: 'Alex Kumar',
    patientAge: 29,
    patientGender: 'Male',
    patientPhone: '+91 98333 44556',
    doctorId: 'doc-1',
    doctorName: 'Dr. Rahul Sharma',
    doctorSpecialisation: 'Cardiologist',
    department: 'Cardiology',
    date: '10 November 2026',
    rawDate: '2026-11-10',
    time: '02:00 PM',
    priority: 'Not Urgent',
    priorityColor: 'not-urgent',
    status: 'Confirmed',
    concern: 'Annual preventative heart checkup',
    urgencyReason: 'Lower priority recommended: Later this week'
  },
  {
    id: 'APT10290',
    patientName: 'John Doe',
    patientAge: 38,
    patientGender: 'Male',
    patientPhone: '+91 98765 43210',
    doctorId: 'doc-3',
    doctorName: 'Dr. Marcus Vance',
    doctorSpecialisation: 'Orthopaedic Surgeon',
    department: 'Orthopaedics',
    date: '15 October 2026',
    rawDate: '2026-10-15',
    time: '03:30 PM',
    priority: 'Moderate',
    priorityColor: 'moderate',
    status: 'Completed',
    concern: 'Right ankle ligament rehabilitation check',
    urgencyReason: 'Completed consultation'
  }
];

// Priority determination logic based on collected questionnaire answers
// Aligned with M1 dataset features: age, gender, comorbidities, symptom_1, symptom_2, symptom_3
function evaluateAssessmentPriority(input) {
  let features = {};
  if (Array.isArray(input)) {
    input.forEach(item => {
      const q = (typeof ASSESSMENT_QUESTIONS !== 'undefined' ? ASSESSMENT_QUESTIONS : []).find(question => question.id === item.questionId);
      if (q && q.fieldName) {
        features[q.fieldName] = item.option?.value !== undefined ? item.option.value : (item.value !== undefined ? item.value : item.option);
      }
    });
  } else if (input && typeof input === 'object') {
    features = input;
  }

  const age = Number(features.age) || 35;
  const comorbidities = features.comorbidities || 'None';
  const s1 = features.symptom_1 || '';
  const s2 = features.symptom_2 || '';
  const s3 = features.symptom_3 || '';

  // Clinical triage scoring logic aligned with M1 dataset distributions
  let score = 0;

  // Age factor
  if (age >= 65) score += 2;
  else if (age >= 50 || age <= 5) score += 1;

  // Comorbidities factor
  if (comorbidities === 'Heart Disease' || comorbidities === 'Diabetes, Hypertension') score += 3;
  else if (comorbidities === 'Asthma' || comorbidities === 'Diabetes' || comorbidities === 'Hypertension') score += 2;

  // Primary symptom
  if (s1 === 'breathing difficulty' || s1 === 'high fever') score += 3;
  else if (s1 === 'fever' || s1 === 'thirst') score += 2;
  else if (s1 === 'headache' || s1 === 'cough') score += 1;

  // Secondary symptom
  if (s2 === 'wheezing' || s2 === 'dizziness' || s2 === 'stomach pain') score += 2;
  else if (s2 === 'chills' || s2 === 'dry cough' || s2 === 'fatigue' || s2 === 'joint pain') score += 1;

  // Additional symptom
  if (s3 === 'chest tightness' || s3 === 'blurred vision') score += 3;
  else if (s3 === 'weakness' || s3 === 'loss of taste' || s3 === 'sweating') score += 2;
  else if (s3 === 'light sensitivity' || s3 === 'frequent urination') score += 1;

  if (score >= 8 || (s1 === 'breathing difficulty' && s3 === 'chest tightness')) {
    return {
      level: 'Very Urgent',
      badgeClass: 'urgent',
      color: '#DC2626',
      bgTint: '#FEE2E2',
      headline: 'High-priority appointment',
      recommendedWindow: 'Today or Tomorrow',
      description: 'Your responses indicate symptoms that require prompt clinical review. We strongly advise securing a consultation within 24 hours.',
      urgencyCode: 'High',
      features: features
    };
  } else if (score >= 5) {
    return {
      level: 'Moderate',
      badgeClass: 'moderate',
      color: '#D97706',
      bgTint: '#FEF3C7',
      headline: 'Medium-priority appointment',
      recommendedWindow: 'Tomorrow or Later',
      description: 'Your assessment highlights noticeable symptoms that should be examined by a specialist within 1 to 2 days.',
      urgencyCode: 'Medium',
      features: features
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
      features: features
    };
  }
}
