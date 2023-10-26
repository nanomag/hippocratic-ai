export function analyze<T>(data: any) {
  return fetch('http://localhost:8000/analyze', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  }).then((res) => res.json() as Promise<T>)
}
