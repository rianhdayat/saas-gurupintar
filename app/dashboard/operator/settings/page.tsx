"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SubscriptionManager } from "@/components/operators/SubscriptionManager"

export default function SettingsPage() {
  // In a real app, you would get the operator ID from authentication context
  const operatorId = "operator1" // Default to operator1 for demo

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Pengaturan</h1>

      <Tabs defaultValue="account">
        <TabsList className="mb-8">
          <TabsTrigger value="account">Akun</TabsTrigger>
          <TabsTrigger value="subscription">Langganan</TabsTrigger>
          <TabsTrigger value="notifications">Notifikasi</TabsTrigger>
          <TabsTrigger value="security">Keamanan</TabsTrigger>
        </TabsList>

        <TabsContent value="account">
          <Card>
            <CardHeader>
              <CardTitle>Pengaturan Akun</CardTitle>
              <CardDescription>Mengatur detail dan preferensi akun Anda</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Isi pengaturan akun akan di sini.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="subscription">
          <SubscriptionManager userId={operatorId} />
        </TabsContent>

        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Pengaturan Notifikasi</CardTitle>
              <CardDescription>Mengatur preferensi notifikasi Anda</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Isi pengaturan notifikasi akan di sini.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Pengaturan Keamanan</CardTitle>
              <CardDescription>Mengatur preferensi keamanan Anda</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Isi pengaturan keamanan akan di sini.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

