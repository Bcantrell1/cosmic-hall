// * Clerk Standard Setup and routing (handled in middleware)
import { SignUp } from '@clerk/nextjs'

export default function Page() {
  return (
		<div className="flex justify-center py-24">
			<SignUp />
		</div>
	)
}