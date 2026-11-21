'use server';

import { auth, clerkClient } from '@clerk/nextjs/server';
import { PlanType } from '@/lib/subscription-constants';
import { revalidatePath } from 'next/cache';

export async function selectFreePlan(newPlan: PlanType) {
    const { userId } = await auth();

    if (!userId) {
        return { success: false, error: 'Please sign in to select a plan.' };
    }

    try {
        const client = await clerkClient();
        await client.users.updateUserMetadata(userId, {
            publicMetadata: {
                plan: newPlan,
            },
        });

        revalidatePath('/subscriptions');
        revalidatePath('/');
        return { success: true, plan: newPlan };
    } catch (e) {
        console.error('Failed to update user plan:', e);
        return { success: false, error: 'Failed to update plan. Please try again.' };
    }
}
