"use client";

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp, MapPin } from "lucide-react";
import { useState } from "react";
import { Company } from "../_data/mockData";

interface CompanyAddressProps {
  company: Company;
  updateAddress: (field: string, value: string) => void;
}

export function CompanyAddress({ company, updateAddress }: CompanyAddressProps) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-muted-foreground" />
            <div>
              <CardTitle>Endereço</CardTitle>
              <CardDescription>
                Localização da sua empresa
              </CardDescription>
            </div>
          </div>

          <Collapsible open={isOpen} onOpenChange={setIsOpen}>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                {isOpen ? (
                  <ChevronUp className="h-4 w-4" />
                ) : (
                  <ChevronDown className="h-4 w-4" />
                )}
              </Button>
            </CollapsibleTrigger>
          </Collapsible>
        </div>
      </CardHeader>

      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleContent>
          <CardContent className="space-y-4 pt-0">
            {/* Rua */}
            <div className="space-y-2">
              <Label htmlFor="street">Rua</Label>
              <Input
                id="street"
                value={company.address.street}
                onChange={(e) => updateAddress("street", e.target.value)}
                placeholder="Rua/Avenida"
              />
            </div>

            {/* Número e Complemento */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="number">Número</Label>
                <Input
                  id="number"
                  value={company.address.number}
                  onChange={(e) => updateAddress("number", e.target.value)}
                  placeholder="Número"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="complement">Complemento</Label>
                <Input
                  id="complement"
                  value={company.address.complement}
                  onChange={(e) => updateAddress("complement", e.target.value)}
                  placeholder="Complemento"
                />
              </div>
            </div>

            {/* Bairro */}
            <div className="space-y-2">
              <Label htmlFor="neighborhood">Bairro</Label>
              <Input
                id="neighborhood"
                value={company.address.neighborhood}
                onChange={(e) => updateAddress("neighborhood", e.target.value)}
                placeholder="Bairro"
              />
            </div>

            {/* Cidade, Estado, País */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="city">Cidade</Label>
                <Input
                  id="city"
                  value={company.address.city}
                  onChange={(e) => updateAddress("city", e.target.value)}
                  placeholder="Cidade"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="state">Estado</Label>
                <Input
                  id="state"
                  value={company.address.state}
                  onChange={(e) => updateAddress("state", e.target.value)}
                  placeholder="Estado"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="country">País</Label>
                <Input
                  id="country"
                  value={company.address.country}
                  onChange={(e) => updateAddress("country", e.target.value)}
                  placeholder="País"
                />
              </div>
            </div>

            {/* CEP */}
            <div className="space-y-2">
              <Label htmlFor="zipCode">CEP</Label>
              <Input
                id="zipCode"
                value={company.address.zipCode}
                onChange={(e) => updateAddress("zipCode", e.target.value)}
                placeholder="CEP"
              />
            </div>
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
} 