import { FormControl, FormField, FormItem, FormLabel, FormMessage } from './ui/form'
import { Input } from './ui/input'

import { authFormSchema } from '@/lib/utils'
import { Control, FieldPath } from 'react-hook-form'
import { z } from 'zod'

const formSchema = authFormSchema('sign-up');

interface CustomInput {
    control: Control<z.infer<typeof formSchema>>,
    name: FieldPath<z.infer<typeof formSchema>>,
    label: string,
    placeholder: string
    iconSrc?: string,
    iconAlt?: string
}

const CustomInput = (props: CustomInput) => {
    const { control, name, label, placeholder, iconSrc, iconAlt } = props
    return (

        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem className="flex-1">
                    
                    <FormLabel className="shad-input-label">
                        {label}
                    </FormLabel>
                    <div className="flex rounded-md border border-dark-500 bg-dark-400 w-full flex-col">

                        <FormControl>
                            <Input
                                placeholder={placeholder}
                                className="input-class"
                                type={name==="password" ? "password" : "text"}
                                {...field}
                            />
                        </FormControl>
                        <FormMessage
                            className="form-message mt-2" />
                    </div>
                </FormItem>
            )}
        />
    )
}

export default CustomInput