"use client"

import { useCompany } from "./_hooks/useCompany";

// Componentes
import { CompanyProfileHeader } from "./_components/CompanyProfileHeader";
import { CompanyBasicInfo } from "./_components/CompanyBasicInfo";
import { CompanyLogo } from "./_components/CompanyLogo";
import { CompanyDetails } from "./_components/CompanyDetails";
import { CompanyAddress } from "./_components/CompanyAddress";
import { CompanySocialMedia } from "./_components/CompanySocialMedia";

export default function CompanyProfilePage() {
  const {
    company,
    isSaving,
    isEdited,
    updateField,
    saveChanges,
    cancelChanges,
    clearField,
    updateAddress,
    updateSocialMedia,
    uploadLogo,
  } = useCompany();

  return (
    <div className="container mx-auto py-6">
      <div className="flex flex-col space-y-6">
        <CompanyProfileHeader
          isEdited={isEdited}
          isSaving={isSaving}
          onSave={saveChanges}
          onCancel={cancelChanges}
        />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="flex flex-col space-y-8">
            <CompanyBasicInfo
              company={company}
              updateField={updateField}
              clearField={clearField}
            />
            
            <CompanyLogo 
              company={company}
              uploadLogo={uploadLogo}
              isSaving={isSaving}
            />
            
            <CompanyDetails
              company={company}
              updateField={updateField}
            />
          </div>
          
          <div className="flex flex-col space-y-8">
            <CompanyAddress
              company={company}
              updateAddress={updateAddress}
            />
            
            <CompanySocialMedia
              company={company}
              updateSocialMedia={updateSocialMedia}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

