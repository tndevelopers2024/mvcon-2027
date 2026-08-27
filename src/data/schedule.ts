export interface SubSession {
  title: string;
  faculty?: string;
  chairpersons?: string;
}

export interface ScheduleItem {
  time: string;
  title: string;
  faculty?: string;
  chairpersons?: string;
  isBreak?: boolean;
  subSessions?: SubSession[];
}

export type DaySchedule = {
  [hallId: string]: ScheduleItem[];
};

export const scheduleData: Record<string, DaySchedule> = {
  day1: {
    A: [
      { time: '08:00 AM onwards', title: 'Registration from 8:00 AM onwards', isBreak: true },
      { time: '09:00 AM – 09:20 AM', title: 'Type 2 Diabetes Is Not One Disease — Understanding the Different Phenotypes', faculty: 'TBD' },
      { time: '09:20 AM – 09:40 AM', title: 'Beyond HbA1c — What Does Glucose Actually Look Like in Our Patients?', faculty: 'TBD' },
      { time: '09:40 AM – 10:00 AM', title: 'Choosing the First Drug — Does One Algorithm Fit Everyone?', faculty: 'TBD' },
      { time: '10:00 AM - 10:20 AM', title: 'GLP-1 Therapy — Choosing the Right Patient, Dose and Goal', faculty: 'TBD' },
      { time: '10:20 AM - 10:40 AM', title: 'Dual Incretin Therapy — What Does the Extra Benefit Really Mean?', faculty: 'TBD' },
      { time: '10:40 AM - 11:00 AM', title: 'The Patient Who Doesn\'t Respond to GLP-1 Therapy — What Next?', faculty: 'TBD' },
      { time: '11:00 AM - 11:30 AM', title: 'TEA BREAK & VISIT TO THE STALLS /POSTER AREA', isBreak: true },
      { time: '11:30 AM - 12:00 PM', title: 'Demonstration of High Risk Feet', faculty: 'Vijay Viswanathan / Ms.Seena Rajsekar & Ms.Bamila Selvaraj' },
      { time: '12:00 PM - 12:20 PM', title: 'TBD', faculty: 'Prashanth Vas' },
      { time: '12:20 PM - 12:40 PM', title: 'Ischaemic Diabetic Foot — When Does the Patient Need Revascularisation?', faculty: 'Ravikumar R' },
      { time: '12:40 PM - 1:00 PM', title: 'Mechanical Offloading: From Footwear to Surgical Solutions', faculty: 'Viswanathan Vishnu Vijay' },
      { time: '1:00 PM - 1:30 PM', title: 'Surgical offloading', faculty: 'Senthil G' },
      { time: '1:30 PM - 2:30 PM', title: 'LUNCH & VISIT TO THE STALLS /POSTER AREA', isBreak: true },
      { time: '2:30 PM - 2:50 PM', title: 'Type 1 Diabetes in the Modern Era — Beyond HbA1c', faculty: 'TBD' },
      { time: '2:50 PM - 3:10 PM', title: 'Automated Insulin Delivery — From Technology to Routine Care', faculty: 'TBD' },
      { time: '3:10 PM - 3:30 PM', title: 'Living with Type 1 Diabetes: Technology, Psychology and Quality of Life', faculty: 'TBD' },
      { time: '3:30 PM - 4:30 PM', title: 'MV Life Time Achievement Award\nInauguration & Key Note lecture', faculty: 'TBD' },
      { time: '4:30 PM - 5:00 PM', title: 'TEA BREAK & VISIT TO THE STALLS /POSTER AREA', isBreak: true },
      { time: '5:00 PM - 5:20 PM', title: 'CGM for the Real-World Patient — Who Should Get It?', faculty: 'TBD' },
      { time: '5:20 PM - 5:40 PM', title: 'From Sensor to Prescription — Interpreting CGM Like a Clinician', faculty: 'TBD' },
      { time: '5:40 PM - 6:00 PM', title: 'Artificial Intelligence in Diabetology — What Is Ready for Prime Time?', faculty: 'TBD' },
      { time: '6:00 PM - 6:20 PM', title: 'Cardiovascular Risk Begins Before Diabetes — Can We Intervene Earlier?', faculty: 'TBD' },
      { time: '6:20 PM - 6:40 PM', title: 'Choosing Diabetes Therapy by Cardiovascular Phenotype', faculty: 'TBD' },
      { time: '6:40 PM - 7:00 PM', title: 'Heart Failure in Diabetes — The Patient Sitting in Front of Us', faculty: 'TBD' },
      { time: '07:00 PM onwards', title: 'Dinner 7pm onwards', isBreak: true }
    ],
    B: [
      { time: '08:00 AM onwards', title: 'Registration from 8:00 AM onwards', isBreak: true },
      { time: '09:00 AM – 09:20 AM', title: 'Oral papers' },
      { time: '09:20 AM – 09:40 AM', title: 'Oral papers' },
      { time: '09:40 AM – 10:00 AM', title: 'Oral papers' },
      { time: '10:00 AM - 10:20 AM', title: 'Sarcopenia in Diabetes — Recognising the Invisible Complication', faculty: 'TBD' },
      { time: '10:20 AM - 10:40 AM', title: 'Resistance Training — The Prescription Every Diabetologist Should Know', faculty: 'TBD' },
      { time: '10:40 AM - 11:00 AM', title: 'Frailty, Falls & Diabetes — When Intensive Treatment Becomes Harmful', faculty: 'TBD' },
      { time: '11:00 AM - 11:30 AM', title: 'TEA BREAK & VISIT TO THE STALLS /POSTER AREA', isBreak: true },
      { time: '11:30 AM - 12:00 PM', title: 'Starting Insulin Without Fear — Breaking the Psychological Barrier', faculty: 'TBD' },
      { time: '12:00 PM - 12:20 PM', title: 'Basal Insulin Failure — Recognising When It Is Time to Intensify', faculty: 'TBD' },
      { time: '12:20 PM - 12:40 PM', title: 'Insulin Resistance at the Extreme — The Difficult Insulin Patient', faculty: 'TBD' },
      { time: '12:40 PM - 1:00 PM', title: 'Euglycaemic DKA — The SGLT2 Era Has Changed the Presentation', faculty: 'TBD' },
      { time: '1:00 PM - 1:30 PM', title: 'Hypoglycaemia — The Adverse Event We Should Prevent, Not Just Treat', faculty: 'TBD' },
      { time: '1:30 PM - 2:30 PM', title: 'LUNCH & VISIT TO THE STALLS /POSTER AREA', isBreak: true },
      { time: '2:30 PM - 2:50 PM', title: 'The Mouth–Diabetes Connection: An Overlooked Link', faculty: 'Kritika Datta' },
      { time: '2:50 PM - 3:10 PM', title: 'Periodontal Disease & Diabetes: A Two-Way Street', faculty: 'Vinitha Ramachandran' },
      { time: '3:10 PM - 3:30 PM', title: 'PMOS & Diabetes: A Metabolic Challenge in Women’s Health', faculty: 'Chitra Selvan' },
      { time: '3:30 PM - 4:30 PM', title: 'MV Life Time Achievement Award in Hall A\nInauguration & Key Note lecture in Hall A', faculty: 'TBD' },
      { time: '4:30 PM - 5:00 PM', title: 'TEA BREAK & VISIT TO THE STALLS /POSTER AREA', isBreak: true },
      { time: '5:00 PM - 5:20 PM', title: 'Diabetes & Sexual Dysfunction — Opening the Conversation', faculty: 'TBD' },
      { time: '5:20 PM - 5:40 PM', title: 'Sleep Apnoea, Sleep Quality & Glucose Metabolism', faculty: 'TBD' },
      { time: '5:40 PM - 6:00 PM', title: 'MVCON DEBATE — Should HbA1c Remain the Primary Measure of Diabetes Control?' },
      { time: '6:00 PM - 6:20 PM', title: 'Oral papers' },
      { time: '6:20 PM - 6:40 PM', title: 'Oral papers' },
      { time: '6:40 PM - 7:00 PM', title: 'Oral papers' },
      { time: '07:00 PM onwards', title: 'Dinner 7 pm onwards', isBreak: true }
    ]
  },
  day2: {
    A: [
      { time: '08:00 AM onwards', title: 'Registration from 8:00 AM onwards', isBreak: true },
      { time: '09:00 AM – 09:20 AM', title: 'Why Does Weight Matter So Much in Diabetes?', faculty: 'TBD' },
      { time: '09:20 AM – 09:40 AM', title: 'BMI Is Not Enough — Looking Beyond the Scale', faculty: 'TBD' },
      { time: '09:40 AM – 10:00 AM', title: 'Visceral Fat, Insulin Resistance & Cardiometabolic Risk', faculty: 'TBD' },
      { time: '10:00 AM - 10:20 AM', title: 'Selecting Anti-Obesity Therapy — Matching Treatment to the Patient', faculty: 'TBD' },
      { time: '10:20 AM - 10:40 AM', title: 'The Weight-Loss Plateau — What Should We Do When the Scale Stops Moving?', faculty: 'TBD' },
      { time: '10:40 AM - 11:00 AM', title: 'Weight Regain — Is Long-Term Treatment the New Reality?', faculty: 'TBD' },
      { time: '11:00 AM - 11:30 AM', title: 'TEA BREAK & VISIT TO THE STALLS /POSTER AREA', isBreak: true },
      { time: '11:30 AM - 12:00 PM', title: 'Gestational Diabetes — From Pregnancy Complication to Lifetime Risk Marker', faculty: 'TBD' },
      { time: '12:00 PM - 12:20 PM', title: 'Menopause & Metabolic Health — What Changes in the Woman with diabetes?', faculty: 'TBD' },
      { time: '12:20 PM - 12:40 PM', title: 'Women\'s Diabetes and Mental Health: The Hidden Connection', faculty: 'TBD' },
      { time: '12:40 PM - 1:00 PM', title: 'Albuminuria: The Signal We Should Never Ignore', faculty: 'TBD' },
      { time: '1:00 PM - 1:30 PM', title: 'The Diabetic Kidney in 2027 — What More Can We Offer?', faculty: 'TBD' },
      { time: '1:30 PM - 2:30 PM', title: 'LUNCH & VISIT TO THE STALLS /POSTER AREA', isBreak: true },
      { time: '2:30 PM - 2:50 PM', title: 'The Indian Plate — Building a Diabetes-Friendly Diet That Patients Can Actually Follow', faculty: 'TBD' },
      { time: '2:50 PM - 3:10 PM', title: 'Protein, Fibre & Muscle — The Forgotten Triad in Diabetes', faculty: 'TBD' },
      { time: '3:10 PM - 3:30 PM', title: 'Carbohydrate Quality vs Carbohydrate Quantity — Which Matters More?', faculty: 'TBD' },
      { time: '3:30 PM - 3:50 PM', title: 'MASLD in Diabetes — The Liver We Don\'t Examine', faculty: 'TBD' },
      { time: '3:50 PM - 4:10 PM', title: 'Who Has Progressive Liver Disease? A Practical Risk-Stratification Approach', faculty: 'TBD' },
      { time: '4:10 PM - 4:30 PM', title: 'Can Diabetes Therapy Treat the Liver Too?', faculty: 'TBD' },
      { time: '4:30 PM - 5:00 PM', title: 'TEA BREAK & VISIT TO THE STALLS /POSTER AREA', isBreak: true },
      { time: '5:00 PM - 5:20 PM', title: 'Quiz' },
      { time: '5:20 PM - 5:40 PM', title: 'Quiz' },
      { time: '5:40 PM - 6:00 PM', title: 'Legalities in Diabetes', faculty: 'Dr.Viswanathan Vishnu Vijay' },
      { time: '6:00 PM - 6:20 PM', title: 'AI in diabetic foot care', faculty: 'Dr.Prashanth Arun' },
      { time: '6:20 PM - 6:40 PM', title: 'Symposium on obesity and diabetes -The New Treatment Paradigm', faculty: 'TBD' },
      { time: '6:40 PM - 7:00 PM', title: 'Symposium on obesity and diabetes -The New Treatment Paradigm', faculty: 'TBD' },
      { time: '07:00 PM onwards', title: 'Dinner 7pm onwards', isBreak: true }
    ],
    B: [
      { time: '08:00 AM onwards', title: 'Registration from 8:00 AM onwards', isBreak: true },
      { time: '09:00 AM – 09:20 AM', title: 'Oral papers' },
      { time: '09:20 AM – 09:40 AM', title: 'Oral papers' },
      { time: '09:40 AM – 10:00 AM', title: 'Oral papers' },
      { time: '10:00 AM - 10:20 AM', title: 'Oral papers' },
      { time: '10:20 AM - 10:40 AM', title: 'SMART dressing materials in diabetic wound care', faculty: 'TBD' },
      { time: '10:40 AM - 11:00 AM', title: 'Charcot foot', faculty: 'TBD' },
      { time: '11:00 AM - 11:30 AM', title: 'TEA BREAK & VISIT TO THE STALLS /POSTER AREA', isBreak: true },
      { time: '11:30 AM - 12:00 PM', title: 'Precision Diabetes — Will We Eventually Treat the Biology, Not Just the Glucose?', faculty: 'TBD' },
      { time: '12:00 PM - 12:20 PM', title: 'Digital Twins, AI & Predictive Diabetes Care — How Close Are We?', faculty: 'TBD' },
      { time: '12:20 PM - 12:40 PM', title: 'The Future Diabetes Clinic — What Will the Diabetologist Still Do?', faculty: 'TBD' },
      { time: '12:40 PM - 1:00 PM', title: 'The First 5 Years of Diabetes — The Window We Often Miss', faculty: 'TBD' },
      { time: '1:00 PM - 1:30 PM', title: 'Treating the Patient, Not the HbA1c — How Should We Individualise Targets?', faculty: 'TBD' },
      { time: '1:30 PM - 2:30 PM', title: 'LUNCH & VISIT TO THE STALLS /POSTER AREA', isBreak: true },
      { time: '2:30 PM - 2:50 PM', title: 'Hands on Workshop', faculty: 'Senthil G, Milind Ruke' },
      { time: '2:50 PM - 3:10 PM', title: 'Hands on Workshop', faculty: 'Senthil G, Milind Ruke' },
      { time: '3:10 PM - 3:30 PM', title: 'Hands on Workshop', faculty: 'Senthil G, Milind Ruke' },
      { time: '3:30 PM - 3:50 PM', title: 'Time in Range — From CGM Metric to Clinical Decision', faculty: 'TBD' },
      { time: '3:50 PM - 4:10 PM', title: 'When HbA1c and Glucose Don\'t Agree — Solving the Discordance', faculty: 'TBD' },
      { time: '4:10 PM - 4:30 PM', title: 'MVCON CLINICAL CHALLENGE — "WHAT WOULD YOU DO NEXT?"' },
      { time: '4:30 PM - 5:00 PM', title: 'TEA BREAK & VISIT TO THE STALLS /POSTER AREA', isBreak: true },
      { time: '5:00 PM - 5:20 PM', title: 'Nutrition panel discussion', faculty: 'TBD' },
      { time: '5:20 PM - 5:40 PM', title: 'Diabetes & Bone health', faculty: 'TBD' },
      { time: '5:40 PM - 6:00 PM', title: 'Oral papers' },
      { time: '6:00 PM - 6:20 PM', title: 'Oral papers' },
      { time: '6:20 PM - 6:40 PM', title: 'Oral papers' },
      { time: '6:40 PM - 7:00 PM', title: 'Oral papers' },
      { time: '07:00 PM onwards', title: 'Dinner 7 pm onwards', isBreak: true }
    ]
  },
  day3: {
    A: [
      { time: '08:00 AM onwards', title: 'Registration starts from 8:00 AM', isBreak: true },
      { time: '09:00 AM – 09:20 AM', title: 'Young-Onset Diabetes — Why the Usual Approach May Fail', chairpersons: 'TBD' },
      { time: '09:20 AM – 09:40 AM', title: 'LADA, MODY & Other Atypical Diabetes — When Should We Investigate?', chairpersons: 'TBD' },
      { time: '09:40 AM - 10:00 AM', title: 'Secondary Diabetes — The Clues Hidden in the History', chairpersons: 'TBD' },
      { time: '10:00 AM - 10:20 AM', title: 'Diabetic Kidney Disease — What Should We Do Differently Today?', chairpersons: 'TBD' },
      { time: '10:20 AM - 10:40 AM', title: 'Diabetic Retinopathy — The Findings That Should Change Your Prescription', chairpersons: 'TBD' },
      { time: '10:40 AM - 11:00 AM', title: 'Neuropathy — Diagnosis Beyond Symptoms', chairpersons: 'TBD' },
      { time: '11:00 AM - 11:30 AM', title: 'TEA BREAK & VISIT TO THE STALLS /POSTER AREA', isBreak: true },
      { time: '11:30 AM - 12:00 PM', title: 'TBD', chairpersons: 'Ramachandran A' },
      { time: '12:00 PM - 12:30 PM', title: 'TBD', chairpersons: 'Mohan V' },
      { time: '12:30 PM - 01:15 PM', title: 'Prof. MV Gold Medal Oration 2027\nMV Life Time Achievement Award', chairpersons: 'TBD' },
      { time: '01:15 PM onwards', title: 'Valedictory function followed by lunch', isBreak: true }
    ],
    B: [
      { time: '08:00 AM onwards', title: 'Registration starts from 8:00 AM', isBreak: true },
      { time: '09:00 AM – 09:20 AM', title: 'Oral papers' },
      { time: '09:20 AM – 09:40 AM', title: 'Oral papers' },
      { time: '09:40 AM - 10:00 AM', title: 'Oral papers' },
      { time: '10:00 AM - 10:20 AM', title: 'Oral papers' },
      { time: '10:20 AM - 10:40 AM', title: 'Oral papers' },
      { time: '10:40 AM - 11:00 AM', title: 'Oral papers' },
      { time: '11:00 AM - 11:30 AM', title: 'TEA BREAK & VISIT TO THE STALLS /POSTER AREA', isBreak: true },
      { time: '11:30 AM - 12:00 PM', title: 'TBD' },
      { time: '12:00 PM - 12:30 PM', title: 'TBD' },
      { time: '12:30 PM - 01:15 PM', title: 'Prof. MV Gold Medal Oration 2027 in Hall A\nMV Life Time Achievement Award in Hall A', chairpersons: 'TBD' },
      { time: '01:15 PM onwards', title: 'Valedictory function followed by lunch', isBreak: true }
    ]
  }
};
