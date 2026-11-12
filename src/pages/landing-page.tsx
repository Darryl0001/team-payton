import { Link } from "react-router"
import { buttonVariants } from "@/components/ui/button"
import { exampleQuestions } from "@/data/example-questions"
import { usePageTitle } from "@/hooks/use-page-title"

const steps = [
  {
    title: "Ask",
    text: "Type your question the way you would ask a staff member.",
  },
  {
    title: "Search",
    text: "CampusQuery looks through the information published by the college.",
  },
  {
    title: "Check",
    text: "You get an answer and the sources it came from.",
  },
]

export function LandingPage() {
  usePageTitle("")

  return (
    <main className="flex-1">
      <section className="mx-auto w-full max-w-5xl px-4 py-12 sm:px-6 sm:py-20">
        <h1 className="max-w-2xl text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
          Get answers about admissions, enrollment, fees, and more.
        </h1>
        <p className="mt-4 max-w-xl text-base text-muted-foreground">
          CampusQuery answers your questions using information published by the
          college and shows where each answer comes from.
        </p>
        <Link
          to="/ask"
          className={buttonVariants({ size: "lg", className: "mt-8 px-6" })}
        >
          Ask AI
        </Link>
      </section>

      <section
        aria-labelledby="how-it-works"
        className="mx-auto w-full max-w-5xl px-4 pb-12 sm:px-6 sm:pb-16"
      >
        <h2 id="how-it-works" className="text-lg font-semibold">
          How it works
        </h2>
        <ol className="mt-4 grid gap-6 sm:grid-cols-3">
          {steps.map((step, index) => (
            <li key={step.title}>
              <p className="text-sm text-muted-foreground">Step {index + 1}</p>
              <p className="mt-1 font-medium">{step.title}</p>
              <p className="mt-1 text-sm text-muted-foreground">{step.text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section
        aria-labelledby="example-questions"
        className="mx-auto w-full max-w-5xl px-4 pb-16 sm:px-6 sm:pb-24"
      >
        <h2 id="example-questions" className="text-lg font-semibold">
          What you can ask
        </h2>
        <ul className="mt-4 divide-y border-y">
          {exampleQuestions.map(({ category, question }) => (
            <li
              key={category}
              className="flex flex-col gap-1 py-3 sm:flex-row sm:items-baseline sm:gap-6"
            >
              <span className="text-sm font-medium sm:w-48 sm:shrink-0">
                {category}
              </span>
              <Link
                to={`/ask?q=${encodeURIComponent(question)}`}
                className="rounded-md text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
              >
                {question}
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </main>
  )
}
