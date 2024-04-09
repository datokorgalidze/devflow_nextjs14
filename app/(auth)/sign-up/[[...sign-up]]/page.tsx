
import { SignUp } from "@clerk/nextjs";
import { SignedOut } from "@clerk/nextjs";
 
export default function Page() {
  return (
      <SignedOut>
        <SignUp />
      </SignedOut>
  );
}