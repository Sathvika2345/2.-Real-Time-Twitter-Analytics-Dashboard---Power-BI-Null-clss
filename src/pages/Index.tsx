
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Clock, Twitter, TrendingUp, Users, MessageCircle, Heart, Repeat2 } from 'lucide-react';

// Mock data for Twitter analytics
const twitterData = [
  { category: 'Technology', avgEngagement: 4.2, totalImpressions: 125000, followerGrowth: 850 },
  { category: 'Marketing', avgEngagement: 3.8, totalImpressions: 98000, followerGrowth: 620 },
  { category: 'Design', avgEngagement: 4.5, totalImpressions: 87000, followerGrowth: 740 },
  { category: 'Business', avgEngagement: 3.9, totalImpressions: 156000, followerGrowth: 920 },
  { category: 'Finance', avgEngagement: 3.6, totalImpressions: 134000, followerGrowth: 560 },
  { category: 'Health', avgEngagement: 4.1, totalImpressions: 92000, followerGrowth: 680 },
  { category: 'Education', avgEngagement: 4.3, totalImpressions: 78000, followerGrowth: 590 },
  { category: 'Entertainment', avgEngagement: 4.7, totalImpressions: 203000, followerGrowth: 1240 },
  { category: 'Sports', avgEngagement: 4.0, totalImpressions: 187000, followerGrowth: 980 },
  { category: 'News', avgEngagement: 3.7, totalImpressions: 245000, followerGrowth: 760 }
];

