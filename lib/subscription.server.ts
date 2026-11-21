import { auth, clerkClient } from "@clerk/nextjs/server";
import { PLANS, PLAN_LIMITS, PlanType } from "@/lib/subscription-constants";

export const getUserPlan = async (): Promise<PlanType> => {
    const { has, userId } = await auth();

    if (!userId) return PLANS.FREE;

    if (has?.({ plan: "pro" }) || has?.({ product: "pro" })) return PLANS.PRO;
    if (has?.({ plan: "standard" }) || has?.({ product: "standard" })) return PLANS.STANDARD;

    try {
        const client = await clerkClient();
        const user = await client.users.getUser(userId);
        const metaPlan = (user?.publicMetadata?.plan || user?.publicMetadata?.billingPlan)?.toString().toLowerCase();

        if (metaPlan === 'pro') return PLANS.PRO;
        if (metaPlan === 'standard') return PLANS.STANDARD;
    } catch (e) {
        console.error('Error fetching user metadata for plan:', e);
    }

    return PLANS.FREE;
};

export const getPlanLimits = async () => {
    const plan = await getUserPlan();
    return PLAN_LIMITS[plan];
};
