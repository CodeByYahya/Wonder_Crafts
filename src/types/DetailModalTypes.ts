export interface DetailModalProps {
    open: boolean;
    handleClose: () => void;
    title: string;
    loading: boolean;
    imageUrl: string;
    date: string;
    bookingID: string;
    avatarUrl: string;
    username: string;
    rooms: number;
    noOfGuests: number;
    onUpdate: (
      data: Partial<{
        title: string;
        bookDate: string;
        rooms: number;
        noOfGuests: number;
      }>
    ) => void; // Update prop
  }