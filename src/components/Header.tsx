'use client'

import { useSession, signOut } from "next-auth/react"
import { LogOut, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { useState } from "react"

const Header = () => {
  const { data: session } = useSession()
  const Router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="py-4 px-4 md:px-[100px] bg-background border-b relative">
      <div className="flex justify-between items-center mx-auto max-w-7xl">
       <h1 className="text-xl md:text-2xl font-bold truncate">
          Appointment Management Portal
        </h1>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-4">
          {session?.user ? (
            <div className="flex gap-4">
              {session.user.role === "admin" && (
                <Button
                  onClick={() => Router.push("/addmember")}
                  className="flex items-center space-x-2"
                >
                  <span>Add User</span>
                </Button>
              )}
              <Button
                variant="destructive"
                onClick={() => signOut()}
                className="flex items-center space-x-2"
              >
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </Button>
            </div>
          ) : (
            <Button
              onClick={() => Router.push("/login")}
              className="flex items-center space-x-2"
            >
              <span>Login</span>
            </Button>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <Menu className="h-6 w-6" />
          </Button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-background border-b md:hidden">
            <div className="flex flex-col items-center space-y-4 py-4">
              {session?.user ? (
                <>
                  {session.user.role === "admin" && (
                    <Button
                      onClick={() => {
                        Router.push("/addmember");
                        setMobileMenuOpen(false);
                      }}
                      className="w-full max-w-xs"
                    >
                      Add User
                    </Button>
                  )}
                  <Button
                    variant="destructive"
                    onClick={() => signOut()}
                    className="w-full max-w-xs flex items-center space-x-2"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Logout</span>
                  </Button>
                </>
              ) : (
                <Button
                  onClick={() => {
                    Router.push("/login");
                    setMobileMenuOpen(false);
                  }}
                  className="w-full max-w-xs"
                >
                  Login
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header