'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { Check, Sparkles } from 'lucide-react';
import { useSubscription } from '@/hooks/useSubscription';
import { PLANS, PLAN_LIMITS, PlanType } from '@/lib/subscription-constants';
import { selectFreePlan } from '@/lib/actions/subscription.actions';
import { useAuth } from '@clerk/nextjs';

export default function SubscriptionsPage() {
  const { isSignedIn } = useAuth();
  const { plan: currentPlan, isLoaded } = useSubscription();
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);

  const handleSelectPlan = async (targetPlan: PlanType) => {
    if (!isSignedIn) {
      toast.error('Please sign in to select a plan.');
      return;
    }

    if (currentPlan === targetPlan) {
      toast.info(`You are already on the ${targetPlan.toUpperCase()} plan.`);
      return;
    }

    setLoadingPlan(targetPlan);
    try {
      const res = await selectFreePlan(targetPlan);
      if (res.success) {
        toast.success(`Successfully switched to the ${targetPlan.toUpperCase()} plan!`);
        // Refresh page so client context updates
        window.location.reload();
      } else {
        toast.error(res.error || 'Failed to update plan.');
      }
    } catch {
      toast.error('An unexpected error occurred.');
    } finally {
      setLoadingPlan(null);
    }
  };

  const plansList = [
    {
      id: PLANS.FREE,
      name: 'Free',
      price: '$0',
      period: 'forever',
      description: 'Ideal for trying out Bookified with your first book.',
      features: [
        `${PLAN_LIMITS[PLANS.FREE].maxBooks} Book upload`,
        `${PLAN_LIMITS[PLANS.FREE].maxSessionsPerMonth} Voice sessions / month`,
        `${PLAN_LIMITS[PLANS.FREE].maxDurationPerSession} Minutes per session`,
        'Basic AI persona voices',
      ],
      isPopular: false,
    },
    {
      id: PLANS.STANDARD,
      name: 'Standard',
      price: '$0',
      period: 'free in dev',
      originalPrice: '$9.99',
      description: 'Great for active readers and students.',
      features: [
        `Up to ${PLAN_LIMITS[PLANS.STANDARD].maxBooks} Books`,
        `${PLAN_LIMITS[PLANS.STANDARD].maxSessionsPerMonth} Voice sessions / month`,
        `${PLAN_LIMITS[PLANS.STANDARD].maxDurationPerSession} Minutes per session`,
        'Session history enabled',
        'All ElevenLabs voice personas',
      ],
      isPopular: false,
    },
    {
      id: PLANS.PRO,
      name: 'Pro',
      price: '$0',
      period: 'free in dev',
      originalPrice: '$19.99',
      description: 'Maximum power with unlimited sessions and book uploads.',
      features: [
        `Up to ${PLAN_LIMITS[PLANS.PRO].maxBooks} Books`,
        'Unlimited voice sessions',
        `Up to ${PLAN_LIMITS[PLANS.PRO].maxDurationPerSession} Minutes per session`,
        'Session history & transcripts',
        'Priority AI response generation',
      ],
      isPopular: true,
    },
  ];

  return (
    <div className="container wrapper py-12">
      <div className="flex flex-col items-center text-center mb-12">
        <h1 className="text-4xl font-bold font-serif mb-4">Choose Your Plan</h1>
        <p className="text-muted-foreground max-w-2xl text-lg">
          Select any plan below. During development, all plans are 100% free with instant activation.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {plansList.map((p) => {
          const isCurrent = isLoaded && currentPlan === p.id;
          const isLoading = loadingPlan === p.id;

          return (
            <div
              key={p.id}
              className={`relative rounded-2xl p-8 bg-white border transition-all flex flex-col justify-between ${
                p.isPopular
                  ? 'border-[#212a3b] shadow-xl ring-2 ring-[#212a3b]'
                  : 'border-border shadow-sm hover:shadow-md'
              }`}
            >
              {p.isPopular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#212a3b] text-white text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1 shadow-sm">
                  <Sparkles className="size-3" />
                  Most Popular
                </div>
              )}

              <div>
                <div className="flex justify-between items-baseline mb-2">
                  <h3 className="text-2xl font-bold font-serif text-[#212a3b]">{p.name}</h3>
                  {isCurrent && (
                    <span className="text-xs bg-emerald-100 text-emerald-800 font-semibold px-2.5 py-0.5 rounded-full">
                      Active Plan
                    </span>
                  )}
                </div>

                <p className="text-sm text-muted-foreground mb-6 min-h-[40px]">
                  {p.description}
                </p>

                <div className="flex items-baseline gap-2 mb-6">
                  <span className="text-4xl font-extrabold text-[#212a3b]">{p.price}</span>
                  {p.originalPrice && (
                    <span className="text-base text-muted-foreground line-through">
                      {p.originalPrice}
                    </span>
                  )}
                  <span className="text-sm text-muted-foreground">/ {p.period}</span>
                </div>

                <div className="border-t border-border/60 pt-6 mb-8">
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-4">
                    What&apos;s included
                  </p>
                  <ul className="space-y-3">
                    {p.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3 text-sm text-gray-700">
                        <Check className="size-4 text-emerald-600 mt-0.5 shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <button
                type="button"
                onClick={() => handleSelectPlan(p.id as PlanType)}
                disabled={isCurrent || isLoading}
                className={`w-full py-3 px-4 rounded-xl font-medium text-sm transition-all shadow-sm ${
                  isCurrent
                    ? 'bg-gray-100 text-gray-500 cursor-default'
                    : p.isPopular
                    ? 'bg-[#212a3b] hover:bg-[#3d485e] text-white'
                    : 'bg-white hover:bg-gray-50 text-[#212a3b] border border-border'
                }`}
              >
                {isLoading
                  ? 'Activating...'
                  : isCurrent
                  ? 'Current Plan'
                  : 'Activate for Free'}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
