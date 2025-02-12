import { auth } from "@clerk/nextjs/server";
import { Hero } from "./ui/landing/Hero";
import ImageCarousel from "./ui/common/ImageCaro";

export default async function Home() {
	const { userId } = await auth();
	return (
		<>
			<Hero userId={userId} />
			<ImageCarousel />
		</>
	);
}
