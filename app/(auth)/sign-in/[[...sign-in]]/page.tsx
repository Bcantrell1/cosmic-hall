// * Clerk Standard Setup and routing (handled in middleware)
import { SignIn } from '@clerk/nextjs';

export default function SignInPage() {
    return <SignIn fallbackRedirectUrl={'/courses'} />;
}
