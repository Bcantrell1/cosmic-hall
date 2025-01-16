import { Button } from "@headlessui/react"
import Image from "next/image"
import Link from "next/link"

export const Hero = ({userId}: {userId: string | null}) => {

	return (
		<div className="bg-white flex relative pt-6 md:p-10 z-20 items-center overflow-hidden">
			<div className="container mx-auto px-6 flex relative py-16">
				<div className="sm:w-2/3 lg:w-2/5 flex flex-col relative z-20">
					<h1 className="font-bebas-neue uppercase text-6xl sm:text-8xl font-black flex flex-col leading-none">
						<span className="bg-gradient-to-r from-purple-600 via-cyan-700 to-green-800 text-transparent bg-clip-text">
							Cosmic
						</span>
						<span className="text-5xl sm:text-7xl text-gray-800">
							Hall
						</span>
					</h1>
					<p className="text-sm pt-4 sm:text-base text-gray-700">
						The virtual classroom intended to teach the basics of the cosmos. Topics related to common
						misunderstandings and the basics surrounding the industry. This project was a fun refresher
						on some React and Nextjs fundamentals as well as the Cosmos!
					</p>
					<div className="flex mt-8">
						{userId ? (
							<Button as={Link} href="/courses" className="uppercase py-2 px-4 rounded-lg bg-indigo-500 border-2 border-transparent text-white text-md mr-4 hover:bg-indigo-400">
								To Courses
							</Button>
						) : (
							<Button as={Link} href="/sign-in" className="uppercase py-2 px-4 rounded-lg bg-indigo-500 border-2 border-transparent text-white text-md mr-4 hover:bg-indigo-400">
								Sign In
							</Button>
						)}
					</div>
				</div>
				<div className="hidden sm:block sm:w-1/3 lg:w-3/5 relative">
					<Image src="/logo.png" alt="Home Logo" width={400} height={400} className="max-w-xs md:max-w-sm m-auto" />
				</div>
			</div>
		</div>
	)
}