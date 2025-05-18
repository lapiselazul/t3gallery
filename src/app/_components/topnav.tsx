import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";


export function TopNav() {
  return (
    <div className="flex w-full items-center justify-between border-b p-4 text-xl font-semibold">
      <div>Gallery</div>
      <div>
         <SignedOut>
              <SignInButton />
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
      </div>
    </div>
  );
}