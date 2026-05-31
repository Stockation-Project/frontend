import React from "react";
import PageHeader from "@/components/shared/layout/PageHeader";
import { useProfile } from "@/features/profile/hooks/useProfile";
import ProfileHeader from "@/features/profile/components/ProfileHeader";
import PersonalInfoForm from "@/features/profile/components/PersonalInfoForm";
import { Skeleton } from "@/components/ui/skeleton";


import { usePageTour, ProductTour } from "@/features/product-tour";
import { PROFILE_TOUR_STEPS } from "@/features/product-tour/steps";

const ProfilePage: React.FC = () => {
  const { profile, isLoading, isUpdating, isUploadingAvatar, updateProfile, uploadAvatar } = useProfile();

  const {
    isActive,
    currentStep,
    nextStep,
    endTour,

  } = usePageTour({
    steps: PROFILE_TOUR_STEPS,
    storageKey: "stockation_tour_profile",
    autoStart: true,
  });

  if (isLoading) {
    return (
      <div className="w-full h-full flex flex-col overflow-hidden animate-in fade-in duration-500">
        <PageHeader title="Profil" description="Kelola informasi akun dan preferensi Anda" />
        
        <div className="flex-1 overflow-y-auto p-4 pb-6 no-scrollbar">
          <div className="bg-background-primary rounded-3xl border border-border-secondary shadow-sm space-y-12 p-4">
            {/* Skeleton Header */}
            <div className="flex flex-col md:flex-row items-center gap-6">
              <Skeleton className="w-32 h-32 rounded-full" />
              <div className="space-y-3 text-center md:text-left">
                <Skeleton className="h-8 w-48 mx-auto md:mx-0" />
                <Skeleton className="h-4 w-32 mx-auto md:mx-0" />
                <div className="flex gap-3 justify-center md:justify-start">
                  <Skeleton className="h-9 w-24 rounded-lg" />
                  <Skeleton className="h-9 w-24 rounded-lg" />
                </div>
              </div>
            </div>

            {/* Skeleton Form */}
            <div className="space-y-8 p-4">
              <Skeleton className="h-6 w-48 border-b border-border-secondary pb-2" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
                  <div key={i} className="space-y-2">
                    <Skeleton className="h-3 w-24" />
                    <Skeleton className="h-12 w-full rounded-xl" />
                  </div>
                ))}
              </div>
              <div className="space-y-2">
                <Skeleton className="h-3 w-24" />
                <Skeleton className="h-32 w-full rounded-xl" />
              </div>
              <div className="flex justify-end">
                <Skeleton className="h-12 w-40 rounded-xl" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!profile) return null;

  return (
    <div className="w-full h-full flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
      <PageHeader 
        title="Profil" 
        description="Kelola informasi akun dan preferensi Anda"

      />

      <div className="flex-1 overflow-y-auto p-4 pb-6 no-scrollbar">
        <div className="bg-background-primary rounded-xl p-4 border border-border-primary">
          <div data-tour="profile-avatar">
            <ProfileHeader 
              user={profile} 
              onUpdateAvatar={(url) => {
                if (url === null) {
                  updateProfile({ avatar_url: null });
                } else {
                  uploadAvatar(url);
                }
              }} 
              isLoading={isUploadingAvatar}
            />
          </div>

          <div data-tour="profile-personal-info">
            <PersonalInfoForm 
              user={profile} 
              onUpdate={updateProfile} 
              isLoading={isUpdating} 
            />
          </div>
        </div>
      </div>

      <ProductTour
        isActive={isActive}
        currentStep={currentStep}
        steps={PROFILE_TOUR_STEPS}
        onNext={nextStep}
        onEnd={endTour}
      />
    </div>
  );
};

export default ProfilePage;
