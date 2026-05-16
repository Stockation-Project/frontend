import React from "react";
import type { User } from "@/features/auth";
import { Button } from "@/components/ui/button";
import { Camera, Trash2 } from "lucide-react";
import { toast } from "sonner";

interface ProfileHeaderProps {
  user: User;
  onUpdateAvatar: (url: string | null) => void;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ user, onUpdateAvatar }) => {
  const joinDate = new Date(user.created_at).getFullYear();
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Placeholder for real upload logic
    // For now, we simulate by taking the first file and creating a local URL
    // In real app, you'd upload to Supabase Storage and get a public URL
    const file = e.target.files?.[0];
    if (file) {
      toast.info("Fitur upload sedang dalam pengembangan. Menggunakan placeholder.");
      // onUpdateAvatar(URL.createObjectURL(file));
    }
  };

  return (
    <div className="flex flex-col md:flex-row items-center gap-6 mb-12">
      <div className="relative group">
        <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg bg-slate-100 flex items-center justify-center">
          {user.avatar_url ? (
            <img 
              src={user.avatar_url} 
              alt={user.first_name} 
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-4xl font-bold text-slate-300">
              {user.first_name[0]}{user.last_name ? user.last_name[0] : ""}
            </span>
          )}
        </div>
        <label className="absolute inset-0 flex items-center justify-center bg-black/40 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
          <Camera className="w-8 h-8" />
          <input type="file" className="hidden" onChange={handleFileChange} accept="image/*" />
        </label>
      </div>

      <div className="text-center md:text-left space-y-3">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">
            {user.first_name} {user.last_name || ""}
          </h2>
          <p className="text-sm text-slate-500 font-medium">
            Bergabung Sejak {joinDate}
          </p>
        </div>

        <div className="flex items-center gap-3 justify-center md:justify-start">
          <Button 
            size="sm" 
            className="bg-brand hover:bg-brand-600 text-white px-6 rounded-lg text-xs font-bold"
            onClick={() => document.querySelector<HTMLInputElement>('input[type="file"]')?.click()}
          >
            Ganti
          </Button>
          <Button 
            size="sm" 
            variant="outline" 
            className="border-slate-200 text-slate-600 hover:bg-slate-50 px-6 rounded-lg text-xs font-bold"
            onClick={() => onUpdateAvatar(null)}
          >
            Hapus
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
