import { addNewQuoteFormControls } from "@/config";
import CommonDialog from "../dailog";

function AddNewTask({
  showDialog,
  setShowDialog,
  currentEditedId,
  taskFormData,
  handleSubmit,
  setCurrentEditedId,
}) {
  return (
    <CommonDialog
      formControls={addNewQuoteFormControls}
      showDialog={showDialog}
      onOpenChange={() => {
        setShowDialog(false);
        currentEditedId ? taskFormData.reset() : null;
        setCurrentEditedId(null);
      }}
      title={currentEditedId ? "Edit Task" : "Post New Task"}
      btnText={"Add"}
      handleSubmit={handleSubmit}
      formData={taskFormData}
    />
  );
}

export default AddNewTask;
