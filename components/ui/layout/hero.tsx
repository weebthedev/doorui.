import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { BsDoorOpenFill } from "react-icons/bs";


export default function Hero() {
  return (
    <div className="w-full mt-[3rem] py-12 sm:py-16 md:py-20 lg:py-24 xl:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 sm:gap-8 items-center"> {/* Changed to items-center */}
          <div className="flex gap-4 flex-col max-w-xl sm:max-w-2xl w-full items-center text-center"> {/* Added items-center and text-center */}
            <div>
              <BsDoorOpenFill className="w-10 h-10"/>
            </div>
            <div className="flex gap-3 sm:gap-4 flex-col items-center"> {/* Changed to items-center */}
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tighter font-semibold">
                DoorUI
              </h1>
              <p className="text-lg inline-center sm:text-xl leading-relaxed tracking-tight text-muted-foreground">
              A collection of custom made <br/> React components built on top of shadcn/ui
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 mt-3 justify-center"> {/* Added justify-center */}
              <Button className="gap-2 w-full sm:w-auto max-w-xs">
                Get started <ArrowRight className="inline-block" size={18} />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}