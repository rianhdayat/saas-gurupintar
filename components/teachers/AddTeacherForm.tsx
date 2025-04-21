"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { CalendarIcon, Loader2 } from "lucide-react"
import { format } from "date-fns"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const teacherFormSchema = z.object({
  // Personal Information
  fullName: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().min(10, { message: "Phone number must be at least 10 digits." }),
  dateOfBirth: z.date({ required_error: "Please select a date of birth." }),
  gender: z.enum(["male", "female", "other"], { required_error: "Please select a gender." }),
  address: z.string().min(5, { message: "Address must be at least 5 characters." }),
  profilePicture: z.string().optional(),

  // Professional Information
  nip: z.string().optional(),
  employeeId: z.string().min(3, { message: "Employee ID must be at least 3 characters." }),
  position: z.string().min(2, { message: "Position must be at least 2 characters." }),
  subjects: z.string().min(2, { message: "Please enter at least one subject." }),
  education: z.string().min(2, { message: "Education must be at least 2 characters." }),
  experience: z.string().optional(),

  // School Information
  schoolName: z.string().min(2, { message: "School name must be at least 2 characters." }),
  schoolAddress: z.string().min(5, { message: "School address must be at least 5 characters." }),
  schoolType: z.enum(["SD", "SMP", "SMA", "SMK", "Other"], { required_error: "Please select a school type." }),

  // Account Settings
  username: z.string().min(4, { message: "Username must be at least 4 characters." }),
  password: z.string().min(8, { message: "Password must be at least 8 characters." }),
  initialQuota: z.number().min(0, { message: "Initial quota must be a positive number." }).default(10),
  accountStatus: z
    .enum(["active", "pending", "inactive"], { required_error: "Please select an account status." })
    .default("active"),

  // Additional Information
  bio: z.string().optional(),
  certifications: z.string().optional(),
  specializations: z.string().optional(),
  agreeToTerms: z.boolean().refine((val) => val === true, { message: "You must agree to the terms and conditions." }),
})

type TeacherFormValues = z.infer<typeof teacherFormSchema>

interface AddTeacherFormProps {
  onSubmit: (data: TeacherFormValues) => void
  isSubmitting?: boolean
}

