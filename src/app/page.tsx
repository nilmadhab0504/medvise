import Header from "@/components/Header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, ClipboardList, Edit, Trash2 } from 'lucide-react'

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <section className="bg-gradient-to-r from-primary to-primary-foreground text-white py-20">
        <h1 className="text-4xl font-bold mb-4 text-center">Streamline Your Medical Practice</h1>
        
        </section>

        <section className="py-20 px-[100px]">
            <h2 className="text-3xl font-bold text-center mb-12">Powerful Tools for Medical Professionals</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <FeatureCard
                icon={<Calendar className="h-10 w-10 text-primary" />}
                title="Appointment Viewing"
                description="Easily view and manage your daily, weekly, or monthly appointment schedule"
              />
              <FeatureCard
                icon={<ClipboardList className="h-10 w-10 text-primary" />}
                title="Patient Records"
                description="Access and update patient information securely within the platform"
              />
              <FeatureCard
                icon={<Edit className="h-10 w-10 text-primary" />}
                title="Edit Appointments"
                description="Modify appointment details, reschedule, or add notes as needed"
              />
              <FeatureCard
                icon={<Trash2 className="h-10 w-10 text-primary" />}
                title="Delete"
                description="Easily remove appointments from the system when necessary"
              />
            </div>
          
        </section>
      </main>
      <footer className="bg-muted py-6">
        <div className="container mx-auto text-center text-muted-foreground">
          &copy; Medical Appointment Management Portal. All rights reserved.
        </div>
      </footer>
    </div>
  )
}

function FeatureCard({ icon, title, description }:any) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-4">
          {icon}
          <span>{title}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p>{description}</p>
      </CardContent>
    </Card>
  )
}


