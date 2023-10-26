import { HipForm } from './form'

type BaseDataResponse = {
  chain_of_thought: string
  demo_data: {
    question: string
    answers: string[]
    correct_answer: string
  }
}

function mapBaseData(data: BaseDataResponse) {
  return {
    chainOfThought: data.chain_of_thought,
    demoData: {
      question: data.demo_data.question,
      answers: data.demo_data.answers,
      correctAnswer: data.demo_data.correct_answer,
    },
  }
}

async function getBaseData() {
  const res = await fetch('http://127.0.0.1:8000/base-data')
  const data = await res.json()
  return mapBaseData(data)
}

export default async function Home() {
  const baseData = await getBaseData()
  const { chainOfThought, demoData } = baseData

  return (
    <main className="max-w-6xl m-auto my-6">
      <h1 className="text-center text-3xl font-bold">HIP Agent</h1>

      <HipForm chainOfThought={chainOfThought} demoData={demoData} />
    </main>
  )
}
