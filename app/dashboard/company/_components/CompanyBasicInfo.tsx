"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Building2, X } from "lucide-react";
import { Company } from "../_data/mockData";

interface CompanyBasicInfoProps {
  company: Company;
  updateField: (field: string, value: string | number) => void;
  clearField: (field: string) => void;
}

export function CompanyBasicInfo({
  company,
  updateField,
  clearField,
}: CompanyBasicInfoProps) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2">
          <Building2 className="h-5 w-5 text-muted-foreground" />
          <div>
            <CardTitle>Informações Básicas</CardTitle>
            <CardDescription>
              Preencha as informações básicas da sua empresa
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-5 pt-0">
        {/* Nome da Empresa */}
        <div className="space-y-2">
          <Label htmlFor="name">Nome da Empresa</Label>
          <div className="flex gap-2">
            <Input
              id="name"
              value={company.name}
              onChange={(e) => updateField("name", e.target.value)}
              placeholder="Nome da sua empresa"
            />
            <Button
              variant="outline"
              size="icon"
              className="h-10 w-10 flex-shrink-0"
              onClick={() => clearField("name")}
              disabled={!company.name}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Descrição da Empresa */}
        <div className="space-y-2">
          <Label htmlFor="description">Descrição</Label>
          <div className="flex gap-2">
            <Textarea
              id="description"
              value={company.description}
              onChange={(e) => updateField("description", e.target.value)}
              placeholder="Descreva sua empresa em poucas palavras"
              className="min-h-[100px] resize-none"
            />
            <Button
              variant="outline"
              size="icon"
              className="h-10 w-10 flex-shrink-0"
              onClick={() => clearField("description")}
              disabled={!company.description}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Website */}
        <div className="space-y-2">
          <Label htmlFor="website">Website</Label>
          <div className="flex gap-2">
            <Input
              id="website"
              value={company.website}
              onChange={(e) => updateField("website", e.target.value)}
              placeholder="https://example.com"
            />
            <Button
              variant="outline"
              size="icon"
              className="h-10 w-10 flex-shrink-0"
              onClick={() => clearField("website")}
              disabled={!company.website}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Email */}
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <div className="flex gap-2">
            <Input
              id="email"
              value={company.email}
              onChange={(e) => updateField("email", e.target.value)}
              placeholder="contato@example.com"
            />
            <Button
              variant="outline"
              size="icon"
              className="h-10 w-10 flex-shrink-0"
              onClick={() => clearField("email")}
              disabled={!company.email}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 