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
      {
        time: '08:00 AM onwards',
        title: 'Registration from 8:00 AM onwards',
        isBreak: true
      },
      {
        time: '09:00 AM – 09:20 AM',
        title: 'Imeglimin- A powerhouse approach to Type 2 Diabetes',
        faculty: 'Dr.Selva Pandian',
        chairpersons: 'Dr.C.R.Anand Moses, Dr.P.Dharmarajan'
      },
      {
        time: '09:20 AM – 09:40 AM',
        title: 'Double burden: Navigating diabetes and tuberculosis',
        faculty: 'Dr.Chandrasekar S',
        chairpersons: 'Dr.C.R.Anand Moses, Dr.P.Dharmarajan'
      },
      {
        time: '09:40 AM – 10:00 AM',
        title: 'Fatty Liver (MASLD) - Role of Saroglitazar: Dual PPAR Agonist',
        faculty: 'Dr.G.Vijayakumar',
        chairpersons: 'Dr.M.Shunmugavelu, Dr.C.Muralidharan'
      },
      {
        time: '10:00 AM – 10:30 AM',
        title: 'Managing Heart failure in People with Diabetes',
        faculty: 'Dr.A.Panneer Selvam',
        chairpersons: 'Dr.M.Shunmugavelu, Dr.C.Muralidharan'
      },
      {
        time: '10:30 AM - 11:00 AM',
        title: 'What should be the target for FBS - best practices for basalog Insulin',
        faculty: 'Dr.M.Shunmugavelu',
        chairpersons: 'Dr.Selva Pandian, Dr.C.Balaji'
      },
      {
        time: '11:00 AM - 11:30 AM',
        title: 'TEA BREAK & VISIT TO THE STALLS /POSTER AREA',
        isBreak: true
      },
      {
        time: '11:30 AM - 12:00 PM',
        title: 'Demonstration of High Risk Feet',
        faculty: 'Dr. Vijay Viswanathan / Ms.Seena',
        chairpersons: 'Dr.C.Muralidharan, Dr.Aarathy Kannan'
      },
      {
        time: '12:00 PM - 12:30 PM',
        title: 'Recurrence of DFU - The Indian Strategy for prevention',
        faculty: 'Dr.Senthil G',
        chairpersons: 'Dr.C.Muralidharan, Dr.Aarathy Kannan'
      },
      {
        time: '12:30 PM - 1:00 PM',
        title: 'Mechanical offloading (Unburden the wound)',
        faculty: 'Dr. Viswanathan Vishnu Vijay',
        chairpersons: 'Dr.Prashanth Arun, Dr.Shanthi'
      },
      {
        time: '1:00 PM – 1:30 PM',
        title: 'Surgical offloading',
        faculty: 'Dr.Senthil G',
        chairpersons: 'Dr.Shanthi, Dr.Rajasenthil'
      },
      {
        time: '1:30 PM - 2:30 PM',
        title: 'LUNCH & VISIT TO THE STALLS /POSTER AREA',
        isBreak: true
      },
      {
        time: '2:30 PM - 3:00 PM',
        title: 'Redefining limb salvage: New frontiers in technology',
        faculty: 'Dr.Milind Ruke',
        chairpersons: 'Dr.Senthil G, Dr.Rajasenthil'
      },
      {
        time: '3:00 PM - 3:30 PM',
        title: 'Making sense of Targets in Hypertension control',
        faculty: 'Dr.S.N.Narasingan',
        chairpersons: 'Dr.M.Shunmugavelu, Dr.C.Muralidharan'
      },
      {
        time: '3:30 PM - 4:30 PM',
        title: 'MV Life Time Achievement Award\nInauguration & Key Note lecture',
        faculty: 'Dr.Jitendra Singh'
      },
      {
        time: '4:30 PM - 5:00 PM',
        title: 'TEA BREAK & VISIT TO THE STALLS /POSTER AREA',
        isBreak: true
      },
      {
        time: '5:00 PM - 5:30 PM',
        title: 'The role of microbiota in the management of diabetes and hypertension',
        faculty: 'Dr.A.Muruganathan',
        chairpersons: 'Dr.G.Prakash, Dr.A.Shanmugam'
      },
      {
        time: '5:30 PM - 6:00 PM',
        title: 'Management of hyperglycemia during DFU',
        faculty: 'Dr.R M Anjana',
        chairpersons: 'Dr.Vijay Viswanathan, Dr.Prashanth Arun'
      },
      {
        time: '6:00 PM - 6:30 PM',
        title: 'Charcot foot: Timely diagnosis and treatment to prevent amputation',
        faculty: 'Dr.Johny J Kannampilly',
        chairpersons: 'Dr.Vijay Viswanathan, Dr.Thangavelu Easwaran'
      },
      {
        time: '6:30 PM – 7:00 PM',
        title: 'Disease modifying outcome from glucose control to metabolic protection',
        faculty: 'Dr.G.Vijayakumar',
        chairpersons: 'Dr.C.Balaji, Dr.A.Shanmugam'
      },
      {
        time: '07:00 PM - 07:30 PM',
        title: 'Secondary diabetes: Unravelling the hidden causes',
        faculty: 'Dr.A.Shanmugam',
        chairpersons: 'Dr.C.Muralidharan, Dr.K.Shanmugam'
      },
      {
        time: '07:30 PM - 08:00 PM',
        title: 'Gut dysbiosis, NUSH and metabolic disparities',
        faculty: 'Dr.Krishna G Seshadri',
        chairpersons: 'Dr.A.Shanmugam, Dr.G.Vijayakumar'
      },
      {
        time: '08:00 PM onwards',
        title: 'Networking Dinner',
        isBreak: true
      }
    ],
    B: [
      {
        time: '08:00 AM onwards',
        title: 'Registration from 8:00 AM onwards',
        isBreak: true
      },
      {
        time: '09:00 AM – 09:40 AM',
        title: 'Paper Presentations (MVOP01 - MVOP05)',
        subSessions: [
          {
            title: 'MVOP01-Exosomal microRNAs as Emerging Regulators of Ferroptosis and Their Potential in the Development of Novel Therapeutic Strategies for Human Disease',
            faculty: 'Adhira Prakash',
            chairpersons: 'Judges: Dr.V.P.Sriram, Dr.Satyavani K'
          },
          {
            title: 'MVOP02-A comparative study of management of diabetic foot ulcer with human epidermal growth factor vs placental extract gel',
            faculty: 'Shreyas V Nair',
            chairpersons: 'Judges: Dr.V.P.Sriram, Dr.Satyavani K'
          },
          {
            title: 'MVOP03-Exploring the association between Hypomagnesemia and Diabetic nephropathy',
            faculty: 'Lakshmana Prasanth Katragad',
            chairpersons: 'Judges: Dr.V.P.Sriram, Dr.Satyavani K'
          },
          {
            title: 'MVOP04-DNA Methylation-Induced Nrf2 Dysfunction In Diabetic Foot Ulcers: Implications for Epigenetic Therapy',
            faculty: 'Kannan Harithpriya',
            chairpersons: 'Judges: Dr.V.P.Sriram, Dr.Satyavani K'
          },
          {
            title: 'MVOP05-Mangiferin-regulated NRF2 signaling attenuates hyperglycemic stress in macrophages',
            faculty: 'Ravichandran Jayasuriya',
            chairpersons: 'Judges: Dr.V.P.Sriram, Dr.Satyavani K'
          }
        ]
      },
      {
        time: '09:40 AM – 10:00 AM',
        title: 'Unmasking Anemia in Diabetes',
        faculty: 'Dr. V.P. Sriram',
        chairpersons: 'Dr.Kannan Natarajan, Dr.C Balaji'
      },
      {
        time: '10:00 AM – 10:20 AM',
        title: 'International Vs National - ADA Vs RSSDI guidelines What\'s New / What Next / What\'s the difference ?',
        faculty: 'Dr.K.Uma Mahesh',
        chairpersons: 'Dr.Kannan Natarajan, Dr.C Balaji'
      },
      {
        time: '10:20 AM - 10:40 AM',
        title: 'The invisible threat: Identifying asymptomatic diabetes in clinical practice',
        faculty: 'Dr.Aarathy Kannan',
        chairpersons: 'Dr.Suresh Kanna S ,Dr.B.Kannan'
      },
      {
        time: '10:40 AM - 11:00 AM',
        title: 'The silent erosion: Unveiling the double burden of diabetes and sarcopenia',
        faculty: 'Dr. Vishnu Priya Reddy',
        chairpersons: 'Dr.N.N.Anand, Dr.B.Kannan'
      },
      {
        time: '11:00 AM - 11:30 AM',
        title: 'TEA BREAK & VISIT TO THE STALLS /POSTER AREA',
        isBreak: true
      },
      {
        time: '11:30 AM – 12:00 PM',
        title: 'Demonstration of High Risk Feet in Hall A',
        faculty: 'Dr. Vijay Viswanathan / Ms.Seena',
        chairpersons: 'Dr.C.Muralidharan, Dr.Aarathy Kannan'
      },
      {
        time: '12:00 PM - 12:30 PM',
        title: 'Periodontitis as the sixth complication of Diabetes: Integrating Oral health into Primary Diabetes Care',
        faculty: 'Dr.Vinitha Ramachanadran',
        chairpersons: 'Dr.N.Bhavatharani, Dr.G.Prakash'
      },
      {
        time: '12:30 PM - 1:00 PM',
        title: 'Surrogate measures in routine clinical practice',
        faculty: 'Dr.Satyavani K',
        chairpersons: 'Dr.N.Bhavatharani, Dr.G.Prakash'
      },
      {
        time: '01:00 PM – 01:30 PM',
        title: 'Paper Presentations (MVOP06 - MVOP09)',
        subSessions: [
          {
            title: 'MVOP06-Non Diabetic Renal Pathologies In Diabetic Patients : A Biopsy Based Perspective',
            faculty: 'Pon Abinaya',
            chairpersons: 'Judges: Dr.V.P.Sriram, Dr.Satyavani K'
          },
          {
            title: 'MVOP07-Hydroxytyrosol Targets Hyperglycemia-Induced Endothelial Dysfunction: A Network Pharmacology and In Vitro Investigation',
            faculty: 'DK GokulRaj',
            chairpersons: 'Judges: Dr.V.P.Sriram, Dr.Satyavani K'
          },
          {
            title: 'MVOP08- Efficacy of Topical Timolol Vs Normal Saline In The Healing Of Chronic Diabetic Foot Ulcers',
            faculty: 'Divya Padmakumar',
            chairpersons: 'Judges: Dr.V.P.Sriram, Dr.Satyavani K'
          },
          {
            title: 'MVOP09- Prolonged QTc in Type 2 Diabetes: An Under-Recognized Cardiovascular Risk Signal',
            faculty: 'Vraj rajesh kumar shah',
            chairpersons: 'Judges: Dr.V.P.Sriram, Dr.Satyavani K'
          }
        ]
      },
      {
        time: '1:30 PM - 2:30 PM',
        title: 'LUNCH & VISIT TO THE STALLS /POSTER AREA',
        isBreak: true
      },
      {
        time: '2:30 PM - 3:30 PM',
        title: 'Paper Presentations (MVOP10 - MVOP16)',
        subSessions: [
          {
            title: 'MVOP10-Uncovering the Therapeutic Potential of Lobeglitazone in Diabetic Nephropathy through Network Pharmacology and Molecular Docking',
            faculty: 'Kalaimani M',
            chairpersons: 'Judges: Dr.V.P.Sriram, Dr.Satyavani K'
          },
          {
            title: 'MVOP11-Integrative Management Preventing Amputation in Chronic Non-Healing Diabetic Foot Ulcer',
            faculty: 'P.Revin Selvan',
            chairpersons: 'Judges: Dr.V.P.Sriram, Dr.Satyavani K'
          },
          {
            title: 'MVOP12- Comparative Effectiveness of Topical Oxygen Therapy and Negative Pressure Wound Therapy In Diabetic Foot Ulcers: A Prospective Study',
            faculty: 'Rohith Balaji SR',
            chairpersons: 'Judges: Dr.V.P.Sriram, Dr.Satyavani K'
          },
          {
            title: 'MVOP13-Clinico-Microbiological Profile and Antibiotic Susceptibility Pattern of Diabetic Foot Infections Background',
            faculty: 'Jacob C Jacob',
            chairpersons: 'Judges: Dr.V.P.Sriram, Dr.Satyavani K'
          },
          {
            title: 'MVOP14-Effect of Sulforaphane on Wound Healing by Mitigating Oxieptosis under Hyperglycemic Microenvironment',
            faculty: 'Kavyashree Srikanth',
            chairpersons: 'Judges: Dr.V.P.Sriram, Dr.Satyavani K'
          },
          {
            title: 'MVOP15- Correlation of Cognitive Function With Urine Albumin Creatinine Ratio in Type 2 Diabetes',
            faculty: 'Niveda',
            chairpersons: 'Judges: Dr.V.P.Sriram, Dr.Satyavani K'
          },
          {
            title: 'MVOP16 - Emerging Role of ESMOLOL HYDROCHLORIDE TOPICAL GEL 14% in Diabetic Foot Ulcer (DFU) Management- Early Clinical Experience',
            faculty: 'Thangavelu Easwaran',
            chairpersons: 'Judges: Dr.V.P.Sriram, Dr.Satyavani K'
          }
        ]
      },
      {
        time: '3:30 PM - 4:30 PM',
        title: 'MV Life Time Achievement Award in Hall A\nInauguration & Key Note lecture in Hall A',
        faculty: 'Dr.Jitendra Singh'
      },
      {
        time: '4:30 PM - 5:00 PM',
        title: 'TEA BREAK & VISIT TO THE STALLS /POSTER AREA',
        isBreak: true
      },
      {
        time: '5:00 PM - 5:30 PM',
        title: 'Retina reimagined: Technology transforming Diabetic Retinopathy screening',
        faculty: 'Dr.Manoj Khatri',
        chairpersons: 'Dr.Kannan Natarajan, Dr.Mitalee H Barman'
      },
      {
        time: '5:30 PM - 6:00 PM',
        title: 'Work place bullying and violence as risk factors for type 2 diabetes',
        faculty: 'Dr.Keerthi Prabhu',
        chairpersons: 'Dr.Kannan Natarajan, Dr.K.Shanmugam'
      },
      {
        time: '6:00 PM - 6:30 PM',
        title: 'Breathing while you sleep: Unmasking OSA',
        faculty: 'Dr.N Ramakrishnan',
        chairpersons: 'Dr.Leela Baid, Dr.K.Shanmugam'
      },
      {
        time: '6:30 PM - 07:30 PM',
        title: 'Paper Presentations (MVOP17 - MVOP23)',
        subSessions: [
          {
            title: 'MVOP17- Inhibition of Ferroptosis in Pancreatic β Cells: A Comprehensive In Silico, In Vitro, and In Vivo Approach for Diabetes Therapy',
            faculty: 'Murali Krishna Prasad',
            chairpersons: 'Judges: Dr.V.P.Sriram, Dr.Satyavani K'
          },
          {
            title: 'MVOP18-Digital Health Technology Use and Barriers in Type 2 Diabetes Care',
            faculty: 'Sagarika Duggirala',
            chairpersons: 'Judges: Dr.V.P.Sriram, Dr.Satyavani K'
          },
          {
            title: 'MVOP19-Early Microvascular Burden in Young-Onset Type 2 Diabetes Mellitus',
            faculty: 'Shantanu Gondkar',
            chairpersons: 'Judges: Dr.V.P.Sriram, Dr.Satyavani K'
          },
          {
            title: 'MVOP20-Double Vision in Diabetes: A Sixth Nerve Surprise',
            faculty: 'Sivaprakasan K',
            chairpersons: 'Judges: Dr.V.P.Sriram, Dr.Satyavani K'
          },
          {
            title: 'MVOP21-The Incidental Metabolic Crisis',
            faculty: 'Varun M',
            chairpersons: 'Judges: Dr.V.P.Sriram, Dr.Satyavani K'
          },
          {
            title: 'MVOP22-The Pathogenic Role of Ferroptosis in GDM-Related Placental Dysfunction',
            faculty: 'S Monisha',
            chairpersons: 'Judges: Dr.V.P.Sriram, Dr.Satyavani K'
          },
          {
            title: 'MVOP23- Prevalence of different stages of heart failure among People with Type 2 Diabetes',
            faculty: 'Naresh kumar S',
            chairpersons: 'Judges: Dr.V.P.Sriram, Dr.Satyavani K'
          }
        ]
      },
      {
        time: '07:30 PM - 08:00 PM',
        title: 'MV Alumni - Debate (SGLT2i vs GLP1RA)',
        chairpersons: 'Dr.Hemanga Barman, Dr.Mitalee H Barman, Dr.V.P.Sriram'
      },
      {
        time: '08:00 PM onwards',
        title: 'Networking Dinner',
        isBreak: true
      }
    ]
  }
};
