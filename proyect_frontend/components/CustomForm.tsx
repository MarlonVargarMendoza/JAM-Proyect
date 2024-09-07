'use client'
import React from 'react'

import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form"
import Image from 'next/image'
import { Control } from "react-hook-form"
import { FormFieldType } from './forms/RegisterForm'

interface CustomProps {
    control: Control<any>,
    fieldType: FormFieldType
    name: string;
    label?: string;
    placeholder?: string;
    iconSrc?: string;
    iconAlt?: string;
    disabled?: boolean;
    dateFormat?: string;
    showTimeSelect?: boolean;
    children?: React.ReactNode;
    renderSkeleton?: (field: any) => React.ReactNode,

}

const RenderField = ({ field, props }: { field: any, props: CustomProps }) => {
    const { fieldType, iconSrc, iconAlt, placeholder } = props;
    switch (fieldType) {
        case FormFieldType.INPUT:
            return (
                <div className="flex rounded-md border border-dark-500 bg-dark-400">
                    {iconSrc && iconAlt && (
                        <Image
                            src={iconSrc}
                            alt={iconAlt || "icon"}
                            width={24}
                            height={24}
                            className="ml-2 mt-3"
                        />
                    )}
                    <FormControl>
                        <input
                            placeholder={placeholder}
                            {...field}
                            className="shad-input border-0 flex dark:bg-dark-400 "
                        />
                    </FormControl>
                </div>
            );
        default:
            break;
    }
};


const CustomForm = (props: CustomProps) => {
    const { control, fieldType, name, label } = props;
    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem className='flex-1'>
                    {fieldType !== FormFieldType.CHECKBOX && label && (  /* DO in case if itsnot a checkbox and a label exists */
                        <FormLabel className='shad-input-label'>{label}</FormLabel>
                    )}
                    <RenderField field={field} props={props} />

                    <FormMessage className='shad-error' />
                </FormItem>
            )}
        />
    )
}

export default CustomForm