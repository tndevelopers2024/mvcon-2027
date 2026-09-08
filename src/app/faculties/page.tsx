"use client";

import React from 'react';

type FacultyType = 'international' | 'national';

interface Faculty {
  id: string;
  name: string;
  role: string;
  type: 'international' | 'national';
  img: string;
}

// Derived from the provided data
const faculties: Faculty[] = [
  { id: '1', name: "Dr.Aarathy Kannan", role: "Faculty", type: "national", img: "/images/faculty/Dr. Aarthi kannan.jpg" },
  { id: '2', name: "Dr.N.N.Anand", role: "Faculty", type: "national", img: "/images/faculty/Dr.N.N.Anand.jpeg" },
  { id: '4', name: "Dr.S.R. Abishek", role: "Faculty", type: "national", img: "/images/faculty/DR. S.R. Abishek.jpg" },
  { id: '5', name: "Dr.R.M.Anjana", role: "Faculty", type: "national", img: "/images/faculty/Dr.R.M.Anjana.jpg" },
  { id: '7', name: "Dr.M.S.Ashraf", role: "Faculty", type: "national", img: "/images/faculty/ashraf.jpg" },
  { id: '8', name: "Dr.Ashwanth Narayan B", role: "Faculty", type: "national", img: "/images/faculty/Dr.Ashwanth-Narayan.jpeg" },
  { id: '9', name: "Dr.Ashwin Karuppan", role: "Faculty", type: "national", img: "/images/faculty/Dr.Ashwin-Karuppan.jpeg" },
  { id: '10', name: "Dr.C.Balaji", role: "Faculty", type: "national", img: "/images/faculty/Dr. C. Balaji.jpg" },
  { id: '12', name: "Mrs.Bamila Selvaraj", role: "Faculty", type: "national", img: "/images/faculty/Mrs.Bamila.S.jpg" },
  { id: '13', name: "Dr.N.Bhavatharani", role: "Faculty", type: "national", img: "/images/faculty/BHAVATHARANI.jpg" },
  { id: '14', name: "Dr.S.Chandrasekar", role: "Faculty", type: "national", img: "/images/faculty/Dr S Chandrasekar.jpg" },
  { id: '15', name: "Dr.P.Dharmarajan", role: "Faculty", type: "national", img: "/images/faculty/Dr. Dharmarajan.jpg" },
  { id: '19', name: "Dr.Jayashree Gopal", role: "Faculty", type: "national", img: "/images/faculty/Dr. Jayashree gopal.jpg" },
  { id: '20', name: "Dr.Johny J Kannampilly", role: "Faculty", type: "national", img: "/images/faculty/Dr.Johny-J-Kannampilly.jpeg" },
  { id: '21', name: "Dr.B.Kannan", role: "Faculty", type: "national", img: "/images/faculty/Dr.B.Kannan.jpeg" },
  { id: '22', name: "Dr.Kannan Natarajan", role: "Faculty", type: "national", img: "/images/faculty/DR Kannan Natrajan.png" },
  { id: '23', name: "Dr.Krishna G Seshadri", role: "Faculty", type: "national", img: "/images/faculty/Prof. Krishna G Seshadri.jpg" },
  { id: '24', name: "Dr.Kumar P", role: "Faculty", type: "national", img: "/images/faculty/Dr.Kumar-P.jpeg" },
  { id: '25', name: "Dr.SS.Lakshmanan", role: "Faculty", type: "national", img: "/images/faculty/s-s-lakshmanan.jpg" },
  { id: '26', name: "Dr.Leela Baid", role: "Faculty", type: "national", img: "/images/faculty/Dr. Leela Baid.png" },
  { id: '27', name: "Dr.Manoj P", role: "Faculty", type: "national", img: "/images/faculty/Dr.Manoj-P.jpeg" },
  { id: '29', name: "Dr.Meenakshi Bajaj", role: "Faculty", type: "national", img: "/images/faculty/meenakshi-bajaj.jpg" },
  { id: '30', name: "Dr.Milind Ruke", role: "Faculty", type: "national", img: "/images/faculty/MILIND.png" },
  { id: '33', name: "Dr.V.Mohan", role: "Faculty", type: "national", img: "/images/faculty/Padmashri  Prof. DR.V.Mohan.jpg" },
  { id: '34', name: "Dr.Mohan Krishna Moorthy", role: "Faculty", type: "national", img: "/images/faculty/Dr. MOHAN KRISHNAMOORTHY.png" },
  { id: '35', name: "Dr.C.Muralidharan", role: "Faculty", type: "national", img: "/images/faculty/Dr.C.Muralidharan.png" },
  { id: '36', name: "Dr.A.Muruganathan", role: "Faculty", type: "national", img: "/images/faculty/Dr.A.Muruganathan.jpeg" },
  { id: '37', name: "Dr.Nandita", role: "Faculty", type: "national", img: "/images/faculty/Dr Nanditha Ramachandran.jpg" },
  { id: '38', name: "Dr.S. N. Narasingan", role: "Faculty", type: "national", img: "/images/faculty/Dr.S.N.Narasingan.jpg" },
  { id: '40', name: "Dr.A.Panneer Selvam", role: "Faculty", type: "national", img: "/images/faculty/Dr.Paneer selvam.jpg" },
  { id: '41', name: "Dr.P.Paranthaman", role: "Faculty", type: "national", img: "/images/faculty/Dr.P.Paranthaman.png" },
  { id: '42', name: "Dr.Patricia Trueman", role: "Faculty", type: "national", img: "/images/faculty/Dr.Patricia-Trueman.jpeg" },
  { id: '43', name: "Dr.Priya", role: "Faculty", type: "national", img: "/images/faculty/priya.jpg" },
  { id: '44', name: "Dr.Prashanth Arun", role: "Faculty", type: "national", img: "/images/faculty/Dr. Prashanth Arun.jpg" },
  { id: '45', name: "Dr.G.Praakash", role: "Faculty", type: "national", img: "/images/faculty/DR.G.PRAKASH.jpg" },
  { id: '46', name: "Dr.A.Ramachandran", role: "Faculty", type: "national", img: "/images/faculty/Dr.A.RAMACHANDRAN.jpg" },
  { id: '47', name: "Dr.N.Ramakrishnan", role: "Faculty", type: "national", img: "/images/faculty/DR.RAMAKRISHNAN N.jpg" },
  { id: '48', name: "Dr.S.R.Ramakrishnan", role: "Faculty", type: "national", img: "/images/faculty/Dr.S.R.Ramakrishnan.jpg" },
  { id: '49', name: "Dr.R.Ravikumar", role: "Faculty", type: "national", img: "/images/faculty/Dr R Ravikumar.jpg" },
  { id: '50', name: "Dr.V.Ravindranath", role: "Faculty", type: "national", img: "/images/faculty/ravindran.jpg" },
  // { id: '51', name: "Dr.Rimo C Mathews", role: "Faculty", type: "national", img: "/images/faculty/Dr.Rimo-C-Mathews.jpeg" },
  { id: '52', name: "Dr.T.Sasi Kumar", role: "Faculty", type: "national", img: "/images/faculty/DR. SASI KUMAR.jpg" },
  { id: '53', name: "Dr.Satyavani K", role: "Faculty", type: "national", img: "/images/faculty/sathyavani.jpg" },
  { id: '54', name: "Ms.Seena Rajasekar", role: "Faculty", type: "national", img: "/images/faculty/Mrs.Seena Rajsekar.jpg" },
  { id: '56', name: "Dr.Siva Shankari S", role: "Faculty", type: "national", img: "/images/faculty/Dr.Siva-Shankari-S.jpeg" },
  { id: '57', name: "Dr.G.Senthil", role: "Faculty", type: "national", img: "/images/faculty/Dr. G. Senthil.jpg" },
  { id: '58', name: "Dr.A.Shanmugam", role: "Faculty", type: "national", img: "/images/faculty/Dr A Shanmugam.jpg" },
  { id: '59', name: "Dr.K.Shanmugam", role: "Faculty", type: "national", img: "/images/faculty/Dr. K. Shanmugam.jpg" },
  { id: '60', name: "Dr.A.Shanmugavelu", role: "Faculty", type: "national", img: "/images/faculty/DR. A. SHANMUGAVELAN.jpg" },
  { id: '62', name: "Dr.Shriraam Mahadevan", role: "Faculty", type: "national", img: "/images/faculty/Dr.Shriraam-Mahadevan.jpeg" },
  { id: '63', name: "Dr.Sriram VP", role: "Faculty", type: "national", img: "/images/faculty/Dr. Sriram VP.png" },
  { id: '65', name: "Dr.Suresh Kanna", role: "Faculty", type: "national", img: "/images/faculty/Dr.Suresh-Kanna.jpeg" },
  { id: '66', name: "Dr.Sunil Gupta", role: "Faculty", type: "national", img: "/images/faculty/DR.SUNIL GUPTA.jpg" },
  { id: '67', name: "Dr.Thangavelu Easwaran", role: "Faculty", type: "national", img: "/images/faculty/Thangavelu-Easwaran.jpeg" },
  { id: '68', name: "Dr.K.Uma Mahesh", role: "Faculty", type: "national", img: "/images/faculty/Dr. Uma Mahesh.png" },
  { id: '69', name: "Dr.Usha Aiyyagari", role: "Faculty", type: "national", img: "/images/faculty/Dr Usha Aiyyagari.png" },
  { id: '70', name: "Ms.Vaishnavi Vijay", role: "Faculty", type: "national", img: "/images/faculty/Ms.Vaishnavi Vijay.jpg" },
  // { id: '71', name: "Dr.Varun Ravindranath", role: "Faculty", type: "national", img: "/images/faculty/Dr.Varun-Ravindranath.jpeg" },
  { id: '72', name: "Dr.Vinitha Ramachandran", role: "Faculty", type: "national", img: "/images/faculty/Dr.Vinitha-Ramachandran.jpeg" },
  { id: '74', name: "Dr.Vijay Viswanathan", role: "Faculty", type: "national", img: "/images/faculty/vijay-viswanathan.jpg" },
  { id: '75', name: "Dr.G.Vijaya Kumar", role: "Faculty", type: "national", img: "/images/faculty/DR. VIJAYA KUMAR.jpg" },
  { id: '76', name: "Dr.Vishnu Priya Prashanth", role: "Faculty", type: "national", img: "/images/faculty/Dr.Vishnu Priya Prashanth.jpg" },
  { id: '77', name: "Dr.Vishnupriya Reddy", role: "Faculty", type: "national", img: "/images/faculty/Dr. Vishnupriya Reddy.jpg" },
  { id: '78', name: "Dr.Viswanathan Vishnu Vijay", role: "Faculty", type: "national", img: "/images/faculty/Dr. Viswanathan Vishnu Vijay.jpg" },
  // { id: '80', name: "Dr.Janaka karalliedde", role: "Faculty", type: "international", img: "/images/faculty/Dr-Janaka-karalliedde.jpg" },
  { id: '80', name: "Mr.Srikar Nallan", role: "Faculty", type: "international", img: "/images/faculty/Srikar-nallan.jpg" },
  { id: '81', name: "Dr Stephen P. Kidd", role: "Faculty", type: "international", img: "/images/faculty/Dr Stephen P. Kidd.jpeg" },
];

