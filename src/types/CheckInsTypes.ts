// Define the type for the uploaded data
export interface CheckInData  {
    id: string;
    title: string;
    bookDate: string;
    imageUrl: string;
    bookingId: string;
    avatarUrl: string;
    name: string;
    rooms: number; // Add rooms
    noOfGuests: number; // Add number of guests
  }

  export interface CheckInsProps {
    checkIns: CheckInData[];
    onUpload: (id: string, updatedData: Partial<CheckInData>) => void;
    loading: boolean
  }