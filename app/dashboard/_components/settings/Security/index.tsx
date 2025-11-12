"use client";

import { PasswordChange } from "./PasswordChange";
import { TwoFactorAuth } from "./TwoFactorAuth";
import { ActiveSessions } from "./ActiveSessions";

export function SecuritySettings() {
  return (
    <div className="space-y-4">
      <PasswordChange />
      <TwoFactorAuth />
      <ActiveSessions />
    </div>
  );
} 