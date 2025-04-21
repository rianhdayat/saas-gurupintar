"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { format } from "date-fns"
import {
  CalendarIcon,
  Download,
  Filter,
  Search,
  Plus,
  CreditCard,
  FileText,
  Clock,
  CheckCircle,
  AlertCircle,
  ChevronDown,
  ChevronUp,
} from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { Progress } from "@/components/ui/progress"

// Mock teacher data
const teachers = [
  {
    id: 1,
    name: "Alice Johnson",
    email: "alice@example.com",
    salary: "Rp 5.000.000",
    lastPayment: "2023-06-15",
    status: "Active",
    bankAccount: "BCA - 1234567890",
    taxId: "12.345.678.9-012.000",
  },
  {
    id: 2,
    name: "Bob Smith",
    email: "bob@example.com",
    salary: "Rp 4.800.000",
    lastPayment: "2023-06-15",
    status: "Active",
    bankAccount: "Mandiri - 0987654321",
    taxId: "98.765.432.1-098.000",
  },
  {
    id: 3,
    name: "Carol Williams",
    email: "carol@example.com",
    salary: "Rp 5.200.000",
    lastPayment: "2023-06-15",
    status: "Active",
    bankAccount: "BNI - 1122334455",
    taxId: "11.223.344.5-567.000",
  },
  {
    id: 4,
    name: "David Brown",
    email: "david@example.com",
    salary: "Rp 4.900.000",
    lastPayment: "2023-05-15",
    status: "Active",
    bankAccount: "BRI - 5566778899",
    taxId: "55.667.788.9-123.000",
  },
  {
    id: 5,
    name: "Eva Garcia",
    email: "eva@example.com",
    salary: "Rp 5.100.000",
    lastPayment: "2023-05-15",
    status: "Inactive",
    bankAccount: "CIMB - 9988776655",
    taxId: "99.887.766.5-456.000",
  },
]

// Mock payment data
const payments = [
  {
    id: 1,
    teacherId: 1,
    teacherName: "Alice Johnson",
    amount: "Rp 5.000.000",
    date: "2023-06-15",
    status: "Paid",
    method: "Bank Transfer",
    description: "Monthly salary - June 2023",
    reference: "PAY-2023-06-001",
  },
  {
    id: 2,
    teacherId: 2,
    teacherName: "Bob Smith",
    amount: "Rp 4.800.000",
    date: "2023-06-15",
    status: "Paid",
    method: "Bank Transfer",
    description: "Monthly salary - June 2023",
    reference: "PAY-2023-06-002",
  },
  {
    id: 3,
    teacherId: 3,
    teacherName: "Carol Williams",
    amount: "Rp 5.200.000",
    date: "2023-06-15",
    status: "Pending",
    method: "Bank Transfer",
    description: "Monthly salary - June 2023",
    reference: "PAY-2023-06-003",
  },
  {
    id: 4,
    teacherId: 4,
    teacherName: "David Brown",
    amount: "Rp 4.900.000",
    date: "2023-05-15",
    status: "Paid",
    method: "Bank Transfer",
    description: "Monthly salary - May 2023",
    reference: "PAY-2023-05-004",
  },
  {
    id: 5,
    teacherId: 5,
    teacherName: "Eva Garcia",
    amount: "Rp 5.100.000",
    date: "2023-05-15",
    status: "Paid",
    method: "Bank Transfer",
    description: "Monthly salary - May 2023",
    reference: "PAY-2023-05-005",
  },
  {
    id: 6,
    teacherId: 1,
    teacherName: "Alice Johnson",
    amount: "Rp 5.000.000",
    date: "2023-05-15",
    status: "Paid",
    method: "Bank Transfer",
    description: "Monthly salary - May 2023",
    reference: "PAY-2023-05-001",
  },
  {
    id: 7,
    teacherId: 2,
    teacherName: "Bob Smith",
    amount: "Rp 4.800.000",
    date: "2023-05-15",
    status: "Paid",
    method: "Bank Transfer",
    description: "Monthly salary - May 2023",
    reference: "PAY-2023-05-002",
  },
  {
    id: 8,
    teacherId: 3,
    teacherName: "Carol Williams",
    amount: "Rp 5.200.000",
    date: "2023-05-15",
    status: "Paid",
    method: "Bank Transfer",
    description: "Monthly salary - May 2023",
    reference: "PAY-2023-05-003",
  },
]

// Mock scheduled payments
const scheduledPayments = [
  {
    id: 1,
    description: "July 2023 Salaries",
    amount: "Rp 25.000.000",
    scheduledDate: "2023-07-15",
    status: "Scheduled",
    recipients: 5,
  },
  {
    id: 2,
    description: "August 2023 Salaries",
    amount: "Rp 25.000.000",
    scheduledDate: "2023-08-15",
    status: "Scheduled",
    recipients: 5,
  },
]

