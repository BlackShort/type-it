import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"

interface DrillConfigModalProps {
  isOpen: boolean
  onClose: () => void
  onStart: (config: DrillConfig) => void
}

export interface DrillConfig {
  complexity: 'easy' | 'medium' | 'hard'
  duration: number
  generationType: 'auto' | 'fixed'
  level: 'beginner' | 'intermediate' | 'expert'
}

export function DrillConfigModal({ isOpen, onClose, onStart }: DrillConfigModalProps) {
  const [config, setConfig] = useState<DrillConfig>({
    complexity: 'easy',
    duration: 2,
    generationType: 'auto',
    level: 'beginner',
  })

  const handleChange = (field: keyof DrillConfig, value: string | number) => {
    setConfig(prev => ({ ...prev, [field]: value }))
  }

  const handleStart = () => {
    onStart(config)
  }

  return (
    <Dialog open={isOpen} onOpenChange={() => {}} modal>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Configure Typing Drill</DialogTitle>
          <DialogDescription>
            Set your preferences for this typing drill session.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="complexity" className="text-right">
              Complexity
            </Label>
            <Select
              onValueChange={(value) => handleChange('complexity', value as 'easy' | 'medium' | 'hard')}
              defaultValue={config.complexity}
            >
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select complexity" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="easy">Easy</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="hard">Hard</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="duration" className="text-right">
              Duration (min)
            </Label>
            <Input
              id="duration"
              type="number"
              className="col-span-3"
              value={config.duration}
              onChange={(e) => handleChange('duration', parseInt(e.target.value))}
              min={1}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="generation" className="text-right">
              Generation
            </Label>
            <Select
              onValueChange={(value) => handleChange('generationType', value as 'auto' | 'fixed')}
              defaultValue={config.generationType}
            >
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select generation type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="auto">Auto (Random words)</SelectItem>
                <SelectItem value="fixed">Fixed (Predefined words)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="level" className="text-right">
              Level
            </Label>
            <Select
              onValueChange={(value) => handleChange('level', value as 'beginner' | 'intermediate' | 'expert')}
              defaultValue={config.level}
            >
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select skill level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="beginner">Beginner</SelectItem>
                <SelectItem value="intermediate">Intermediate</SelectItem>
                <SelectItem value="expert">Expert</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button type="button" onClick={onClose}>Cancel</Button>
          <Button type="submit" onClick={handleStart}>Start Drill</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

