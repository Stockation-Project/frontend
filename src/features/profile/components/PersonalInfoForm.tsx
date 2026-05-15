import React, { useState } from "react";
import type { User } from "@/types/auth";
import type { ProfileUpdatePayload } from "../types/profile";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";

interface PersonalInfoFormProps {
  user: User;
  onUpdate: (payload: ProfileUpdatePayload) => Promise<any>;
  isLoading: boolean;
}

const PersonalInfoForm: React.FC<PersonalInfoFormProps> = ({ user, onUpdate, isLoading }) => {
  const [formData, setFormData] = useState<ProfileUpdatePayload>({
    first_name: user.first_name || "",
    last_name: user.last_name || "",
    dob: user.dob || "",
    gender: user.gender || "",
    place_of_birth: user.place_of_birth || "",
    occupation: user.occupation || "",
    address: user.address || "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onUpdate(formData);
  };

  const getInputClass = (value: any) => {
    const baseClass = "w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 transition-all font-medium text-slate-900";
    if (!value || value === "") {
      return `${baseClass} border-red-100 bg-red-50/30 focus:border-red-300 focus:ring-red-200`;
    }
    return `${baseClass} border-slate-200 bg-white focus:border-brand focus:ring-brand/20`;
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-4xl">
      <h3 className="text-lg font-bold text-slate-800 border-b border-slate-100 pb-2">
        Informasi personal
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
        {/* First Name */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Nama Depan</label>
          <input 
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
            className={getInputClass(formData.first_name)}
            placeholder="Masukkan nama depan"
          />
        </div>

        {/* Last Name */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Nama Belakang</label>
          <input 
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
            className={getInputClass(formData.last_name)}
            placeholder="Masukkan nama belakang"
          />
        </div>

        {/* Username - Actually using email or first name as username for now as there is no username column */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Username</label>
          <input 
            value={user.first_name}
            readOnly
            className="w-full px-4 py-3 rounded-xl border border-slate-100 bg-slate-50 text-slate-400 font-medium cursor-not-allowed"
          />
        </div>

        {/* Email */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Email</label>
          <input 
            value={user.email}
            readOnly
            className="w-full px-4 py-3 rounded-xl border border-slate-100 bg-slate-50 text-slate-400 font-medium cursor-not-allowed"
          />
        </div>

        {/* DOB */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Tanggal Lahir</label>
          <div className="relative">
            <input 
              type="date"
              name="dob"
              value={formData.dob || ""}
              onChange={handleChange}
              className={getInputClass(formData.dob)}
            />
            {!formData.dob && (
              <Calendar className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 pointer-events-none" />
            )}
          </div>
        </div>

        {/* Place of Birth */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Tempat Lahir</label>
          <input 
            name="place_of_birth"
            value={formData.place_of_birth || ""}
            onChange={handleChange}
            className={getInputClass(formData.place_of_birth)}
            placeholder="Contoh: Jakarta"
          />
        </div>

        {/* Gender */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Jenis Kelamin</label>
          <select 
            name="gender"
            value={formData.gender || ""}
            onChange={handleChange}
            className={getInputClass(formData.gender)}
          >
            <option value="">Pilih Jenis Kelamin</option>
            <option value="male">Laki-laki</option>
            <option value="female">Perempuan</option>
          </select>
        </div>

        {/* Occupation */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Pekerjaan</label>
          <input 
            name="occupation"
            value={formData.occupation || ""}
            onChange={handleChange}
            className={getInputClass(formData.occupation)}
            placeholder="Contoh: Software Engineer"
          />
        </div>
      </div>

      {/* Address */}
      <div className="space-y-2">
        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Alamat</label>
        <textarea 
          name="address"
          value={formData.address || ""}
          onChange={handleChange}
          rows={4}
          className={getInputClass(formData.address)}
          placeholder="Masukkan alamat lengkap"
        />
      </div>

      <div className="flex justify-end pt-4">
        <Button 
          type="submit" 
          disabled={isLoading}
          className="bg-brand hover:bg-brand-600 text-white px-10 py-6 rounded-xl font-bold shadow-lg shadow-brand/20 transition-all active:scale-95 disabled:opacity-70"
        >
          {isLoading ? "Menyimpan..." : "Simpan Perubahan"}
        </Button>
      </div>
    </form>
  );
};

export default PersonalInfoForm;
