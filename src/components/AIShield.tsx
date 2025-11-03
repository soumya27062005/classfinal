import { Shield } from 'lucide-react';
import { useSecurity } from '@/contexts/SecurityContext';
import { useEffect, useState } from 'react';

const AIShield = () => {
  const { aiMonitoring } = useSecurity();
  const [pulse, setPulse] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setPulse(true);
      setTimeout(() => setPulse(false), 1000);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  if (!aiMonitoring) return null;

  return (
    <div className="fixed top-20 right-4 z-40">
      <div className={`p-3 bg-gradient-security rounded-full shadow-glow transition-all duration-1000 ${
        pulse ? 'scale-110 shadow-[0_0_60px_hsl(270_70%_55%/0.4)]' : 'scale-100'
      }`}>
        <Shield className="h-5 w-5 text-white animate-pulse-glow" />
      </div>
    </div>
  );
};

export default AIShield;