// Mock payment statistics
const paymentStats = {
  totalPaid: "Rp 50.000.000",
  pendingAmount: "Rp 5.200.000",
  totalPayments: 10,
  pendingPayments: 1,
  monthlyBudget: "Rp 25.000.000",
  budgetUsed: 80,
}

export default function PaymentsPage() {
  const { toast } = useToast()
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [date, setDate] = useState<Date | undefined>(undefined)
  const [selectedTeachers, setSelectedTeachers] = useState<number[]>([])
  const [showBatchPaymentDialog, setShowBatchPaymentDialog] = useState(false)
  const [paymentDescription, setPaymentDescription] = useState("")
  const [paymentDate, setPaymentDate] = useState<Date | undefined>(new Date())
  const [expandedTeacher, setExpandedTeacher] = useState<number | null>(null)

  // Filter payments based on search term and status
  const filteredPayments = payments.filter((payment) => {
    const matchesSearch =
      payment.teacherName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.reference.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || payment.status.toLowerCase() === statusFilter.toLowerCase()
    const matchesDate = !date || new Date(payment.date).toDateString() === date.toDateString()
    return matchesSearch && matchesStatus && matchesDate
  })

  // Filter teachers based on search term
  const filteredTeachers = teachers.filter(
    (teacher) =>
      teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      teacher.email.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const toggleTeacherSelection = (teacherId: number) => {
    setSelectedTeachers((prev) =>
      prev.includes(teacherId) ? prev.filter((id) => id !== teacherId) : [...prev, teacherId],
    )
  }

  const toggleAllTeachers = () => {
    if (selectedTeachers.length === filteredTeachers.length) {
      setSelectedTeachers([])
    } else {
      setSelectedTeachers(filteredTeachers.map((teacher) => teacher.id))
    }
  }

  const handleAddPayment = () => {
    toast({
      title: "Payment Added",
      description: "The new payment has been recorded successfully.",
    })
  }

  const handleProcessBatchPayment = () => {
    toast({
      title: "Batch Payment Processed",
      description: `Payments for ${selectedTeachers.length} teachers have been scheduled for ${paymentDate ? format(paymentDate, "PPP") : "today"}.`,
    })
    setShowBatchPaymentDialog(false)
    setSelectedTeachers([])
    setPaymentDescription("")
    setPaymentDate(new Date())
  }

  const handleDownloadPayslip = (paymentId: number) => {
    toast({
      title: "Payslip Downloaded",
      description: `Payslip for payment #${paymentId} has been downloaded.`,
    })
  }

  const toggleTeacherExpand = (teacherId: number) => {
    setExpandedTeacher(expandedTeacher === teacherId ? null : teacherId)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Manajemen Pembayaran</h1>

      {/* Payment Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Dibayar (YTD)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{paymentStats.totalPaid}</div>
            <p className="text-xs text-muted-foreground">{paymentStats.totalPayments} proses pembayaran</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Pembayaran Tertunda</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{paymentStats.pendingAmount}</div>
            <p className="text-xs text-muted-foreground">{paymentStats.pendingPayments} pembayaran tertunda</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Biaya Bulanan</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{paymentStats.monthlyBudget}</div>
            <div className="mt-2">
              <Progress value={paymentStats.budgetUsed} className="h-2" />
              <p className="text-xs text-muted-foreground mt-1">{paymentStats.budgetUsed}% penggunaan biaya</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Tanggal Pembayaran Berikutnya</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">July 15, 2023</div>
            <p className="text-xs text-muted-foreground">5 Guru dijadwalkan</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="teachers" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 max-w-2xl">
          <TabsTrigger value="teachers">Guru</TabsTrigger>
          <TabsTrigger value="payments">Riwayat Pembayaran</TabsTrigger>
          <TabsTrigger value="scheduled">Jadwal</TabsTrigger>
          <TabsTrigger value="reports">Laporan</TabsTrigger>
        </TabsList>

        {/* Teachers Tab */}
        <TabsContent value="teachers">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Manajemen Pembayaran Guru</CardTitle>
                <CardDescription>Mengelola dan memproses pembayaran untuk guru</CardDescription>
              </div>
              <Dialog open={showBatchPaymentDialog} onOpenChange={setShowBatchPaymentDialog}>
                <DialogTrigger asChild>
                  <Button disabled={selectedTeachers.length === 0}>
                    <CreditCard className="h-4 w-4 mr-2" />
                    Process Batch Payment
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle></DialogTitle>
                    <DialogDescription>
                      You are about to process payments for {selectedTeachers.length} teachers.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label htmlFor="payment-description">Payment Description</Label>
                      <Input
                        id="payment-description"
                        placeholder="e.g., July 2023 Salaries"
                        value={paymentDescription}
                        onChange={(e) => setPaymentDescription(e.target.value)}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label>Payment Date</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant="outline" className="w-full justify-start">
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {paymentDate ? format(paymentDate, "PPP") : "Select date"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar mode="single" selected={paymentDate} onSelect={setPaymentDate} initialFocus />
                        </PopoverContent>
                      </Popover>
                    </div>
                    <div>
                      <Label>Selected Teachers</Label>
                      <div className="mt-2 max-h-40 overflow-y-auto border rounded-md p-2">
                        <ul className="space-y-1">
                          {selectedTeachers.map((id) => {
                            const teacher = teachers.find((t) => t.id === id)
                            return (
                              <li key={id} className="text-sm">
                                {teacher?.name} - {teacher?.salary}
                              </li>
                            )
                          })}
                        </ul>
                      </div>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setShowBatchPaymentDialog(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleProcessBatchPayment}>Process Payments</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
                <div className="flex items-center space-x-2">
                  <Search className="text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Search teachers..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="max-w-sm"
                  />
                </div>

                <div className="flex flex-wrap gap-2">
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-[180px]">
                      <Filter className="h-4 w-4 mr-2" />
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Semua Status</SelectItem>
                      <SelectItem value="active">Aktif</SelectItem>
                      <SelectItem value="inactive">Tidak Aktif</SelectItem>
                    </SelectContent>
                  </Select>

                  <Button variant="outline" onClick={handleAddPayment}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Teacher
                  </Button>
                </div>
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[50px]">
                      <Checkbox
                        checked={selectedTeachers.length === filteredTeachers.length && filteredTeachers.length > 0}
                        onCheckedChange={toggleAllTeachers}
                        aria-label="Select all teachers"
                      />
                    </TableHead>
                    <TableHead>Nama</TableHead>
                    <TableHead>Gaji</TableHead>
                    <TableHead>Pembayaran Terakhir</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Aksi</TableHead>
                    <TableHead className="w-[50px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTeachers.map((teacher) => (
                    <>
                      <TableRow key={teacher.id}>
                        <TableCell>
                          <Checkbox
                            checked={selectedTeachers.includes(teacher.id)}
                            onCheckedChange={() => toggleTeacherSelection(teacher.id)}
                            aria-label={`Select ${teacher.name}`}
                          />
                        </TableCell>
                        <TableCell>
                          <div className="font-medium">{teacher.name}</div>
                          <div className="text-sm text-muted-foreground">{teacher.email}</div>
                        </TableCell>
                        <TableCell>{teacher.salary}</TableCell>
                        <TableCell>{new Date(teacher.lastPayment).toLocaleDateString()}</TableCell>
                        <TableCell>
                          <Badge variant={teacher.status === "Active" ? "default" : "secondary"}>
                            {teacher.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm">
                              <CreditCard className="h-4 w-4 mr-2" />
                              Pay
                            </Button>
                            <Button variant="outline" size="sm">
                              <FileText className="h-4 w-4 mr-2" />
                              History
                            </Button>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm" onClick={() => toggleTeacherExpand(teacher.id)}>
                            {expandedTeacher === teacher.id ? (
                              <ChevronUp className="h-4 w-4" />
                            ) : (
                              <ChevronDown className="h-4 w-4" />
                            )}
                          </Button>
                        </TableCell>
                      </TableRow>
                      {expandedTeacher === teacher.id && (
                        <TableRow>
                          <TableCell colSpan={7}>
                            <div className="p-4 bg-muted/20 rounded-md">
                              <h4 className="font-medium mb-2">Payment Details</h4>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                  <p className="text-sm font-medium">Bank Account</p>
                                  <p className="text-sm">{teacher.bankAccount}</p>
                                </div>
                                <div>
                                  <p className="text-sm font-medium">Tax ID (NPWP)</p>
                                  <p className="text-sm">{teacher.taxId}</p>
                                </div>
                              </div>
                              <div className="mt-4">
                                <h4 className="font-medium mb-2">Recent Payments</h4>
                                <div className="space-y-2">
                                  {payments
                                    .filter((p) => p.teacherId === teacher.id)
                                    .slice(0, 3)
                                    .map((payment) => (
                                      <div
                                        key={payment.id}
                                        className="flex justify-between items-center text-sm p-2 border-b last:border-0"
                                      >
                                        <div>
                                          <p>{payment.description}</p>
                                          <p className="text-xs text-muted-foreground">
                                            {new Date(payment.date).toLocaleDateString()}
                                          </p>
                                        </div>
                                        <div className="text-right">
                                          <p>{payment.amount}</p>
                                          <Badge
                                            variant={payment.status === "Paid" ? "default" : "secondary"}
                                            className="text-xs"
                                          >
                                            {payment.status}
                                          </Badge>
                                        </div>
                                      </div>
                                    ))}
                                </div>
                              </div>
                            </div>
                          </TableCell>
                        </TableRow>
                      )}
                    </>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Payment History Tab */}
        <TabsContent value="payments">
          <Card>
            <CardHeader>
              <CardTitle>Riwayat Pembayaran</CardTitle>
              <CardDescription>Lihat semua pembayaran yang telah diproses</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
                <div className="flex items-center space-x-2">
                  <Search className="text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Search payments..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="max-w-sm"
                  />
                </div>

                <div className="flex flex-wrap gap-2">
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-[180px]">
                      <Filter className="h-4 w-4 mr-2" />
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Semua Status</SelectItem>
                      <SelectItem value="paid">Dibayar</SelectItem>
                      <SelectItem value="pending">Tertunda</SelectItem>
                      <SelectItem value="failed">Gagal</SelectItem>
                    </SelectContent>
                  </Select>

                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-[180px] justify-start">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : "Pick a date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Referensi</TableHead>
                    <TableHead>Guru</TableHead>
                    <TableHead>Jumlah</TableHead>
                    <TableHead>Tanggal</TableHead>
                    <TableHead>Deskripsi</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Aksi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPayments.map((payment) => (
                    <TableRow key={payment.id}>
                      <TableCell>{payment.reference}</TableCell>
                      <TableCell>{payment.teacherName}</TableCell>
                      <TableCell>{payment.amount}</TableCell>
                      <TableCell>{new Date(payment.date).toLocaleDateString()}</TableCell>
                      <TableCell>{payment.description}</TableCell>
                      <TableCell>
                        <Badge variant={payment.status === "Paid" ? "default" : "secondary"}>{payment.status}</Badge>
                      </TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm" onClick={() => handleDownloadPayslip(payment.id)}>
                          <Download className="h-4 w-4 mr-2" />
                          Payslip
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Scheduled Payments Tab */}
        <TabsContent value="scheduled">
          <Card>
            <CardHeader>
              <CardTitle>Pembayaran Terjadwal</CardTitle>
              <CardDescription>MeLihat dan mengelola pembayaran yang akan datang</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Deskripsi</TableHead>
                    <TableHead>Jumlah</TableHead>
                    <TableHead>Tanggal Terjadwal</TableHead>
                    <TableHead>Penerima</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Aksi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {scheduledPayments.map((payment) => (
                    <TableRow key={payment.id}>
                      <TableCell>{payment.description}</TableCell>
                      <TableCell>{payment.amount}</TableCell>
                      <TableCell>{new Date(payment.scheduledDate).toLocaleDateString()}</TableCell>
                      <TableCell>{payment.recipients} Guru</TableCell>
                      <TableCell>
                        <Badge variant="secondary" className="bg-amber-100 text-amber-800 hover:bg-amber-100">
                          <Clock className="h-3 w-3 mr-1" />
                          {payment.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            <CheckCircle className="h-4 w-4 mr-2" />
                            Proses Sekarang
                          </Button>
                          <Button variant="outline" size="sm">
                            <AlertCircle className="h-4 w-4 mr-2" />
                            Batal
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Jadwal Pembayaran Baru
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Reports Tab */}
        <TabsContent value="reports">
          <Card>
            <CardHeader>
              <CardTitle>Laporan Pembayaran</CardTitle>
              <CardDescription>Membuat dan mengunduh laporan pembayaran</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Ringkasan Pembayaran Bulanan</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      Ringkasan semua pembayaran yang dibuat dalam bulan tertentu, termasuk total dan perincian.
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">
                      <Download className="h-4 w-4 mr-2" />
                      Buat Laporan
                    </Button>
                  </CardFooter>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Riwayat Pembayaran Guru</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      Riwayat pembayaran detail untuk guru individu, termasuk semua transaksi dan metode pembayaran.
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">
                      <Download className="h-4 w-4 mr-2" />
                      Buat Laporan
                    </Button>
                  </CardFooter>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Laporan Pajak Tahunan</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      Laporan pajak tahunan komprehensif, sesuai untuk tujuan akuntansi dan pelaporan pajak.
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">
                      <Download className="h-4 w-4 mr-2" />
                      Buat Laporan
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

