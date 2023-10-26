'use client'

import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'
import { LoadingIcon } from '@/components/icons/Loading'
import { analyze } from '@/services/hip'
import { useState } from 'react'

type ScoreResponse = {
  score: number
}

type FormType = {
  question: string
  answers: string[]
  correctAnswer: string
}
type HipForm = {
  chainOfThought: string
  demoData: FormType
}
export function HipForm({ chainOfThought, demoData }: HipForm) {
  const [score, setScore] = useState<number | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const [form, setForm] = useState<FormType>({
    question: '',
    answers: ['', '', '', ''],
    correctAnswer: '',
  })

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    setIsLoading(true)

    const formData = new FormData(event.currentTarget)
    const chainOfThought = formData.get('chain-of-thought')
    const question = formData.get('question') as string
    const answer1 = formData.get('answer1') as string
    const answer2 = formData.get('answer2') as string
    const answer3 = formData.get('answer3') as string
    const answer4 = formData.get('answer4') as string
    const correctAnswer = formData.get('correct-answer') as string

    const answers = [answer1, answer2, answer3, answer4]

    setForm({ question, answers, correctAnswer })

    analyze<ScoreResponse>({
      chain_of_thought: chainOfThought,
      question,
      answers: answers.join(','),
    })
      .then((data) => setScore(data.score))
      .finally(() => setIsLoading(false))
  }

  function handleLoadDemoData() {
    const { question, answers, correctAnswer } = demoData
    setForm({ question, answers, correctAnswer })
  }

  return (
    <div className="grid grid-cols-2 gap-6">
      <div>
        <Form form={form} onSubmit={handleSubmit} isLoading={isLoading} />
      </div>

      <div>
        <DefaultChainOfThought chainOfThought={chainOfThought} />

        <hr />

        <div className="my-6">
          <button
            onClick={handleLoadDemoData}
            className="text-white bg-cyan-700 hover:bg-blue-800 rounded-full text-sm px-5 py-2.5"
          >
            Fill form with demo question / answers
          </button>
        </div>

        <hr />

        <div className="my-6">
          <h3 className="text-2xl font-bold mb-2">Input analysis</h3>
          <AnalysisOutput isLoading={isLoading} score={score} form={form} />
        </div>
      </div>
    </div>
  )
}

type FormProps = {
  form: FormType
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void
  isLoading: boolean
}
function Form({ form, onSubmit, isLoading }: FormProps) {
  return (
    <form className="my-6" onSubmit={onSubmit}>
      <Textarea
        name="chain-of-thought"
        label="Enter a custom chain of thought or context:"
        placeholder="You are..."
      />

      <Input
        name="question"
        label="Question"
        placeholder="The chain termination method of sequencing:"
        defaultValue={form.question}
      />
      <Input
        name="answer1"
        label="Answer 1"
        placeholder="uses labeled ddNTPs"
        defaultValue={form.answers[0]}
      />
      <Input
        name="answer2"
        label="Answer 2"
        placeholder="uses only dideoxy"
        defaultValue={form.answers[1]}
      />
      <Input
        name="answer3"
        label="Answer 3"
        placeholder="nucleotides uses only"
        defaultValue={form.answers[2]}
      />
      <Input
        name="answer4"
        label="Answer 4"
        placeholder="nucleotides uses only"
        defaultValue={form.answers[3]}
      />
      <Input
        name="correct-answer"
        label="Correct answer"
        placeholder="uses labeled ddNTPs"
        defaultValue={form.correctAnswer}
      />

      <div className="grid place-content-center mt-6">
        <button
          disabled={isLoading}
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 rounded-full px-5 py-2.5 disabled:bg-gray-400"
        >
          Analyze input
        </button>
      </div>
    </form>
  )
}

type DefaultChainOfThoughtProps = {
  chainOfThought: string
}
function DefaultChainOfThought({ chainOfThought }: DefaultChainOfThoughtProps) {
  return (
    <div className="my-6">
      <h3 className="text-xl font-bold">Default Chain of Thought</h3>
      <pre className="text-xs -ml-[85px]">{chainOfThought}</pre>
    </div>
  )
}

type AnalysisOutputProps = {
  isLoading: boolean
  score: number | null
  form: FormType
}
function AnalysisOutput({ isLoading, score, form }: AnalysisOutputProps) {
  const { answers, correctAnswer } = form

  if (isLoading) {
    return (
      <p className="flex">
        <LoadingIcon /> Analyzing the chain of thought, question and answer
        choices...
      </p>
    )
  }

  if (score === null) {
    return <p>Enter a question and the answer choices to analyze</p>
  }

  const highlightClass =
    answers[score] === correctAnswer ? 'text-green-700' : 'text-red-700'

  return (
    <>
      <p>
        After analyzing the input data, the selected answer by the system is:
      </p>
      <strong className={highlightClass}>{answers[score]}</strong>
    </>
  )
}
