// Shared constants aligned with the VLR extraction pipeline taxonomy
// Source: vlr_collection/vlr_extraction pipeline (steps 2-4)

// ============================================================
// SDG Names
// ============================================================
export const SDG_NAMES: Record<number, string> = {
  1: 'No Poverty',
  2: 'Zero Hunger',
  3: 'Good Health',
  4: 'Quality Education',
  5: 'Gender Equality',
  6: 'Clean Water',
  7: 'Clean Energy',
  8: 'Decent Work',
  9: 'Innovation',
  10: 'Reduced Inequalities',
  11: 'Sustainable Cities',
  12: 'Responsible Consumption',
  13: 'Climate Action',
  14: 'Life Below Water',
  15: 'Life on Land',
  16: 'Peace & Justice',
  17: 'Partnerships',
};

export function getSDGName(id: number): string {
  return SDG_NAMES[id] || `SDG ${id}`;
}

// ============================================================
// Regions (from pipeline's 2_slice.py region classification)
// ============================================================
export const REGIONS = [
  'LATAM',
  'North America',
  'Europe',
  'Africa',
  'Middle East',
  'Asia',
  'Australia & Oceania',
] as const;

export type Region = (typeof REGIONS)[number];

// ============================================================
// Challenge Categories (12 categories from pipeline's 4_classify.py)
// ============================================================
export const CHALLENGE_CATEGORIES = [
  { id: 'fiscal_financial', name: 'Fiscal & Financial Constraints', color: '#ef4444' },
  { id: 'institutional_governance', name: 'Institutional & Governance Weaknesses', color: '#dc2626' },
  { id: 'legal_regulatory', name: 'Legal & Regulatory Gaps', color: '#f59e0b' },
  { id: 'human_capacity', name: 'Human Capacity & Technical Skills Deficits', color: '#eab308' },
  { id: 'data_monitoring', name: 'Data Monitoring & Evidence Gaps', color: '#f97316' },
  { id: 'multilevel_governance', name: 'Multi-Level Governance & Coordination Failures', color: '#8b5cf6' },
  { id: 'policy_coherence', name: 'Policy Coherence & Integration Deficits', color: '#a855f7' },
  { id: 'political_will', name: 'Political Will & Continuity Risks', color: '#ec4899' },
  { id: 'stakeholder_engagement', name: 'Stakeholder Engagement & Participation Deficits', color: '#3b82f6' },
  { id: 'external_shocks', name: 'External Shocks & Contextual Pressures', color: '#06b6d4' },
  { id: 'socioeconomic', name: 'Socioeconomic Conditions & Inequality', color: '#10b981' },
  { id: 'other_challenge', name: 'Other', color: '#94a3b8' },
] as const;

export type ChallengeId = (typeof CHALLENGE_CATEGORIES)[number]['id'];

// ============================================================
// Policy Categories (8 categories from pipeline's 4_classify.py)
// ============================================================
export const POLICY_CATEGORIES = [
  { id: 'information_awareness', name: 'Information, Awareness & Capacity Building', color: '#3b82f6' },
  { id: 'public_investment', name: 'Public Investment & Procurement', color: '#8b5cf6' },
  { id: 'economic_fiscal', name: 'Economic & Fiscal Instruments', color: '#ec4899' },
  { id: 'voluntary_partnership', name: 'Voluntary & Partnership Approaches', color: '#f59e0b' },
  { id: 'strategic_planning', name: 'Strategic Planning & Policy Frameworks', color: '#10b981' },
  { id: 'monitoring_evaluation', name: 'Monitoring, Evaluation & Data Systems', color: '#06b6d4' },
  { id: 'regulation_standards', name: 'Regulation & Standards', color: '#ef4444' },
  { id: 'other_policy', name: 'Other', color: '#94a3b8' },
] as const;

export type PolicyId = (typeof POLICY_CATEGORIES)[number]['id'];

// ============================================================
// Commitment Categories (9 categories from pipeline's 4_classify.py)
// ============================================================
export const COMMITMENT_CATEGORIES = [
  { id: 'strategy_plan', name: 'Strategy & Plan Development', color: '#3b82f6' },
  { id: 'regulatory_reform', name: 'Regulatory & Legislative Reform', color: '#ef4444' },
  { id: 'capital_investment', name: 'Capital Investment & Infrastructure', color: '#f59e0b' },
  { id: 'programme_service', name: 'Programme & Service Launch', color: '#10b981' },
  { id: 'institutional_capacity', name: 'Institutional Restructuring & Capacity Building', color: '#8b5cf6' },
  { id: 'data_reporting', name: 'Data Monitoring & Reporting Systems', color: '#06b6d4' },
  { id: 'partnership_collaboration', name: 'Partnership & Collaboration', color: '#ec4899' },
  { id: 'target_goal', name: 'Target & Goal Declaration', color: '#f97316' },
  { id: 'other_commitment', name: 'Other', color: '#94a3b8' },
] as const;

export type CommitmentId = (typeof COMMITMENT_CATEGORIES)[number]['id'];
