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
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from 'recharts';
import { 
  Target, 
  TrendingUp, 
  FileCheck, 
  DollarSign, 
  Building, 
  Database, 
  AlertCircle,
  Calendar,
  Filter,
} from 'lucide-react';

// Commitment types
const commitmentTypes = [
  { id: 'policy', name: 'Policy Reform', icon: FileCheck, color: '#3b82f6' },
  { id: 'strategy', name: 'New Strategies', icon: TrendingUp, color: '#10b981' },
  { id: 'investment', name: 'Investments', icon: DollarSign, color: '#f59e0b' },
  { id: 'institutional', name: 'Institutional Changes', icon: Building, color: '#8b5cf6' },
  { id: 'data', name: 'Data/Monitoring', icon: Database, color: '#06b6d4' },
];

// Generate commitment data
const generateCommitmentData = () => {
  const sdgs = Array.from({ length: 17 }, (_, i) => i + 1);
  const regions = ['All Regions', 'Europe', 'Asia-Pacific', 'Africa', 'Latin America', 'Arab States'];
  const timeframes = ['Short-term (1-2 years)', 'Medium-term (3-5 years)', 'Long-term (5+ years)'];

  // Generate commitment data by SDG and Region
  const commitmentsBySDGAndRegion: any = {};
  
  regions.forEach(region => {
    commitmentsBySDGAndRegion[region] = sdgs.map(sdgId => {
      const commitments: any = { sdg: sdgId, region };
      
      commitmentTypes.forEach(type => {
        // Base commitment level
        let base = 20 + Math.random() * 40;
        
        // SDG-specific variations
        if (type.id === 'investment' && [6, 7, 9, 11].includes(sdgId)) base += 20;
        if (type.id === 'policy' && [16, 17].includes(sdgId)) base += 15;
        if (type.id === 'data' && [9, 12, 13].includes(sdgId)) base += 15;
        
        // Regional variations
        if (region === 'Europe' && type.id === 'data') base += 10;
        if (region === 'Africa' && type.id === 'investment') base -= 15;
        if (region === 'Asia-Pacific' && type.id === 'strategy') base += 12;
        if (region === 'Latin America' && type.id === 'policy') base += 8;
        if (region === 'Arab States' && type.id === 'institutional') base += 10;
        
        // All Regions is average
        if (region === 'All Regions') base = base * 1.0; // No modifier
        
        commitments[type.id] = Math.round(Math.max(5, Math.min(95, base)));
      });

      // Ambition metrics
      let specificityBase = 30 + Math.random() * 60;
      let resourceBase = 20 + Math.random() * 70;
      
      // Regional ambition modifiers
      if (region === 'Europe') {
        specificityBase += 15;
        resourceBase += 10;
      } else if (region === 'Africa') {
        specificityBase -= 10;
        resourceBase -= 20;
      } else if (region === 'Asia-Pacific') {
        specificityBase += 8;
        resourceBase += 5;
      }
      
      commitments.specificity = Math.round(Math.max(10, Math.min(95, specificityBase)));
      commitments.resourceCommitment = Math.round(Math.max(10, Math.min(95, resourceBase)));
      commitments.totalCommitments = Math.round(50 + Math.random() * 150);

      return commitments;
    });
  });

  // Challenge-Commitment Gap Analysis by Region
  const gapAnalysisByRegion: any = {};
  
  regions.forEach(region => {
    gapAnalysisByRegion[region] = sdgs.map(sdgId => {
      let challengeBase = 40 + Math.random() * 50;
      let commitmentBase = 30 + Math.random() * 60;
      
      // Regional challenge variations
      if (region === 'Africa') {
        challengeBase += 15; // More intense challenges
        commitmentBase -= 10; // Fewer resources for commitments
      } else if (region === 'Europe') {
        challengeBase -= 10; // Better baseline
        commitmentBase += 15; // More resources
      } else if (region === 'Asia-Pacific') {
        challengeBase += 5;
        commitmentBase += 8;
      } else if (region === 'Latin America') {
        challengeBase += 8;
        commitmentBase += 5;
      }
      
      const challengeIntensity = Math.round(Math.max(20, Math.min(95, challengeBase)));
      const commitmentIntensity = Math.round(Math.max(15, Math.min(95, commitmentBase)));
      const gap = challengeIntensity - commitmentIntensity;
      
      return {
        sdg: sdgId,
        region,
        challengeIntensity,
        commitmentIntensity,
        gap: Math.round(gap),
        gapCategory: gap > 20 ? 'Large Gap' : gap > 0 ? 'Moderate Gap' : 'Well Addressed',
      };
    });
  });

  // Regional ambition profiles (not filtered by region selector)
  const regionalAmbition = regions.filter(r => r !== 'All Regions').map(region => {
    const profile: any = { region };
    commitmentTypes.forEach(type => {
      let base = 35 + Math.random() * 40;
      // Regional variations
      if (region === 'Europe' && type.id === 'data') base += 15;
      if (region === 'Africa' && type.id === 'investment') base -= 10;
      if (region === 'Asia-Pacific' && type.id === 'strategy') base += 10;
      profile[type.id] = Math.round(base);
    });
    return profile;
  });

  // Timeframe distribution
  const timeframeData = timeframes.map(timeframe => {
    const data: any = { timeframe };
    commitmentTypes.forEach(type => {
      let value = 25 + Math.random() * 30;
      // Policy reforms tend to be medium-term, investments long-term
      if (timeframe.includes('Medium') && type.id === 'policy') value += 15;
      if (timeframe.includes('Long') && type.id === 'investment') value += 20;
      if (timeframe.includes('Short') && type.id === 'data') value += 10;
      data[type.id] = Math.round(value);
    });
    return data;
  });

  return {
    commitmentsBySDGAndRegion,
    gapAnalysisByRegion,
    regionalAmbition,
    timeframeData,
    regions,
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

export function CommitmentStatementsAnalysis() {
  const {
    commitmentsBySDGAndRegion,
    gapAnalysisByRegion,
    regionalAmbition,
    timeframeData,
    regions,
  } = useMemo(() => generateCommitmentData(), []);

  const [selectedSDG, setSelectedSDG] = useState<number>(11);
  const [selectedRegion, setSelectedRegion] = useState<string>('All Regions');

  // Get data for selected SDG and Region
  const selectedSDGData = commitmentsBySDGAndRegion[selectedRegion].find(d => d.sdg === selectedSDG);
  const selectedGapData = gapAnalysisByRegion[selectedRegion].find(d => d.sdg === selectedSDG);

  return (
    <div className="w-full h-full overflow-auto bg-slate-50">
      <div className="max-w-[1600px] mx-auto p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">
            Commitment Statements Analysis
          </h1>
          <p className="text-lg text-slate-600">
            What are cities actually committing to when they publish a VLR?
          </p>
        </div>

        {/* Strategic Value */}
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 mb-6">
          <h2 className="text-xl font-semibold text-slate-900 mb-4">Strategic Value</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="border-l-4 border-green-500 pl-4">
              <div className="flex items-center gap-2 text-green-700 mb-2">
                <Target className="w-5 h-5" />
                <div className="font-semibold">Ambition Assessment</div>
              </div>
              <div className="text-sm text-slate-600">
                Reveals where ambition is high versus symbolic through specificity and resource analysis
              </div>
            </div>
            <div className="border-l-4 border-orange-500 pl-4">
              <div className="flex items-center gap-2 text-orange-700 mb-2">
                <AlertCircle className="w-5 h-5" />
                <div className="font-semibold">Gap Analysis</div>
              </div>
              <div className="text-sm text-slate-600">
                Compares identified challenges with stated commitments to find implementation gaps
              </div>
            </div>
            <div className="border-l-4 border-blue-500 pl-4">
              <div className="flex items-center gap-2 text-blue-700 mb-2">
                <TrendingUp className="w-5 h-5" />
                <div className="font-semibold">Foresight Bridge</div>
              </div>
              <div className="text-sm text-slate-600">
                Creates pathway from current state to implementation discussions and accountability
              </div>
            </div>
          </div>
        </div>

        {/* SDG Selector */}
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 mb-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Select SDG for Detailed Analysis</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-9 gap-3">
            {Array.from({ length: 17 }, (_, i) => i + 1).map(sdgId => (
              <button
                key={sdgId}
                onClick={() => setSelectedSDG(sdgId)}
                className={`px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                  selectedSDG === sdgId
                    ? 'bg-blue-600 text-white shadow-md scale-105'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                SDG {sdgId}
              </button>
            ))}
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4 mb-6">
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-slate-600" />
              <span className="text-sm font-medium text-slate-700">Filter:</span>
            </div>
            
            <select
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
              className="px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {regions.map(region => (
                <option key={region} value={region}>{region}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Challenge-Commitment Gap Analysis */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div className="lg:col-span-2 bg-white rounded-lg shadow-sm border border-slate-200 p-6">
            <h3 className="text-lg font-semibold text-slate-900 mb-2 flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-orange-600" />
              Challenge-Commitment Gap Analysis
            </h3>
            <p className="text-sm text-slate-600 mb-4">
              Comparing the intensity of identified challenges versus commitment strength across all SDGs
            </p>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={gapAnalysisByRegion[selectedRegion]} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis
                  dataKey="sdg"
                  angle={-45}
                  textAnchor="end"
                  height={80}
                  label={{ value: 'SDG', position: 'insideBottom', offset: -50 }}
                />
                <YAxis label={{ value: 'Intensity (%)', angle: -90, position: 'insideLeft' }} />
                <Tooltip />
                <Legend />
                <Bar dataKey="challengeIntensity" name="Challenge Intensity" fill="#ef4444" />
                <Bar dataKey="commitmentIntensity" name="Commitment Intensity" fill="#10b981" />
              </BarChart>
            </ResponsiveContainer>
            <div className="mt-4 p-4 bg-orange-50 border border-orange-200 rounded-lg">
              <div className="text-sm text-orange-800">
                <strong>Gap Insight:</strong> When challenge intensity (red) exceeds commitment intensity (green), 
                it reveals potential implementation shortfalls. Large gaps indicate areas where cities acknowledge 
                problems but haven't matched them with concrete commitments.
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
            <h3 className="text-lg font-semibold text-slate-900 mb-2 flex items-center gap-2">
              <Target className="w-5 h-5 text-purple-600" />
              SDG {selectedSDG} Profile
            </h3>
            <p className="text-sm text-slate-600 mb-4">{getSDGName(selectedSDG)}</p>
            
            <div className="space-y-4">
              <div className="border border-slate-200 rounded-lg p-4">
                <div className="text-sm font-medium text-slate-700 mb-2">Commitment Breakdown</div>
                {commitmentTypes.map(type => {
                  const value = selectedSDGData?.[type.id] || 0;
                  return (
                    <div key={type.id} className="mb-3">
                      <div className="flex items-center justify-between text-sm mb-1">
                        <span className="text-slate-700">{type.name}</span>
                        <span className="font-medium text-slate-900">{value}%</span>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-2">
                        <div
                          className="h-2 rounded-full"
                          style={{ width: `${value}%`, backgroundColor: type.color }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="border border-slate-200 rounded-lg p-4">
                <div className="text-sm font-medium text-slate-700 mb-2">Ambition Metrics</div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-600">Specificity Score</span>
                    <span className="font-semibold text-slate-900">{selectedSDGData?.specificity}%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-600">Resource Commitment</span>
                    <span className="font-semibold text-slate-900">{selectedSDGData?.resourceCommitment}%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-600">Total Commitments</span>
                    <span className="font-semibold text-slate-900">{selectedSDGData?.totalCommitments}</span>
                  </div>
                </div>
              </div>

              {selectedGapData && (
                <div className={`border rounded-lg p-4 ${
                  selectedGapData.gapCategory === 'Large Gap' ? 'border-red-300 bg-red-50' :
                  selectedGapData.gapCategory === 'Moderate Gap' ? 'border-yellow-300 bg-yellow-50' :
                  'border-green-300 bg-green-50'
                }`}>
                  <div className="text-sm font-medium text-slate-900 mb-2">Challenge-Commitment Gap</div>
                  <div className={`text-xs font-medium ${
                    selectedGapData.gapCategory === 'Large Gap' ? 'text-red-700' :
                    selectedGapData.gapCategory === 'Moderate Gap' ? 'text-yellow-700' :
                    'text-green-700'
                  }`}>
                    {selectedGapData.gapCategory}
                  </div>
                  <div className="text-xs text-slate-600 mt-2">
                    Challenges: {selectedGapData.challengeIntensity}% | Commitments: {selectedGapData.commitmentIntensity}%
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Regional Ambition & Timeframe */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
            <h3 className="text-lg font-semibold text-slate-900 mb-2 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-blue-600" />
              Regional Commitment Patterns
            </h3>
            <p className="text-sm text-slate-600 mb-4">
              Commitment type preferences by region
            </p>
            <ResponsiveContainer width="100%" height={350}>
              <RadarChart data={regionalAmbition}>
                <PolarGrid stroke="#e2e8f0" />
                <PolarAngleAxis dataKey="region" tick={{ fontSize: 12, fontWeight: 600 }} />
                <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fontSize: 10 }} />
                <Tooltip />
                <Legend />
                {commitmentTypes.map(type => (
                  <Radar
                    key={type.id}
                    name={type.name}
                    dataKey={type.id}
                    stroke={type.color}
                    fill={type.color}
                    fillOpacity={0.3}
                  />
                ))}
              </RadarChart>
            </ResponsiveContainer>
            <div className="mt-4 text-sm text-slate-600">
              <strong>Regional Patterns:</strong> Europe shows stronger data/monitoring commitments, 
              while Asia-Pacific focuses on strategies. Africa faces investment commitment challenges 
              due to resource constraints.
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
            <h3 className="text-lg font-semibold text-slate-900 mb-2 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-purple-600" />
              Commitment Timeframes
            </h3>
            <p className="text-sm text-slate-600 mb-4">
              When do cities plan to deliver on commitments?
            </p>
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={timeframeData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis type="number" domain={[0, 100]} />
                <YAxis type="category" dataKey="timeframe" width={150} tick={{ fontSize: 11 }} />
                <Tooltip />
                <Legend />
                {commitmentTypes.map(type => (
                  <Bar
                    key={type.id}
                    dataKey={type.id}
                    name={type.name}
                    stackId="a"
                    fill={type.color}
                  />
                ))}
              </BarChart>
            </ResponsiveContainer>
            <div className="mt-4 text-sm text-slate-600">
              <strong>Temporal Insight:</strong> Policy reforms cluster in medium-term (3-5 years), 
              infrastructure investments in long-term (5+ years), while data improvements show 
              more short-term action.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}