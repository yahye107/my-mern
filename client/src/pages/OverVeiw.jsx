import { useEffect, useState } from "react";
import Header from "@/components/logcommonlayout/Header";
import {
  ClipboardList,
  CheckCircle,
  UserPlus,
  MessageSquare,
} from "lucide-react";
import { motion } from "framer-motion";
import { getuserAllQoutesApi } from "@/service";
import { useUser } from "@/context/use_context";
import moment from "moment";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";
import StatCard from "@/components/logcommonlayout/StatCard";
import { Skeleton } from "@/components/ui/skeleton";

const COLORS = ["#6366F1", "#F59E0B", "#10B981", "#EF4444"];
const GRADIENTS = [
  "linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)",
  "linear-gradient(135deg, #F59E0B 0%, #FCD34D 100%)",
  "linear-gradient(135deg, #10B981 0%, #34D399 100%)",
  "linear-gradient(135deg, #EF4444 0%, #F87171 100%)",
];

const OverVeiw = () => {
  const { user } = useUser();
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserQuotes = async () => {
      try {
        const res = await getuserAllQoutesApi(user._id);
        if (res?.success) {
          setQuotes(res.quotesList);
        }
      } catch (error) {
        console.error("Failed to fetch quotes:", error);
      } finally {
        setLoading(false);
      }
    };

    if (user?._id) {
      fetchUserQuotes();
    }
  }, [user]);

  const totalQuotes = quotes.length;
  const totalResponded = quotes.filter((q) => q.response).length;
  const completedQuotes = quotes.filter((q) => q.status === "Completed").length;
  const statusCount = quotes.reduce((acc, q) => {
    acc[q.status] = (acc[q.status] || 0) + 1;
    return acc;
  }, {});

  const pieData = Object.entries(statusCount).map(([status, value]) => ({
    name: status,
    value,
  }));

  if (loading) {
    return (
      <div className="flex-1 overflow-auto relative z-10">
        {/* <Header title="User Overview" /> */}
        <div className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} className="h-32 rounded-2xl bg-gray-100/50" />
            ))}
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {[...Array(2)].map((_, i) => (
              <Skeleton key={i} className="h-80 rounded-2xl bg-gray-100/50" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-auto relative z-10">
      {/* <Header title="User Overview" /> */}
      <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
        {/* Welcome Section */}
        <div className="mb-8 bg-indigo-50 rounded-2xl p-6 shadow-sm">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            Welcome {user?.username}!
          </h1>
          <p className="text-gray-600">
            Member since {moment(user?.createdAt).format("MMMM Do, YYYY")}
          </p>
        </div>

        {/* Stat Cards */}
        <motion.div
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, staggerChildren: 0.2 }}
        >
          <StatCard
            name="Total Quotes Created"
            icon={ClipboardList}
            value={totalQuotes}
            trend={`${Math.floor((totalQuotes / 30) * 100)}% this month`}
            color={GRADIENTS[0]}
          />
          <StatCard
            name="Quotes Responded"
            icon={MessageSquare}
            value={totalResponded}
            trend={`${
              totalQuotes ? Math.floor((totalResponded / totalQuotes) * 100) : 0
            }% response rate`}
            color={GRADIENTS[1]}
          />
          <StatCard
            name="Completed Quotes"
            icon={CheckCircle}
            value={completedQuotes}
            color={GRADIENTS[2]}
          />
          <StatCard
            name="Account Age"
            icon={UserPlus}
            value={moment().diff(user?.createdAt, "days") + " days"}
            color={GRADIENTS[3]}
          />
        </motion.div>

        {/* Charts and Recent Quotes */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Pie Chart */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow"
          >
            <h2 className="font-semibold text-lg mb-4 text-gray-700">
              Your Quote Status Distribution
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
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Recent Activity */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow"
          >
            <h2 className="font-semibold text-lg mb-4 text-gray-700">
              Recent Quotes
            </h2>
            <div className="space-y-4">
              {quotes.slice(0, 5).map((quote) => (
                <div
                  key={quote._id}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div>
                    <h3 className="font-medium text-gray-800">
                      {quote.subject || "Untitled Quote"}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {moment(quote.createdAt).format("MMM Do, h:mm a")}
                    </p>
                  </div>
                  <span
                    className="px-3 py-1 rounded-full text-sm"
                    style={{
                      backgroundColor:
                        COLORS[
                          Object.keys(statusCount).indexOf(quote.status) %
                            COLORS.length
                        ] + "20",
                      color:
                        COLORS[
                          Object.keys(statusCount).indexOf(quote.status) %
                            COLORS.length
                        ],
                    }}
                  >
                    {quote.status}
                  </span>
                </div>
              ))}
              {quotes.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  No quotes created yet
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default OverVeiw;
