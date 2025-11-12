"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Linkedin, Twitter, Instagram, Share2 } from "lucide-react";
import { Company } from "../_data/mockData";

interface CompanySocialMediaProps {
  company: Company;
  updateSocialMedia: (platform: string, value: string) => void;
}

export function CompanySocialMedia({
  company,
  updateSocialMedia,
}: CompanySocialMediaProps) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2">
          <Share2 className="h-5 w-5 text-muted-foreground" />
          <div>
            <CardTitle>Redes Sociais</CardTitle>
            <CardDescription>
              Links para as redes sociais da sua empresa
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-5 pt-0">
        {/* LinkedIn */}
        <div className="space-y-2">
          <Label htmlFor="linkedin" className="flex items-center gap-2">
            <Linkedin className="h-4 w-4 text-blue-600" />
            LinkedIn
          </Label>
          <div className="flex gap-2">
            <Input
              id="linkedin"
              value={company.socialMedia.linkedin}
              onChange={(e) => updateSocialMedia("linkedin", e.target.value)}
              placeholder="https://linkedin.com/company/example"
            />
            <Button
              variant="outline"
              size="icon"
              className="h-10 w-10 flex-shrink-0"
              onClick={() => updateSocialMedia("linkedin", "")}
              disabled={!company.socialMedia.linkedin}
            >
              ✕
            </Button>
          </div>
        </div>

        {/* Twitter */}
        <div className="space-y-2">
          <Label htmlFor="twitter" className="flex items-center gap-2">
            <Twitter className="h-4 w-4 text-sky-500" />
            Twitter / X
          </Label>
          <div className="flex gap-2">
            <Input
              id="twitter"
              value={company.socialMedia.twitter}
              onChange={(e) => updateSocialMedia("twitter", e.target.value)}
              placeholder="https://twitter.com/example"
            />
            <Button
              variant="outline"
              size="icon"
              className="h-10 w-10 flex-shrink-0"
              onClick={() => updateSocialMedia("twitter", "")}
              disabled={!company.socialMedia.twitter}
            >
              ✕
            </Button>
          </div>
        </div>

        {/* Instagram */}
        <div className="space-y-2">
          <Label htmlFor="instagram" className="flex items-center gap-2">
            <Instagram className="h-4 w-4 text-pink-600" />
            Instagram
          </Label>
          <div className="flex gap-2">
            <Input
              id="instagram"
              value={company.socialMedia.instagram}
              onChange={(e) => updateSocialMedia("instagram", e.target.value)}
              placeholder="https://instagram.com/example"
            />
            <Button
              variant="outline"
              size="icon"
              className="h-10 w-10 flex-shrink-0"
              onClick={() => updateSocialMedia("instagram", "")}
              disabled={!company.socialMedia.instagram}
            >
              ✕
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 