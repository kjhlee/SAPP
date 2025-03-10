export type ScheduleItem = {
    id: number;
    name: string;
    startTime: string;
    endTime: string;
    weekday: string | null;
  };
  
export type Schedule = {
    id: number;
    scheduleItems: ScheduleItem[]; 
};