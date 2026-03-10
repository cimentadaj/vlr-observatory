import { useState, useMemo } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Legend,
  Cell,
} from 'recharts';
import { Layers, TrendingUp, MapPin, Lightbulb, Target } from 'lucide-react';

// Mock data for policy recommendations
const generateMockPolicyData = () => {
  const sdgs = Array.from({ length: 17 }, (_, i) => i + 1);
  const regions = ['Europe', 'Asia-Pacific', 'Africa', 'Latin America', 'Arab States'];
  const recommendationTypes = [
    'Capacity Building',
    'Infrastructure',
    'Financing',
    'Coordination',
    'Policy Framework',
    'Data & Monitoring'
  ];

  // Define policy themes for each SDG with regional variations
  const policyThemesBySDG: Record<number, { global: string[]; regional: Record<string, string[]> }> = {
    1: {
      global: ['Universal basic income programs', 'Social protection expansion', 'Employment guarantee schemes'],
      regional: {
        'Europe': ['Digital inclusion initiatives', 'Housing-first policies'],
        'Asia-Pacific': ['Microfinance expansion', 'Rural employment programs'],
        'Africa': ['Cash transfer programs', 'Agricultural support'],
        'Latin America': ['Conditional cash transfers', 'Food security networks'],
        'Arab States': ['Social safety nets', 'Youth employment initiatives']
      }
    },
    3: {
      global: ['Universal health coverage', 'Digital health infrastructure', 'Mental health services integration'],
      regional: {
        'Europe': ['Integrated care models', 'Health data interoperability'],
        'Asia-Pacific': ['Community health workers', 'Telemedicine expansion'],
        'Africa': ['Primary healthcare strengthening', 'Mobile health solutions'],
        'Latin America': ['Family health programs', 'Indigenous health services'],
        'Arab States': ['Healthcare workforce development', 'Pandemic preparedness']
      }
    },
    11: {
      global: ['Smart city infrastructure', 'Public transport expansion', 'Green building standards'],
      regional: {
        'Europe': ['Low-emission zones', '15-minute city planning'],
        'Asia-Pacific': ['Mass transit systems', 'Flood resilience measures'],
        'Africa': ['Informal settlement upgrading', 'Waste management systems'],
        'Latin America': ['Bus rapid transit', 'Urban green spaces'],
        'Arab States': ['Water-efficient cities', 'Climate adaptation planning']
      }
    },
    13: {
      global: ['Carbon pricing mechanisms', 'Renewable energy transition', 'Climate adaptation funds'],
      regional: {
        'Europe': ['Net-zero targets', 'Green deal implementation'],
        'Asia-Pacific': ['Coal phase-out plans', 'Circular economy policies'],
        'Africa': ['Climate finance access', 'Ecosystem restoration'],
        'Latin America': ['Forest conservation', 'Indigenous land rights'],
        'Arab States': ['Solar energy deployment', 'Water scarcity adaptation']
      }
    },
    // Add more SDGs as needed
  };

  // Fill in remaining SDGs with generic themes
  for (let i = 2; i <= 17; i++) {
    if (!policyThemesBySDG[i]) {
      policyThemesBySDG[i] = {
        global: [
          `Regulatory framework for SDG ${i}`,
          `Financing mechanisms for SDG ${i}`,
          `Partnership models for SDG ${i}`
        ],
        regional: {}
      };
      regions.forEach(region => {
        policyThemesBySDG[i].regional[region] = [
          `${region}-specific implementation of SDG ${i}`,
          `Regional cooperation on SDG ${i}`
        ];
      });
    }
  }

  // Generate recommendation type distribution
  const recommendationTypeData = sdgs.map(sdgId => {
    const data: any = { sdg: sdgId };
    recommendationTypes.forEach(type => {
      // Vary by SDG (infrastructure heavy for SDG 9, 11; capacity for 4, 5)
      let base = 15 + Math.random() * 20;
      if (type === 'Infrastructure' && [6, 7, 9, 11].includes(sdgId)) base += 15;
      if (type === 'Capacity Building' && [4, 5, 10, 16].includes(sdgId)) base += 15;
      if (type === 'Financing' && [1, 2, 8, 17].includes(sdgId)) base += 10;
      data[type] = Math.round(base);
    });
    return data;
  });

  // Generate regional comparison data for radar chart
  const regionalComparisonData = recommendationTypes.map(type => {
    const data: any = { type };
    regions.forEach(region => {
      data[region] = 40 + Math.random() * 60;
    });
    return data;
  });

  return {
    policyThemesBySDG,
    recommendationTypes,
    recommendationTypeData,
    regionalComparisonData,
    regions,
    sdgs
  };
};

