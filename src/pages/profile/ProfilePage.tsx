import React from "react";
import PageHeader from "@/components/shared/layout/PageHeader";
import { useProfile } from "@/features/profile/hooks/useProfile";
import ProfileHeader from "@/features/profile/components/ProfileHeader";
import PersonalInfoForm from "@/features/profile/components/PersonalInfoForm";
import { Skeleton } from "@/components/ui/skeleton";

const ProfilePage: React.FC = () => {
  const { profile, isLoading, isUpdating, updateProfile } = useProfile();

  if (isLoading) {
    return (
      <div className="space-y-8 animate-in fade-in duration-500">
        <PageHeader title="Profil" description="Kelola informasi akun dan preferensi Anda" />
        <div className="space-y-12">
          <div className="flex items-center gap-6">
            <Skeleton className="w-32 h-32 rounded-full" />
            <div className="space-y-3">
              <Skeleton className="h-8 w-48" />
              <Skeleton className="h-4 w-32" />
              <div className="flex gap-2">
                <Skeleton className="h-8 w-20" />
                <Skeleton className="h-8 w-20" />
              </div>
            </div>
          </div>
          <div className="space-y-6">
            <Skeleton className="h-6 w-48" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[1, 2, 3, 4, 5, 6].map(i => (
                <div key={i} className="space-y-2">
                  <Skeleton className="h-3 w-24" />
                  <Skeleton className="h-12 w-full rounded-xl" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!profile) return null;

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
      <PageHeader 
        title="Profil" 
        description="Kelola informasi akun dan preferensi Anda" 
      />

      <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
        <ProfileHeader 
          user={profile} 
          onUpdateAvatar={(url) => updateProfile({ avatar_url: url })} 
        />

        <PersonalInfoForm 
          user={profile} 
          onUpdate={updateProfile} 
          isLoading={isUpdating} 
        />
      </div>
    </div>
  );
};

export default ProfilePage;
