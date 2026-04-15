"use client";

import { useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardHeader } from "@/components/ui/card";
import { Input, TextArea } from "@/components/ui/input";

const tabs = ["Data Staff", "Absensi", "Cuti", "Penggajian", "Rekrutmen", "Bonus", "Penilaian"] as const;

const staffData = [
  { name: "Raka", role: "Head Barista", status: "On Duty", shift: "Pagi", score: 4.9 },
  { name: "Lina", role: "Pramusaji Senior", status: "Break", shift: "Siang", score: 4.8 },
  { name: "Bima", role: "Kitchen Crew", status: "On Duty", shift: "Pagi", score: 4.7 },
];

const leaveRequests = [
  { name: "Lina", type: "Cuti Tahunan", days: 2, status: "Menunggu" },
  { name: "Dewi", type: "Izin", days: 1, status: "Disetujui" },
];

const recruitments = [
  { name: "Nadya Putri", role: "Cashier", stage: "Interview" },
  { name: "Fahmi Akbar", role: "Barista", stage: "Trial Shift" },
];

export function StaffHRHub({ query = "" }: { query?: string }) {
  const [activeTab, setActiveTab] = useState<(typeof tabs)[number]>("Data Staff");
  const [selectedName, setSelectedName] = useState(staffData[0].name);
  const [monthlyBonus, setMonthlyBonus] = useState(650000);
  const [note, setNote] = useState("Evaluasi layanan ramah dan kecepatan saji stabil.");

  const visibleStaff = useMemo(() => {
    const normalized = query.toLowerCase().trim();
    if (!normalized) return staffData;
    return staffData.filter((staff) =>
      [staff.name, staff.role, staff.status, staff.shift, staff.score].some((value) =>
        String(value).toLowerCase().includes(normalized),
      ),
    );
  }, [query]);

  const selectedStaff = useMemo(() => {
    return visibleStaff.find((staff) => staff.name === selectedName) ?? visibleStaff[0] ?? staffData[0];
  }, [selectedName, visibleStaff]);

  return (
    <Card>
      <CardHeader
        title="Staff & HR Center"
        description={`Menampilkan ${visibleStaff.length} staff yang sesuai pencarian.`}
      />

      <div className="flex flex-wrap gap-2">
        {tabs.map((tab) => (
          <Button key={tab} variant={activeTab === tab ? "primary" : "glass"} onClick={() => setActiveTab(tab)}>
            {tab}
          </Button>
        ))}
      </div>

      <div className="mt-5 grid gap-4 xl:grid-cols-[0.92fr_1.08fr]">
        <div className="space-y-3">
          {visibleStaff.length > 0 ? visibleStaff.map((staff) => (
            <button
              key={staff.name}
              type="button"
              onClick={() => setSelectedName(staff.name)}
              className={`glass-muted w-full rounded-[24px] p-4 text-left transition ${selectedStaff?.name === staff.name ? "ring-2 ring-soft-blue/30" : "hover:bg-white/20"}`}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-semibold">{staff.name}</p>
                  <p className="mt-1 text-sm text-soft-slate">{staff.role} - Shift {staff.shift}</p>
                </div>
                <Badge>{staff.status}</Badge>
              </div>
              <p className="mt-3 text-sm text-soft-slate">Skor layanan {staff.score}</p>
            </button>
          )) : <div className="rounded-[24px] bg-white/20 p-6 text-sm text-soft-slate">Tidak ada staff yang cocok.</div>}
        </div>

        <div className="glass-muted rounded-[28px] p-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm uppercase tracking-[0.18em] text-soft-slate">{activeTab}</p>
              <h3 className="mt-2 text-xl font-semibold">{selectedStaff.name}</h3>
              <p className="mt-1 text-sm text-soft-slate">{selectedStaff.role}</p>
            </div>
            <Badge className="bg-soft-mint/80">Skor {selectedStaff.score}</Badge>
          </div>

          {activeTab === "Data Staff" ? (
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <Input value={selectedStaff.name} readOnly />
              <Input value={selectedStaff.role} readOnly />
              <Input value={`Shift ${selectedStaff.shift}`} readOnly />
              <Input value={selectedStaff.status} readOnly />
            </div>
          ) : null}

          {activeTab === "Absensi" ? (
            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              {[{ label: "Hadir Bulan Ini", value: "22 Hari" }, { label: "Terlambat", value: "1 Kali" }, { label: "Overtime", value: "6 Jam" }].map((item) => (
                <div key={item.label} className="rounded-[22px] bg-white/25 p-4">
                  <p className="text-sm text-soft-slate">{item.label}</p>
                  <p className="mt-2 text-2xl font-semibold">{item.value}</p>
                </div>
              ))}
            </div>
          ) : null}

          {activeTab === "Cuti" ? (
            <div className="mt-5 space-y-3">
              {leaveRequests.map((leave) => (
                <div key={`${leave.name}-${leave.type}`} className="rounded-[22px] bg-white/25 p-4">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="font-semibold">{leave.name}</p>
                      <p className="text-sm text-soft-slate">{leave.type} - {leave.days} hari</p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="glass">Tolak</Button>
                      <Button>Setujui</Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : null}

          {activeTab === "Penggajian" ? (
            <div className="mt-5 space-y-4">
              <Input value="Gaji Pokok Rp 4.500.000" readOnly />
              <Input value={`Bonus Bulanan Rp ${monthlyBonus.toLocaleString("id-ID")}`} readOnly />
              <div className="flex gap-2">
                <Button variant="glass" onClick={() => setMonthlyBonus((prev) => Math.max(0, prev - 50000))}>- 50rb</Button>
                <Button onClick={() => setMonthlyBonus((prev) => prev + 50000)}>+ 50rb</Button>
              </div>
            </div>
          ) : null}

          {activeTab === "Rekrutmen" ? (
            <div className="mt-5 space-y-3">
              {recruitments.map((candidate) => (
                <div key={candidate.name} className="rounded-[22px] bg-white/25 p-4">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="font-semibold">{candidate.name}</p>
                      <p className="text-sm text-soft-slate">{candidate.role}</p>
                    </div>
                    <Badge>{candidate.stage}</Badge>
                  </div>
                </div>
              ))}
            </div>
          ) : null}

          {activeTab === "Bonus" ? (
            <div className="mt-5 rounded-[22px] bg-white/25 p-4">
              <p className="text-sm text-soft-slate">Bonus Terpilih</p>
              <p className="mt-2 text-3xl font-semibold">Rp {monthlyBonus.toLocaleString("id-ID")}</p>
              <p className="mt-2 text-sm text-soft-slate">Naikkan atau turunkan bonus berdasarkan performa bulanan.</p>
            </div>
          ) : null}

          {activeTab === "Penilaian" ? (
            <div className="mt-5 space-y-4">
              <Input value={`Rating pelanggan ${selectedStaff.score} / 5`} readOnly />
              <TextArea value={note} onChange={(event) => setNote(event.target.value)} />
              <Button>Simpan Evaluasi</Button>
            </div>
          ) : null}
        </div>
      </div>
    </Card>
  );
}
