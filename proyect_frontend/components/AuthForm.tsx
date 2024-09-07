'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

import { Button } from "@/components/ui/button";
import {
    Form
} from "@/components/ui/form";
import { authFormSchema } from '@/lib/utils';
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useForm } from "react-hook-form";
import { z } from "zod";
import CustomInput from './CustomInput';

const AuthForm = ({ type }: { type: string }) => {
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const formSchema = authFormSchema(type);

    // 1. Define form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })

    // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log("Form submitted!"); // Verify submission

        setIsLoading(true)
        console.log(values)
        setIsLoading(false);
    }

    return (
        <div className="flex flex-col items-start"> {/* Added a wrapping div with flex-col and items-start for left alignment */}
            <section className='auth-form'>
                <header className="flex flex-col gap-5 md:gap-8 pt-5 items-start"> {/* Added items-start to align header content to left */}
                    <Link href="/" className="cursor-pointer flex items-center gap-1 px4" >
                        <Image
                            src="/assets/icons/logo.svg"
                            height={34}
                            width={34}
                            alt="JAM"
                            className='h-10 w-10 '
                        />
                        <h1 className="header font-sans"> JAM </h1>
                    </Link>
                    <section className="mb-12 space-y-4 pt-60">
                        <h1 className="header"> Bienvenido👋</h1>
                        <p className="text-dark-700">Pide tu primera cita </p>
                    </section>
                    <div className="flex flex-col gap-1 md:gap-3 items-start"> {/* Added items-start to align this div's content to the left */}
                        <h1>
                            {user
                                ? 'Link Account'
                                : type === 'sign-in'
                                    ? 'Inicia Sesion'
                                    : 'Registrarse'
                            }
                            <p className="text-16 font-sans text-gray-600">
                                {user
                                    ? 'Vincula tu cuenta para comenzar'
                                    : 'Porfavor ingrese sus credenciales'
                                }
                            </p>
                        </h1>
                    </div>
                </header>
                {user ?
                    <div className="flex flex-col gap-4">

                    </div>
                    : (
                        <>
                            <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1">
                                {type === 'sign-up' && (
                                    <>
                                        <div className='flex gap-4' >
                                            <CustomInput control={form.control}
                                                name='firstName'
                                                label='Nombre'
                                                placeholder='Ingresa tu nombre' />
                                            <CustomInput control={form.control}
                                                name='lastname'
                                                label='Apellido'
                                                placeholder='Ingresa tu apellido' />
                                        </div>
                                        <div className='flex gap-4'>
                                            <CustomInput control={form.control}
                                                name='tipoDNA'
                                                label='Tipo de Documento'
                                                placeholder='Ingresa tu documento' />
                                            <CustomInput control={form.control}
                                                name='DNA'
                                                label='Numero de documento'
                                                placeholder='Ingresa tu documento' />
                                        </div>

                                        <CustomInput control={form.control}
                                            name='address'
                                            label='Direccion'
                                            placeholder='Ingresa tu direccion' />
                                        <CustomInput control={form.control}
                                            name='departament'
                                            label='Departamento'
                                            placeholder='ej. Antioquia' />
                                        <CustomInput control={form.control}
                                            name='city'
                                            label='cidudad'
                                            placeholder='Ingresa tu ciudad' />
                                        <CustomInput control={form.control}
                                            name='dob'
                                            label='Fecha de Nacimiento'
                                            placeholder='DD/MM/AAAA' />
                                    </>
                                )}
                                

                                    <CustomInput control={form.control}
                                        name='email'
                                        label='Email'
                                        placeholder='Ingresa tu email' />

                                    <CustomInput control={form.control}
                                        name='password'
                                        label='Contraseña'
                                        placeholder='Ingresa tu contraseña' />

                                    <div className='flex flex-col gap-4'>
                                        <Button type="submit" disabled={isLoading}
                                            variant='link'
                                            size='lg'
                                            className='w-full bg hover:bg-[#FFD700] hover:text-black' >
                                            {isLoading ? (
                                                <>
                                                    <Loader2 size={20}
                                                        className='animate-spin' />&nbsp;
                                                    Cargando...
                                                </>
                                            ) : type === 'sign-in' ? 'Iniciar Sesion' : 'Registrarse'}
                                        </Button>

                                    </div>
                                </form>
                                <div className=" text-14-regular mt-20 flex justify-between">
                                    <p className="justify-items-end text-dark-600 xl:text-left">
                                        © 2024 JAM
                                    </p>
                                    <Link href="/?admin=true" className="text-green-500">
                                        {/* ... your existing content ... */}
                                    </Link>
                                </div>
                            </Form>

                            <footer className='flex justify-center gap-1'>
                                <p className='text-14 font-normal text-gray-400'>
                                    {type === 'sign-in'
                                        ? "¿No tienes una cuenta?"
                                        : '¿Ya tienes una cuenta?'}
                                </p>
                                <Link href={type === 'sign-in'
                                    ? '/sign-up'
                                    : '/sign-in'} className='text-[#FFD700]'>
                                    {type === 'sign-in'
                                        ? 'Registrarse'
                                        : 'Iniciar Sesion'}
                                </Link>
                            </footer>

                        </>
                    )}
            </section>
        </div>
    )
}

export default AuthForm