export function AddTeacherForm({ onSubmit, isSubmitting = false }: AddTeacherFormProps) {
  const [activeTab, setActiveTab] = useState("personal")

  const defaultValues: Partial<TeacherFormValues> = {
    initialQuota: 10,
    accountStatus: "active",
    agreeToTerms: false,
    gender: "male",
    schoolType: "SMA",
  }

  const form = useForm<TeacherFormValues>({
    resolver: zodResolver(teacherFormSchema),
    defaultValues,
  })

  function handleSubmit(data: TeacherFormValues) {
    onSubmit(data)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-5 w-full">
            <TabsTrigger value="personal">Personal</TabsTrigger>
            <TabsTrigger value="professional">Professional</TabsTrigger>
            <TabsTrigger value="school">School</TabsTrigger>
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="additional">Additional</TabsTrigger>
          </TabsList>

          {/* Personal Information Tab */}
          <TabsContent value="personal">
            <Card>
              <CardHeader>
                <CardTitle>Informasi Pribadi</CardTitle>
                <CardDescription>Masukkan detail pribadi guru.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex flex-col items-center mb-6">
                  <Avatar className="w-24 h-24">
                    <AvatarImage src="/placeholder.svg?height=96&width=96" alt="Profile picture" />
                    <AvatarFallback>TP</AvatarFallback>
                  </Avatar>
                  <Button variant="outline" className="mt-2" type="button">
                    Unggah Foto
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="fullName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nama Lengkap</FormLabel>
                        <FormControl>
                          <Input placeholder="John Doe" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="john.doe@example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nomor Telepon</FormLabel>
                        <FormControl>
                          <Input placeholder="+62 812 3456 7890" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="dateOfBirth"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Tanggal Lahir</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={`w-full pl-3 text-left font-normal ${!field.value && "text-muted-foreground"}`}
                                type="button"
                              >
                                {field.value ? format(field.value, "PPP") : <span>Pilih tanggal</span>}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={(date) => date > new Date() || date < new Date("1940-01-01")}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="gender"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Jenis Kelamin</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select gender" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="male">Laki-laki</SelectItem>
                            <SelectItem value="female">Perempuan</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem className="md:col-span-2">
                        <FormLabel>Alamat</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Masukkan alamat lengkap" className="resize-none" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-end mt-4">
              <Button type="button" onClick={() => setActiveTab("professional")}>
                Selanjutnya: Informasi Profesional
              </Button>
            </div>
          </TabsContent>

          {/* Professional Information Tab */}
          <TabsContent value="professional">
            <Card>
              <CardHeader>
                <CardTitle>Informasi Profesional</CardTitle>
                <CardDescription>Masukkan detail profesional guru.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="nip"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>NIP (Optional)</FormLabel>
                        <FormControl>
                          <Input placeholder="198501252010121001" {...field} />
                        </FormControl>
                        <FormDescription>Nomor Instruktur Nasional (jika berlaku)</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="employeeId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>ID Karyawan</FormLabel>
                        <FormControl>
                          <Input placeholder="EMP-12345" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="position"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Jabatan</FormLabel>
                        <FormControl>
                          <Input placeholder="Guru Matematika" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="subjects"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Mata Pelajaran</FormLabel>
                        <FormControl>
                          <Input placeholder="Matematika, Fisika" {...field} />
                        </FormControl>
                        <FormDescription>Pisahkan mata pelajaran dengan koma</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="education"
                    render={({ field }) => (
                      <FormItem className="md:col-span-2">
                        <FormLabel>Pendidikan</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Sarjana Pendidikan, Universitas Indonesia, 2010"
                            className="resize-none"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="experience"
                    render={({ field }) => (
                      <FormItem className="md:col-span-2">
                        <FormLabel>Pengalaman (Opsional)</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="10 tahun pengalaman mengajar di SMA Negeri 1 Jakarta"
                            className="resize-none"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-between mt-4">
              <Button type="button" variant="outline" onClick={() => setActiveTab("personal")}>
                Sebelumnya: Informasi Pribadi
              </Button>
              <Button type="button" onClick={() => setActiveTab("school")}>
                Selanjutnya: Informasi Sekolah
              </Button>
            </div>
          </TabsContent>

          {/* School Information Tab */}
          <TabsContent value="school">
            <Card>
              <CardHeader>
                <CardTitle>Informasi Sekolah</CardTitle>
                <CardDescription>Masukkan detail sekolah guru.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="schoolName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nama Sekolah</FormLabel>
                        <FormControl>
                          <Input placeholder="SMA Negeri 1 Jakarta" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="schoolType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Jenis Sekolah</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select school type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="SD">Sekolah Dasar (SD)</SelectItem>
                            <SelectItem value="SMP">Sekolah Menengah Pertama (SMP)</SelectItem>
                            <SelectItem value="SMA">Sekolah Menengah Atas (SMA)</SelectItem>
                            <SelectItem value="SMK">Sekolah Menengah Kejuruan (SMK)</SelectItem>
                            <SelectItem value="Other">Lainnya</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="schoolAddress"
                    render={({ field }) => (
                      <FormItem className="md:col-span-2">
                        <FormLabel>Alamat Sekolah</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Masukkan alamat sekolah" className="resize-none" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-between mt-4">
              <Button type="button" variant="outline" onClick={() => setActiveTab("professional")}>
                Sebelumnya: Informasi Profesional
              </Button>
              <Button type="button" onClick={() => setActiveTab("account")}>
                Selanjutnya: Pengaturan Akun
              </Button>
            </div>
          </TabsContent>

          {/* Account Settings Tab */}
          <TabsContent value="account">
            <Card>
              <CardHeader>
                <CardTitle>Pengaturan Akun</CardTitle>
                <CardDescription>Atur detail akun guru.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nama Pengguna</FormLabel>
                        <FormControl>
                          <Input placeholder="johndoe" {...field} />
                        </FormControl>
                        <FormDescription>Ini akan digunakan untuk login</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Kata Sandi</FormLabel>
                        <FormControl>
                          <Input type="password" placeholder="••••••••" {...field} />
                        </FormControl>
                        <FormDescription>Minimal 8 karakter</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="initialQuota"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Kuota Dokumen Awal</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="10"
                            {...field}
                            onChange={(e) => field.onChange(Number.parseInt(e.target.value) || 0)}
                          />
                        </FormControl>
                        <FormDescription>Jumlah dokumen yang dapat dihasilkan guru</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="accountStatus"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Status Akun</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="active">Aktif</SelectItem>
                            <SelectItem value="pending">Tertunda</SelectItem>
                            <SelectItem value="inactive">Tidak Aktif</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-between mt-4">
              <Button type="button" variant="outline" onClick={() => setActiveTab("school")}>
                Sebelumnya: Informasi Sekolah
              </Button>
              <Button type="button" onClick={() => setActiveTab("additional")}>
                Selanjutnya: Informasi Tambahan
              </Button>
            </div>
          </TabsContent>

          {/* Additional Information Tab */}
          <TabsContent value="additional">
            <Card>
              <CardHeader>
                <CardTitle>Informasi Tambahan</CardTitle>
                <CardDescription>Detail tambahan tentang guru.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 gap-4">
                  <FormField
                    control={form.control}
                    name="bio"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Biografi (Opsional)</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Biografi singkat guru" className="resize-none" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="certifications"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Sertifikasi (Opsional)</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Daftar sertifikasi" className="resize-none" {...field} />
                        </FormControl>
                        <FormDescription>Pisahkan sertifikasi dengan koma</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="specializations"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Spesialisasi (Opsional)</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Bidang spesialisasi" className="resize-none" {...field} />
                        </FormControl>
                        <FormDescription>Pisahkan spesialisasi dengan koma</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="agreeToTerms"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                        <FormControl>
                          <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>Syarat dan Ketentuan</FormLabel>
                          <FormDescription>
                            Dengan memeriksa kotak ini, Anda menyetujui bahwa semua informasi yang diberikan akurat dan
                            Anda memiliki izin untuk membuat akun ini.
                          </FormDescription>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-between mt-4">
              <Button type="button" variant="outline" onClick={() => setActiveTab("account")}>
                Sebelumnya: Pengaturan Akun
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Buat Akun Guru
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </form>
    </Form>
  )
}

