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
export declare type TodoUserCountCreateFormInputValues = {
    userID?: string;
    count?: number;
};
export declare type TodoUserCountCreateFormValidationValues = {
    userID?: ValidationFunction<string>;
    count?: ValidationFunction<number>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type TodoUserCountCreateFormOverridesProps = {
    TodoUserCountCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    userID?: PrimitiveOverrideProps<TextFieldProps>;
    count?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type TodoUserCountCreateFormProps = React.PropsWithChildren<{
    overrides?: TodoUserCountCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: TodoUserCountCreateFormInputValues) => TodoUserCountCreateFormInputValues;
    onSuccess?: (fields: TodoUserCountCreateFormInputValues) => void;
    onError?: (fields: TodoUserCountCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: TodoUserCountCreateFormInputValues) => TodoUserCountCreateFormInputValues;
    onValidate?: TodoUserCountCreateFormValidationValues;
} & React.CSSProperties>;
export default function TodoUserCountCreateForm(props: TodoUserCountCreateFormProps): React.ReactElement;
