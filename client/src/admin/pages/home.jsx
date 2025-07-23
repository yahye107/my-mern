import React, { useEffect, useState } from "react";
import Header from "../componets/Header";
import { BarChart2, ClipboardList, CheckCircle, Users } from "lucide-react";
import { motion } from "framer-motion";
import StatCard from "../componets/StatCard";
import { callGetAllUsersApi, getAllQoutesApi } from "@/service";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
  AreaChart,
  Area,
} from "recharts";
import moment from "moment";
import { Skeleton } from "@/components/ui/skeleton";

const COLORS = ["#6366F1", "#F59E0B", "#10B981", "#EF4444"];
const GRADIENTS = [
  "linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)",
  "linear-gradient(135deg, #F59E0B 0%, #FCD34D 100%)",
  "linear-gradient(135deg, #10B981 0%, #34D399 100%)",
  "linear-gradient(135deg, #EF4444 0%, #F87171 100%)",
];

const Home = () => {
  const [userCount, setUserCount] = useState(0);
  const [quotes, setQuotes] = useState([]);
  const [userTrends, setUserTrends] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [usersData, quotesData] = await Promise.all([
          callGetAllUsersApi(),
          getAllQoutesApi(),
        ]);

        if (usersData?.success) {
          setUserCount(usersData.users.length);

          // User trends for last 7 days
          const trends = Array.from({ length: 7 }).map((_, i) => {
            const date = moment().subtract(i, "days").format("MMM DD");
            const usersOnDate = usersData.users.filter(
              (u) => moment(u.createdAt).format("MMM DD") === date
            );
            return { date, users: usersOnDate.length };
          });
          setUserTrends(trends.reverse());
        }

        if (quotesData?.success) {
          setQuotes(quotesData.quotes || []);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const statusCount = quotes.reduce((acc, q) => {
    acc[q.status] = (acc[q.status] || 0) + 1;
    return acc;
  }, {});

  const pieData = Object.entries(statusCount).map(([status, value]) => ({
    name: status,
    value,
  }));

  const last7Days = Array.from({ length: 7 })
    .map((_, i) => {
      const date = moment().subtract(i, "days").format("MMM DD");
      return {
        date,
        count: quotes.filter(
          (q) => moment(q.createdAt).format("MMM DD") === date
        ).length,
      };
    })
    .reverse();

  if (loading) {
    return (
      <div className="flex-1 overflow-auto relative z-10">
        <div className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} className="h-32 rounded-2xl bg-gray-100/50" />
            ))}
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {[...Array(3)].map((_, i) => (
              <Skeleton key={i} className="h-80 rounded-2xl bg-gray-100/50" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-auto relative z-10">
      <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
        {/* Stats Grid */}
        <motion.div
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, staggerChildren: 0.2 }}
        >
          <StatCard
            name="Total Users"
            icon={Users}
            value={userCount}
            trend="+12.3%"
            color={GRADIENTS[0]}
          />
          <StatCard
            name="Pending Quotes"
            icon={ClipboardList}
            value={statusCount["pending"] || 0}
            trend="-3.2%"
            color={GRADIENTS[1]}
          />
          <StatCard
            name="Completed Quotes"
            icon={CheckCircle}
            value={statusCount["Completed"] || 0}
            trend="+24.1%"
            color={GRADIENTS[2]}
          />
          <StatCard
            name="In Progress"
            icon={BarChart2}
            value={statusCount["In Progress"] || 0}
            trend="+8.7%"
            color={GRADIENTS[3]}
          />
        </motion.div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Pie Chart */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow"
          >
            <h2 className="font-semibold text-lg mb-4 text-gray-700">
              Quote Status Distribution
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={2}
                >
                  {pieData.map((_, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                      stroke="none"
                    />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    background: "white",
                    border: "none",
                    borderRadius: "8px",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                  }}
                />
                <Legend
                  layout="vertical"
                  align="right"
                  verticalAlign="middle"
                  iconSize={12}
                  iconType="circle"
                />
              </PieChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Bar Chart */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow"
          >
            <h2 className="font-semibold text-lg mb-4 text-gray-700">
              Quotes by Status
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={pieData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  strokeOpacity={0.2}
                />
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#6B7280" }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#6B7280" }}
                  allowDecimals={false}
                />
                <Tooltip
                  contentStyle={{
                    background: "white",
                    border: "none",
                    borderRadius: "8px",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                  }}
                />
                <Bar dataKey="value" radius={[4, 4, 0, 0]} barSize={24}>
                  {pieData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Area Chart */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow"
          >
            <h2 className="font-semibold text-lg mb-4 text-gray-700">
              Quotes Created (Last 7 Days)
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={last7Days}>
                <defs>
                  <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  strokeOpacity={0.2}
                />
                <XAxis
                  dataKey="date"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#6B7280" }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#6B7280" }}
                  allowDecimals={false}
                />
                <Tooltip
                  contentStyle={{
                    background: "white",
                    border: "none",
                    borderRadius: "8px",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="count"
                  stroke="#10B981"
                  fillOpacity={1}
                  fill="url(#colorCount)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </motion.div>
        </div>

        {/* Users Joined Line Chart */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 mt-8 hover:shadow-xl transition-shadow"
        >
          <h2 className="font-semibold text-lg mb-4 text-gray-700">
            Users Joined (Last 7 Days)
          </h2>
          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={userTrends}>
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                strokeOpacity={0.2}
              />
              <XAxis
                dataKey="date"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#6B7280" }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#6B7280" }}
                allowDecimals={false}
              />
              <Tooltip
                contentStyle={{
                  background: "white",
                  border: "none",
                  borderRadius: "8px",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                }}
              />
              <Line
                type="monotone"
                dataKey="users"
                stroke="#6366F1"
                strokeWidth={3}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>
      </main>
    </div>
  );
};

export default Home;
