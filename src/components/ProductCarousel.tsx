import * as React from "react"
import AutoScroll from "embla-carousel-auto-scroll"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  CarouselApi,
} from "@/components/ui/carousel"
import { InteractiveProductCard } from "./ui/card-7"

interface Product {
  title: string;
  description: string;
  price: string;
  imageUrl: string;
  logoUrl: string;
}

interface ProductCarouselProps {
  products: Product[];
}

export function ProductCarousel({ products }: ProductCarouselProps) {
  const [api, setApi] = React.useState<CarouselApi>()
  const plugin = React.useRef(
    AutoScroll({ speed: 1, stopOnInteraction: false })
  )

  const onMouseEnter = React.useCallback(() => {
    const autoScroll = api?.plugins()?.autoScroll
    if (!autoScroll) return
    autoScroll.stop()
  }, [api])

  const onMouseLeave = React.useCallback(() => {
    const autoScroll = api?.plugins()?.autoScroll
    if (!autoScroll) return
    autoScroll.play()
  }, [api])

  return (
    <div 
      className="relative w-full max-w-[90vw] mx-auto px-12"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <Carousel
        setApi={setApi}
        opts={{
          align: "start",
          loop: true,
        }}
        plugins={[plugin.current]}
        className="w-full"
      >
        <CarouselContent className="-ml-4">
          {products.map((product, index) => (
            <CarouselItem key={index} className="pl-4 md:basis-1/2 lg:basis-1/4">
              <div className="p-1">
                <InteractiveProductCard {...product} className="w-full" />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>

    </div>
  )
}
