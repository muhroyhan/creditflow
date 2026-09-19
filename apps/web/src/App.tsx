const App = async () => {
  const hello = await fetch('http://localhost:3000/live')
  const result = await hello.json()
  console.log(result)
  return <div>{result}</div>
}

export { App }
