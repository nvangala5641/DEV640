export type TeamMetric = {
  team: string;
  organization: string;
  members: number;
  trainingCompletion: number;
  weeklyPosts: number;
  unresolvedMessages: number;
};

export const teamMetrics: TeamMetric[] = [
  {
    team: "Engineering",
    organization: "Product",
    members: 24,
    trainingCompletion: 91,
    weeklyPosts: 42,
    unresolvedMessages: 8,
  },
  {
    team: "Sales",
    organization: "Revenue",
    members: 18,
    trainingCompletion: 85,
    weeklyPosts: 33,
    unresolvedMessages: 5,
  },
  {
    team: "Customer Success",
    organization: "Operations",
    members: 14,
    trainingCompletion: 88,
    weeklyPosts: 27,
    unresolvedMessages: 4,
  },
  {
    team: "HR",
    organization: "People",
    members: 9,
    trainingCompletion: 94,
    weeklyPosts: 19,
    unresolvedMessages: 2,
  },
];

export const upcomingTrainings = [
  {
    id: "tr-100",
    title: "Inclusive Communication Essentials",
    owner: "HR",
    scheduledFor: "2026-03-24",
    seats: 40,
  },
  {
    id: "tr-101",
    title: "Secure Messaging and Data Handling",
    owner: "Engineering",
    scheduledFor: "2026-03-27",
    seats: 50,
  },
  {
    id: "tr-102",
    title: "Conflict Resolution for Team Leads",
    owner: "People Ops",
    scheduledFor: "2026-04-02",
    seats: 30,
  },
];

export const activityEvents = [
  {
    id: "evt-01",
    user: "Yudai Yaguchi",
    team: "Engineering",
    action: "posted a quote about sprint priorities",
    at: "2026-03-15T09:20:00",
  },
  {
    id: "evt-02",
    user: "Darshilkumar Patel",
    team: "Sales",
    action: "completed Secure Messaging training",
    at: "2026-03-15T10:10:00",
  },
  {
    id: "evt-03",
    user: "Xinyi Yin",
    team: "HR",
    action: "created a new topic: Burnout Prevention",
    at: "2026-03-15T11:42:00",
  },
  {
    id: "evt-04",
    user: "Naga Pranav Vangala",
    team: "Engineering",
    action: "sent a direct message to Customer Success",
    at: "2026-03-15T12:16:00",
  },
  {
    id: "evt-05",
    user: "Alicia Tran",
    team: "Customer Success",
    action: "submitted feedback on future onboarding topics",
    at: "2026-03-15T13:05:00",
  },
];

export const counselingPartners = [
  {
    name: "MindfulBridge",
    specialty: "Stress and burnout support",
    responseTime: "Within 24 hours",
    url: "https://example.com/mindfulbridge",
  },
  {
    name: "CareerCare Network",
    specialty: "Career and performance counseling",
    responseTime: "Same-day triage",
    url: "https://example.com/careercare",
  },
  {
    name: "TalkForward",
    specialty: "Personal therapy referrals",
    responseTime: "Within 48 hours",
    url: "https://example.com/talkforward",
  },
];
