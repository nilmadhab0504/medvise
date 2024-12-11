'use client'

import { useSession, signOut} from "next-auth/react"
import { LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

const Header = () => {
  const { data: session } = useSession()
  const Router = useRouter();
  return (
    <header className="py-4 px-[100px] bg-background border-b">
      <div className="flex justify-between items-center mx-auto">
      <h1 className="text-2xl font-bold">Medical Appointment Management Portal</h1>
        {session?.user ? (
            <div className="flex gap-4">
            {session.user.role == "admin" && <Button
             
             onClick={() => {Router.push("/addmember")}}

             className="flex items-center space-x-2"
           >
             <span>Add User</span>
           </Button>}

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
          onClick={() => {Router.push("/login")}}
          className="flex items-center space-x-2" >
          <span>Login</span>
          </Button>
        )}
      </div>
    </header>
  )
}

export default Header
