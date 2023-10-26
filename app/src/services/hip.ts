import { config } from '@/config'

export function analyze<T>(data: any) {
  return fetch(`${config.apiUrl}/analyze`, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  }).then((res) => res.json() as Promise<T>)
}
