import RegisterForm from "@/components/forms/RegisterForm";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex h-screen max-h-screen">
      {/* Container for the section and the side image */}
      <div className="flex flex-col md:flex-row"> 
        <section className="remove-scrollbar container my-auto flex-1"> {/* Added flex-1 for better responsiveness */}
          <div className="sub-container max-w-[496px]">
            <Image
              src="/assets/icons/logo.svg"
              height={1000}
              width={1000}
              alt="JAM"
              className="mb-12 h-10 w-fit"
            />
          </div>
          <RegisterForm />
          <div className=" text-14-regular mt-20 flex justify-between">
            <p className="justify-items-end text-dark-600 xl:text-left">
              © 2024 JAM
            </p>
            <Link href="/?admin=true" className="text-green-500">
              {/* ... your existing content ... */}
            </Link>
          </div>
        </section>

        {/* Side Image */}
        <div className="flex-1"> {/* Added flex-1 for better responsiveness */}
          <Image 
            src="/assets/icons/logo.svg"
            height={1000}
            width={1000}
            alt="JAM"
            className="side-img max-w-[500%]"
          />
        </div>
      </div>
    </div>
  );
}