export default function FacultiesPage() {
  const internationalFaculties = faculties.filter((f) => f.type === 'international');
  const nationalFaculties = faculties.filter((f) => f.type === 'national');

  const renderGrid = (facultyList: Faculty[]) => (
    <div className={`grid gap-6 md:gap-8 w-full ${
      facultyList.length === 1
        ? 'grid-cols-1 max-w-sm mx-auto'
        : facultyList.length === 2
        ? 'grid-cols-1 sm:grid-cols-2 max-w-2xl mx-auto'
        : facultyList.length === 3
        ? 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 max-w-4xl mx-auto'
        : 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'
    }`}>
      {facultyList.map((faculty) => (
        <div
          key={faculty.id}
          className="group flex flex-col bg-white rounded-2xl overflow-hidden shadow-[0_4px_15px_-5px_rgba(0,0,0,0.05)] hover:shadow-2xl transition-all duration-500 border border-slate-100 hover:-translate-y-2 cursor-pointer"
        >
          {/* Large Portrait Image */}
          <div className="relative w-full aspect-square overflow-hidden bg-slate-100">
            <img 
              src={faculty.img} 
              alt={faculty.name}
              className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-700 ease-in-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
          
          {/* Content */}
          <div className={`p-6 text-center flex-grow flex flex-col items-center justify-center border-b-4 transition-colors duration-300 ${
            faculty.type === 'international' ? 'border-[#F26522]' : 'border-[#1F83C6]'
          }`}>
            <h3 className="text-xl font-extrabold text-slate-900 group-hover:text-[#1F83C6] transition-colors leading-tight">
              {faculty.name}
            </h3>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Hero Banner */}
      <div className="relative w-full h-[400px] flex items-center justify-center overflow-hidden bg-slate-900 mt-0">
        <div className="absolute inset-0 z-0">
          <img 
            src="/images/faculty.jpg" 
            alt="Faculties" 
            className="w-full h-full object-cover opacity-30" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-slate-900/1 to-transparent" />
        </div>
        
        <div className="relative z-10 text-center px-4">
          <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-4 tracking-tight">
            Our <span className="text-[#1F83C6]">Faculties</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-300 font-medium max-w-2xl mx-auto">
            Learn from the leading experts in diabetes and diabetic foot care.
          </p>
        </div>
      </div>

      <main className="flex-grow max-w-7xl mx-auto px-6 sm:px-8 py-16 w-full">
        
        {/* International Faculty Section */}
        {internationalFaculties.length > 0 && (
          <section className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">
                International Faculty
              </h2>
              <div className="w-16 h-1.5 bg-[#F26522] mx-auto rounded-full" />
            </div>
            {renderGrid(internationalFaculties)}
          </section>
        )}

        {/* National Faculty Section */}
        {nationalFaculties.length > 0 && (
          <section>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">
                National Faculty
              </h2>
              <div className="w-16 h-1.5 bg-[#1F83C6] mx-auto rounded-full" />
            </div>
            {renderGrid(nationalFaculties)}
          </section>
        )}

      </main>
    </div>
  );
}