function getSDGName(id: number): string {
  const names: Record<number, string> = {
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
    17: 'Partnerships'
  };
  return names[id] || `SDG ${id}`;
}

export function PolicyRecommendationSynthesis() {
  const {
    policyThemesBySDG,
    recommendationTypes,
    recommendationTypeData,
    regionalComparisonData,
    regions,
    sdgs
  } = useMemo(() => generateMockPolicyData(), []);

  const [selectedSDG, setSelectedSDG] = useState<number>(11);
  const [compareRegions, setCompareRegions] = useState<string[]>(['Europe', 'Asia-Pacific']);
  const [comparisonMode, setComparisonMode] = useState<'regions' | 'sdgs'>('regions');
  const [compareSDGs, setCompareSDGs] = useState<number[]>([3, 11, 13]);

  // Get colors for recommendation types
  const typeColors: Record<string, string> = {
    'Capacity Building': '#3b82f6',
    'Infrastructure': '#8b5cf6',
    'Financing': '#ec4899',
    'Coordination': '#f59e0b',
    'Policy Framework': '#10b981',
    'Data & Monitoring': '#06b6d4'
  };

  // Calculate dominant recommendation type for selected SDG
  const dominantType = useMemo(() => {
    const sdgData = recommendationTypeData.find(d => d.sdg === selectedSDG);
    if (!sdgData) return null;

    let maxType = '';
    let maxValue = 0;
    recommendationTypes.forEach(type => {
      if (sdgData[type] > maxValue) {
        maxValue = sdgData[type];
        maxType = type;
      }
    });
    return { type: maxType, value: maxValue };
  }, [selectedSDG, recommendationTypeData, recommendationTypes]);

  // Prepare data for comparison
  const comparisonData = useMemo(() => {
    if (comparisonMode === 'regions') {
      // Compare recommendation types across selected regions for one SDG
      const sdgData = recommendationTypeData.find(d => d.sdg === selectedSDG);
      if (!sdgData) return [];

      return recommendationTypes.map(type => {
        const data: any = { type };
        compareRegions.forEach(region => {
          // Simulate regional variation
          const baseValue = sdgData[type];
          data[region] = Math.round(baseValue * (0.7 + Math.random() * 0.6));
        });
        return data;
      });
    } else {
      // Compare one region across multiple SDGs
      const region = compareRegions[0] || 'Europe';
      return compareSDGs.map(sdgId => {
        const data: any = { sdg: `SDG ${sdgId}` };
        recommendationTypes.forEach(type => {
          const sdgData = recommendationTypeData.find(d => d.sdg === sdgId);
          if (sdgData) {
            data[type] = Math.round(sdgData[type] * (0.8 + Math.random() * 0.4));
          }
        });
        return data;
      });
    }
  }, [comparisonMode, selectedSDG, compareRegions, compareSDGs, recommendationTypeData, recommendationTypes]);

  return (
    <div className="w-full h-full overflow-auto bg-slate-50">
      <div className="max-w-[1600px] mx-auto p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">
            Policy Recommendation Synthesis
          </h1>
          <p className="text-lg text-slate-600">
            Analysis of policy directions cities globally are converging around for each SDG
          </p>
        </div>

        {/* Key Insights Panel */}
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 mb-6">
          <h2 className="text-xl font-semibold text-slate-900 mb-4">Strategic Value</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="border-l-4 border-purple-500 pl-4">
              <div className="flex items-center gap-2 text-purple-700 mb-2">
                <Layers className="w-5 h-5" />
                <div className="font-semibold">Global Playbooks</div>
              </div>
              <div className="text-sm text-slate-600">
                Reveals de facto policy convergence patterns emerging from city practice across {sdgs.length} SDGs
              </div>
            </div>
            <div className="border-l-4 border-blue-500 pl-4">
              <div className="flex items-center gap-2 text-blue-700 mb-2">
                <Target className="w-5 h-5" />
                <div className="font-semibold">Operational</div>
              </div>
              <div className="text-sm text-slate-600">
                Direct integration into advisory narratives and implementation guidance
              </div>
            </div>
            <div className="border-l-4 border-green-500 pl-4">
              <div className="flex items-center gap-2 text-green-700 mb-2">
                <Lightbulb className="w-5 h-5" />
                <div className="font-semibold">Advisory Inputs</div>
              </div>
              <div className="text-sm text-slate-600">
                Support evidence-based policy development and implementation guidance for cities
              </div>
            </div>
          </div>
        </div>

        {/* SDG Selector */}
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 mb-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Select SDG for Analysis</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-9 gap-3">
            {sdgs.map(sdgId => (
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

        {/* Policy Themes for Selected SDG */}
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 mb-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">
            Top Global Policy Themes: SDG {selectedSDG} - {getSDGName(selectedSDG)}
          </h3>
          <div className="space-y-3 mb-6">
            {policyThemesBySDG[selectedSDG]?.global.map((theme, idx) => (
              <div key={idx} className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                  {idx + 1}
                </div>
                <div className="flex-1">
                  <div className="font-medium text-slate-900">{theme}</div>
                  <div className="text-sm text-slate-600 mt-1">
                    Cited in {Math.round(45 + Math.random() * 40)}% of VLRs globally
                  </div>
                </div>
              </div>
            ))}
          </div>

          {dominantType && (
            <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-5 h-5 text-purple-600" />
                <span className="font-semibold text-purple-900">Dominant Recommendation Type</span>
              </div>
              <div className="text-sm text-purple-800">
                <span className="font-bold">{dominantType.type}</span> is the most common recommendation type for this SDG ({dominantType.value}% of recommendations)
              </div>
            </div>
          )}
        </div>

        {/* Recommendation Type Distribution */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">
              Recommendation Types by SDG
            </h3>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart
                data={recommendationTypeData.filter(d => [selectedSDG].includes(d.sdg))}
                margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis 
                  dataKey="sdg" 
                  label={{ value: 'SDG', position: 'insideBottom', offset: -10 }}
                />
                <YAxis label={{ value: 'Percentage (%)', angle: -90, position: 'insideLeft' }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px'
                  }}
                />
                <Legend wrapperStyle={{ paddingTop: '20px' }} />
                {recommendationTypes.map(type => (
                  <Bar
                    key={type}
                    dataKey={type}
                    stackId="a"
                    fill={typeColors[type]}
                  />
                ))}
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">
              Regional Policy Focus Distribution
            </h3>
            <ResponsiveContainer width="100%" height={400}>
              <RadarChart data={regionalComparisonData}>
                <PolarGrid stroke="#e2e8f0" />
                <PolarAngleAxis dataKey="type" tick={{ fontSize: 11 }} />
                <PolarRadiusAxis angle={90} domain={[0, 100]} />
                <Tooltip />
                <Legend />
                {regions.slice(0, 3).map((region, idx) => {
                  const colors = ['#3b82f6', '#ec4899', '#10b981'];
                  return (
                    <Radar
                      key={region}
                      name={region}
                      dataKey={region}
                      stroke={colors[idx]}
                      fill={colors[idx]}
                      fillOpacity={0.3}
                    />
                  );
                })}
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Regional Variations */}
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 mb-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">
            Regional Policy Variations: SDG {selectedSDG}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {regions.map(region => (
              <div key={region} className="border border-slate-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-blue-600" />
                  {region}
                </div>
                <ul className="space-y-2">
                  {(policyThemesBySDG[selectedSDG]?.regional[region] || []).map((theme, idx) => (
                    <li key={idx} className="text-sm text-slate-600 flex items-start gap-2">
                      <span className="text-blue-600 mt-0.5">•</span>
                      <span>{theme}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Comparison Tool */}
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Policy Comparison Tool</h3>
          
          {/* Comparison Mode Selector */}
          <div className="flex gap-4 mb-6">
            <button
              onClick={() => setComparisonMode('regions')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                comparisonMode === 'regions'
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              Compare Regions for One SDG
            </button>
            <button
              onClick={() => setComparisonMode('sdgs')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                comparisonMode === 'sdgs'
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              Compare SDGs for One Region
            </button>
          </div>

          {/* Region/SDG Selectors */}
          {comparisonMode === 'regions' ? (
            <div className="mb-6">
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Select Regions to Compare (for SDG {selectedSDG}):
              </label>
              <div className="flex flex-wrap gap-2">
                {regions.map(region => (
                  <button
                    key={region}
                    onClick={() => {
                      setCompareRegions(prev =>
                        prev.includes(region)
                          ? prev.filter(r => r !== region)
                          : [...prev, region]
                      );
                    }}
                    className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                      compareRegions.includes(region)
                        ? 'bg-blue-600 text-white'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {region}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="mb-6">
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Select SDGs to Compare (for {compareRegions[0] || 'Europe'}):
              </label>
              <div className="flex flex-wrap gap-2">
                {sdgs.map(sdgId => (
                  <button
                    key={sdgId}
                    onClick={() => {
                      setCompareSDGs(prev =>
                        prev.includes(sdgId)
                          ? prev.filter(s => s !== sdgId)
                          : [...prev, sdgId]
                      );
                    }}
                    className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                      compareSDGs.includes(sdgId)
                        ? 'bg-blue-600 text-white'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    SDG {sdgId}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Comparison Chart */}
          <ResponsiveContainer width="100%" height={400}>
            <BarChart
              data={comparisonData}
              margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis 
                dataKey={comparisonMode === 'regions' ? 'type' : 'sdg'}
                angle={-45}
                textAnchor="end"
                height={100}
                tick={{ fontSize: 11 }}
              />
              <YAxis label={{ value: 'Percentage (%)', angle: -90, position: 'insideLeft' }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px'
                }}
              />
              <Legend />
              {comparisonMode === 'regions' ? (
                compareRegions.map((region, idx) => {
                  const colors = ['#3b82f6', '#ec4899', '#10b981', '#f59e0b', '#8b5cf6'];
                  return (
                    <Bar
                      key={region}
                      dataKey={region}
                      fill={colors[idx % colors.length]}
                    />
                  );
                })
              ) : (
                recommendationTypes.map(type => (
                  <Bar
                    key={type}
                    dataKey={type}
                    stackId="a"
                    fill={typeColors[type]}
                  />
                ))
              )}
            </BarChart>
          </ResponsiveContainer>

          <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="text-sm text-blue-800">
              <strong>Insight:</strong> {comparisonMode === 'regions' ? (
                `Comparing ${compareRegions.join(', ')} shows distinct regional priorities in implementing SDG ${selectedSDG}.`
              ) : (
                `Comparing SDGs ${compareSDGs.join(', ')} in ${compareRegions[0] || 'Europe'} reveals cross-sectoral policy patterns.`
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}