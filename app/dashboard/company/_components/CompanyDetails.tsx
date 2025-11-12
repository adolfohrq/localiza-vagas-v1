"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Company } from "../_data/mockData";
import { BarChart3 } from "lucide-react";

interface CompanyDetailsProps {
  company: Company;
  updateField: (field: string, value: string | number) => void;
}

export function CompanyDetails({ company, updateField }: CompanyDetailsProps) {
  const companySizes = [
    "1-10",
    "11-50",
    "50-100",
    "100-500",
    "500+",
  ];

  const currentYear = new Date().getFullYear();

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2">
          <BarChart3 className="h-5 w-5 text-muted-foreground" />
          <div>
            <CardTitle>Detalhes da Empresa</CardTitle>
            <CardDescription>
              Informações adicionais sobre sua empresa
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-5 pt-0">
        {/* Ano de Fundação */}
        <div className="space-y-2">
          <Label htmlFor="foundedYear">Ano de Fundação</Label>
          <Input
            id="foundedYear"
            type="number"
            min="1900"
            max={currentYear}
            value={company.foundedYear}
            onChange={(e) => updateField("foundedYear", parseInt(e.target.value) || currentYear)}
            placeholder="Ano de fundação"
          />
          <p className="text-xs text-muted-foreground">
            Ano entre 1900 e {currentYear}
          </p>
        </div>

        {/* Tamanho da Empresa */}
        <div className="space-y-2">
          <Label htmlFor="size">Tamanho da Empresa</Label>
          <Select
            value={company.size}
            onValueChange={(value) => updateField("size", value)}
          >
            <SelectTrigger id="size">
              <SelectValue placeholder="Selecione o tamanho da empresa" />
            </SelectTrigger>
            <SelectContent>
              {companySizes.map((size) => (
                <SelectItem key={size} value={size}>
                  {size} funcionários
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
} 