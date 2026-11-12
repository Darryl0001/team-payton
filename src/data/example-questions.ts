import type { KnowledgeCategory } from "@/types"

export interface ExampleQuestion {
  category: KnowledgeCategory
  question: string
  /** Also offered as a starting point in the assistant. */
  suggested?: boolean
}

export const exampleQuestions: ExampleQuestion[] = [
  {
    category: "Admissions",
    question: "What are the admission requirements for first-year students?",
    suggested: true,
  },
  {
    category: "Enrollment",
    question: "How do I enroll for the new semester?",
    suggested: true,
  },
  {
    category: "Tuition and Fees",
    question: "What payment methods are available?",
    suggested: true,
  },
  {
    category: "Scholarships",
    question: "What scholarships does the college offer?",
    suggested: true,
  },
  {
    category: "Academic Calendar",
    question: "How many weeks are in a semester?",
  },
  {
    category: "Academic Policies",
    question: "What is the lowest passing grade?",
    suggested: true,
  },
  {
    category: "Student Services",
    question: "How can I get counseling?",
  },
  {
    category: "Campus Facilities",
    question: "How long can I borrow library books?",
  },
]
