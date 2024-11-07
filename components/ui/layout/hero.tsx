import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { BsDoorOpenFill } from "react-icons/bs"

export default function Hero() {
  return (
    <div className="w-full mt-[3rem] py-12 sm:py-16 md:py-20 lg:py-24 xl:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 sm:gap-8 items-center">
          <div className="flex gap-4 flex-col max-w-xl sm:max-w-2xl w-full items-start"> {/* Changed to items-start */}
            <div className="flex gap-3 sm:gap-4 flex-col items-start"> {/* Changed to items-start */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tighter font-semibold">
                Logging made <br/> perfect.
              </h1>
              <p className="text-lg sm:text-xl leading-relaxed tracking-tight text-muted-foreground">
                Easily integrate dorr and start today.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 mt-3"> {/* Removed justify-center */}
              <Button className="gap-2 w-full sm:w-auto max-w-xs">
                Get started <ArrowRight className="inline-block" size={18} />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}