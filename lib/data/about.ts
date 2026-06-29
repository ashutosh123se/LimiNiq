export interface TeamMember {
  name: string
  role: string
  color: string
  initials: string
  bio: string
  image: string
}

export const TEAM: TeamMember[] = [
  {
    name: 'Ashutosh Shekhar',
    role: 'CEO',
    color: '#3B5BFF',
    initials: 'AS',
    bio: 'Leads with a vision for innovation & growth.',
    image: '/images/team/ashutosh.png',
  },
  {
    name: 'Ayush Shekhar',
    role: 'Technical Head',
    color: '#00C8A0',
    initials: 'AS',
    bio: 'Architects scalable & secure digital solutions.',
    image: '/images/team/ayush.png',
  },
  {
    name: 'Akanksha Singh',
    role: 'Marketing Head',
    color: '#7B61FF',
    initials: 'AK',
    bio: 'Maximizes online visibility & growth strategies.',
    image: '/images/team/akanksha.jpg',
  },
  {
    name: 'Aman Kumar',
    role: 'Animation Head',
    color: '#FF4A7A',
    initials: 'AM',
    bio: 'Brings ideas to life through stunning visuals.',
    image: '/images/team/aman.png',
  },
]

export const ABOUT_STATS = [
  { value: '2019', label: 'Founded', accent: '#3B5BFF' },
  { value: '80+', label: 'Global clients', accent: '#00C8A0' },
  { value: '150+', label: 'Projects shipped', accent: '#7B61FF' },
  { value: '4.9★', label: 'Client rating', accent: '#F59E0B' },
]

export const ABOUT_VALUES = [
  {
    icon: 'code' as const,
    title: 'Engineering-first',
    desc: 'Clean code, modern stacks, and scalable architecture. We build products — not template sites.',
    color: '#3B5BFF',
  },
  {
    icon: 'chart' as const,
    title: 'Data-driven growth',
    desc: 'ROI-focused campaigns built on analytics, attribution, and continuous testing — no vanity metrics.',
    color: '#00C8A0',
  },
  {
    icon: 'users' as const,
    title: 'Radical transparency',
    desc: 'Direct access to the people building your product, with weekly updates and clear KPI tracking.',
    color: '#7B61FF',
  },
  {
    icon: 'globe' as const,
    title: 'Global perspective',
    desc: 'Based in India, competing on a world stage — Silicon Valley quality with unmatched agility.',
    color: '#0EA5E9',
  },
]

export const ABOUT_MILESTONES = [
  { year: '2019', title: 'Founded', detail: 'LIMINIQ starts as a software-led studio in India.' },
  { year: '2021', title: 'SaaS focus', detail: 'Expanded into multi-tenant products and enterprise portals.' },
  { year: '2023', title: 'Growth engine', detail: 'SEO & performance marketing become core delivery pillars.' },
  { year: '2025', title: '150+ shipped', detail: 'Serving clients across India and global markets.' },
]
