"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts"
import { CreditCard, Users, FileText, AlertCircle, ArrowRight, Download, Plus } from "lucide-react"
import Link from "next/link"

// Mock data for dashboard
const stats = {
  totalTeachers: 25,
  activeTeachers: 22,
  totalPayments: "Rp 125.000.000",
  pendingPayments: "Rp 5.200.000",
  documentsGenerated: 150,
  remainingQuota: 350,
  quotaUsedPercentage: 30,
  nextPaymentDate: "2023-07-15",
}

// Mock data for payment chart
const paymentData = [
  { month: "Jan", amount: 20000000 },
  { month: "Feb", amount: 22000000 },
  { month: "Mar", amount: 19000000 },
  { month: "Apr", amount: 23000000 },
  { month: "May", amount: 25000000 },
  { month: "Jun", amount: 25000000 },
]

// Mock data for document generation chart
const documentData = [
  { month: "Jan", rpp: 20, syllabus: 5 },
  { month: "Feb", rpp: 25, syllabus: 8 },
  { month: "Mar", rpp: 18, syllabus: 4 },
  { month: "Apr", rpp: 22, syllabus: 7 },
  { month: "May", rpp: 30, syllabus: 10 },
  { month: "Jun", rpp: 35, syllabus: 12 },
]

// Mock recent payments
const recentPayments = [
  {
    id: 1,
    teacherName: "Alice Johnson",
    amount: "Rp 5.000.000",
    date: "2023-06-15",
    status: "Paid",
  },
  {
    id: 2,
    teacherName: "Bob Smith",
    amount: "Rp 4.800.000",
    date: "2023-06-15",
    status: "Paid",
  },
  {
    id: 3,
    teacherName: "Carol Williams",
    amount: "Rp 5.200.000",
    date: "2023-06-15",
    status: "Pending",
  },
]

// Mock recent account activities
const recentActivities = [
  {
    id: 1,
    action: "Atur Ulang Kata Sandi",
    user: "David Brown",
    date: "2023-07-03",
    time: "10:15 AM",
  },
  {
    id: 2,
    action: "Pembaruan Akun",
    user: "Alice Johnson",
    date: "2023-07-02",
    time: "2:30 PM",
  },
  {
    id: 3,
    action: "Perubahan Izin",
    user: "Eva Garcia",
    date: "2023-07-01",
    time: "11:45 AM",
  },
]

export default function OperatorDashboard() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Dasbor Operator</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Guru</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalTeachers}</div>
            <p className="text-xs text-muted-foreground">{stats.activeTeachers} Guru Aktif</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Pembayaran (YTD)</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalPayments}</div>
            <p className="text-xs text-muted-foreground">{stats.pendingPayments} pending</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Dokumen Yang Dihasilkan</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.documentsGenerated}</div>
            <div className="mt-2">
              <Progress value={stats.quotaUsedPercentage} className="h-2" />
              <p className="text-xs text-muted-foreground mt-1">{stats.remainingQuota} Dokumen yang tersisa</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Tanggal Pembayaran Berikutnya</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.nextPaymentDate}</div>
            <p className="text-xs text-muted-foreground">5 Guru dijadwalkan</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Riwayat Pembayaran</CardTitle>
            <CardDescription>Total pembayaran bulanan untuk tahun ini</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={paymentData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis tickFormatter={(value) => `Rp ${(value / 1000000).toFixed(0)}M`} />
                  <Tooltip formatter={(value) => [`Rp ${(Number(value) / 1000000).toFixed(1)}M`, "Amount"]} />
                  <Bar dataKey="amount" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Pembuatan Dokumen</CardTitle>
            <CardDescription>Pembuatan RPP dan Silabus bulanan</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={documentData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="rpp" stroke="#3b82f6" strokeWidth={2} />
                  <Line type="monotone" dataKey="syllabus" stroke="#10b981" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activities */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Pembayaran Terbaru</CardTitle>
              <CardDescription>Pembayaran Guru Terbaru</CardDescription>
            </div>
            <Button variant="outline" size="sm" asChild>
              <Link href="/dashboard/operator/payments">
                View All
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Guru</TableHead>
                  <TableHead>Jumlah Pembayaran</TableHead>
                  <TableHead>Tanggal Pembayaran</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentPayments.map((payment) => (
                  <TableRow key={payment.id}>
                    <TableCell>{payment.teacherName}</TableCell>
                    <TableCell>{payment.amount}</TableCell>
                    <TableCell>{new Date(payment.date).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <Badge variant={payment.status === "Paid" ? "default" : "secondary"}>{payment.status}</Badge>
                    </TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-2" />
                        Receipt
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <div className="mt-4 flex justify-center">
              <Button asChild>
                <Link href="/dashboard/operator/payments">
                  <Plus className="mr-2 h-4 w-4" />
                  Proses Pembayaran Baru
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Aktivitas Akun</CardTitle>
              <CardDescription>Aktivitas manajemen akun terbaru</CardDescription>
            </div>
            <Button variant="outline" size="sm" asChild>
              <Link href="/dashboard/operator/accounts">
                Lihat Semua
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="border-l-4 border-blue-500 pl-4 py-1">
                  <div className="flex items-center">
                    <h3 className="font-medium">{activity.action}</h3>
                    <span className="ml-auto text-sm text-muted-foreground">
                      {activity.date} - {activity.time}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">{activity.user}</p>
                </div>
              ))}
              <div className="mt-4 flex justify-center">
                <Button variant="outline" asChild>
                  <Link href="/dashboard/operator/accounts">Kelola Akun Guru</Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

