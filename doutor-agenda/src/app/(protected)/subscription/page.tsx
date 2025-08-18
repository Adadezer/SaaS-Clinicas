import { headers } from "next/headers";
import { redirect } from "next/navigation";

import {
  PageContainer,
  PageContent,
  PageDescription,
  PageHeader,
  PageHeaderContent,
  PageTitle,
} from "@/components/ui/page-container";
import { auth } from "@/lib/auth";

import { PremiumPlan } from "./_components/premium-plan";
import { SubscriptionPlan } from "./_components/subscription-plan";

const SubscriptionPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/login");
  }

  if (!session.user.clinic) {
    redirect("/clinic-form");
  }

  return (
    <PageContainer>
      <PageHeader>
        <PageHeaderContent>
          <PageTitle>Assinatura</PageTitle>
          <PageDescription>Gerencie a sua assinatura.</PageDescription>
        </PageHeaderContent>
      </PageHeader>
      <PageContent>
        <div className="flex flex-col gap-4 md:flex-row">
          <div className="max-w-[540px] flex-1">
            <SubscriptionPlan
              active={session.user.plan === "essential"}
              userEmail={session.user.email}
            />
          </div>
          <div className="max-w-[550px] flex-1">
            <PremiumPlan />
          </div>
        </div>
      </PageContent>
    </PageContainer>
  );
};

export default SubscriptionPage;
