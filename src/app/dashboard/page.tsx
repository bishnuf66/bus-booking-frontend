"use client";

import { useState } from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ComposedChart,
  Line,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

// Generate sample data for the last 30 days
const generatePageViewData = () => {
  const data = [];
  const now = new Date();

  for (let i = 29; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);

    // Generate a random number between 500 and 2000 with some trend
    const baseValue = 1000;
    const trend = Math.sin(i / 5) * 300;
    const random = Math.random() * 500;
    const views = Math.round(baseValue + trend + random);

    data.push({
      date: date.toISOString().split("T")[0],
      views,
    });
  }

  return data;
};

const topPostsData = [
  { title: "10 SEO Tips for 2024", views: 1823 },
  { title: "Getting Started with React", views: 1345 },
  { title: "The Future of AI", views: 1142 },
  { title: "CSS Grid Tutorial", views: 980 },
  { title: "JavaScript Best Practices", views: 854 },
];

const trafficSourcesData = [
  { name: "Search", value: 40, color: "#3b82f6" },
  { name: "Social", value: 30, color: "#10b981" },
  { name: "Direct", value: 20, color: "#f59e0b" },
  { name: "Referral", value: 10, color: "#8b5cf6" },
];

const demographicsData = [
  { age: "18-24", users: 1200 },
  { age: "25-34", users: 2450 },
  { age: "35-44", users: 1800 },
  { age: "45-54", users: 950 },
  { age: "55-64", users: 650 },
  { age: "65+", users: 320 },
];

// Generate sample data for the last 12 months
const generateEngagementData = () => {
  const data = [];
  const now = new Date();
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  for (let i = 11; i >= 0; i--) {
    const date = new Date(now);
    date.setMonth(date.getMonth() - i);

    // Generate random values with some trend
    const comments = Math.round(50 + Math.random() * 100 + (11 - i) * 5);
    const shares = Math.round(20 + Math.random() * 50 + (11 - i) * 3);
    const likes = Math.round(100 + Math.random() * 200 + (11 - i) * 10);

    data.push({
      month: months[date.getMonth()],
      comments,
      shares,
      likes,
    });
  }

  return data;
};

