"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Company } from "../_data/mockData";
import { useState } from "react";
import { LoaderCircle, Upload } from "lucide-react";

interface CompanyLogoProps {
  company: Company;
  uploadLogo: (file: File) => Promise<void>;
  isSaving: boolean;
}

export function CompanyLogo({ company, uploadLogo, isSaving }: CompanyLogoProps) {
  const [dragActive, setDragActive] = useState(false);

  // Manipula o upload de imagem
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      await uploadLogo(file);
    }
  };

  // Manipula eventos de drag-and-drop
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      await uploadLogo(file);
    }
  };

  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-3">
        <CardTitle>Logo da Empresa</CardTitle>
        <CardDescription>
          Faça upload do logo da sua empresa
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col sm:flex-row items-center gap-6">
          {/* Preview do Logo */}
          <div className="flex justify-center">
            <Avatar className="h-32 w-32">
              <AvatarImage src={company.logoUrl} alt={company.name} />
              <AvatarFallback className="text-2xl">{company.name.substring(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
          </div>

          {/* Área de Upload */}
          <div
            className={`flex w-full flex-col items-center justify-center rounded-lg border-2 border-dashed p-4 text-center ${
              dragActive ? "border-primary bg-muted/50" : "border-muted-foreground/25"
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            {isSaving ? (
              <LoaderCircle className="mb-2 h-8 w-8 animate-spin text-muted-foreground" />
            ) : (
              <Upload className="mb-2 h-8 w-8 text-muted-foreground" />
            )}
            <p className="mb-1 text-sm font-medium">
              Arraste e solte um arquivo ou clique para fazer upload
            </p>
            <p className="text-xs text-muted-foreground">
              SVG, PNG ou JPG (máx. 2MB)
            </p>
            <Input
              id="logo-upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageUpload}
              disabled={isSaving}
            />
            <Button
              variant="outline"
              size="sm"
              onClick={() => document.getElementById("logo-upload")?.click()}
              className="mt-3"
              disabled={isSaving}
            >
              {isSaving ? "Enviando..." : "Selecionar Arquivo"}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 