import React, { useState } from "react";
import type { User } from "@/features/auth";
import type { ProfileUpdatePayload } from "../types/profile";
import { Button } from "@/components/ui/button";

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
    // Sanitasi: bersihkan field kosong agar tidak mengirim string kosong
    // ke backend (khususnya field date seperti dob)
    const sanitizedData: ProfileUpdatePayload = { ...formData };
    (Object.keys(sanitizedData) as Array<keyof ProfileUpdatePayload>).forEach((key) => {
      if (sanitizedData[key] === "") {
        sanitizedData[key] = null;
      }
    });
    await onUpdate(sanitizedData);
  };

  const getInputClass = (value: any) => {
    const baseClass = "w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all font-regular text-text-primary text-sm";
    if (!value || value === "") {
      return `${baseClass} border-brand-100 bg-brand-50/20 focus:border-brand-300 focus:ring-brand-200`;
    }
    return `${baseClass} border-border-primary bg-background-primary focus:border-brand focus:ring-brand/20`;
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 w-full">
      <h3 className="text-base font-medium text-text-primary border-b border-border-primary pb-2">
        Informasi personal
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
        {/* First Name */}
        <div className="space-y-2">
          <label className="text-xs font-medium text-text-muted tracking-wider">Nama Depan</label>
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
          <label className="text-xs font-medium text-text-muted tracking-wider">Nama Belakang</label>
          <input 
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
            className={getInputClass(formData.last_name)}
            placeholder="Masukkan nama belakang"
          />
        </div>

        {/* Username */}
        <div className="space-y-2">
          <label className="text-xs font-medium text-text-muted tracking-wider">Username</label>
          <input 
            value={user.first_name}
            readOnly
            className="w-full px-4 py-2 rounded-lg border border-border-primary bg-background-secondary text-text-subtle font-regular text-sm cursor-not-allowed"
          />
        </div>

        {/* Email */}
        <div className="space-y-2">
          <label className="text-xs font-medium text-text-muted tracking-wider">Email</label>
          <input 
            value={user.email}
            readOnly
            className="w-full px-4 py-2 rounded-lg border border-border-primary bg-background-secondary text-text-subtle font-regular text-sm cursor-not-allowed"
          />
        </div>

        {/* DOB */}
        <div className="space-y-2">
          <label className="text-xs font-medium text-text-muted tracking-wider">
            Tanggal Lahir <span className="text-error-500 ml-0.5">*</span>
          </label>
          <div className="relative">
            <input 
              type="date"
              name="dob"
              value={formData.dob || ""}
              onChange={handleChange}
              className={getInputClass(formData.dob)}
            />
          </div>
        </div>

        {/* Place of Birth */}
        <div className="space-y-2">
          <label className="text-xs font-medium text-text-muted tracking-wider">Tempat Lahir</label>
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
          <label className="text-xs font-medium text-text-muted tracking-wider">Jenis Kelamin</label>
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
          <label className="text-xs font-medium text-text-muted tracking-wider">Pekerjaan</label>
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
        <label className="text-xs font-medium text-text-muted tracking-wider">Alamat</label>
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
          className="bg-brand hover:bg-brand-950 text-primary-foreground px-8 py-5  rounded-xl font-medium shadow-sm shadow-brand/20 transition-all active:scale-95 disabled:opacity-70"
        >
          {isLoading ? "Menyimpan..." : "Simpan Perubahan"}
        </Button>
      </div>
    </form>
  );
};

export default PersonalInfoForm;
