"use client";

import { useEffect, useState } from "react";
import localStorageManager from "@/src/services/localStorage";

import { WelcomeHeader } from "@/src/components/WelcomeHeader";

import { WorkoutCard, Button } from "@/src/components";
import { WorkoutPlan } from "@/src/data/workoutPlan";
import { workoutPlan } from "@/src/data/workoutPlan";

export default function Home() {
  const [
    showConfirmUpdateWorkoutPlanButton,
    setShowConfirmUpdateWorkoutPlanButton,
  ] = useState(false);

  const [loadedWorkoutPlan, setLoadedWorkoutPlan] =
    useState<WorkoutPlan | null>(null);

  const handleUpdateWorkoutPlan = () => {
    if (showConfirmUpdateWorkoutPlanButton) {
      localStorageManager.update("workoutPlan", workoutPlan);
      setLoadedWorkoutPlan(workoutPlan);
      setShowConfirmUpdateWorkoutPlanButton(false);
      return;
    }

    setShowConfirmUpdateWorkoutPlanButton(true);
  };

  useEffect(() => {
    const workoutPlanData =
      localStorageManager.read<WorkoutPlan>("workoutPlan");

    if (workoutPlanData) {
      setLoadedWorkoutPlan(workoutPlanData);
    } else {
      localStorageManager.create("workoutPlan", workoutPlan);
      setLoadedWorkoutPlan(workoutPlan);
    }
  }, []);

  if (!loadedWorkoutPlan) {
    return (
      <div className="h-[100dvh] flex justify-center items-center p-5">
        <p className="text-lg font-semibold">Carregando plano de treino...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <WelcomeHeader />

      <div className="flex flex-col gap-4 p-5 flex-1">
        {loadedWorkoutPlan.map((workout, index) => (
          <WorkoutCard key={workout.id} workout={workout} number={index} />
        ))}
      </div>

      <div className="p-5">
        {showConfirmUpdateWorkoutPlanButton ? (
          <Button onClick={handleUpdateWorkoutPlan} buttonStyle="danger">
            Sim, atualizar agora
          </Button>
        ) : (
          <Button onClick={() => setShowConfirmUpdateWorkoutPlanButton(true)}>
            Atualizar plano de treino
          </Button>
        )}
      </div>
    </div>
  );
}
