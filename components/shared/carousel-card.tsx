"use client";

import Image from "next/image";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Card, CardHeader } from "@/components/ui/card";

const slides = [
  "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1445116572660-236099ec97a0?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1521017432531-fbd92d768814?auto=format&fit=crop&w=1200&q=80",
];

export function CarouselCard() {
  return (
    <Card className="border-2 border-[#D4B483]/30 bg-gradient-to-br from-[#D4B483]/10 to-white/5">
      <CardHeader
        title="Carousel Promo Event"
        description="Slot visual untuk menu spesial harian atau campaign event cafe."
      />
      <div className="overflow-hidden rounded-[28px] shadow-md">
        <Carousel showThumbs={false} showStatus={false} infiniteLoop autoPlay interval={5000}>
          {slides.map((src) => (
            <div key={src}>
              <Image
                src={src}
                alt="Promo cafe"
                width={1200}
                height={700}
                className="h-[260px] w-full object-cover"
              />
            </div>
          ))}
        </Carousel>
      </div>
    </Card>
  );
}
