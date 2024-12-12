import Header from "@/components/Header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, ClipboardList, Edit, Trash2 } from 'lucide-react'
import React from 'react'

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-primary to-primary-foreground text-white py-12 md:py-20 px-4">
          <div className="container mx-auto text-center">
            <h1 className="text-2xl md:text-4xl font-bold mb-4">
              Streamline Your Medical Practice
            </h1>
            <p className="text-sm md:text-lg max-w-2xl mx-auto text-white/80">
              Manage appointments, patient records, and practice operations with ease
            </p>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-12 md:py-20 px-4 md:px-[100px]">
          <div className="container mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 md:mb-12">
              Powerful Tools for Medical Professionals
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              <FeatureCard
                icon={<Calendar className="h-8 md:h-10 w-8 md:w-10 text-primary" />}
                title="Appointment Viewing"
                description="Easily view and manage your daily, weekly, or monthly appointment schedule"
              />
              <FeatureCard
                icon={<ClipboardList className="h-8 md:h-10 w-8 md:w-10 text-primary" />}
                title="Patient Records"
                description="Access and update patient information securely within the platform"
              />
              <FeatureCard
                icon={<Edit className="h-8 md:h-10 w-8 md:w-10 text-primary" />}
                title="Edit Appointments"
                description="Modify appointment details, reschedule, or add notes as needed"
              />
              <FeatureCard
                icon={<Trash2 className="h-8 md:h-10 w-8 md:w-10 text-primary" />}
                title="Delete"
                description="Easily remove appointments from the system when necessary"
              />
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-muted py-6">
        <div className="container mx-auto text-center text-muted-foreground px-4">
          &copy; {new Date().getFullYear()} Medical Appointment Management Portal. All rights reserved.
        </div>
      </footer>
    </div>
  )
}

function FeatureCard({ icon, title, description }: { 
  icon: React.ReactNode, 
  title: string, 
  description: string 
}) {
  return (
    <Card className="hover:shadow-lg transition-shadow duration-300">
      <CardHeader>
        <CardTitle className="flex items-center gap-4">
          {icon}
          <span className="text-lg">{title}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  )
}