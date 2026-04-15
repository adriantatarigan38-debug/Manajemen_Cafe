"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import Compressor from "compressorjs";
import { Card, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";

export function FileUploadCard() {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [fileName, setFileName] = useState("Belum ada file dipilih");
  const [compressedSize, setCompressedSize] = useState<string | null>(null);

  const handleImageChange = (file?: File) => {
    if (!file) return;

    setFileName(file.name);
    if (file.type.startsWith("image/")) {
      new Compressor(file, {
        quality: 0.7,
        success(result) {
          setCompressedSize(`${(result.size / 1024).toFixed(1)} KB`);
        },
        error() {
          setCompressedSize("Gagal kompres");
        },
      });
      return;
    }

    setCompressedSize(`${(file.size / 1024).toFixed(1)} KB`);
  };

  return (
    <Card className="border-2 border-[#7AA8C7]/30 bg-gradient-to-br from-[#7AA8C7]/10 to-white/5">
      <CardHeader
        title="Upload Dokumen Cafe"
        description="Shortcut cepat untuk NIB, NPWP, logo, banner, atau dokumen legal cafe."
      />
      <div className="glass-muted rounded-[28px] border-2 border-dashed border-[#7AA8C7]/30 p-6 text-center transition hover:border-[#7AA8C7]/50 hover:bg-[#7AA8C7]/5">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#7AA8C7]/30 to-[#7AA8C7]/10 shadow-sm">
          <Icon name="upload" className="h-6 w-6 text-[#7AA8C7]" />
        </div>
        <p className="font-bold">{fileName}</p>
        <p className="mt-2 text-sm font-medium text-soft-slate">
          {compressedSize ? `Ukuran file: ${compressedSize}` : "Drag & drop atau pilih file secara manual."}
        </p>
        <input
          ref={inputRef}
          type="file"
          className="hidden"
          accept="image/*,.pdf"
          onChange={(event) => handleImageChange(event.target.files?.[0])}
        />
        <div className="mt-5 flex flex-wrap justify-center gap-3">
          <Button variant="glass" onClick={() => inputRef.current?.click()}>
            Pilih Dokumen
          </Button>
          <Link href="/identitas">
            <Button>Kelola Identitas</Button>
          </Link>
        </div>
      </div>
    </Card>
  );
}
