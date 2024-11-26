import Link from "next/link"

const MainPage = () => {
  return(
    <>
      <h1>Home page</h1>
      <Link href="/innerPage">To inner page</Link>
    </>
  )
}

export default MainPage