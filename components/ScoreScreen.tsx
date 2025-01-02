import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface ScoreScreenProps {
  wpm: number;
  accuracy: number;
  time: number;
  wpmData: { time: number; wpm: number }[];
  onRestart: () => void;
  onExit: () => void;
}

export function ScoreScreen({ wpm, accuracy, time, wpmData, onRestart, onExit }: ScoreScreenProps) {
  // Format the time as whole seconds
  const formattedTime = Math.round(time);

  return (
    <div className="container mx-auto p-4">
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Drill Complete!</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="text-center">
              <h3 className="text-lg font-semibold">WPM</h3>
              <p className="text-3xl font-bold text-primary">{Math.round(wpm)}</p>
            </div>
            <div className="text-center">
              <h3 className="text-lg font-semibold">Accuracy</h3>
              <p className="text-3xl font-bold text-primary">{Math.round(accuracy)}%</p>
            </div>
            <div className="text-center">
              <h3 className="text-lg font-semibold">Time</h3>
              <p className="text-3xl font-bold text-primary">
                {Math.floor(formattedTime / 60)}:{(formattedTime % 60).toString().padStart(2, '0')}
              </p>
            </div>
          </div>

          {wpmData.length > 1 ? (
            <div className="h-64 mb-8">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={wpmData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="time"
                    label={{ value: 'Time (seconds)', position: 'insideBottom', offset: -5 }}
                  />
                  <YAxis
                    label={{ value: 'WPM', angle: -90, position: 'insideLeft', offset: 10 }}
                  />
                  <Tooltip
                    formatter={(value, name) => [value, name === 'wpm' ? 'WPM' : name]}
                  />
                  <Line
                    type="monotone"
                    dataKey="wpm"
                    name="WPM"
                    stroke="#3b82f6"
                    strokeWidth={2}
                    dot={false}
                    activeDot={{ r: 8 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <p className="text-center text-muted-foreground mb-8">Not enough data to display the WPM graph.</p>
          )}

          <div className="flex justify-center space-x-4">
            <Button onClick={onRestart}>Restart Drill</Button>
            <Button variant="outline" onClick={onExit}>Exit to Menu</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

