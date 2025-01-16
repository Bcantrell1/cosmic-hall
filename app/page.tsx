import { SignInButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { Button } from "@headlessui/react";
import Link from "next/link";

export default async function Home() {
	const { userId } = await auth();
	return (
		<div className="bg-[#FAFAFA] relative">
			<h1>Home Page</h1>
			{userId ? (
				<Button>
					<Link href="/courses">Courses</Link>
				</Button>
			) : (
				<SignInButton />
			)}
		</div>
	);
}
