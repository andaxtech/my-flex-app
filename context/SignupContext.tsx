// context/SignupContext.tsx
import React, { createContext, ReactNode, useContext, useState } from 'react';

interface SignupData {
  first_name?: string;
  last_name?: string;
  email?: string;
  phone_number?: string;
  birth_date?: string;
  driver_image?: string;
  username?: string;
  password?: string;
  license_number?: string;
  license_expiration?: string;
  car_make?: string;
  car_model?: string;
  car_year?: string;
  car_color?: string;
  license_plate?: string;
  license_plate_image?: string;
  vin_number?: string;
  insurance_provider?: string;
  insurance_policy_number?: string;
  policy_start_date?: string;
  policy_end_date?: string;
  policy_image?: string;
  account_holder_first_name?: string;
  account_holder_last_name?: string;
  bank_name?: string;
  bank_account_number?: string;
  routing_number?: string;
}

type SignupContextType = {
  signupData: SignupData;
  updateData: (newData: Partial<SignupData>) => void;
};

const SignupContext = createContext<SignupContextType | undefined>(undefined);

export const SignupProvider = ({ children }: { children: ReactNode }) => {
  const [signupData, setSignupData] = useState<SignupData>({});

  const updateData = (newData: Partial<SignupData>) => {
    setSignupData(prev => ({ ...prev, ...newData }));
  };

  return (
    <SignupContext.Provider value={{ signupData, updateData }}>
      {children}
    </SignupContext.Provider>
  );
};

export const useSignup = (): SignupContextType => {
  const context = useContext(SignupContext);
  if (!context) {
    throw new Error('useSignup must be used within SignupProvider');
  }
  return context;
};
