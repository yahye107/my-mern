import React from "react";

import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Input } from "../ui/input";
import CommonButton from "./common-button";

function CommonForm({
  formControls = [],
  handleSubmit,
  form,
  btnText,
  customLayout,
  className,
  inputClassName,
  labelClassName,
  errorClassName,
  buttonClassName,
}) {
  const renderField = (controlItem, fieldId) => {
    return (
      <FormField
        key={controlItem.id}
        control={form.control}
        name={controlItem.id}
        render={({ field }) => (
          <FormItem className="space-y-2">
            <FormLabel className={labelClassName}>
              {controlItem.label}
            </FormLabel>

            {controlItem.componentType === "input" && (
              <div className="relative">
                {customLayout?.icons?.[fieldId] &&
                  (() => {
                    const IconComponent = customLayout.icons[fieldId];
                    return (
                      <IconComponent className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    );
                  })()}
                <Input
                  {...field}
                  onChange={(e) => {
                    field.onChange(e);
                    if (controlItem.onChange) {
                      controlItem.onChange(e);
                    }
                  }}
                  type={controlItem.type}
                  placeholder={controlItem.placeholder}
                  className={`${inputClassName} ${
                    customLayout?.icons?.[fieldId] ? "pl-10" : ""
                  }`}
                />
              </div>
            )}

            {controlItem.componentType === "select" && (
              <Select
                value={field.value}
                onValueChange={(val) => {
                  field.onChange(val);
                  if (controlItem.onChange) {
                    controlItem.onChange(val);
                  }
                }}
              >
                <SelectTrigger className={inputClassName}>
                  <SelectValue placeholder={controlItem.placeholder} />
                </SelectTrigger>
                <SelectContent className="bg-black dark:bg-slate-800">
                  {controlItem.options.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          </FormItem>
        )}
      />
    );
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className={className}>
        {customLayout?.grid
          ? customLayout.grid.map((row, rowIndex) => (
              <div key={rowIndex} className="grid grid-cols-2 gap-4">
                {row.map((fieldId) => {
                  const controlItem = formControls.find(
                    (c) => c.id === fieldId
                  );
                  if (!controlItem) return null;
                  return renderField(controlItem, fieldId);
                })}
              </div>
            ))
          : formControls.map((controlItem) =>
              renderField(controlItem, controlItem.id)
            )}

        <div className="mt-6">
          <CommonButton
            type="submit"
            buttonText={btnText}
            className={buttonClassName}
          />
        </div>
      </form>
    </Form>
  );
}

export default CommonForm;
