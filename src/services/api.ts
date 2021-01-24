export const query = async <T>(url: string, token: string) => {
  const result = await fetch(url, {
    headers: new Headers({
      authorization: `Basic ${token}`
    })
  })

  return (await result.json()) as T | null
}
