"use client";

import React, { useState } from "react";
// import { Scanner } from "@yudiel/react-qr-scanner";
import dynamic from "next/dynamic";

const Scanner = dynamic(
  () => import("@yudiel/react-qr-scanner").then((mod) => mod.Scanner),
  {
    ssr: false,
  },
);
import {
  Search,
  Camera,
  AlertCircle,
  CheckCircle,
  Banknote,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { toast } from "sonner";
import { apiService } from "@/lib/services/apiService";
import { Navbar } from "@/components/nav/Navbar";
import Link from "next/link";
import { AccountDropdown } from "@/components/nav/AccountDropdown";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAuth } from "@/contexts/AuthContext";
import AgentAddVehicle from "../agent/AgentAddVehicle";

const PREFIXES = ["YLA", "FUR", "JMT", "MUB", "MTA", "GRE"];

interface VehicleScannerProps {
  mode: "SCAN" | "MANUAL";
  setMode: React.Dispatch<React.SetStateAction<"SCAN" | "MANUAL">>;
  handleSearch: (query: string) => Promise<void>;
  loading: boolean;
}

const VehicleScanner = ({
  mode,
  setMode,
  handleSearch,
  loading,
}: VehicleScannerProps) => {
  const [platePrefix, setPlatePrefix] = useState("");
  const [plateNumber, setPlateNumber] = useState("");

  const { user } = useAuth();
  return (
    <div className="space-y-4">
      <div className="flex border py-2 px-4 rounded-lg border-border bg-card justify-between items-center">
        <div>
          <p className="text-sm font-semibold text-secondary-foreground">
            Scan or search vehicles
          </p>
        </div>
        <div className="flex gap-2">
          {user && user.role === "agent" && <AgentAddVehicle />}
          <Button
            variant={mode === "SCAN" ? "default" : "outline"}
            size="icon"
            onClick={() => setMode("SCAN")}
            className={mode === "SCAN" ? "bg-blue-600" : ""}
          >
            <Camera className="h-5 w-5" />
          </Button>
          <Button
            variant={mode === "MANUAL" ? "default" : "outline"}
            size="icon"
            onClick={() => setMode("MANUAL")}
            className={mode === "MANUAL" ? "bg-blue-600" : ""}
          >
            <Search className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* SCANNER AREA */}
      {mode === "SCAN" && (
        <Card className="overflow-hidden border-2 border-border">
          <div className="aspect-square bg-black relative">
            <Scanner
              constraints={{
                facingMode: "environment",
              }}
              onScan={(result) => {
                if (!result || result.length === 0) return;

                const qrValue = result[0]?.rawValue;
                if (!qrValue) return;

                // Stop scanning immediately
                setMode("MANUAL");

                // Parse QR value (expected format: ABC-1234)
                const parts = qrValue.toUpperCase().split("-");
                if (parts.length >= 2) {
                  setPlatePrefix(parts[0]);
                  setPlateNumber(parts[1]);
                } else {
                  // Fallback for unexpected formats
                  setPlatePrefix("");
                  setPlateNumber(qrValue);
                }

                handleSearch(qrValue);
              }}
              onError={(error) => {
                console.error("QR Scan Error:", error);
                toast.error("Unable to access camera");
              }}
            />

            <div className="absolute inset-0 border-4 border-blue-500/50 z-10 pointer-events-none m-8 rounded-lg animate-pulse" />
          </div>

          <CardFooter className="bg-muted p-3 text-center text-sm text-blue-700 font-medium">
            Point camera at Vehicle QR Code
          </CardFooter>
        </Card>
      )}

      {/* MANUAL SEARCH AREA */}
      {mode === "MANUAL" && (
        <Card className="shadow-lg">
          <CardContent className="pt-6">
            <div className="flex gap-2">
              <Select value={platePrefix} onValueChange={setPlatePrefix}>
                <SelectTrigger className="w-[110px] text-lg font-semibold">
                  <SelectValue placeholder="" />
                </SelectTrigger>
                <SelectContent>
                  {PREFIXES.map((prefix) => (
                    <SelectItem
                      key={prefix}
                      value={prefix}
                      className="text-lg font-semibold"
                    >
                      {prefix}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Input
                placeholder="1234"
                value={plateNumber}
                onChange={(e) => {
                  // Only allow numbers and limit to 4 digits
                  const val = e.target.value.replace(/[^0-9]/g, "").slice(0, 4);
                  setPlateNumber(val);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && platePrefix && plateNumber) {
                    handleSearch(`${platePrefix}-${plateNumber}`);
                  }
                }}
                className="text-lg uppercase font-semibold tracking-widest"
                disabled={loading}
              />

              <Button
                onClick={() => handleSearch(`${platePrefix}-${plateNumber}`)}
                disabled={loading || !platePrefix || !plateNumber}
                className="bg-blue-600 hover:bg-blue-700"
              >
                {loading ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <Search className="h-5 w-5" />
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default VehicleScanner;
