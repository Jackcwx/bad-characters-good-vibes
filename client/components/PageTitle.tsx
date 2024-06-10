interface Props {
  title: string
}

function PageTitle({ title }: Props) {
  return (
    <>
      <h1 className="mb-16 mt-2 font-title text-4xl font-bold tracking-wide text-white md:text-5xl xl:text-6xl">
        {title}
      </h1>
    </>
  )
}

export default PageTitle
