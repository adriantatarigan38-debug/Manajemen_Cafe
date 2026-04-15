"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardHeader } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input, TextArea } from "@/components/ui/input";
import { RadioGroup } from "@/components/ui/radio-group";

const menuFormSchema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  price: z.string().min(1),
  description: z.string().min(10),
});

type MenuFormValues = z.infer<typeof menuFormSchema>;

export function MenuForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<MenuFormValues>({
    resolver: zodResolver(menuFormSchema),
    defaultValues: {
      name: "Caramel Milk Brew",
      email: "manager@cafe28.id",
      price: "42000",
      description: "Minuman seasonal dengan sentuhan caramel ringan dan foam lembut.",
    },
  });

  return (
    <Card>
      <CardHeader
        title="Form Menu"
        description="Contoh integrasi React Hook Form untuk input frontend tanpa backend."
      />
      <form className="space-y-4" onSubmit={handleSubmit((values) => console.log(values))}>
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <Input placeholder="Nama menu" {...register("name")} />
            {errors.name ? <p className="mt-2 text-xs text-rose-500">Nama menu minimal 3 karakter.</p> : null}
          </div>
          <div>
            <Input type="email" placeholder="Email PIC" {...register("email")} />
            {errors.email ? <p className="mt-2 text-xs text-rose-500">Masukkan email yang valid.</p> : null}
          </div>
        </div>

        <Input type="number" placeholder="Harga" {...register("price")} />
        <TextArea placeholder="Deskripsi menu" {...register("description")} />

        <RadioGroup
          name="promo"
          defaultValue="special"
          options={[
            { label: "Menu Spesial", value: "special" },
            { label: "Diskon Mingguan", value: "discount" },
            { label: "Reguler", value: "regular" },
          ]}
        />

        <div className="flex flex-wrap gap-4">
          <Checkbox label="Tampilkan di homepage promo" defaultChecked />
          <Checkbox label="Aktifkan notifikasi stok menipis" />
        </div>

        <Button type="submit" className="w-full md:w-auto">
          Simpan Draft
        </Button>
      </form>
    </Card>
  );
}
