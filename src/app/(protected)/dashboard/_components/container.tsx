"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Icon } from "@iconify/react";
import Link from "next/link";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// Mock data - replace with actual API calls
const mockData = {
  membership: {
    transactions: {
      total: 342,
      completed: 298,
      pending: 32,
      canceled: 12,
      revenue: 125000000,
    },
    participants: 156,
    withdrawals: {
      pending: 5,
      totalAmount: 15000000,
    },
  },
  masterclass: {
    transactions: {
      total: 187,
      completed: 165,
      pending: 18,
      canceled: 4,
      revenue: 78000000,
    },
    participants: 89,
  },
};

// Revenue data for last 7 days (Membership only)
const revenueData = [
  { date: "Sen", membership: 15000000 },
  { date: "Sel", membership: 18000000 },
  { date: "Rab", membership: 22000000 },
  { date: "Kam", membership: 25000000 },
  { date: "Jum", membership: 20000000 },
  { date: "Sab", membership: 15000000 },
  { date: "Min", membership: 10000000 },
];

// Transaction status data
const transactionStatusData = [
  { name: "Completed", value: mockData.membership.transactions.completed + mockData.masterclass.transactions.completed, color: "#10b981" },
  { name: "Pending", value: mockData.membership.transactions.pending + mockData.masterclass.transactions.pending, color: "#f59e0b" },
  { name: "Canceled", value: mockData.membership.transactions.canceled + mockData.masterclass.transactions.canceled, color: "#ef4444" },
];

// Participants growth data (Membership only)
const participantsData = [
  { month: "Jan", membership: 120 },
  { month: "Feb", membership: 135 },
  { month: "Mar", membership: 145 },
  { month: "Apr", membership: 150 },
  { month: "Mei", membership: 156 },
];

const totalRevenue =
  mockData.membership.transactions.revenue +
  mockData.masterclass.transactions.revenue;
const totalTransactions =
  mockData.membership.transactions.total +
  mockData.masterclass.transactions.total;
const totalParticipants =
  mockData.membership.participants + mockData.masterclass.participants;

export default function Container() {
  return (
    <div className="bg-background space-y-6 rounded-lg p-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">
          Overview data penting dari sistem.
        </p>
      </div>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="!py-2">
          <Link href="/membership/transaction">
            <div className="flex items-center justify-between p-4 cursor-pointer hover:bg-muted/50 transition-colors rounded-lg">
              <div>
                <p className="text-muted-foreground text-sm">Total Revenue</p>
                <p className="text-2xl font-bold text-green-600">
                  {new Intl.NumberFormat("id-ID", {
                    style: "currency",
                    currency: "IDR",
                    maximumFractionDigits: 0,
                  }).format(totalRevenue)}
                </p>
              </div>
              <Icon
                icon="lucide:dollar-sign"
                className="h-8 w-8 text-green-500"
              />
            </div>
          </Link>
        </Card>

        <Card className="!py-2">
          <Link href="/membership/transaction">
            <div className="flex items-center justify-between p-4 cursor-pointer hover:bg-muted/50 transition-colors rounded-lg">
              <div>
                <p className="text-muted-foreground text-sm">
                  Total Transaksi
                </p>
                <p className="text-2xl font-bold">{totalTransactions}</p>
              </div>
              <Icon icon="lucide:receipt" className="h-8 w-8 text-blue-500" />
            </div>
          </Link>
        </Card>

        <Card className="!py-2">
          <Link href="/membership/participant">
            <div className="flex items-center justify-between p-4 cursor-pointer hover:bg-muted/50 transition-colors rounded-lg">
              <div>
                <p className="text-muted-foreground text-sm">
                  Total Participants
                </p>
                <p className="text-2xl font-bold">{totalParticipants}</p>
              </div>
              <Icon icon="lucide:users" className="h-8 w-8 text-purple-500" />
            </div>
          </Link>
        </Card>

        <Card className="!py-2">
          <Link href="/membership/withdrawal">
            <div className="flex items-center justify-between p-4 cursor-pointer hover:bg-muted/50 transition-colors rounded-lg">
              <div>
                <p className="text-muted-foreground text-sm">
                  Withdrawal Pending
                </p>
                <p className="text-2xl font-bold text-yellow-600">
                  {mockData.membership.withdrawals.pending}
                </p>
              </div>
              <Icon icon="lucide:wallet" className="h-8 w-8 text-yellow-500" />
            </div>
          </Link>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Revenue Trend Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Revenue Trend Membership (7 Hari Terakhir)</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis
                  tickFormatter={(value) =>
                    new Intl.NumberFormat("id-ID", {
                      style: "currency",
                      currency: "IDR",
                      notation: "compact",
                    }).format(value)
                  }
                />
                <Tooltip
                  formatter={(value: number) =>
                    new Intl.NumberFormat("id-ID", {
                      style: "currency",
                      currency: "IDR",
                    }).format(value)
                  }
                />
                <Area
                  type="monotone"
                  dataKey="membership"
                  stroke="#2563eb"
                  fill="#2563eb"
                  fillOpacity={0.6}
                  name="Membership"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Transaction Status Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Status Transaksi Membership</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={transactionStatusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) =>
                    `${name}: ${((percent ?? 0) * 100).toFixed(0)}%`
                  }
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {transactionStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Participants Growth Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Pertumbuhan Participants Membership (5 Bulan Terakhir)</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={participantsData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="membership"
                stroke="#2563eb"
                strokeWidth={2}
                name="Membership"
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
