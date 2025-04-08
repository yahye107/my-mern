import { useContext } from "react";
import { Dialog, DialogContent, DialogTitle } from "../ui/dialog";

// import { TaskManagerContext } from "@/context/use_context";
import CommonForm from "./logcommonlayout/CommonForm";

const CommonDialog = ({
  showDialog,
  onOpenChange,
  title,
  formControls,
  btnText,
  handleSubmit,
  formData,
}) => {
  // const {} = useContext(TaskManagerContext);

  return (
    <Dialog open={showDialog} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl rounded-xl bg-gray-800 border border-gray-700 p-8">
        <DialogTitle className="text-2xl font-bold text-gray-100 mb-6">
          {title}
        </DialogTitle>
        <div className="space-y-6">
          <CommonForm
            formControls={formControls}
            form={formData}
            handleSubmit={handleSubmit}
            btnText={btnText}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CommonDialog;
