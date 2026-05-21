import React from "react";
import type { User } from "@/features/auth";
import { Button } from "@/components/ui/button";
import { Camera, Trash2, Loader2 } from "lucide-react";
import { toast } from "sonner";

interface ProfileHeaderProps {
  user: User;
  onUpdateAvatar: (url: string | null) => void;
  isLoading?: boolean;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ user, onUpdateAvatar, isLoading = false }) => {
  const joinDate = new Date(user.created_at).getFullYear();
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // 1. Validasi jenis file (hanya gambar)
    if (!file.type.startsWith("image/")) {
      toast.error("Format file harus berupa gambar.");
      return;
    }

    // 2. Validasi ukuran file (maksimal 2MB)
    const maxSizeBytes = 2 * 1024 * 1024; // 2MB
    if (file.size > maxSizeBytes) {
      toast.error("Ukuran gambar terlalu besar. Maksimal ukuran file adalah 2MB.");
      return;
    }

    // 3. Konversi file ke string Base64 menggunakan FileReader
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const base64String = reader.result as string;
      onUpdateAvatar(base64String);
    };
    reader.onerror = () => {
      toast.error("Gagal membaca file gambar.");
    };
  };

  return (
    <div className="flex flex-col md:flex-row items-center gap-6 mb-12">
      <div className="relative group">
        <div className="w-32 h-32 rounded-full overflow-hidden border border-border-primary ring-3 ring-white ring-inset shadow-sm bg-brand-25 flex items-center justify-center">
          {user.avatar_url ? (
            <img 
              src={user.avatar_url} 
              alt={user.first_name} 
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-4xl font-bold text-text-subtle">
              {user.first_name[0]}{user.last_name ? user.last_name[0] : ""}
            </span>
          )}
        </div>

        {/* Loading Overlay */}
        {isLoading ? (
          <div className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-full backdrop-blur-xs">
            <Loader2 className="w-8 h-8 animate-spin text-white" />
          </div>
        ) : (
          <label className="absolute inset-0 flex items-center justify-center bg-black/40 text-text-inverse rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
            <Camera className="w-8 h-8" />
            <input 
              type="file" 
              className="hidden" 
              onChange={handleFileChange} 
              accept="image/*" 
              disabled={isLoading}
            />
          </label>
        )}
      </div>

      <div className="text-center md:text-left space-y-3">
        <div>
          <h2 className="text-xl font-semibold text-text-primary">
            {user.first_name} {user.last_name || ""}
          </h2>
          <p className="text-xs text-text-muted font-regular">
            Bergabung Sejak {joinDate}
          </p>
        </div>

        <div className="flex items-center gap-2 justify-center md:justify-start">
          <Button 
            size="sm" 
            className="bg-brand hover:bg-brand-950 text-white px-4 rounded-lg text-xs font-regular shadow-sm shadow-brand/30 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={() => document.querySelector<HTMLInputElement>('input[type="file"]')?.click()}
            disabled={isLoading}
          >
            Ganti
          </Button>
          <Button 
            size="sm" 
            variant="outline" 
            className="border-border-primary text-text-secondary hover:bg-background-secondary px-4 rounded-lg text-xs font-regular cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={() => onUpdateAvatar(null)}
            disabled={isLoading || !user.avatar_url}
          >
            Hapus
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
