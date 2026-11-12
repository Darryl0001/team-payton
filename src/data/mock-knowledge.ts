import type { KnowledgeEntry } from "@/types"

/**
 * Sample knowledge entries used until the backend is available.
 * Paragraphs are separated by a blank line; each paragraph is treated as one chunk.
 * Lines starting with "- " are lists. Replace with real college information.
 */
export const seedKnowledge: KnowledgeEntry[] = [
  {
    id: "k-001",
    title: "Admission requirements for first-year students",
    category: "Admissions",
    status: "published",
    indexStatus: "indexed",
    chunkCount: 3,
    createdAt: "2026-01-12T08:00:00.000Z",
    updatedAt: "2026-08-03T09:30:00.000Z",
    content: `First-year applicants must have completed secondary education and meet the minimum admission requirements of their chosen program.

Required documents:
- Completed application form
- Senior high school report card (Form 138)
- Certificate of good moral character
- Two 2x2 ID photos
- Photocopy of birth certificate

Applicants must also take the college admission test. Results are released within two weeks after the test date.`,
  },
  {
    id: "k-002",
    title: "Transferee and returning student admission",
    category: "Admissions",
    status: "published",
    indexStatus: "indexed",
    chunkCount: 2,
    createdAt: "2026-01-14T08:00:00.000Z",
    updatedAt: "2026-07-21T14:10:00.000Z",
    content: `Transferees must submit an honorable dismissal, a transcript of records, and a certificate of good moral character from their previous school.

Credits from other schools are evaluated by the program chair. Only subjects with a passing grade that match the curriculum can be credited.`,
  },
  {
    id: "k-003",
    title: "How to enroll for the new semester",
    category: "Enrollment",
    status: "published",
    indexStatus: "indexed",
    chunkCount: 3,
    createdAt: "2026-01-20T08:00:00.000Z",
    updatedAt: "2026-08-10T10:00:00.000Z",
    content: `Enrollment is done in three steps:
1. Get your advising form from your program chair and have your subjects approved.
2. Pay the required fees at the cashier or through the online payment channels.
3. Submit your advising form and proof of payment to the registrar to receive your registration form.

Students with unsettled accounts or incomplete requirements cannot be enrolled until these are resolved.`,
  },
  {
    id: "k-004",
    title: "Adding, dropping, and changing subjects",
    category: "Enrollment",
    status: "published",
    indexStatus: "indexed",
    chunkCount: 2,
    createdAt: "2026-02-02T08:00:00.000Z",
    updatedAt: "2026-06-18T11:45:00.000Z",
    content: `Students may add or change subjects only during the first week of classes. A change of subject form must be signed by the program chair and submitted to the registrar.

Dropping a subject is allowed until the midterm period. A dropped subject is marked "Dropped" on the student record and does not count as a failure.`,
  },
  {
    id: "k-005",
    title: "Tuition and miscellaneous fees",
    category: "Tuition and Fees",
    status: "published",
    indexStatus: "indexed",
    chunkCount: 3,
    createdAt: "2026-02-10T08:00:00.000Z",
    updatedAt: "2026-08-01T13:20:00.000Z",
    content: `Tuition is charged per unit. Laboratory subjects have an additional laboratory fee. Miscellaneous fees cover the library, registration, medical and dental services, and student activities.

The full schedule of fees depends on the program and is posted by the accounting office before each enrollment period.

Students can pay in full or in installments. Installment payments are divided into upfront payment, prelim, midterm, and final.`,
  },
  {
    id: "k-006",
    title: "Payment methods and installment deadlines",
    category: "Tuition and Fees",
    status: "published",
    indexStatus: "indexed",
    chunkCount: 2,
    createdAt: "2026-02-11T08:00:00.000Z",
    updatedAt: "2026-07-30T08:15:00.000Z",
    content: `Payments can be made at the cashier's office, through bank deposit, or through the online payment portal. Keep your official receipt or payment confirmation for enrollment and clearance.

A student must settle each installment before the scheduled examination period. Students who have not paid may be asked to secure a permit from the accounting office before taking an examination.`,
  },
  {
    id: "k-007",
    title: "College scholarship programs",
    category: "Scholarships",
    status: "published",
    indexStatus: "indexed",
    chunkCount: 3,
    createdAt: "2026-02-18T08:00:00.000Z",
    updatedAt: "2026-07-05T15:00:00.000Z",
    content: `The college offers several scholarship and financial aid programs:
- Academic scholarship for students with outstanding grades
- Working scholarship for students who assist college offices
- Government-funded tuition subsidies for qualified students

Academic scholars must maintain the required general weighted average each semester to keep their scholarship.

Applications are submitted to the scholarship office with a copy of grades, a certificate of indigency or income, and a recommendation letter.`,
  },
  {
    id: "k-008",
    title: "Academic calendar for the current school year",
    category: "Academic Calendar",
    status: "published",
    indexStatus: "indexed",
    chunkCount: 2,
    createdAt: "2026-03-01T08:00:00.000Z",
    updatedAt: "2026-08-12T09:00:00.000Z",
    content: `The school year has two semesters and an optional summer term. Each semester has 18 weeks, including prelim, midterm, and final examination weeks.

Important dates are announced by the registrar at the start of each semester. This includes the enrollment period, the last day of adding and dropping subjects, examination weeks, and the end of the semester.`,
  },
  {
    id: "k-009",
    title: "Grading system and passing marks",
    category: "Academic Policies",
    status: "published",
    indexStatus: "indexed",
    chunkCount: 3,
    createdAt: "2026-03-05T08:00:00.000Z",
    updatedAt: "2026-05-27T10:30:00.000Z",
    content: `Grades are given on a scale of 1.0 to 5.0, where 1.0 is the highest grade and 3.0 is the lowest passing grade. A grade of 5.0 means failed.

Other marks:
- INC: incomplete requirements, which must be completed within the next semester
- DRP: dropped with approval
- NG: no grade submitted by the instructor

A student with an incomplete grade who does not complete the requirements on time will receive a failing grade.`,
  },
  {
    id: "k-010",
    title: "Attendance and absences",
    category: "Academic Policies",
    status: "unpublished",
    indexStatus: "not_indexed",
    chunkCount: 0,
    createdAt: "2026-08-14T08:00:00.000Z",
    updatedAt: "2026-08-14T08:00:00.000Z",
    content: `Students are expected to attend all class sessions. A student who is absent for more than the allowed percentage of class hours may be dropped from the subject.

Absences due to illness or official college activities must be supported by a medical certificate or an approved excuse letter.`,
  },
  {
    id: "k-011",
    title: "Library services and borrowing",
    category: "Campus Facilities",
    status: "published",
    indexStatus: "indexed",
    chunkCount: 2,
    createdAt: "2026-03-12T08:00:00.000Z",
    updatedAt: "2026-04-22T16:00:00.000Z",
    content: `The library is open to all enrolled students with a valid school ID. Students may borrow general collection books for up to seven days and renew them once if no one else has reserved them.

Reference books, theses, and periodicals are for use inside the library only. Overdue books are charged a fine for each day.`,
  },
  {
    id: "k-012",
    title: "Guidance and counseling services",
    category: "Student Services",
    status: "published",
    indexStatus: "indexed",
    chunkCount: 2,
    createdAt: "2026-03-20T08:00:00.000Z",
    updatedAt: "2026-06-02T09:45:00.000Z",
    content: `The guidance office provides free and confidential counseling for personal, academic, and career concerns. Students can walk in or book an appointment.

The office also offers career talks, study skills sessions, and orientation programs for new students.`,
  },
  {
    id: "k-013",
    title: "Requesting academic records and certificates",
    category: "Student Services",
    status: "unpublished",
    indexStatus: "not_indexed",
    chunkCount: 0,
    createdAt: "2026-08-15T08:00:00.000Z",
    updatedAt: "2026-08-15T08:00:00.000Z",
    content: `Students can request a transcript of records, certificate of enrollment, or certificate of grades from the registrar's office.

Submit a request form with a valid ID and the payment receipt. Processing takes several working days, depending on the document.`,
  },
]
