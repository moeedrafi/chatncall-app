import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface AlertProps {
  heading: string;
  subHeading: string;
  handleDelete: () => void;
}

export const Alert = ({ heading, subHeading, handleDelete }: AlertProps) => {
  return (
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>{heading}</AlertDialogTitle>
        <AlertDialogDescription>{subHeading}</AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <AlertDialogAction
          onClick={handleDelete}
          className="bg-red-600 hover:bg-red-700"
        >
          Delete Account
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  );
};
