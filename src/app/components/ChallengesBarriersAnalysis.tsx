import { useState, useMemo } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  LineChart,
  Line,
} from 'recharts';
import { Network, Shield, Database, DollarSign, Users, GitBranch, AlertCircle, Clock } from 'lucide-react';

// Challenge types
const challengeTypes = [
  { id: 'governance', name: 'Governance Barriers', icon: Shield, color: '#ef4444' },
  { id: 'data', name: 'Data Gaps', icon: Database, color: '#f59e0b' },
  { id: 'financing', name: 'Financing Constraints', icon: DollarSign, color: '#eab308' },
  { id: 'capacity', name: 'Institutional Capacity', icon: Users, color: '#3b82f6' },
  { id: 'coordination', name: 'Coordination Issues', icon: GitBranch, color: '#8b5cf6' },
];

// Generate comprehensive challenge data with multiple dimensions
const generateChallengeData = () => {
  const sdgs = Array.from({ length: 17 }, (_, i) => i + 1);
  const regions = ['Europe', 'Asia-Pacific', 'Africa', 'Latin America', 'Arab States'];
  const timePeriods = ['2015-2020', '2021-2025'];

  const data: any[] = sdgs.map(sdgId => {
    const baseValues = {
      governance: 30 + Math.random() * 40,
      data: 25 + Math.random() * 45,
      financing: 40 + Math.random() * 50,
      capacity: 20 + Math.random() * 40,
      coordination: 25 + Math.random() * 35,
    };

    if ([16, 17].includes(sdgId)) {
      baseValues.governance += 20;
      baseValues.coordination += 15;
    }
    if ([11, 13, 14, 15].includes(sdgId)) {
      baseValues.coordination += 15;
      baseValues.data += 10;
    }
    if ([9, 12].includes(sdgId)) {
      baseValues.data += 20;
    }
    if ([1, 2, 8].includes(sdgId)) {
      baseValues.financing += 15;
    }

    const regionalBreakdown: Record<string, any> = {};
    regions.forEach(region => {
      regionalBreakdown[region] = {
        governance: Math.round(baseValues.governance * (0.7 + Math.random() * 0.6)),
        data: Math.round(baseValues.data * (0.7 + Math.random() * 0.6)),
        financing: Math.round(baseValues.financing * (0.7 + Math.random() * 0.6)),
        capacity: Math.round(baseValues.capacity * (0.7 + Math.random() * 0.6)),
        coordination: Math.round(baseValues.coordination * (0.7 + Math.random() * 0.6)),
      };

      if (region === 'Africa') {
        regionalBreakdown[region].financing += 15;
        regionalBreakdown[region].capacity += 10;
      } else if (region === 'Europe') {
        regionalBreakdown[region].data += 10;
        regionalBreakdown[region].coordination += 5;
      }
    });

    return {
      sdg: sdgId,
      challenges: {
        governance: Math.round(baseValues.governance),
        data: Math.round(baseValues.data),
        financing: Math.round(baseValues.financing),
        capacity: Math.round(baseValues.capacity),
        coordination: Math.round(baseValues.coordination),
      },
      regionalBreakdown,
    };
  });

  // Challenge co-occurrence data (which challenges appear together)
  const cooccurrenceData: any[] = [];
  challengeTypes.forEach((challenge1, i) => {
    challengeTypes.forEach((challenge2, j) => {
      if (i < j) {
        // Calculate how often both challenges appear together (both >50)
        const cooccurrence = data.filter(d => 
          d.challenges[challenge1.id as keyof typeof d.challenges] > 50 &&
          d.challenges[challenge2.id as keyof typeof d.challenges] > 50
        ).length;
        
        cooccurrenceData.push({
          challenge1: challenge1.name,
          challenge2: challenge2.name,
          cooccurrence,
          percentage: Math.round((cooccurrence / 17) * 100),
        });
      }
    });
  });

  // Temporal evolution data
  const temporalData = timePeriods.map(period => {
    const periodData: any = { period };
    challengeTypes.forEach(challenge => {
      // Simulate change over time - financing decreasing, coordination increasing
      let value = 40 + Math.random() * 30;
      if (period === '2021-2025') {
        if (challenge.id === 'financing') value -= 8;
        if (challenge.id === 'coordination') value += 12;
        if (challenge.id === 'data') value += 8;
      }
      periodData[challenge.id] = Math.round(value);
    });
    return periodData;
  });

  // Severity vs Frequency data for each challenge
  const severityFrequencyData = challengeTypes.map(challenge => {
    // Frequency = how many SDGs report this challenge
    const frequency = data.filter(d => 
      d.challenges[challenge.id as keyof typeof d.challenges] > 30
    ).length;
    
    // Severity = average intensity when reported
    const reportedValues = data
      .map(d => d.challenges[challenge.id as keyof typeof d.challenges])
      .filter(v => v > 30);
    const severity = reportedValues.length > 0 
      ? Math.round(reportedValues.reduce((a, b) => a + b, 0) / reportedValues.length)
      : 0;
    
    return {
      name: challenge.name,
      frequency,
      severity,
      color: challenge.color,
    };
  });

  // Challenge cascade/dependency (which challenges enable others)
  const cascadeData = [
    { 
      source: 'Financing Constraints', 
      target: 'Institutional Capacity',
      strength: 85,
      explanation: 'Lack of funding directly limits capacity building'
    },
    { 
      source: 'Institutional Capacity', 
      target: 'Data Gaps',
      strength: 70,
      explanation: 'Weak institutions struggle to collect/manage data'
    },
    { 
      source: 'Data Gaps', 
      target: 'Governance Barriers',
      strength: 65,
      explanation: 'Poor data undermines evidence-based governance'
    },
    { 
      source: 'Governance Barriers', 
      target: 'Coordination Issues',
      strength: 75,
      explanation: 'Weak governance frameworks hinder coordination'
    },
    { 
      source: 'Financing Constraints', 
      target: 'Data Gaps',
      strength: 60,
      explanation: 'Limited funds for monitoring systems'
    },
  ];

  // City-proposed solutions effectiveness
  const solutionsData = challengeTypes.map(challenge => ({
    challenge: challenge.name,
    technicalSolutions: 30 + Math.random() * 30,
    partnershipApproaches: 25 + Math.random() * 35,
    policyReforms: 20 + Math.random() * 40,
    capacityBuilding: 15 + Math.random() * 35,
  }));

  return { 
    data, 
    regions, 
    cooccurrenceData, 
    temporalData,
    severityFrequencyData,
    cascadeData,
    solutionsData,
  };
};

