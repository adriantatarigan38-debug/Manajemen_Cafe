"use client";

import Image from "next/image";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import { Card, CardHeader } from "@/components/ui/card";

export function ImageZoomCard() {
  return (
    <Card>
      <CardHeader
        title="Preview Interior Cafe"
        description="Contoh komponen zoom gambar untuk verifikasi aset visual cafe."
      />
      <Zoom>
        <Image
          src="https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1200&q=80"
          alt="Interior cafe"
          width={1200}
          height={900}
          className="h-[280px] w-full rounded-[28px] object-cover"
        />
      </Zoom>
    </Card>
  );
}
