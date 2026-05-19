import { motion } from "framer-motion";

interface WalletCard {
  name: string;
  code: string;
  balance: string;
  usedBalance: string;
  allocations: { label: string; percentage: number; color: string }[];
}

const walletData: WalletCard[] = [
  {
    name: "Jangka Panjang",
    code: "WLT-LONG",
    balance: "Rp5.000.000",
    usedBalance: "Rp2.500.000",
    allocations: [
      { label: "BBRI 50%", percentage: 50, color: "bg-emerald-600" },
      { label: "BBCA 30%", percentage: 30, color: "bg-blue-500" },
      { label: "TLKM 20%", percentage: 20, color: "bg-purple-500" },
    ],
  },
  {
    name: "Saham Blue Chip",
    code: "WLT-BLUECHIP",
    balance: "Rp5.00",
    usedBalance: "Rp0",
    allocations: [
      { label: "BBRI 50%", percentage: 50, color: "bg-emerald-600" },
      { label: "BBCA 30%", percentage: 30, color: "bg-blue-500" },
      { label: "TLKM 20%", percentage: 20, color: "bg-purple-500" },
    ],
  },
  {
    name: "Dompet Agresif",
    code: "WLT-AGGRESSIVE",
    balance: "Rp10.500.000",
    usedBalance: "Rp132.872",
    allocations: [
      { label: "BBRI 50%", percentage: 50, color: "bg-emerald-600" },
      { label: "BBCA 30%", percentage: 30, color: "bg-blue-500" },
      { label: "TLKM 20%", percentage: 20, color: "bg-purple-500" },
    ],
  },
];

const WalletCardItem = ({ wallet, index }: { wallet: WalletCard; index: number }) => {
  // Card order in DOM: index 0 = Jangka Panjang (Card 3 - Top), index 1 = Saham Blue Chip (Card 1 - Bottom), index 2 = Dompet Agresif (Card 2 - Middle)
  const isCard1 = index === 1; // Saham Blue Chip - Bottom (will move to top-left)
  const isCard2 = index === 2; // Dompet Agresif - Middle (stays static)
  const isCard3 = index === 0; // Jangka Panjang - Top (will move to bottom-right)

  // Stacking z-index: Card 1 (1), Card 2 (2), Card 3 (3)
  const zIndex = isCard1 ? 1 : isCard2 ? 2 : 3;

  return (
    <motion.div
      initial={{
        x: 0,
        y: 0,
        opacity: 1,
        zIndex: zIndex,
      }}
      whileInView={{
        x: isCard1 ? -50 : isCard3 ? 50 : 0,
        y: isCard1 ? -15 : isCard3 ? 15 : 0,
        opacity: 1,
        zIndex: zIndex,
      }}
      transition={{
        duration: 1.2,
        delay: index * 0.1,
        ease: "easeOut",
      }}
      viewport={{ once: true }}
      className={`absolute w-full max-w-xs transition-all`}
    >
      <div className="bg-white rounded-lg border border-white ring-1 ring-brand shadow-xl overflow-hidden">
        {/* Header */}
        <div className="bg-brand text-white px-4 py-3">
          <div className="flex items-start justify-between mb-2">
            <div className="flex-1">
              <p className="text-sm font-semibold">{wallet.name}</p>
              <p className="text-xs text-white/70">{wallet.code}</p>
            </div>
            <div className="w-10 h-10 rounded-md bg-white/20 flex items-center justify-center flex-shrink-0">
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14z" />
              </svg>
            </div>
          </div>

        </div>

        {/* Body */}
        <div className="p-4 space-y-3 bg-background-primary">
          {/* Progress Bar */}
          <div className="w-full h-1 flex rounded-full overflow-hidden bg-white/20">
            <div
              className="h-full bg-emerald-400"
              style={{ width: "50%" }}
            />
            <div
              className="h-full bg-blue-400"
              style={{ width: "30%" }}
            />
            <div
              className="h-full bg-purple-400"
              style={{ width: "20%" }}
            />
          </div>
          {/* Allocations */}
          <div className="space-y-1">
            <div className="flex gap-3 text-xs font-medium text-text-muted">
              {wallet.allocations.map((alloc, idx) => (
                <span key={idx} className="flex items-center gap-1">
                  <span className={`w-1.5 h-1.5 rounded-full ${alloc.color}`} />
                  {alloc.label}
                </span>
              ))}
            </div>
          </div>

          {/* Balances */}
          <div className="flex justify-between items-center pt-2 border-t border-border-secondary">
            <div>
              <p className="text-[10px] text-text-muted">Saldo Tersedia</p>
              <p className="text-sm font-semibold text-text-primary">
                {wallet.balance}
              </p>
            </div>
            <div className="text-right">
              <p className="text-[10px] text-text-muted">Terpakai</p>
              <p className="text-sm font-semibold text-emerald-600">
                {wallet.usedBalance}
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export const WalletCardsAnimation = () => {
  return (
    <div className="relative w-full h-80 flex items-center justify-center px-4">
      {walletData.map((wallet, index) => (
        <WalletCardItem key={index} wallet={wallet} index={index} />
      ))}
    </div>
  );
};
