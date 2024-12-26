"use client"
import Check from "@/app/ui/Body/Check";
import { useRouter, usePathname } from "next/navigation";
import React, { useState, useEffect } from "react";

const steps = [
    { id: 1, label: "Add to cart", route: "/cart" },
    { id: 2, label: "Payment", route: "/payment" },
    { id: 3, label: "Complete", route: "/checkout" },
  ];
  

const ProgressStep = ({ step, label, status }: { step: number; label: string; status: "completed" | "active" | "inactive" }) => {
  const baseStyle = "w-16 h-16 rounded-full flex items-center justify-center";
  const labelStyle = "text-sm font-medium";

  const styles = {
    completed: `${baseStyle} bg-blue-700`,
    active: `${baseStyle} border-2 border-blue-700`,
    inactive: `${baseStyle} bg-gray-300`,
    };


  const textStyles = {
    completed: "text-white",
    active: "text-blue-700",
    inactive: "text-gray-400",
  };

  return (
    <div className="flex items-center gap-4">
      <div className={styles[status]}>
        <div className={`w-14 h-14 rounded-full flex items-center justify-center ${textStyles[status]}`}>
          {status === "completed" ? (
            <Check />
          ) : (
            <span className="text-lg">{step}</span>
          )}
        </div>
      </div>
      <span className={`${labelStyle} ${status === "inactive" ? "text-gray-400" : "text-black"}`}>{label}</span>
    </div>
  );
};

const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [currentStep, setCurrentStep] = useState(1);

  useEffect(() => {const step = steps.find((s) => s.route === pathname)?.id || 1;
    setCurrentStep(step);
  }, [pathname]);

  const handleStepClick = (step: number) => {
    setCurrentStep(step);
    // Update the route dynamically
    if (step == 1 ) {
        router.push('/cart')
    }
    if (step == 2) {
        router.push('/payment')
    }
    if (step == 3) {
        router.push('/checkout')
    }
  };

  return (
    <div className="w-full h-30 bg-white sticky top-0" style={{ zIndex: 10 }}>
      <div className="container mx-auto px-4 h-full">
        <div className="flex justify-center items-center h-full">
          <div className="flex items-center gap-8" style={{ marginTop: "32px", marginBottom: "32px" }}>
            {steps.map(({ id, label }) => (
              <React.Fragment key={id}>
                <div onClick={() => handleStepClick(id)} className="cursor-pointer">
                  <ProgressStep
                    step={id}
                    label={label}
                    status={
                      id < currentStep ? "completed" : id === currentStep ? "active" : "inactive"
                    }
                  />
                </div>
                {id < steps.length && <div className="w-24 h-px bg-gray-300"></div>}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

/*
<>
      <div className="w-full h-20 bg-emerald-800 sticky top-0">
        <div className="container mx-auto px-4 h-full">
          <div className="flex justify-between items-center h-full">
            <Progress />
            <ul className="hidden md:flex gap-x-6 text-white">
              <li>
                <Link href="/about">
                  <p>About Us</p>
                </Link>
              </li>
              <li>
                <Link href="/services">
                  <p>Services</p>
                </Link>
              </li>
              <li>
                <Link href="/contacts">
                  <p>Contacts</p>
                </Link>
              </li>
            </ul>
            <Item />
          </div>
        </div>
      </div>
    </>
*/