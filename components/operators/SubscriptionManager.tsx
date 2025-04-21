"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { getSubscription, type Subscription } from "@/lib/subscriptionService"
import { CheckCircle } from "lucide-react"

interface SubscriptionManagerProps {
  userId: string
}

export function SubscriptionManager({ userId }: SubscriptionManagerProps) {
  const [subscription, setSubscription] = useState<Subscription | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Get subscription details
    const sub = getSubscription(userId)
    setSubscription(sub)
    setLoading(false)
  }, [userId])

  if (loading) {
    return <div>Loading subscription details...</div>
  }

  const plans = [
    {
      name: "Basic",
      price: "Rp 500.000",
      period: "per month",
      features: ["Basic reports", "Teacher management", "Payment processing"],
      recommended: false,
    },
    {
      name: "Premium",
      price: "Rp 1.200.000",
      period: "per month",
      features: ["Advanced reports", "Analytics dashboard", "Bulk operations", "Priority support"],
      recommended: true,
    },
  ]

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Pengelolaan Langganan</h2>

      {subscription ? (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Langganan Aktif</CardTitle>
            <CardDescription>Detail langganan Anda</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Plan</h3>
                <p className="text-lg font-semibold">{subscription.plan}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Status</h3>
                <Badge variant={subscription.status === "active" ? "default" : "secondary"}>
                  {subscription.status.charAt(0).toUpperCase() + subscription.status.slice(1)}
                </Badge>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Tanggal Mulai</h3>
                <p className="text-lg font-semibold">{new Date(subscription.startDate).toLocaleDateString()}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Tanggal Berakhir</h3>
                <p className="text-lg font-semibold">{new Date(subscription.endDate).toLocaleDateString()}</p>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="text-sm font-medium text-muted-foreground mb-2">Fitur</h3>
              <ul className="space-y-2">
                {subscription.features.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    <span>{feature.replace("_", " ").replace(/\b\w/g, (l) => l.toUpperCase())}</span>
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="mr-2">
              Kelola Langganan
            </Button>
            <Button variant="destructive">Batalkan Langganan</Button>
          </CardFooter>
        </Card>
      ) : (
        <Card className="mb-8 border-dashed border-2 border-muted">
          <CardHeader>
            <CardTitle>Tidak Ada Langganan Aktif</CardTitle>
            <CardDescription>Anda tidak memiliki langganan aktif</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Langganan ke sebuah paket untuk mengakses fitur premium seperti laporan yang lebih komprehensif dan analisis.
            </p>
          </CardContent>
          <CardFooter>
            <Button>Langganan Sekarang</Button>
          </CardFooter>
        </Card>
      )}

      <h2 className="text-2xl font-bold mb-4">Paket Tersedia</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {plans.map((plan, index) => (
          <Card key={index} className={plan.recommended ? "border-primary" : ""}>
            {plan.recommended && (
              <div className="bg-primary text-primary-foreground text-center py-1 text-sm font-medium">
                Rekomendasi
              </div>
            )}
            <CardHeader>
              <CardTitle>{plan.name}</CardTitle>
              <CardDescription>
                <span className="text-2xl font-bold">{plan.price}</span>
                <span className="text-muted-foreground"> {plan.period}</span>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button variant={plan.recommended ? "default" : "outline"} className="w-full">
                {subscription?.plan === plan.name ? "Current Plan" : "Subscribe"}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

