/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
export declare type EscapeHatchProps = {
    [elementHierarchy: string]: Record<string, unknown>;
} | null;
export declare type VariantValues = {
    [key: string]: string;
};
export declare type Variant = {
    variantValues: VariantValues;
    overrides: EscapeHatchProps;
};
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type TodoUserCountUpdateFormInputValues = {
    userID?: string;
    count?: number;
};
export declare type TodoUserCountUpdateFormValidationValues = {
    userID?: ValidationFunction<string>;
    count?: ValidationFunction<number>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type TodoUserCountUpdateFormOverridesProps = {
    TodoUserCountUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    userID?: PrimitiveOverrideProps<TextFieldProps>;
    count?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type TodoUserCountUpdateFormProps = React.PropsWithChildren<{
    overrides?: TodoUserCountUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    todoUserCount?: any;
    onSubmit?: (fields: TodoUserCountUpdateFormInputValues) => TodoUserCountUpdateFormInputValues;
    onSuccess?: (fields: TodoUserCountUpdateFormInputValues) => void;
    onError?: (fields: TodoUserCountUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: TodoUserCountUpdateFormInputValues) => TodoUserCountUpdateFormInputValues;
    onValidate?: TodoUserCountUpdateFormValidationValues;
} & React.CSSProperties>;
export default function TodoUserCountUpdateForm(props: TodoUserCountUpdateFormProps): React.ReactElement;