const Index = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isTimeRestricted, setIsTimeRestricted] = useState(false);
  const [engagementFilter, setEngagementFilter] = useState('all');
  const [impressionFilter, setImpressionFilter] = useState('all');
  const [selectedMetric, setSelectedMetric] = useState('both');

  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setCurrentTime(now);
      
      // Check if current time is between 3PM and 5PM (simulated)
      const hour = now.getHours();
      setIsTimeRestricted(hour >= 15 && hour <= 17);
    }, 60000);

    // Initial check
    const now = new Date();
    setCurrentTime(now);
    const hour = now.getHours();
    setIsTimeRestricted(hour >= 15 && hour <= 17);

    return () => clearInterval(timer);
  }, []);

  // Filter data based on selected filters
  const filteredData = twitterData.filter(item => {
    const engagementCheck = engagementFilter === 'all' || 
      (engagementFilter === 'high' && item.avgEngagement >= 4.0) ||
      (engagementFilter === 'medium' && item.avgEngagement >= 3.5 && item.avgEngagement < 4.0) ||
      (engagementFilter === 'low' && item.avgEngagement < 3.5);
    
    const impressionCheck = impressionFilter === 'all' ||
      (impressionFilter === 'high' && item.totalImpressions >= 150000) ||
      (impressionFilter === 'medium' && item.totalImpressions >= 100000 && item.totalImpressions < 150000) ||
      (impressionFilter === 'low' && item.totalImpressions < 100000);
    
    return engagementCheck && impressionCheck;
  }).slice(0, 10); // Top 10

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
      timeZone: 'Asia/Kolkata'
    });
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-gray-900/95 backdrop-blur-sm border border-blue-500/20 p-4 rounded-lg shadow-xl">
          <p className="text-blue-300 font-semibold mb-2">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-white text-sm" style={{ color: entry.color }}>
              {entry.dataKey === 'avgEngagement' ? 'Avg Engagement Rate' : 
               entry.dataKey === 'totalImpressions' ? 'Total Impressions' : 
               'Follower Growth'}: {entry.value}
              {entry.dataKey === 'avgEngagement' ? '%' : 
               entry.dataKey === 'totalImpressions' ? '' : ''}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900/20 to-purple-900/20 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-blue-600 rounded-xl">
              <Twitter className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-white">Twitter Analytics Dashboard</h1>
              <p className="text-blue-300">Real-time engagement insights and performance metrics</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-white">
              <Clock className="h-5 w-5" />
              <span className="font-mono">{formatTime(currentTime)} IST</span>
            </div>
            <Badge variant={isTimeRestricted ? "default" : "secondary"}>
              {isTimeRestricted ? "Dashboard Active" : "Outside Active Hours"}
            </Badge>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-600/20 rounded-lg">
                  <TrendingUp className="h-6 w-6 text-blue-400" />
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Total Engagement</p>
                  <p className="text-2xl font-bold text-white">
                    {filteredData.reduce((sum, item) => sum + item.avgEngagement, 0).toFixed(1)}%
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-purple-600/20 rounded-lg">
                  <Users className="h-6 w-6 text-purple-400" />
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Total Impressions</p>
                  <p className="text-2xl font-bold text-white">
                    {(filteredData.reduce((sum, item) => sum + item.totalImpressions, 0) / 1000000).toFixed(1)}M
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-green-600/20 rounded-lg">
                  <Heart className="h-6 w-6 text-green-400" />
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Follower Growth</p>
                  <p className="text-2xl font-bold text-white">
                    +{filteredData.reduce((sum, item) => sum + item.followerGrowth, 0).toLocaleString()}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-orange-600/20 rounded-lg">
                  <MessageCircle className="h-6 w-6 text-orange-400" />
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Active Categories</p>
                  <p className="text-2xl font-bold text-white">{filteredData.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Filters & Controls</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="text-gray-300 text-sm mb-2 block">Engagement Rate</label>
                <Select value={engagementFilter} onValueChange={setEngagementFilter}>
                  <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-600">
                    <SelectItem value="all">All Rates</SelectItem>
                    <SelectItem value="high">High (&gt;=4.0%)</SelectItem>
                    <SelectItem value="medium">Medium (3.5-4.0%)</SelectItem>
                    <SelectItem value="low">Low (&lt;3.5%)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-gray-300 text-sm mb-2 block">Impression Volume</label>
                <Select value={impressionFilter} onValueChange={setImpressionFilter}>
                  <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-600">
                    <SelectItem value="all">All Volumes</SelectItem>
                    <SelectItem value="high">High (&gt;=150K)</SelectItem>
                    <SelectItem value="medium">Medium (100K-150K)</SelectItem>
                    <SelectItem value="low">Low (&lt;100K)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-gray-300 text-sm mb-2 block">Display Metrics</label>
                <Select value={selectedMetric} onValueChange={setSelectedMetric}>
                  <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-600">
                    <SelectItem value="both">Both Metrics</SelectItem>
                    <SelectItem value="engagement">Engagement Only</SelectItem>
                    <SelectItem value="impressions">Impressions Only</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Chart */}
        <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-white text-xl">Top Content Categories - Engagement vs Impressions</CardTitle>
              <div className="flex items-center space-x-2">
                {isTimeRestricted ? (
                  <Badge className="bg-green-600 text-white">
                    <div className="w-2 h-2 bg-green-300 rounded-full mr-2 animate-pulse"></div>
                    Live Data
                  </Badge>
                ) : (
                  <Badge variant="secondary">
                    Restricted Hours (Show 3PM-5PM IST)
                  </Badge>
                )}
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {isTimeRestricted ? (
              <div className="h-96">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={filteredData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis 
                      dataKey="category" 
                      stroke="#9CA3AF"
                      angle={-45}
                      textAnchor="end"
                      height={80}
                    />
                    <YAxis stroke="#9CA3AF" />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                    {(selectedMetric === 'both' || selectedMetric === 'engagement') && (
                      <Bar 
                        dataKey="avgEngagement" 
                        name="Engagement Rate (%)"
                        fill="#3B82F6"
                        radius={[4, 4, 0, 0]}
                      />
                    )}
                    {(selectedMetric === 'both' || selectedMetric === 'impressions') && (
                      <Bar 
                        dataKey="totalImpressions" 
                        name="Total Impressions"
                        fill="#8B5CF6"
                        radius={[4, 4, 0, 0]}
                      />
                    )}
                  </BarChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <div className="h-96 flex items-center justify-center">
                <div className="text-center">
                  <Clock className="h-16 w-16 text-gray-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-400 mb-2">Dashboard Restricted</h3>
                  <p className="text-gray-500">
                    Analytics are only available between 3:00 PM - 5:00 PM IST
                  </p>
                  <p className="text-sm text-gray-600 mt-2">
                    Current time: {formatTime(currentTime)} IST
                  </p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Additional Insights */}
        {isTimeRestricted && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Top Performers</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredData
                    .sort((a, b) => b.avgEngagement - a.avgEngagement)
                    .slice(0, 5)
                    .map((item, index) => (
                      <div key={item.category} className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                            {index + 1}
                          </div>
                          <span className="text-white">{item.category}</span>
                        </div>
                        <Badge className="bg-blue-600/20 text-blue-300">
                          {item.avgEngagement}% engagement
                        </Badge>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Growth Leaders</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredData
                    .sort((a, b) => b.followerGrowth - a.followerGrowth)
                    .slice(0, 5)
                    .map((item, index) => (
                      <div key={item.category} className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                            {index + 1}
                          </div>
                          <span className="text-white">{item.category}</span>
                        </div>
                        <Badge className="bg-green-600/20 text-green-300">
                          +{item.followerGrowth} followers
                        </Badge>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
