import * as React from "react"
import { Button } from "@/components/ui/button"
import { BsDoorOpenFill } from "react-icons/bs"
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa"

export default function Navbar() {
  return (
    <nav className="backdrop-filter backdrop-blur-lg bg-opacity-30 sticky top-0 z-50 border-b">
      <div className="flex h-16 items-center px-4">
        <div className="flex items-center space-x-2">
          <BsDoorOpenFill className="h-6 w-6" />
        </div>
        <div className="ml-auto flex items-center">
          <Button variant="ghost" className="p-2">
            <FaFacebookF className="h-5 w-5" />
          </Button>
          <Button variant="ghost" className="p-2">
            <FaTwitter className="h-5 w-5" />
          </Button>
          <Button variant="ghost" className="p-2">
            <FaInstagram className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </nav>
  )
}