"use client";

import { useState, useEffect } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem
} from "@/components/ui/select";

export default function NovaAudioDreamMachine() {
  const [box, setBox] = useState({ size: "12", quantity: "1", type: "sealed" });
  const [boxOutput, setBoxOutput] = useState("");
  const [gain, setGain] = useState({ rms: "", ohms: "" });
  const [voltage, setVoltage] = useState("");
  const [wiring, setWiring] = useState({ subs: "1", coil: "svc", ohms: "4", style: "auto" });
  const [wiringResult, setWiringResult] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedModel, setSelectedModel] = useState("");

  const audioBrands = {
    "Skar Audio": ["EVL-12 D2", "VD-10 D2", "ZVX-15v2 D1", "IX-8 D2", "SK-M5001D"],
    "Kicker": ["CompR 12", "CompRT 10", "Solo-Baric L7S", "CXA800.1", "46TL7T104"],
    "Rockford Fosgate": ["P3D4-12", "P2D2-10", "T1D412", "R500X1D", "P300-12"],
    "Sundown Audio": ["SA-12 V2 D2", "X-12 V3 D2", "U-12 D2", "ZV6-15 D2", "SFB-1000D"],
    "Steve Meade Designs (SMD)": ["SMD Meters AMM-1", "SMD DD-1+", "SMD VM-1", "SMD TCR-1", "SMD OM-1"]
  };

  useEffect(() => {
    const subCount = parseInt(wiring.subs);
    const ohms = parseFloat(wiring.ohms);
    const isDual = wiring.coil === "dvc";
    if (!isNaN(subCount) && !isNaN(ohms)) {
      let finalOhms = "";
      if (isDual) {
        if (subCount === 1) {
          finalOhms = `Series: ${ohms * 2} Ω | Parallel: ${ohms / 2} Ω`;
        } else {
          finalOhms = `Example config: ${(1 / ((1 / (ohms / 2)) * subCount)).toFixed(2)} Ω`;
        }
      } else {
        finalOhms = `Parallel total: ${(ohms / subCount).toFixed(2)} Ω`;
      }
      setWiringResult(finalOhms);
    } else {
      setWiringResult("");
    }
  }, [wiring]);

  return (
    <div className="p-6 space-y-6 bg-black text-green-400 min-h-screen">
      <h1 className="text-3xl font-bold">Aiudiophix Install Wizard</h1>
      <Tabs defaultValue="box" className="space-y-4">
        <TabsList>
          <TabsTrigger value="box">Box</TabsTrigger>
          <TabsTrigger value="gain">Gain</TabsTrigger>
          <TabsTrigger value="wiring">Wiring</TabsTrigger>
          <TabsTrigger value="match">Sub/Amp Match</TabsTrigger>
        </TabsList>

        <TabsContent value="box">
          <Card><CardContent className="space-y-4 pt-4">
            <Label>Subwoofer Size (inches)</Label>
            <Input value={box.size} onChange={(e) => setBox({ ...box, size: e.target.value })} />
            <Label>Quantity</Label>
            <Input value={box.quantity} onChange={(e) => setBox({ ...box, quantity: e.target.value })} />
            <Label>Box Type</Label>
            <Select value={box.type} onValueChange={(value) => setBox({ ...box, type: value })}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="sealed">Sealed</SelectItem>
                <SelectItem value="ported">Ported</SelectItem>
              </SelectContent>
            </Select>
            <Textarea readOnly value={boxOutput} />
          </CardContent></Card>
        </TabsContent>

        <TabsContent value="gain">
          <Card><CardContent className="space-y-4 pt-4">
            <Label>RMS Power (watts)</Label>
            <Input value={gain.rms} onChange={(e) => setGain({ ...gain, rms: e.target.value })} />
            <Label>Speaker Impedance (ohms)</Label>
            <Input value={gain.ohms} onChange={(e) => setGain({ ...gain, ohms: e.target.value })} />
            <Label>Target Voltage</Label>
            <Input value={voltage} readOnly />
          </CardContent></Card>
        </TabsContent>

        <TabsContent value="wiring">
          <Card><CardContent className="space-y-4 pt-4">
            <Label>Subwoofers</Label>
            <Input value={wiring.subs} onChange={(e) => setWiring({ ...wiring, subs: e.target.value })} />
            <Label>Voice Coil</Label>
            <Select value={wiring.coil} onValueChange={(value) => setWiring({ ...wiring, coil: value })}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="svc">Single</SelectItem>
                <SelectItem value="dvc">Dual</SelectItem>
              </SelectContent>
            </Select>
            <Label>Ohms</Label>
            <Input value={wiring.ohms} onChange={(e) => setWiring({ ...wiring, ohms: e.target.value })} />
            <Label>Style</Label>
            <Select value={wiring.style} onValueChange={(value) => setWiring({ ...wiring, style: value })}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="auto">Auto</SelectItem>
                <SelectItem value="manual">Manual</SelectItem>
              </SelectContent>
            </Select>
            <Textarea readOnly value={wiringResult} />
          </CardContent></Card>
        </TabsContent>

        <TabsContent value="match">
          <Card><CardContent className="space-y-4 pt-4">
            <Label>Select Brand</Label>
            <Select onValueChange={(value) => { setSelectedBrand(value); setSelectedModel(""); }}>
              <SelectTrigger><SelectValue placeholder="Choose a brand" /></SelectTrigger>
              <SelectContent>
                {Object.keys(audioBrands).map((brand) => (
                  <SelectItem key={brand} value={brand}>{brand}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            {selectedBrand && (
              <>
                <Label>Select Model</Label>
                <Select onValueChange={(value) => setSelectedModel(value)}>
                  <SelectTrigger><SelectValue placeholder="Choose a model" /></SelectTrigger>
                  <SelectContent>
                    {audioBrands[selectedBrand].map((model) => (
                      <SelectItem key={model} value={model}>{model}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </>
            )}
          </CardContent></Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}