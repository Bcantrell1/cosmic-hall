import { ClerkLoaded, ClerkLoading, SignedIn, UserButton } from '@clerk/nextjs';
import { UserCircle2Icon } from 'lucide-react';

export default function ClerkUserButton() {
    return (
        <>
            <ClerkLoading>
                <UserCircle2Icon width={28} height={28} />
            </ClerkLoading>
            <ClerkLoaded>
                <SignedIn>
                    <UserButton />
                </SignedIn>
            </ClerkLoaded>
        </>
    );
}
