"use client";

import Image from "next/image";
import { useMemo, useRef, useState } from "react";
import Compressor from "compressorjs";
import { Button } from "@/components/ui/button";
import { Card, CardHeader } from "@/components/ui/card";
import { Input, TextArea } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { includesQuery } from "@/lib/utils";

type DocumentItem = {
  id: string;
  label: string;
  fileName: string;
  status: "Lengkap" | "Menunggu Upload" | "Perlu Update";
  note: string;
  size: string;
  previewUrl?: string;
};

const initialDocuments: DocumentItem[] = [
  {
    id: "nib",
    label: "Nomor Induk Berusaha (NIB)",
    fileName: "nib-cafe28-2026.pdf",
    status: "Lengkap",
    note: "Dokumen legal utama usaha cafe.",
    size: "284 KB",
  },
  {
    id: "npwp",
    label: "NPWP Badan Usaha",
    fileName: "npwp-cafe28.pdf",
    status: "Lengkap",
    note: "Terdaftar atas nama PT Cafe 28 Nusantara.",
    size: "196 KB",
  },
  {
    id: "logo",
    label: "Logo Cafe",
    fileName: "Belum ada file",
    status: "Menunggu Upload",
    note: "Gunakan PNG transparan untuk header dan invoice.",
    size: "-",
  },
  {
    id: "banner",
    label: "Banner / Hero Cafe",
    fileName: "Belum ada file",
    status: "Perlu Update",
    note: "Disarankan rasio 16:9 untuk dashboard dan promo.",
    size: "-",
  },
];

