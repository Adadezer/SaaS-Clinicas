"use client";

import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";

function SignOutButtom() {
  const router = useRouter();

  return (
    <Button
      onClick={() =>
        authClient.signOut({
          fetchOptions: { onSuccess: () => router.push("/authentication") },
        })
      }
    >
      Sair
    </Button>
  );
}

export default SignOutButtom;
