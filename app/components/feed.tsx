import Image from 'next/image'
import { params } from '@ampt/sdk'

import 'server-only'

import { setTimeout } from 'timers/promises'

async function getData() {
  await setTimeout(1000)
  return {
    items: [
      {
        key: '1',
        from: 'The Ampt Team',
        to: params('ENV_NAME'),
        subject: 'Welcome to Ampt!',
      },
    ],
  }
}

export function FeedSkeleton() {
  return (
    <div className="m-4 mx-auto rounded-md border p-4">
      <div className="flex h-full animate-pulse flex-row items-center justify-center space-x-5">
        <div className="h-8 w-8 rounded-full bg-gray-300 "></div>
        <div className="flex flex-col space-y-3">
          <div className="h-6 w-48 rounded-md bg-gray-300 "></div>
          <div className="h-6 w-48 rounded-md bg-gray-300 "></div>
          <div className="h-6 w-96 rounded-md bg-gray-300 "></div>
        </div>
      </div>
    </div>
  )
}

export async function Feed() {
  const data = await getData()

  return data.items.map((item) => (
    <div key={item.key} className="m-4 mx-auto rounded-md border p-4">
      <div className="flex h-full flex-row items-center justify-center space-x-5">
        <div className="h-8 w-8 rounded-full">
          <Image src="/favicon-32.png" alt="Ampt Logo" width={32} height={32} />
        </div>
        <div className="flex flex-col space-y-3">
          <div className="h-6 w-48 rounded-md ">From: {item.from}</div>
          <div className="h-6 w-48 rounded-md ">To: {item.to}</div>
          <div className="h-6 w-96 rounded-md ">Subject: {item.subject}</div>
        </div>
      </div>
    </div>
  ))
}