export function CafeIdentityManager({ query = "" }: { query?: string }) {
  const [profile, setProfile] = useState({
    name: "Cafe 28",
    owner: "PT Cafe 28 Nusantara",
    email: "halo@cafe28.id",
    phone: "+62 812-3456-7890",
    city: "Bandung",
    address: "Jl. Braga Tenang No. 18, Bandung",
    hours: "08.00 - 23.00 WIB",
    description: "Cafe modern dengan specialty coffee, pastry artisan, dan suasana hangat untuk kerja maupun quality time.",
    instagram: "@cafe28.id",
    maps: "https://maps.app.goo.gl/cafe28-demo",
  });
  const [documents, setDocuments] = useState(initialDocuments);
  const [selectedId, setSelectedId] = useState(initialDocuments[0].id);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const filteredDocuments = useMemo(() => {
    return documents.filter((doc) => includesQuery([doc.label, doc.fileName, doc.status, doc.note], query));
  }, [documents, query]);

  const selectedDocument = filteredDocuments.find((doc) => doc.id === selectedId) ?? filteredDocuments[0] ?? documents[0];

  const updateProfile = (key: keyof typeof profile, value: string) => {
    setProfile((current) => ({ ...current, [key]: value }));
  };

  const openUpload = () => {
    fileInputRef.current?.click();
  };

  const handleUpload = (file?: File) => {
    if (!file || !selectedDocument) return;

    // Create preview URL for images
    let previewUrl: string | undefined = undefined;
    if (file.type.startsWith("image/")) {
      previewUrl = URL.createObjectURL(file);
    }

    const applyFile = (sizeLabel: string) => {
      setDocuments((current) =>
        current.map((doc) =>
          doc.id === selectedDocument.id
            ? { 
                ...doc, 
                fileName: file.name, 
                size: sizeLabel, 
                status: "Lengkap", 
                note: "File berhasil diperbarui dari dashboard identitas cafe.",
                previewUrl: previewUrl 
              }
            : doc,
        ),
      );
    };

    if (file.type.startsWith("image/")) {
      new Compressor(file, {
        quality: 0.72,
        success(result) {
          applyFile(`${(result.size / 1024).toFixed(1)} KB`);
        },
        error() {
          applyFile(`${(file.size / 1024).toFixed(1)} KB`);
        },
      });
      return;
    }

    applyFile(`${(file.size / 1024).toFixed(1)} KB`);
  };

  return (
    <div className="space-y-6">
      <section className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        <Card>
          <CardHeader
            title="Profil Cafe"
            description="Lengkapi identitas utama cafe untuk dashboard, invoice, dan kebutuhan legal."
            action={<Badge>{profile.city}</Badge>}
          />
          <div className="grid gap-4 md:grid-cols-2">
            <Input value={profile.name} onChange={(event) => updateProfile("name", event.target.value)} placeholder="Nama Cafe" />
            <Input value={profile.owner} onChange={(event) => updateProfile("owner", event.target.value)} placeholder="Nama Badan Usaha" />
            <Input value={profile.email} onChange={(event) => updateProfile("email", event.target.value)} placeholder="Email Resmi" />
            <Input value={profile.phone} onChange={(event) => updateProfile("phone", event.target.value)} placeholder="Nomor Telepon" />
            <Input value={profile.city} onChange={(event) => updateProfile("city", event.target.value)} placeholder="Kota" />
            <Input value={profile.hours} onChange={(event) => updateProfile("hours", event.target.value)} placeholder="Jam Operasional" />
          </div>
          <div className="mt-4 grid gap-4">
            <Input value={profile.address} onChange={(event) => updateProfile("address", event.target.value)} placeholder="Alamat Lengkap" />
            <Input value={profile.instagram} onChange={(event) => updateProfile("instagram", event.target.value)} placeholder="Instagram" />
            <Input value={profile.maps} onChange={(event) => updateProfile("maps", event.target.value)} placeholder="Link Google Maps" />
            <TextArea value={profile.description} onChange={(event) => updateProfile("description", event.target.value)} placeholder="Deskripsi Cafe" />
          </div>
        </Card>

        <Card>
          <CardHeader
            title="Preview Identitas"
            description="Ringkasan identitas yang bisa dipakai untuk invoice, profil usaha, dan halaman publik."
          />
          <div className="glass-muted rounded-[28px] p-5">
            <div className="rounded-[24px] bg-gradient-to-br from-soft-sky/70 via-white/60 to-soft-mint/60 p-5 shadow-soft">
              <p className="text-sm uppercase tracking-[0.18em] text-soft-slate">Cafe Profile</p>
              <h3 className="mt-3 text-2xl font-semibold">{profile.name}</h3>
              <p className="mt-2 text-sm text-soft-slate">{profile.description}</p>
              <div className="mt-5 space-y-2 text-sm text-soft-foreground">
                <p><span className="font-semibold">Badan Usaha:</span> {profile.owner}</p>
                <p><span className="font-semibold">Kontak:</span> {profile.email} | {profile.phone}</p>
                <p><span className="font-semibold">Alamat:</span> {profile.address}</p>
                <p><span className="font-semibold">Operasional:</span> {profile.hours}</p>
                <p><span className="font-semibold">Instagram:</span> {profile.instagram}</p>
              </div>
            </div>
          </div>
        </Card>
      </section>

      <section className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
        <Card>
          <CardHeader
            title="Dokumen Identitas"
            description={`Menampilkan ${filteredDocuments.length} dokumen yang sesuai pencarian.`}
            action={<Button variant="glass" onClick={openUpload}>Upload File</Button>}
          />
          <input
            ref={fileInputRef}
            type="file"
            className="hidden"
            accept="image/*,.pdf"
            onChange={(event) => handleUpload(event.target.files?.[0])}
          />
          <div className="space-y-3">
            {filteredDocuments.length > 0 ? filteredDocuments.map((doc) => (
              <button
                key={doc.id}
                type="button"
                onClick={() => setSelectedId(doc.id)}
                className={`glass-muted flex w-full items-start justify-between gap-4 rounded-[24px] p-4 text-left transition ${selectedDocument?.id === doc.id ? "ring-2 ring-soft-blue/30" : "hover:bg-white/20"}`}
              >
                <div>
                  <p className="font-semibold">{doc.label}</p>
                  <p className="mt-1 text-sm text-soft-slate">{doc.fileName}</p>
                  <p className="mt-2 text-xs uppercase tracking-[0.16em] text-soft-slate">{doc.size}</p>
                </div>
                <Badge className={doc.status === "Lengkap" ? "bg-soft-mint/80" : doc.status === "Perlu Update" ? "bg-soft-peach/70" : "bg-white/30"}>
                  {doc.status}
                </Badge>
              </button>
            )) : <div className="rounded-[24px] bg-white/20 p-6 text-sm text-soft-slate">Tidak ada dokumen yang cocok.</div>}
          </div>
        </Card>

        <Card>
          <CardHeader
            title="Detail Dokumen"
            description="Lihat status, catatan, dan lakukan pembaruan file dokumen identitas cafe."
          />
          <div className="glass-muted rounded-[28px] p-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm uppercase tracking-[0.18em] text-soft-slate">Dokumen Terpilih</p>
                <h3 className="mt-2 text-xl font-semibold">{selectedDocument.label}</h3>
                <p className="mt-1 text-sm text-soft-slate">{selectedDocument.fileName}</p>
              </div>
              <Badge className={selectedDocument.status === "Lengkap" ? "bg-soft-mint/80" : selectedDocument.status === "Perlu Update" ? "bg-soft-peach/70" : "bg-white/30"}>
                {selectedDocument.status}
              </Badge>
            </div>

            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <div className="rounded-[22px] bg-white/25 p-4">
                <p className="text-sm text-soft-slate">Ukuran File</p>
                <p className="mt-2 text-xl font-semibold">{selectedDocument.size}</p>
              </div>
              <div className="rounded-[22px] bg-white/25 p-4">
                <p className="text-sm text-soft-slate">Kelayakan</p>
                <p className="mt-2 text-xl font-semibold">{selectedDocument.status === "Lengkap" ? "Siap Digunakan" : "Perlu Tinjau"}</p>
              </div>
            </div>

            <div className="mt-5 rounded-[22px] bg-white/25 p-4">
              <p className="text-sm font-semibold">Catatan Dokumen</p>
              <p className="mt-2 text-sm leading-7 text-soft-slate">{selectedDocument.note}</p>
            </div>

            {selectedDocument.previewUrl && (selectedDocument.id === "logo" || selectedDocument.id === "banner") && (
              <div className="mt-5 rounded-[22px] bg-white/25 p-4">
                <p className="text-sm font-semibold mb-3">Preview Gambar</p>
                <div className="relative overflow-hidden rounded-2xl bg-white/40 p-4">
                  <Image
                    src={selectedDocument.previewUrl}
                    alt={selectedDocument.label}
                    width={selectedDocument.id === "logo" ? 256 : 1200}
                    height={selectedDocument.id === "logo" ? 256 : 675}
                    unoptimized
                    className={`mx-auto ${selectedDocument.id === "logo" ? "max-h-32 object-contain" : "max-h-48 w-full object-cover"}`}
                  />
                </div>
              </div>
            )}

            <div className="mt-5 flex flex-wrap gap-3">
              <Button onClick={openUpload}>Perbarui Dokumen</Button>
              <Button variant="glass">Preview Data</Button>
            </div>
          </div>
        </Card>
      </section>
    </div>
  );
}
