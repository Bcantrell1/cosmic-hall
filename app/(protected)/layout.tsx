import CourseHeader from "../ui/course/CourseHeader"

export const metadata = {
  title: 'Cosmic Hall | Course',
  description: 'Course selection for the Cosmic Hall.',
}

export default async function CourseLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <>
			<CourseHeader />
			<div className="mx-auto container">
				{children}
			</div>
		</>
  )
}