// Custom tooltip component
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 border border-gray-200 rounded-md shadow-md">
        <p className="text-sm font-medium text-gray-900">{label}</p>
        {payload.map((entry, index) => (
          <p
            key={`item-${index}`}
            className="text-sm"
            style={{ color: entry.color || entry.fill }}
          >
            {entry.name}: {entry.value.toLocaleString()}
          </p>
        ))}
      </div>
    );
  }

  return null;
};

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("overview");
  const pageViewsData = generatePageViewData();
  const engagementData = generateEngagementData();

  return (
    <div className="flex min-h-screen w-full flex-col bg-gray-50">
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <h1 className="text-2xl font-bold">Blog Dashboard</h1>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-lg border bg-white p-4 shadow-sm">
            <div className="flex flex-row items-center justify-between pb-2">
              <h3 className="text-sm font-medium text-gray-500">
                Total Page Views
              </h3>
            </div>
            <div className="text-2xl font-bold">45,231</div>
            <p className="text-xs text-gray-500">+20.1% from last month</p>
          </div>

          <div className="rounded-lg border bg-white p-4 shadow-sm">
            <div className="flex flex-row items-center justify-between pb-2">
              <h3 className="text-sm font-medium text-gray-500">
                Unique Visitors
              </h3>
            </div>
            <div className="text-2xl font-bold">12,543</div>
            <p className="text-xs text-gray-500">+12.3% from last month</p>
          </div>

          <div className="rounded-lg border bg-white p-4 shadow-sm">
            <div className="flex flex-row items-center justify-between pb-2">
              <h3 className="text-sm font-medium text-gray-500">
                Avg. Time on Page
              </h3>
            </div>
            <div className="text-2xl font-bold">3m 12s</div>
            <p className="text-xs text-gray-500">+1.5% from last month</p>
          </div>

          <div className="rounded-lg border bg-white p-4 shadow-sm">
            <div className="flex flex-row items-center justify-between pb-2">
              <h3 className="text-sm font-medium text-gray-500">Bounce Rate</h3>
            </div>
            <div className="text-2xl font-bold">24.3%</div>
            <p className="text-xs text-gray-500">-2.1% from last month</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="space-y-4">
          <div className="flex border-b">
            <button
              onClick={() => setActiveTab("overview")}
              className={`px-4 py-2 font-medium ${
                activeTab === "overview"
                  ? "border-b-2 border-blue-500 text-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab("analytics")}
              className={`px-4 py-2 font-medium ${
                activeTab === "analytics"
                  ? "border-b-2 border-blue-500 text-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Analytics
            </button>
            <button
              onClick={() => setActiveTab("reports")}
              className={`px-4 py-2 font-medium ${
                activeTab === "reports"
                  ? "border-b-2 border-blue-500 text-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Reports
            </button>
          </div>

          {/* Overview Tab Content */}
          {activeTab === "overview" && (
            <div className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                {/* Page Views Chart */}
                <div className="rounded-lg border bg-white p-4 shadow-sm lg:col-span-4">
                  <div className="mb-4">
                    <h3 className="text-lg font-medium">Page Views</h3>
                    <p className="text-sm text-gray-500">
                      Daily page views for the last 30 days
                    </p>
                  </div>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart
                        data={pageViewsData}
                        margin={{ top: 5, right: 10, left: 10, bottom: 0 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis
                          dataKey="date"
                          tickLine={false}
                          axisLine={false}
                          tickFormatter={(value) => {
                            const date = new Date(value);
                            return `${date.getDate()}/${date.getMonth() + 1}`;
                          }}
                          tickMargin={10}
                        />
                        <YAxis
                          tickLine={false}
                          axisLine={false}
                          tickFormatter={(value) => value.toLocaleString()}
                          tickMargin={10}
                        />
                        <Tooltip content={<CustomTooltip />} />
                        <Area
                          type="monotone"
                          dataKey="views"
                          stroke="#3b82f6"
                          strokeWidth={2}
                          fill="#3b82f6"
                          fillOpacity={0.2}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Traffic Sources Chart */}
                <div className="rounded-lg border bg-white p-4 shadow-sm lg:col-span-3">
                  <div className="mb-4">
                    <h3 className="text-lg font-medium">Traffic Sources</h3>
                    <p className="text-sm text-gray-500">
                      Where your visitors are coming from
                    </p>
                  </div>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={trafficSourcesData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={80}
                          paddingAngle={2}
                          dataKey="value"
                          nameKey="name"
                          label={({ name, percent }) =>
                            `${name}: ${(percent * 100).toFixed(0)}%`
                          }
                          labelLine={false}
                        >
                          {trafficSourcesData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip content={<CustomTooltip />} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                {/* Top Posts Chart */}
                <div className="rounded-lg border bg-white p-4 shadow-sm lg:col-span-3">
                  <div className="mb-4">
                    <h3 className="text-lg font-medium">Top Posts</h3>
                    <p className="text-sm text-gray-500">
                      Your most viewed content
                    </p>
                  </div>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={topPostsData}
                        layout="vertical"
                        margin={{ top: 5, right: 10, left: 10, bottom: 5 }}
                      >
                        <CartesianGrid
                          strokeDasharray="3 3"
                          horizontal={true}
                          vertical={false}
                        />
                        <XAxis
                          type="number"
                          tickLine={false}
                          axisLine={false}
                        />
                        <YAxis
                          dataKey="title"
                          type="category"
                          tickLine={false}
                          axisLine={false}
                          width={100}
                          tickFormatter={(value) =>
                            value.length > 15
                              ? `${value.substring(0, 15)}...`
                              : value
                          }
                        />
                        <Tooltip content={<CustomTooltip />} />
                        <Bar
                          dataKey="views"
                          fill="#10b981"
                          radius={[0, 4, 4, 0]}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* User Demographics Chart */}
                <div className="rounded-lg border bg-white p-4 shadow-sm lg:col-span-4">
                  <div className="mb-4">
                    <h3 className="text-lg font-medium">User Demographics</h3>
                    <p className="text-sm text-gray-500">
                      Age groups of your audience
                    </p>
                  </div>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={demographicsData}
                        margin={{ top: 5, right: 10, left: 10, bottom: 20 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis
                          dataKey="age"
                          tickLine={false}
                          axisLine={false}
                          tickMargin={10}
                        />
                        <YAxis
                          tickLine={false}
                          axisLine={false}
                          tickFormatter={(value) => value.toLocaleString()}
                          tickMargin={10}
                        />
                        <Tooltip content={<CustomTooltip />} />
                        <Bar
                          dataKey="users"
                          fill="#8b5cf6"
                          radius={[4, 4, 0, 0]}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Analytics Tab Content */}
          {activeTab === "analytics" && (
            <div className="space-y-4">
              <div className="rounded-lg border bg-white p-4 shadow-sm">
                <div className="mb-4">
                  <h3 className="text-lg font-medium">Engagement Metrics</h3>
                  <p className="text-sm text-gray-500">
                    Comments, shares, and likes over time
                  </p>
                </div>
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart
                      data={engagementData}
                      margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis
                        dataKey="month"
                        tickLine={false}
                        axisLine={false}
                        tickMargin={10}
                      />
                      <YAxis
                        yAxisId="left"
                        tickLine={false}
                        axisLine={false}
                        tickMargin={10}
                      />
                      <YAxis
                        yAxisId="right"
                        orientation="right"
                        tickLine={false}
                        axisLine={false}
                        tickMargin={10}
                      />
                      <Tooltip content={<CustomTooltip />} />
                      <Bar
                        yAxisId="left"
                        dataKey="comments"
                        fill="#3b82f6"
                        radius={[4, 4, 0, 0]}
                      />
                      <Bar
                        yAxisId="left"
                        dataKey="shares"
                        fill="#10b981"
                        radius={[4, 4, 0, 0]}
                      />
                      <Line
                        yAxisId="right"
                        type="monotone"
                        dataKey="likes"
                        stroke="#f59e0b"
                        strokeWidth={2}
                        dot={{ r: 4 }}
                      />
                    </ComposedChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          )}

          {/* Reports Tab Content */}
          {activeTab === "reports" && (
            <div className="space-y-4">
              <div className="rounded-lg border bg-white p-4 shadow-sm">
                <div className="mb-4">
                  <h3 className="text-lg font-medium">Reports</h3>
                  <p className="text-sm text-gray-500">
                    View and download detailed reports
                  </p>
                </div>
                <div className="flex items-center justify-center py-10 text-gray-500">
                  Reports will be available in this tab
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
