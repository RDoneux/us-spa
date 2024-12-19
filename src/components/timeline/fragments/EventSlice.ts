import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface TimelineEvent {
  id: string;
  imageUrl: string;
  title: string;
  date: string;
  description: string;
}

interface EventState {
  events: TimelineEvent[];
}

const initialState: EventState = {
  events: []
};

const eventSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {
    setEvents(state: EventState, action: PayloadAction<TimelineEvent[]>) {
      return { ...state, events: action.payload };
    },
    addEvent(state: EventState, action: PayloadAction<TimelineEvent>) {
      return { ...state, events: [...state.events, action.payload] };
    }
  }
});

export const { setEvents, addEvent } = eventSlice.actions;
export const eventReducer = eventSlice.reducer;