function getSDGName(id: number): string {
  const names: Record<number, string> = {
    1: 'No Poverty', 2: 'Zero Hunger', 3: 'Good Health', 4: 'Quality Education',
    5: 'Gender Equality', 6: 'Clean Water', 7: 'Clean Energy', 8: 'Decent Work',
    9: 'Innovation', 10: 'Reduced Inequalities', 11: 'Sustainable Cities',
    12: 'Responsible Consumption', 13: 'Climate Action', 14: 'Life Below Water',
    15: 'Life on Land', 16: 'Peace & Justice', 17: 'Partnerships'
  };
  return names[id] || `SDG ${id}`;
}

export function ChallengesBarriersAnalysis() {
  const { 
    data, 
    regions, 
    cooccurrenceData,
    temporalData,
    severityFrequencyData,
    cascadeData,
    solutionsData,
  } = useMemo(() => generateChallengeData(), []);
  
  const [selectedChallenge, setSelectedChallenge] = useState<string>('financing');
  const [selectedRegion, setSelectedRegion] = useState<string>('All');

  const connectedSDGs = useMemo(() => {
    const threshold = 50;
    return data
      .filter(d => {
        if (selectedRegion === 'All') {
          return d.challenges[selectedChallenge as keyof typeof d.challenges] > threshold;
        } else {
          return d.regionalBreakdown[selectedRegion]?.[selectedChallenge as keyof typeof d.challenges] > threshold;
        }
      })
      .map(d => d.sdg);
  }, [data, selectedChallenge, selectedRegion]);

  const selectedChallengeDetails = challengeTypes.find(c => c.id === selectedChallenge);

  return (
    <div className="w-full h-full overflow-auto bg-slate-50">
      <div className="max-w-[1600px] mx-auto p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">
            Challenges & Barriers Analysis
          </h1>
          <p className="text-lg text-slate-600">
            What do cities consistently identify as their main constraints to SDG implementation?
          </p>
        </div>

        {/* Strategic Value */}
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 mb-6">
          <h2 className="text-xl font-semibold text-slate-900 mb-4">Strategic Value</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="border-l-4 border-red-500 pl-4">
              <div className="flex items-center gap-2 text-red-700 mb-2">
                <AlertCircle className="w-5 h-5" />
                <div className="font-semibold">Structural Bottlenecks</div>
              </div>
              <div className="text-sm text-slate-600">
                Identifies constraints cities cannot solve alone, requiring system-level interventions
              </div>
            </div>
            <div className="border-l-4 border-orange-500 pl-4">
              <div className="flex items-center gap-2 text-orange-700 mb-2">
                <DollarSign className="w-5 h-5" />
                <div className="font-semibold">Donor Framing</div>
              </div>
              <div className="text-sm text-slate-600">
                Strong input for shaping donor priorities and resource allocation strategies
              </div>
            </div>
            <div className="border-l-4 border-purple-500 pl-4">
              <div className="flex items-center gap-2 text-purple-700 mb-2">
                <Network className="w-5 h-5" />
                <div className="font-semibold">Cross-SDG Patterns</div>
              </div>
              <div className="text-sm text-slate-600">
                Reveals which barriers are universal vs SDG-specific for targeted solutions
              </div>
            </div>
          </div>
        </div>

        {/* Challenge Selector */}
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 mb-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Select Challenge Type</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {challengeTypes.map(challenge => {
              const Icon = challenge.icon;
              return (
                <button
                  key={challenge.id}
                  onClick={() => setSelectedChallenge(challenge.id)}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    selectedChallenge === challenge.id
                      ? 'border-current shadow-lg scale-105'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                  style={{
                    color: selectedChallenge === challenge.id ? challenge.color : undefined,
                  }}
                >
                  <Icon className="w-8 h-8 mb-2 mx-auto" />
                  <div className={`text-sm font-medium text-center ${
                    selectedChallenge === challenge.id ? '' : 'text-slate-700'
                  }`}>
                    {challenge.name}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Network Visualization */}
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold text-slate-900">
                SDG Connection Network: {selectedChallengeDetails?.name}
              </h3>
              <p className="text-sm text-slate-600 mt-1">
                SDGs connected by shared challenge barriers (intensity &gt; 50%)
              </p>
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-slate-700 mb-2">Region Filter:</label>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedRegion('All')}
                className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                  selectedRegion === 'All'
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                All Regions
              </button>
              {regions.map(region => (
                <button
                  key={region}
                  onClick={() => setSelectedRegion(region)}
                  className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                    selectedRegion === region
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {region}
                </button>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="bg-slate-50 rounded-lg p-8 min-h-[500px] border-2 border-slate-200">
              <svg width="100%" height="500" className="overflow-visible">
                {/* Draw connections */}
                {connectedSDGs.map((sdg1, i) => 
                  connectedSDGs.slice(i + 1).map((sdg2) => {
                    const angle1 = (sdg1 - 1) * (2 * Math.PI / 17);
                    const angle2 = (sdg2 - 1) * (2 * Math.PI / 17);
                    const radius = 180;
                    const centerX = 400;
                    const centerY = 250;
                    
                    const x1 = centerX + radius * Math.cos(angle1 - Math.PI / 2);
                    const y1 = centerY + radius * Math.sin(angle1 - Math.PI / 2);
                    const x2 = centerX + radius * Math.cos(angle2 - Math.PI / 2);
                    const y2 = centerY + radius * Math.sin(angle2 - Math.PI / 2);
                    
                    return (
                      <line
                        key={`${sdg1}-${sdg2}`}
                        x1={x1}
                        y1={y1}
                        x2={x2}
                        y2={y2}
                        stroke={selectedChallengeDetails?.color || '#94a3b8'}
                        strokeWidth="1"
                        opacity="0.2"
                      />
                    );
                  })
                )}
                
                {/* Draw SDG nodes */}
                {Array.from({ length: 17 }, (_, i) => i + 1).map((sdg) => {
                  const angle = (sdg - 1) * (2 * Math.PI / 17);
                  const radius = 180;
                  const centerX = 400;
                  const centerY = 250;
                  const x = centerX + radius * Math.cos(angle - Math.PI / 2);
                  const y = centerY + radius * Math.sin(angle - Math.PI / 2);
                  const isConnected = connectedSDGs.includes(sdg);
                  
                  return (
                    <g key={sdg}>
                      <circle
                        cx={x}
                        cy={y}
                        r={isConnected ? 28 : 20}
                        fill={isConnected ? (selectedChallengeDetails?.color || '#3b82f6') : '#e2e8f0'}
                        stroke={isConnected ? '#fff' : '#cbd5e1'}
                        strokeWidth={isConnected ? 3 : 1}
                        className="transition-all cursor-pointer"
                      />
                      <text
                        x={x}
                        y={y}
                        textAnchor="middle"
                        dy="0.35em"
                        className="text-sm font-bold pointer-events-none"
                        fill={isConnected ? '#fff' : '#64748b'}
                      >
                        {sdg}
                      </text>
                      {isConnected && (
                        <text
                          x={x}
                          y={y + 45}
                          textAnchor="middle"
                          className="text-xs font-medium pointer-events-none"
                          fill="#475569"
                        >
                          {getSDGName(sdg)}
                        </text>
                      )}
                    </g>
                  );
                })}
                
                {/* Center label */}
                <text x="400" y="250" textAnchor="middle" className="text-lg font-bold" fill="#1e293b">
                  {selectedChallengeDetails?.name}
                </text>
                <text x="400" y="270" textAnchor="middle" className="text-sm" fill="#64748b">
                  {connectedSDGs.length} SDGs Connected
                </text>
              </svg>
            </div>
            
            <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="text-sm text-blue-800">
                <strong>Network Insight:</strong> {connectedSDGs.length} SDGs share high intensity (&gt;50%) of{' '}
                <strong>{selectedChallengeDetails?.name}</strong> challenges
                {selectedRegion !== 'All' && ` in ${selectedRegion}`}. 
                This indicates a {connectedSDGs.length > 10 ? 'universal structural bottleneck' : 'SDG-specific barrier pattern'} requiring 
                {connectedSDGs.length > 10 ? ' system-level interventions.' : ' targeted solutions.'}
              </div>
            </div>
          </div>
        </div>

        {/* Challenge Co-occurrence Matrix & Temporal Evolution */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
            <h3 className="text-lg font-semibold text-slate-900 mb-2 flex items-center gap-2">
              <Network className="w-5 h-5 text-purple-600" />
              Challenge Co-occurrence Patterns
            </h3>
            <p className="text-sm text-slate-600 mb-4">
              Which challenges tend to appear together? (Both &gt;50% intensity)
            </p>
            <div className="space-y-3">
              {cooccurrenceData
                .sort((a, b) => b.cooccurrence - a.cooccurrence)
                .slice(0, 6)
                .map((item, idx) => (
                  <div key={idx} className="border border-slate-200 rounded-lg p-3">
                    <div className="flex items-center justify-between mb-2">
                      <div className="text-sm font-medium text-slate-900">
                        {item.challenge1.split(' ')[0]} + {item.challenge2.split(' ')[0]}
                      </div>
                      <div className="text-sm font-bold text-purple-600">
                        {item.cooccurrence}/17 SDGs
                      </div>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2">
                      <div
                        className="bg-purple-600 h-2 rounded-full"
                        style={{ width: `${item.percentage}%` }}
                      />
                    </div>
                    <div className="text-xs text-slate-600 mt-1">
                      {item.percentage}% co-occurrence rate
                    </div>
                  </div>
                ))}
            </div>
            <div className="mt-4 p-3 bg-purple-50 border border-purple-200 rounded text-sm text-purple-800">
              <strong>Insight:</strong> Financing + Capacity challenges co-occur most frequently, 
              suggesting a reinforcing cycle where lack of funds limits capacity building.
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
            <h3 className="text-lg font-semibold text-slate-900 mb-2 flex items-center gap-2">
              <Clock className="w-5 h-5 text-blue-600" />
              Temporal Evolution (2015-2025)
            </h3>
            <p className="text-sm text-slate-600 mb-4">
              How have challenge patterns shifted over time?
            </p>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={temporalData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="period" />
                <YAxis label={{ value: 'Average Intensity (%)', angle: -90, position: 'insideLeft' }} />
                <Tooltip />
                <Legend />
                {challengeTypes.map(challenge => (
                  <Line
                    key={challenge.id}
                    type="monotone"
                    dataKey={challenge.id}
                    name={challenge.name}
                    stroke={challenge.color}
                    strokeWidth={2}
                    dot={{ r: 4 }}
                  />
                ))}
              </LineChart>
            </ResponsiveContainer>
            <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded text-sm text-blue-800">
              <strong>Trend:</strong> Coordination challenges have intensified post-2020, while 
              financing constraints show slight improvement, possibly due to COVID recovery funds.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}