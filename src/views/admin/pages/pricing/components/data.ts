export type PlanType = {
  title: string
  description: string
  price: string
  billing: string
  projectInfo: string
  highlight?: boolean
  features: {
    text: string
    included: boolean
  }[]
  buttonText: string
  variant: string
  link: string
}

export const pricingPlanData: PlanType[] = [
  {
    title: 'Starter Plan',
    description: 'Best for freelancers and personal use',
    price: '$9',
    billing: 'Billed monthly',
    projectInfo: '1 project included',
    features: [
      { text: '1 active project', included: true },
      { text: 'Access to all components', included: true },
      { text: 'Email support', included: true },
      { text: 'No team collaboration', included: false },
      { text: 'No SaaS rights', included: false },
    ],
    buttonText: 'Choose Starter',
    variant: 'outline-primary',
    link: '#!',
  },
  {
    title: 'Professional',
    description: 'Ideal for small teams and startups',
    price: '$29',
    billing: 'Billed monthly',
    projectInfo: 'Up to 5 projects',
    highlight: true,
    features: [
      { text: '5 active projects', included: true },
      { text: 'Component + plugin access', included: true },
      { text: 'Team collaboration', included: true },
      { text: 'Priority email support', included: true },
      { text: 'No resale rights', included: false },
    ],
    buttonText: 'Choose Professional',
    variant: 'light',
    link: '#!',
  },
  {
    title: 'Business',
    description: 'For agencies and large teams',
    price: '$79',
    billing: 'Billed monthly',
    projectInfo: 'Unlimited projects',
    features: [
      { text: 'Unlimited projects', included: true },
      { text: 'SaaS & client projects allowed', included: true },
      { text: 'All premium components', included: true },
      { text: 'Priority support', included: true },
      { text: 'Team management tools', included: true },
    ],
    buttonText: 'Choose Business',
    variant: 'dark',
    link: '#!',
  },
  {
    title: 'Enterprise',
    description: 'Custom plan for enterprises & high-scale use',
    price: 'Contact Us',
    billing: 'Custom monthly billing',
    projectInfo: 'Based on usage & team size',
    features: [
      { text: 'Unlimited users & usage', included: true },
      { text: 'White-label license', included: true },
      { text: 'Custom integrations', included: true },
      { text: 'SLA + NDA agreements', included: true },
      { text: 'Dedicated manager & support', included: true },
    ],
    buttonText: 'Contact Sales',
    variant: 'outline-dark',
    link: 'mailto:sales@example.com',
  },
]
